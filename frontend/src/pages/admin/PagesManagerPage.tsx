import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { PageData } from '../../types';
import {
  Save,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';
import { DynamicSectionEditor } from '../../components/admin/DynamicSectionEditor';

export const PagesManagerPage: React.FC = () => {
  const { pages, updatePageData } = useSiteData();

  const pageKeys = [
    { key: 'home', label: 'Página Inicial (Home)', path: '/' },
    { key: 'sobre', label: 'Página Sobre', path: '/sobre' },
    { key: 'diferenciais', label: 'Página Diferenciais', path: '/diferenciais' },
    { key: 'como-funciona', label: 'Página Como Funciona', path: '/como-funciona' },
    { key: 'duvidas', label: 'Página Dúvidas', path: '/duvidas' },
    { key: 'pressurizador', label: 'LP Pressurizador de Água', path: '/pressurizador' },
    { key: 'aquecedor-a-gas', label: 'LP Aquecedor a Gás', path: '/aquecedor-a-gas' },
    { key: 'aquecedor-solar', label: 'LP Aquecedor Solar & Boiler', path: '/aquecedor-solar' },
    { key: 'aquecedor-eletrico', label: 'LP Aquecedor Elétrico & Boiler', path: '/aquecedor-eletrico' },
  ];

  const [selectedKey, setSelectedKey] = useState('home');
  const [formData, setFormData] = useState<PageData>(() => {
    return pages[selectedKey] || {
      id: selectedKey,
      slug: selectedKey,
      title: 'Página',
      hero_title: '',
      hero_subtitle: '',
      hero_cta_primary: 'Chamar no WhatsApp',
      hero_cta_secondary: 'Ligar agora',
      microcopy: ''
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Troca de página selecionada
  const handleSelectPage = (key: string) => {
    setSelectedKey(key);
    const targetPage = pages[key] || {
      id: key,
      slug: key,
      title: pageKeys.find(p => p.key === key)?.label || key,
      hero_title: '',
      hero_subtitle: '',
      hero_cta_primary: 'Chamar no WhatsApp',
      hero_cta_secondary: 'Ligar agora',
      microcopy: ''
    };
    setFormData(targetPage);
    setSavedSuccess(false);
  };

  const handleChange = (field: keyof PageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageData(selectedKey, formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentMeta = pageKeys.find(p => p.key === selectedKey);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gerenciamento de Conteúdo das Páginas
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Edite títulos principais (H1), subtítulos, argumentos de conversão e botões da Home e Landing Pages.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Página atualizada com sucesso!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da Esquerda: Navegação entre Páginas */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Páginas Disponíveis</span>
          </div>

          {pageKeys.map(page => {
            const isSelected = page.key === selectedKey;
            return (
              <button
                key={page.key}
                type="button"
                onClick={() => handleSelectPage(page.key)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{page.label}</span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Coluna da Direita: Formulário de Edição de Textos */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                Editando Conteúdo
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">
                {currentMeta?.label}
              </h2>
            </div>

            {currentMeta?.path && (
              <a
                href={currentMeta.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-primary bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver ao vivo</span>
              </a>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Título Principal (H1) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Título Principal da Seção Hero (H1 Oficial de Conversão) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.hero_title}
                onChange={e => handleChange('hero_title', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                placeholder="Ex: Água na temperatura certa e na pressão que você merece."
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Este título é a mensagem de impacto imediato lida pelos visitantes de campanhas.
              </p>
            </div>

            {/* Subtítulo Hero */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subtítulo de Apoio / Proposta de Valor *
              </label>
              <textarea
                rows={3}
                required
                value={formData.hero_subtitle}
                onChange={e => handleChange('hero_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Ex: Conserto, venda e instalação de pressurizadores e aquecedores a gás, solar e elétrico..."
              />
            </div>

            {/* Linha dupla de CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rótulo do Botão CTA Principal (WhatsApp)
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_primary}
                  onChange={e => handleChange('hero_cta_primary', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rótulo do Botão CTA Secundário (Ligação)
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_secondary}
                  onChange={e => handleChange('hero_cta_secondary', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Microcopy */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Microcopy de Urgência e Horário (Abaixo dos Botões)
              </label>
              <input
                type="text"
                value={formData.microcopy || ''}
                onChange={e => handleChange('microcopy', e.target.value)}
                placeholder="Ex: Atendimento de segunda a sexta, das 8h às 19h. Conserto em até 24 horas."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Edição de Seções Adicionais (Home) */}
            {selectedKey === 'home' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                {/* ABOUT SECTION */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Quem Somos
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">
                      Textos da Seção Sobre
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Principal</label>
                    <textarea rows={2} value={formData.sections?.about?.title || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.about) newSections.about = {} as any; newSections.about.title = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Conteúdo / Texto Descritivo</label>
                    <textarea rows={4} value={formData.sections?.about?.content || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.about) newSections.about = {} as any; newSections.about.content = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Citação / Frase de Destaque</label>
                    <textarea rows={2} value={(formData.sections?.about as any)?.quote || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.about) newSections.about = {} as any; (newSections.about as any).quote = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm font-medium italic bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  </div>
                </div>

                {/* WHY US SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Diferenciais
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">
                      Por que escolher a Pressurize Prime?
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Principal</label>
                    <textarea rows={2} value={formData.sections?.whyUs?.title || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.whyUs) newSections.whyUs = {} as any; newSections.whyUs.title = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo</label>
                    <textarea rows={2} value={formData.sections?.whyUs?.subtitle || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.whyUs) newSections.whyUs = {} as any; newSections.whyUs.subtitle = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  
                  {/* Items do Why Us */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map(index => {
                      const item = (formData.sections?.whyUs as any)?.items?.[index] || { title: '', desc: '' };
                      return (
                        <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Diferencial {index + 1} - Título</label>
                          <input type="text" value={item.title} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.whyUs) newSections.whyUs = { items: [] } as any;
                            if (!(newSections.whyUs as any).items) (newSections.whyUs as any).items = [];
                            (newSections.whyUs as any).items[index] = { ...item, title: e.target.value };
                            handleChange('sections', newSections as any);
                          }} className="w-full px-3 py-2 text-sm mb-3 border border-slate-300 rounded-lg" />
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Diferencial {index + 1} - Descrição</label>
                          <textarea rows={3} value={item.desc} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.whyUs) newSections.whyUs = { items: [] } as any;
                            if (!(newSections.whyUs as any).items) (newSections.whyUs as any).items = [];
                            (newSections.whyUs as any).items[index] = { ...item, desc: e.target.value };
                            handleChange('sections', newSections as any);
                          }} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* HOW IT WORKS SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Processo
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">
                      Como Funciona
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Principal</label>
                    <textarea rows={2} value={formData.sections?.howItWorks?.title || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.howItWorks) newSections.howItWorks = {} as any; newSections.howItWorks.title = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo</label>
                    <textarea rows={2} value={formData.sections?.howItWorks?.subtitle || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.howItWorks) newSections.howItWorks = {} as any; newSections.howItWorks.subtitle = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Botão (CTA)</label>
                    <input type="text" value={(formData.sections?.howItWorks as any)?.cta || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.howItWorks) newSections.howItWorks = {} as any; (newSections.howItWorks as any).cta = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  
                  {/* Items do How It Works */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[0, 1, 2].map(index => {
                      const item = (formData.sections?.howItWorks as any)?.items?.[index] || { title: '', desc: '' };
                      return (
                        <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Passo {index + 1} - Título</label>
                          <input type="text" value={item.title} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.howItWorks) newSections.howItWorks = { items: [] } as any;
                            if (!(newSections.howItWorks as any).items) (newSections.howItWorks as any).items = [];
                            (newSections.howItWorks as any).items[index] = { ...item, title: e.target.value };
                            handleChange('sections', newSections as any);
                          }} className="w-full px-3 py-2 text-sm mb-3 border border-slate-300 rounded-lg" />
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Passo {index + 1} - Descrição</label>
                          <textarea rows={4} value={item.desc} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.howItWorks) newSections.howItWorks = { items: [] } as any;
                            if (!(newSections.howItWorks as any).items) (newSections.howItWorks as any).items = [];
                            (newSections.howItWorks as any).items[index] = { ...item, desc: e.target.value };
                            handleChange('sections', newSections as any);
                          }} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg" />
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* DEMASIADAS SEÇÕES VIA DYNAMIC EDITOR */}
                <DynamicSectionEditor
                  sectionKey="commitments"
                  label="Compromissos / Garantias"
                  sectionData={formData.sections?.commitments}
                  onChange={(data) => handleChange('sections', { ...formData.sections, commitments: data } as any)}
                />
                
                <DynamicSectionEditor
                  sectionKey="coverage"
                  label="Regiões Atendidas"
                  sectionData={formData.sections?.coverage}
                  onChange={(data) => handleChange('sections', { ...formData.sections, coverage: data } as any)}
                />

                <DynamicSectionEditor
                  sectionKey="faq"
                  label="Dúvidas Frequentes"
                  sectionData={formData.sections?.faq}
                  onChange={(data) => handleChange('sections', { ...formData.sections, faq: data } as any)}
                />

                <DynamicSectionEditor
                  sectionKey="homeLead"
                  label="Formulário de Contato (Vistoria)"
                  sectionData={formData.sections?.homeLead}
                  onChange={(data) => handleChange('sections', { ...formData.sections, homeLead: data } as any)}
                />

                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada Final (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3">
              {savedSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Salvo com sucesso!</span>
                </div>
              )}
              <button
                type="submit"
                className={`${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'} text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 text-sm cursor-pointer w-full sm:w-auto`}
              >
                <Save className="w-4 h-4 shrink-0" />
                <span>{savedSuccess ? 'Salvo!' : 'Salvar Conteúdo da Página'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
