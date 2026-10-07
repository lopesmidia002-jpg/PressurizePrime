import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteSettings, PageData, ServiceItem, FaqItem, Lead, LeadFormData } from '../types';
import { defaultSettings, defaultPages, defaultServices, defaultFaqs } from '../services/initialData';
import { api, adminApi } from '../services/api';

interface SiteDataContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  pages: Record<string, PageData>;
  updatePageData: (slug: string, pageData: Partial<PageData>) => void;
  services: ServiceItem[];
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  addService: (newService: ServiceItem) => void;
  deleteService: (id: string) => void;
  faqs: FaqItem[];
  leads: Lead[];
  addLead: (lead: LeadFormData) => Promise<boolean>;
  updateLeadStatus: (id: string | number, status: Lead['status']) => void;
  isBusinessHours: boolean;
  isLeadModalOpen: boolean;
  leadModalService?: string;
  openLeadModal: (serviceCategory?: string) => void;
  closeLeadModal: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

// Versão dos dados — ao incrementar, o localStorage é limpo e os defaults são usados
const DATA_VERSION = '2.0';

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Configurações Globais (com persistência local e fallback)
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedVersion = localStorage.getItem('pressurize_data_version');
    if (savedVersion !== DATA_VERSION) {
      // Limpa o cache antigo quando a versão muda
      localStorage.removeItem('pressurize_pages');
      localStorage.removeItem('pressurize_settings');
      localStorage.removeItem('pressurize_services');
      localStorage.setItem('pressurize_data_version', DATA_VERSION);
    }
    const saved = localStorage.getItem('pressurize_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Páginas do Site
  const [pages, setPages] = useState<Record<string, PageData>>(() => {
    const saved = localStorage.getItem('pressurize_pages');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge com os defaults para garantir que novas seções (como sections da home) apareçam mesmo se o usuário já tiver salvo antes
      const merged = { ...defaultPages };
      Object.keys(parsed).forEach(key => {
        // Merge raso inicial
        const rawMerge = { ...defaultPages[key], ...parsed[key] };
        // Para campos de nível raiz (como hero_title, hero_subtitle, microcopy), se estiverem vazios, usa o default
        const topLevelKeys = ['hero_title', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary', 'microcopy', 'title'];
        topLevelKeys.forEach(field => {
          if (rawMerge[field] === '' || rawMerge[field] === undefined || rawMerge[field] === null) {
            rawMerge[field] = (defaultPages[key] as any)[field];
          }
        });
        merged[key] = rawMerge;
        // Deep merge das sections para todas as páginas (2 níveis)
        if (defaultPages[key]?.sections) {
          const defaultSecs = defaultPages[key].sections || {};
          const parsedSecs = parsed[key]?.sections || {};
          const mergedSecs: Record<string, any> = { ...parsedSecs };
          
          Object.keys(defaultSecs).forEach(secKey => {
            const defVal = defaultSecs[secKey];
            // Se o valor da seção for primitivo (ex: image_url como string), trata como fallback simples
            if (typeof defVal !== 'object' || defVal === null) {
              if (!mergedSecs[secKey] || mergedSecs[secKey] === '') {
                mergedSecs[secKey] = defVal;
              }
              return;
            }
            if (!mergedSecs[secKey] || typeof mergedSecs[secKey] !== 'object') {
              mergedSecs[secKey] = { ...defVal };
            } else {
              // Merge de propriedades dentro da seção
              const defProps = defVal || {};
              const parProps = parsedSecs[secKey] || {};
              const mergedProps = { ...parProps };
              
              Object.keys(defProps).forEach(prop => {
                // Se no saved está vazio (string vazia ou undefined), usamos o default
                if (mergedProps[prop] === '' || mergedProps[prop] === undefined || mergedProps[prop] === null) {
                  mergedProps[prop] = defProps[prop];
                }
                
                // Tratamento especial para arrays (como items do howItWorks)
                if (Array.isArray(defProps[prop])) {
                  const parArray = Array.isArray(parProps[prop]) ? parProps[prop] : [];
                  const mergedArray = defProps[prop].map((defItem: any, idx: number) => {
                    const parItem = parArray[idx] || {};
                    const mergedItem = { ...parItem };
                    Object.keys(defItem).forEach(itemProp => {
                      if (mergedItem[itemProp] === '' || mergedItem[itemProp] === undefined) {
                        mergedItem[itemProp] = defItem[itemProp];
                      }
                    });
                    return mergedItem;
                  });
                  mergedProps[prop] = mergedArray;
                }
              });
              mergedSecs[secKey] = mergedProps;
            }
          });
          merged[key].sections = mergedSecs;
        }
      });
      return merged;
    }
    return defaultPages;
  });

  // Serviços
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('pressurize_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  // FAQs
  const [faqs] = useState<FaqItem[]>(defaultFaqs);

  // Leads
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('pressurize_leads');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'Carlos Eduardo Silveira',
        whatsapp: '(11) 98765-4321',
        neighborhood: 'Brooklin',
        service_category: 'pressurizador',
        problem_description: 'Pressurizador ligando sozinho e fazendo barulho no teto.',
        status: 'novo',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Fernanda Albuquerque',
        whatsapp: '(11) 97654-3210',
        neighborhood: 'Alphaville',
        service_category: 'aquecedor-a-gas',
        problem_description: 'Aquecedor desliga no meio do banho e aparece erro no visor.',
        status: 'em_atendimento',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
  });

  // Fetch initial data from Laravel Backend
  useEffect(() => {
    api.get('/public/bootstrap')
      .then(response => {
        if (response.data?.success) {
          const { settings: apiSettings, services: apiServices, seo: apiSeo, pages: apiPages } = response.data.data;
          
          if (apiSettings) {
            let addressCoverage = [];
            if (apiSettings.coverage_cities) {
              try {
                addressCoverage = JSON.parse(apiSettings.coverage_cities);
              } catch (e) {
                addressCoverage = [];
              }
            }
            
            setSettings(prev => ({
              ...prev,
              ...apiSettings,
              address_coverage: addressCoverage.length > 0 ? addressCoverage : prev.address_coverage
            }));
          }
          
          if (apiServices && apiServices.length > 0) {
            // Ensure features are arrays
            const mappedServices = apiServices.map((s: any) => ({
              ...s,
              id: s.id.toString(),
              features: typeof s.features === 'string' ? JSON.parse(s.features) : (s.features || [])
            }));
            setServices(mappedServices);
          }
          
          if (apiPages) {
            // A API retorna as páginas já com as SEO tags mescladas no backend
            // Precisamos adaptar para o formato do Record<string, PageData>
            const formattedPages: Record<string, PageData> = {};
            
            Object.keys(apiPages).forEach(key => {
              const p = apiPages[key];
              let mappedSections: Record<string, any> = {};
              
              if (p.sections && Array.isArray(p.sections)) {
                p.sections.forEach((sec: any) => {
                  try {
                    mappedSections[sec.section_key] = typeof sec.content === 'string' ? JSON.parse(sec.content) : sec.content;
                  } catch(e) {
                    mappedSections[sec.section_key] = sec.content;
                  }
                });
              }

              formattedPages[key] = {
                ...(defaultPages[key] || {}),
                ...p,
                sections: Object.keys(mappedSections).length > 0 ? { ...((defaultPages[key] || {}).sections || {}), ...mappedSections } : p.sections,
                seo: apiSeo?.[key] || null
              };
              
              // Para campos de nível raiz, se estiverem vazios, usa o default
              const topLevelKeysApi = ['hero_title', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary', 'microcopy', 'title'];
              topLevelKeysApi.forEach(field => {
                if ((formattedPages[key] as any)[field] === '' || (formattedPages[key] as any)[field] === undefined || (formattedPages[key] as any)[field] === null) {
                  (formattedPages[key] as any)[field] = (defaultPages[key] as any)?.[field];
                }
              });
              
              if (defaultPages[key]?.sections) {
                const defaultSecs = defaultPages[key].sections || {};
                const parsedSecs = formattedPages[key].sections || {};
                const mergedSecs: Record<string, any> = { ...parsedSecs };
                
                Object.keys(defaultSecs).forEach(secKey => {
                  const defVal = defaultSecs[secKey];
                  // Se o valor da seção for primitivo (ex: image_url como string), trata como fallback simples
                  if (typeof defVal !== 'object' || defVal === null) {
                    if (!mergedSecs[secKey] || mergedSecs[secKey] === '') {
                      mergedSecs[secKey] = defVal;
                    }
                    return;
                  }
                  if (!mergedSecs[secKey] || typeof mergedSecs[secKey] !== 'object') {
                    mergedSecs[secKey] = { ...defVal };
                  } else {
                    const defProps = defVal || {};
                    const parProps = parsedSecs[secKey] || {};
                    const mergedProps = { ...parProps };
                    
                    Object.keys(defProps).forEach(prop => {
                      if (mergedProps[prop] === '' || mergedProps[prop] === undefined || mergedProps[prop] === null) {
                        mergedProps[prop] = defProps[prop];
                      }
                      
                      if (Array.isArray(defProps[prop])) {
                        const parArray = Array.isArray(parProps[prop]) ? parProps[prop] : [];
                        const mergedArray = defProps[prop].map((defItem: any, idx: number) => {
                          const parItem = parArray[idx] || {};
                          const mergedItem = { ...parItem };
                          Object.keys(defItem).forEach(itemProp => {
                            if (mergedItem[itemProp] === '' || mergedItem[itemProp] === undefined) {
                              mergedItem[itemProp] = defItem[itemProp];
                            }
                          });
                          return mergedItem;
                        });
                        mergedProps[prop] = mergedArray;
                      }
                    });
                    mergedSecs[secKey] = mergedProps;
                  }
                });
                formattedPages[key].sections = mergedSecs;
              }
            });
            
            setPages(formattedPages);
          }
        }
      })
      .catch(error => {
        console.error('Failed to fetch from backend, falling back to local storage/defaults', error);
      });
  }, []);

  // Atualizar variáveis CSS do tema dinamicamente no :root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.primary_color);
    root.style.setProperty('--color-secondary', settings.secondary_color);
    localStorage.setItem('pressurize_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pressurize_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('pressurize_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('pressurize_leads', JSON.stringify(leads));
  }, [leads]);

  // Verificar Horário Comercial (Seg-Sex, 08h às 19h - Horário de Brasília)
  const [isBusinessHours, setIsBusinessHours] = useState(true);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      // Ajuste para fuso horário de SP (UTC-3)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const spTime = new Date(utc - 3600000 * 3);
      const day = spTime.getDay(); // 0 = Domingo, 6 = Sábado
      const hours = spTime.getHours();

      const isWeekday = day >= 1 && day <= 5;
      const isWithinHours = hours >= 8 && hours < 19;
      setIsBusinessHours(isWeekday && isWithinHours);
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);
    return () => clearInterval(interval);
  }, []);



  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));

    // Tentativa assíncrona de sincronizar com a API se autenticado
    const token = localStorage.getItem('pressurize_token');
    if (token) {
      const settingsPayload = Object.entries(newSettings).map(([key, value]) => {
        let finalKey = key;
        if (key === 'address_coverage') finalKey = 'coverage_cities';
        return {
          key: finalKey,
          value: typeof value === 'object' ? JSON.stringify(value) : String(value),
          group: 'general'
        };
      });

      adminApi.put('/settings', { settings: settingsPayload })
        .catch(err => {
          alert("Erro ao salvar config: " + (err.response?.data?.message || err.message));
          console.error(err);
        });
    }
  };

  const updatePageData = (slug: string, pageData: Partial<PageData>) => {
    setPages(prev => {
      const existing = prev[slug] || defaultPages[slug] || {
        id: slug,
        slug,
        title: slug,
        hero_title: '',
        hero_subtitle: '',
        hero_cta_primary: 'Chamar no WhatsApp',
        hero_cta_secondary: 'Ligar agora'
      };

      const mergedSeo = pageData.seo
        ? {
            page_slug: slug,
            meta_title: pageData.seo.meta_title ?? existing.seo?.meta_title ?? '',
            meta_description: pageData.seo.meta_description ?? existing.seo?.meta_description ?? '',
            keywords: pageData.seo.keywords ?? existing.seo?.keywords,
            canonical_url: pageData.seo.canonical_url ?? existing.seo?.canonical_url,
            og_title: pageData.seo.og_title ?? existing.seo?.og_title,
            og_description: pageData.seo.og_description ?? existing.seo?.og_description,
            og_image: pageData.seo.og_image ?? existing.seo?.og_image
          }
        : existing.seo;

      const updatedPage: PageData = {
        ...existing,
        ...pageData,
        seo: mergedSeo
      };
      
      // Async API sync
      const token = localStorage.getItem('pressurize_token');
      if (token) {
        // Converter sections (objeto) para array de sections esperado pelo backend
        let apiPayload = { ...pageData };
        if (apiPayload.sections && !Array.isArray(apiPayload.sections)) {
          apiPayload.sections = Object.entries(apiPayload.sections).map(([key, value]) => ({
            section_key: key,
            content: typeof value === 'object' ? JSON.stringify(value) : value
          })) as any;
        }

        adminApi.put(`/pages/${slug}`, apiPayload)
          .catch(err => {
            alert("Erro ao salvar página: " + (err.response?.data?.message || err.message));
            console.error(err);
          });
        if (pageData.seo) {
          adminApi.put(`/seo/${slug}`, mergedSeo).catch(() => {});
        }
      }

      return {
        ...prev,
        [slug]: updatedPage
      };
    });
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
    const token = localStorage.getItem('pressurize_token');
    if (token) adminApi.put(`/services/${id}`, updated).catch(() => {});
  };

  const addService = (newService: ServiceItem) => {
    setServices(prev => [...prev, newService]);
    const token = localStorage.getItem('pressurize_token');
    if (token) adminApi.post('/services', newService).catch(() => {});
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    const token = localStorage.getItem('pressurize_token');
    if (token) adminApi.delete(`/services/${id}`).catch(() => {});
  };

  const addLead = async (leadData: LeadFormData): Promise<boolean> => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      status: 'novo',
      created_at: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);

    // Tentativa assíncrona de enviar para backend Laravel quando ativo
    try {
      await api.post('/public/leads', leadData);
    } catch {
      // Falha silenciosa de offline/mock
    }

    return true;
  };

  const updateLeadStatus = (id: string | number, status: Lead['status']) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
    const token = localStorage.getItem('pressurize_token');
    if (token) adminApi.patch(`/leads/${id}/status`, { status }).catch(() => {});
  };

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalService, setLeadModalService] = useState<string | undefined>(undefined);

  const openLeadModal = (serviceCategory?: string) => {
    setLeadModalService(serviceCategory);
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
    setLeadModalService(undefined);
  };

  return (
    <SiteDataContext.Provider
      value={{
        settings,
        updateSettings,
        pages,
        updatePageData,
        services,
        updateService,
        addService,
        deleteService,
        faqs,
        leads,
        addLead,
        updateLeadStatus,
        isBusinessHours,
        isLeadModalOpen,
        leadModalService,
        openLeadModal,
        closeLeadModal
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData deve ser utilizado dentro de um SiteDataProvider');
  }
  return context;
};
