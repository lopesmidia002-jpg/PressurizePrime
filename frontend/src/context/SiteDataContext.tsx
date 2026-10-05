import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SiteSettings, PageData, ServiceItem, FaqItem, Lead, LeadFormData } from '../types';
import { defaultSettings, defaultPages, defaultServices, defaultFaqs } from '../services/initialData';

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

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Configurações Globais (com persistência local e fallback)
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('pressurize_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Páginas do Site
  const [pages, setPages] = useState<Record<string, PageData>>(() => {
    const saved = localStorage.getItem('pressurize_pages');
    return saved ? JSON.parse(saved) : defaultPages;
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

  // Sincronização inicial com o backend Laravel (Bootstrap Endpoint)
  useEffect(() => {
    const fetchBootstrapData = async () => {
      try {
        const res = await fetch('/api/public/bootstrap');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            if (json.data.settings) {
              setSettings(prev => ({ ...prev, ...json.data.settings }));
            }
            if (json.data.services && Array.isArray(json.data.services) && json.data.services.length > 0) {
              setServices(json.data.services);
            }
            if (json.data.pages) {
              setPages(prev => ({ ...prev, ...json.data.pages }));
            }
          }
        }
      } catch {
        // Fallback gracioso local ativo automaticamente
      }
    };

    fetchBootstrapData();
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));

    // Tentativa assíncrona de sincronizar com a API se autenticado
    const token = localStorage.getItem('pressurize_token');
    if (token) {
      const settingsPayload = Object.entries(newSettings).map(([key, value]) => ({
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
        group: 'general'
      }));

      fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ settings: settingsPayload })
      }).catch(() => {});
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

      return {
        ...prev,
        [slug]: updatedPage
      };
    });
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const addService = (newService: ServiceItem) => {
    setServices(prev => [...prev, newService]);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
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
      await fetch('/api/public/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch {
      // Falha silenciosa de offline/mock
    }

    return true;
  };

  const updateLeadStatus = (id: string | number, status: Lead['status']) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
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
