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
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';
import { HomeServiceCardsEditor } from '../../components/admin/HomeServiceCardsEditor';

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

  React.useEffect(() => {
    if (pages[selectedKey]) {
      setFormData({
        ...pages[selectedKey],
      });
    }
  }, [pages, selectedKey]);

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
            {/* Selo Superior Hero */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Selo Superior da Seção Hero (Badge)
              </label>
              <textarea
                rows={2}
                value={formData.hero_badge || ''}
                onChange={e => handleChange('hero_badge', e.target.value)}
                placeholder="Ex: Especialistas em Aquecedores e Pressurizadores"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

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
            {!['sobre', 'diferenciais', 'como-funciona', 'duvidas'].includes(selectedKey) && (
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
            )}
            <div className="flex justify-end mt-4">
              <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Textos Principais'}
</button>
            </div>
            {/* Alerta de Segurança (Apenas Aquecedor a Gás) */}
            {selectedKey === 'aquecedor-a-gas' && (
              <div>
                <label className="block text-xs font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                  Alerta de Segurança (Aviso Laranja)
                </label>
                <textarea
                  rows={3}
                  value={formData.sections?.safetyAlert_text || ''}
                  onChange={e => {
                    const newSections = { ...formData.sections };
                    (newSections as any).safetyAlert_text = e.target.value;
                    handleChange('sections', newSections as any);
                  }}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold bg-amber-50 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  placeholder="Deixe em branco para ocultar o alerta."
                />
              </div>
            )}

             {/* EDIÇÃO DE SEÇÕES DE LANDING PAGE */}
            {['pressurizador', 'aquecedor-a-gas', 'aquecedor-solar', 'aquecedor-eletrico'].includes(selectedKey) && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-4">

                <DynamicSectionEditor
                  sectionKey="symptoms"
                  label="Dores e Sintomas (Algum desses está acontecendo?)"
                  sectionData={formData.sections?.symptoms}
                  onChange={(data) => handleChange('sections', { ...formData.sections, symptoms: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Sintomas'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="whatWeDo"
                  label="Serviços (O que fazemos por você)"
                  sectionData={formData.sections?.whatWeDo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whatWeDo: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Serviços'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="whyUs"
                  label="Diferenciais"
                  sectionData={formData.sections?.whyUs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whyUs: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Diferenciais'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="processo"
                  label="Como Funciona (Passo a Passo)"
                  sectionData={formData.sections?.processo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, processo: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Como Funciona'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="leadSection"
                  label="Formulário de Agendamento (Lead Section)"
                  sectionData={formData.sections?.leadSection}
                  onChange={(data) => handleChange('sections', { ...formData.sections, leadSection: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Formulário Lead'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="objections"
                  label="Objeções Respondidas"
                  sectionData={formData.sections?.objections}
                  onChange={(data) => handleChange('sections', { ...formData.sections, objections: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Objeções'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="faqs"
                  label="Perguntas Frequentes da LP"
                  sectionData={formData.sections?.faqs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, faqs: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4 border-b border-slate-100">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Perguntas Frequentes'}
</button>
                </div>

                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada para Ação (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />
                <div className="flex justify-center sm:justify-end pb-4">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar CTA Final'}
</button>
                </div>

              </div>
            )}

            {/* IMAGENS DA LANDING PAGE */}
            {['pressurizador', 'aquecedor-a-gas', 'aquecedor-solar', 'aquecedor-eletrico'].includes(selectedKey) && (() => {
              const lpImageLabels: Record<string, { label: string; hint: string }> = {
                pressurizador: { label: 'Foto do Pressurizador (Hero)', hint: 'Foto do produto principal exibida na página. Ideal: foto real do pressurizador instalado.' },
                'aquecedor-a-gas': { label: 'Foto do Aquecedor a Gás (Hero)', hint: 'Foto do produto principal. Ideal: aquecedor a gás instalado na parede.' },
                'aquecedor-solar': { label: 'Foto do Aquecedor Solar (Hero)', hint: 'Foto do produto principal. Ideal: placas solares instaladas no telhado.' },
                'aquecedor-eletrico': { label: 'Foto do Aquecedor Elétrico (Hero)', hint: 'Foto do produto principal. Ideal: boiler ou aquecedor elétrico instalado.' },
              };
              const lpInfo = lpImageLabels[selectedKey] || { label: 'Foto do Produto (Hero)', hint: 'Foto exibida na seção principal da página.' };
              const val = (formData.sections?.image_url as any) || '';
              const bgVal = (formData.sections?.bg_image as any) || '';
              return (
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Landing Page</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Foto do Serviço e Imagem de Fundo CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Defina a foto principal do produto e a imagem de fundo do botão de conversão no rodapé.</p>
                  </div>

                  {/* Foto do Produto (Hero) */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">{lpInfo.label}</label>
                      {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                    </div>
                    <p className="text-[10px] text-slate-400">{lpInfo.hint}</p>
                    {val && <img src={val} alt="Foto do produto" className="w-full h-40 object-cover rounded-lg border border-slate-200" onError={e => (e.currentTarget.style.display = 'none')} />}
                    <div className="flex gap-2 items-end">
                      <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; (s as any).image_url = e.target.value; handleChange('sections', s as any); }} placeholder="/images/pressurizador.jpg ou URL externa" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                      <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; (s as any).image_url = url; handleChange('sections', s as any); }} />
                    </div>
                  </div>

                  {/* Foto de Fundo CTA */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Foto de Fundo (Seção CTA Final)</label>
                      {bgVal && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                    </div>
                    <p className="text-[10px] text-slate-400">Imagem de fundo da última seção de conversão da página. Recomendado: foto técnica 1920×1080px.</p>
                    {bgVal && <img src={bgVal} alt="CTA Background" className="w-full h-24 object-cover rounded-lg border border-slate-200" onError={e => (e.currentTarget.style.display = 'none')} />}
                    <div className="flex gap-2 items-end">
                      <input type="text" value={bgVal} onChange={e => { const s = { ...formData.sections }; (s as any).bg_image = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                      <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; (s as any).bg_image = url; handleChange('sections', s as any); }} />
                    </div>
                  </div>
                </div>
              );
            })()}


            {/* Edição de Seções Adicionais (Home) */}
            {selectedKey === 'home' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                {/* SERVICES SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Grade de Serviços
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">
                      Textos da Chamada de Serviços (Home)
                    </h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título da Seção</label>
                    <input type="text" value={(formData.sections?.services as any)?.title || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.services) newSections.services = {} as any; (newSections.services as any).title = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nossos Serviços Especializados" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo / Descrição Curta</label>
                    <textarea rows={2} value={(formData.sections?.services as any)?.subtitle || ''} onChange={e => { const newSections = { ...formData.sections }; if (!newSections.services) newSections.services = {} as any; (newSections.services as any).subtitle = e.target.value; handleChange('sections', newSections as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Diagnóstico de precisão, peças originais e garantia por escrito em São Paulo..." />
                  </div>
                  
                  <HomeServiceCardsEditor />
                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Serviços'}
</button>
                  </div>
</div>

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
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Itens de Destaque (Checkmarks)</label>
                    <div className="space-y-3">
                      {((formData.sections?.about as any)?.items || [
                        { title: 'Técnicos identificados e qualificados' },
                        { title: 'Empresa com endereço e CNPJ ativo' },
                        { title: 'Instalações em conformidade com as normas ABNT' },
                        { title: 'Pós-atendimento com suporte prioritário' }
                      ]).map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <textarea rows={2} value={item.title} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.about) newSections.about = {} as any;
                            const newItems = [...((newSections.about as any).items || [])];
                            newItems[idx] = { ...newItems[idx], title: e.target.value };
                            (newSections.about as any).items = newItems;
                            handleChange('sections', newSections as any);
                          }} placeholder="Texto do item" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl resize-none" />
                          <button type="button" onClick={() => {
                            const newSections = { ...formData.sections };
                            if (!newSections.about) newSections.about = {} as any;
                            const newItems = [...((newSections.about as any).items || [])].filter((_, i) => i !== idx);
                            (newSections.about as any).items = newItems;
                            handleChange('sections', newSections as any);
                          }} className="px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-medium text-sm">
                            Remover
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => {
                        const newSections = { ...formData.sections };
                        if (!newSections.about) newSections.about = {} as any;
                        const currentItems = (newSections.about as any).items || [];
                        (newSections.about as any).items = [...currentItems, { title: '' }];
                        handleChange('sections', newSections as any);
                      }} className="text-sm font-bold text-primary hover:text-primary-dark">
                        + Adicionar Item
                      </button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">Card Técnico Escuro (Padrão Operacional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Superior do Card</label>
                        <input type="text" value={(formData.sections?.about as any)?.card?.title || 'Padrão Operacional'} onChange={e => {
                          const newSections = { ...formData.sections };
                          if (!newSections.about) newSections.about = {} as any;
                          if (!(newSections.about as any).card) (newSections.about as any).card = {};
                          (newSections.about as any).card.title = e.target.value;
                          handleChange('sections', newSections as any);
                        }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Selo/Badge Superior (Deixe vazio p/ ocultar)</label>
                        <input type="text" value={(formData.sections?.about as any)?.card?.badge || 'Garantia Ativa'} onChange={e => {
                          const newSections = { ...formData.sections };
                          if (!newSections.about) newSections.about = {} as any;
                          if (!(newSections.about as any).card) (newSections.about as any).card = {};
                          (newSections.about as any).card.badge = e.target.value;
                          handleChange('sections', newSections as any);
                        }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">Itens do Card (Máximo 3 recomendados)</label>
                      {((formData.sections?.about as any)?.card?.items || [
                        { title: 'Ofício de Campo Especializado', desc: 'Conhecimento profundo das principais marcas: Rowa, Komeco, Grundfos, Rheem e Rinnai.' },
                        { title: 'Resolução no Primeiro Atendimento', desc: 'Diagnóstico exato e troca de componentes no mesmo local sempre que possível.' },
                        { title: 'Compromisso de Pós-Venda', desc: 'Não sumimos após o pagamento. Qualquer retorno é tratado com máxima prioridade.' }
                      ]).map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                          <button type="button" onClick={() => {
                            const newSections = { ...formData.sections };
                            const newCardItems = [...((newSections.about as any).card.items)].filter((_, i) => i !== idx);
                            (newSections.about as any).card.items = newCardItems;
                            handleChange('sections', newSections as any);
                          }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            Remover
                          </button>
                          <div className="space-y-3 pr-8">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Título do Item</label>
                              <textarea rows={2} value={item.title} onChange={e => {
                                const newSections = { ...formData.sections };
                                if (!newSections.about) newSections.about = {} as any;
                                if (!(newSections.about as any).card) (newSections.about as any).card = { items: [] };
                                const newItems = [...((newSections.about as any).card.items)];
                                newItems[idx] = { ...newItems[idx], title: e.target.value };
                                (newSections.about as any).card.items = newItems;
                                handleChange('sections', newSections as any);
                              }} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl resize-none" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Descrição</label>
                              <textarea rows={2} value={item.desc} onChange={e => {
                                const newSections = { ...formData.sections };
                                if (!newSections.about) newSections.about = {} as any;
                                if (!(newSections.about as any).card) (newSections.about as any).card = { items: [] };
                                const newItems = [...((newSections.about as any).card.items)];
                                newItems[idx] = { ...newItems[idx], desc: e.target.value };
                                (newSections.about as any).card.items = newItems;
                                handleChange('sections', newSections as any);
                              }} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl resize-none" />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={() => {
                        const newSections = { ...formData.sections };
                        if (!newSections.about) newSections.about = {} as any;
                        if (!(newSections.about as any).card) (newSections.about as any).card = { items: [] };
                        const currentItems = (newSections.about as any).card.items || [];
                        (newSections.about as any).card.items = [...currentItems, { title: '', desc: '' }];
                        handleChange('sections', newSections as any);
                      }} className="text-sm font-bold text-primary hover:text-primary-dark">
                        + Adicionar Item no Card
                      </button>
                    </div>

                    <div className="mt-4">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Rodapé do Card</label>
                      <input type="text" value={(formData.sections?.about as any)?.card?.footer_text || 'Grande São Paulo e Capital • Atendimento Rápido'} onChange={e => {
                        const newSections = { ...formData.sections };
                        if (!newSections.about) newSections.about = {} as any;
                        if (!(newSections.about as any).card) (newSections.about as any).card = {};
                        (newSections.about as any).card.footer_text = e.target.value;
                        handleChange('sections', newSections as any);
                      }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                    </div>
                  </div>
                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Quem Somos'}
</button>
                  </div>
</div>

                                <div className="pt-6 border-t border-slate-200">
{/* WHY US SECTION */}
                <DynamicSectionEditor
                  sectionKey="whyUs"
                  label="Diferenciais (Por que escolher a Pressurize Prime?)"
                  sectionData={formData.sections?.whyUs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whyUs: data } as any)}
                />

                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Diferenciais'}
</button>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200">
{/* HOW IT WORKS SECTION */}
                <DynamicSectionEditor
                  sectionKey="howItWorks"
                  label="Processo (Como Funciona)"
                  sectionData={formData.sections?.howItWorks}
                  onChange={(data) => handleChange('sections', { ...formData.sections, howItWorks: data } as any)}
                />

                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Processo'}
</button>
                  </div>
                </div>
{/* COVERAGE SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Regiões Atendidas
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Cobertura geográfica de atendimento</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título da Seção</label>
                    <textarea rows={2} value={(formData.sections?.coverage as any)?.title || ''} onChange={e => { const s = { ...formData.sections }; if (!s.coverage) s.coverage = {} as any; (s.coverage as any).title = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Regiões Atendidas em São Paulo" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo / Descrição</label>
                    <textarea rows={3} value={(formData.sections?.coverage as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.coverage) s.coverage = {} as any; (s.coverage as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nossos técnicos atuam com rotas diárias otimizadas..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Badge / Nota de Atendimento Prioritário</label>
                    <input type="text" value={(formData.sections?.coverage as any)?.badge || ''} onChange={e => { const s = { ...formData.sections }; if (!s.coverage) s.coverage = {} as any; (s.coverage as any).badge = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Atendimento prioritário em condomínios e residências de médio e alto padrão" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bairros e Municípios (Locais de Atendimento)</label>
                    <div className="space-y-3">
                      {((formData.sections?.coverage as any)?.locations || []).map((loc: string, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <input type="text" value={loc} onChange={e => {
                            const newSections = { ...formData.sections };
                            if (!newSections.coverage) newSections.coverage = {} as any;
                            const newLocations = [...((newSections.coverage as any).locations || [])];
                            newLocations[idx] = e.target.value;
                            (newSections.coverage as any).locations = newLocations;
                            handleChange('sections', newSections as any);
                          }} placeholder="Ex: São Paulo" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                          <button type="button" onClick={() => {
                            const newSections = { ...formData.sections };
                            if (!newSections.coverage) newSections.coverage = {} as any;
                            const newLocations = [...((newSections.coverage as any).locations || [])].filter((_, i) => i !== idx);
                            (newSections.coverage as any).locations = newLocations;
                            handleChange('sections', newSections as any);
                          }} className="px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-medium text-sm">
                            Remover
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => {
                        const newSections = { ...formData.sections };
                        if (!newSections.coverage) newSections.coverage = {} as any;
                        const currentLocations = (newSections.coverage as any).locations || [
                          'São Paulo', 'Barueri (Alphaville)', 'Santana de Parnaíba',
                          'Cotia (Granja Viana)', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul'
                        ];
                        (newSections.coverage as any).locations = [...currentLocations, ''];
                        handleChange('sections', newSections as any);
                      }} className="text-sm font-bold text-primary hover:text-primary-dark">
                        {((formData.sections?.coverage as any)?.locations?.length > 0) ? '+ Adicionar Local' : '+ Inicializar Lista de Locais'}
                      </button>
                    </div>
                  </div>
                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Regiões'}
</button>
                  </div>
</div>

                                <div className="pt-6 border-t border-slate-200">
{/* COMMITMENTS SECTION */}
                <DynamicSectionEditor
                  sectionKey="commitments"
                  label="Nossos Compromissos e Garantias"
                  sectionData={formData.sections?.commitments}
                  onChange={(data) => handleChange('sections', { ...formData.sections, commitments: data } as any)}
                />

                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Compromissos'}
</button>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200">
{/* FAQ SECTION */}
                <div className="space-y-6 ">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Dúvidas Frequentes
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Gerencie as perguntas que aparecem na Home</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título do FAQ</label>
                    <textarea rows={2} value={(formData.sections?.faq as any)?.title || ''} onChange={e => { const s = { ...formData.sections }; if (!s.faq) s.faq = {} as any; (s.faq as any).title = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Perguntas Frequentes" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo do FAQ</label>
                    <textarea rows={2} value={(formData.sections?.faq as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.faq) s.faq = {} as any; (s.faq as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Respostas diretas e transparentes sobre nosso atendimento em São Paulo." />
                  </div>
                  <DynamicSectionEditor
                    sectionKey="faqItems"
                    label="Lista de Perguntas (Se deixado vazio, usará a lista global)"
                    sectionData={(formData.sections?.faq as any)?.items || []}
                    onChange={(data) => {
                      const s = { ...formData.sections };
                      if (!s.faq) s.faq = {} as any;
                      (s.faq as any).items = data;
                      handleChange('sections', s as any);
                    }}
                  />
                </div>

                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Dúvidas'}
</button>
                  </div>
                </div>
{/* HOME LEAD SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Formulário de Contato (Vistoria)
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Textos da seção de captação de leads</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Principal (Lado Esquerdo e Formulário)</label>
                    <textarea rows={2} value={(formData.sections?.homeLead as any)?.title || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).title = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Problema no pressurizador ou aquecedor? Fale com quem entende." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Selo Superior do Formulário</label>
                    <input type="text" value={(formData.sections?.homeLead as any)?.badgeText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).badgeText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Diagnóstico sem compromisso" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo / Argumento (Lado Esquerdo e Formulário)</label>
                    <textarea rows={3} value={(formData.sections?.homeLead as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Evite técnicos amadores ou soluções provisórias..." />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Campos do Formulário</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rótulo: Nome Completo</label>
                        <input type="text" value={(formData.sections?.homeLead as any)?.nameLabel || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).nameLabel = e.target.value; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" placeholder="Seu Nome Completo *" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rótulo: WhatsApp / Celular</label>
                        <input type="text" value={(formData.sections?.homeLead as any)?.whatsappLabel || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).whatsappLabel = e.target.value; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" placeholder="WhatsApp / Celular *" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rótulo: Serviço</label>
                        <input type="text" value={(formData.sections?.homeLead as any)?.serviceLabel || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).serviceLabel = e.target.value; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" placeholder="Tipo de Equipamento / Serviço" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Opção Padrão (Placeholder Serviço)</label>
                        <input type="text" value={(formData.sections?.homeLead as any)?.servicePlaceholder || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).servicePlaceholder = e.target.value; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" placeholder="Selecione o equipamento (ou geral)" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Destaque 1', defTitle: 'Vistoria sem custo na aprovação', defDesc: 'O valor da visita é 100% abatido quando você aprova o conserto ou a instalação conosco.' },
                      { label: 'Destaque 2', defTitle: 'Agilidade em até 24 horas', defDesc: 'Sabemos que banho frio ou falta de água não podem esperar. Agendamos seu atendimento com urgência.' },
                      { label: 'Destaque 3', defTitle: 'Até 10x sem juros no cartão', defDesc: 'Condições facilitadas de pagamento para consertos, peças originais e equipamentos novos.' },
                      { label: 'Destaque 4', defTitle: 'Cobertura em toda a Grande São Paulo', defDesc: 'Técnicos equipados com ferramentas e peças de reposição frequentes nos principais bairros.' },
                    ].map((c, idx) => {
                      const item = (formData.sections?.homeLead as any)?.items?.[idx] || { title: c.defTitle, desc: c.defDesc };
                      return (
                        <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">{c.label} — Título</label>
                          <textarea rows={2} value={item.title} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; if (!(s.homeLead as any).items) (s.homeLead as any).items = []; (s.homeLead as any).items[idx] = { ...item, title: e.target.value }; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm mb-3 border border-slate-300 rounded-lg resize-none" />
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">{c.label} — Descrição</label>
                          <textarea rows={3} value={item.desc} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; if (!(s.homeLead as any).items) (s.homeLead as any).items = []; (s.homeLead as any).items[idx] = { ...item, desc: e.target.value }; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg resize-none" />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Botão Principal</label>
                    <input type="text" value={(formData.sections?.homeLead as any)?.buttonText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).buttonText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Solicitar Orçamento Gratuito" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Aviso de Privacidade / Segurança (Rodapé do formulário)</label>
                    <input type="text" value={(formData.sections?.homeLead as any)?.securityText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).securityText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Seus dados estão seguros e serão utilizados exclusivamente..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título do Aviso (Fora do Horário)</label>
                      <input type="text" value={(formData.sections?.homeLead as any)?.outOfHoursTitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).outOfHoursTitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Fora do horário de expediente comercial:" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Aviso (Fora do Horário)</label>
                      <textarea rows={3} value={(formData.sections?.homeLead as any)?.outOfHoursText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).outOfHoursText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nosso atendimento presencial e telefônico opera..." />
                    </div>
                  </div>
                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Formulário'}
</button>
                  </div>
</div>

                {/* FINAL CTA SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Chamada Final (CTA de Urgência)
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Textos da seção de urgência no rodapé da Home</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Principal (Frase de Urgência)</label>
                    <textarea rows={2} value={(formData.sections?.finalCta as any)?.title || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).title = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Chuveiro fraco ou água fria não esperam. Nem a gente." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo / Reforço de Conversão</label>
                    <textarea rows={3} value={(formData.sections?.finalCta as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Fale agora com um técnico. Atendimento de segunda a sexta, das 8h às 19h..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rótulo do Botão Principal (WhatsApp)</label>
                    <input type="text" value={(formData.sections?.finalCta as any)?.cta || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).cta = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Chamar no WhatsApp" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rótulo do Botão Secundário (Telefone)</label>
                    <input type="text" value={(formData.sections?.finalCta as any)?.btnPhone || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).btnPhone = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ligar agora" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Aviso Fora do Horário Comercial</label>
                    <input type="text" value={(formData.sections?.finalCta as any)?.outOfHoursText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).outOfHoursText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Fora do horário comercial no momento..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Link Alternativo (Formulário)</label>
                    <input type="text" value={(formData.sections?.finalCta as any)?.linkText || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).linkText = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Prefere que entremos em contato? Solicite orçamento..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Selo Inferior Esquerdo</label>
                      <input type="text" value={(formData.sections?.finalCta as any)?.badge1 || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).badge1 = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Diagnóstico sem compromisso" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Selo Inferior Direito</label>
                      <input type="text" value={(formData.sections?.finalCta as any)?.badge2 || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).badge2 = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Garantia de 3 meses em peças" />
                    </div>
                  </div>
                </div>
                {/* IMAGEM DE FUNDO — CHAMADA FINAL CTA */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">Imagem de Fundo</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Foto de fundo da seção Chamada Final (CTA)</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Usada como plano de fundo na seção de urgência ao final da Home. Recomendado: foto técnica 1920×1080px.</p>
                  </div>
                  {(formData.sections?.finalCta as any)?.bgImage && (
                    <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img src={(formData.sections?.finalCta as any)?.bgImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                        <span className="text-white text-xs font-bold bg-black/40 px-2 py-1 rounded">Imagem atual</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">URL da Imagem</label>
                      <input type="text" value={(formData.sections?.finalCta as any)?.bgImage || ''} onChange={e => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).bgImage = e.target.value; handleChange('sections', s as any); }} placeholder="https://... ou base64" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl" />
                    </div>
                    <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.finalCta) s.finalCta = {} as any; (s.finalCta as any).bgImage = url; handleChange('sections', s as any); }} />
                  </div>
                
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Rodapé'}
</button>
                  </div>
</div>
              </div>
            )}

            {selectedKey === 'sobre' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="historia"
                    label="História e Diferenciais (Quem Somos)"
                    sectionData={formData.sections?.historia}
                    onChange={(data) => handleChange('sections', { ...formData.sections, historia: data } as any)}
                  />
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar História'}
</button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="proposito"
                    label="Missão, Visão e Valores"
                    sectionData={formData.sections?.proposito}
                    onChange={(data) => handleChange('sections', { ...formData.sections, proposito: data } as any)}
                  />
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Propósito'}
</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="numeros"
                    label="Estatísticas e Números"
                    sectionData={formData.sections?.numeros}
                    onChange={(data) => handleChange('sections', { ...formData.sections, numeros: data } as any)}
                  />
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Números'}
</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="finalCta"
                    label="Chamada para Ação Final (Rodapé da Página)"
                    sectionData={formData.sections?.finalCta}
                    onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                  />
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Chamada Final'}
</button>
                  </div>
                </div>

                {/* IMAGENS DA PÁGINA SOBRE */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Fotos do Hero (carrossel) e CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">3 imagens que rodam no banner da página + 1 foto de fundo do botão de contato. Recomendado: 1920×1080px.</p>
                  </div>
                  {(['hero1','hero2','hero3','cta'] as const).map((key, idx) => {
                    const labels = ['Hero Foto 1', 'Hero Foto 2', 'Hero Foto 3', 'Foto de Fundo CTA'];
                    const val = (formData.sections?.images as any)?.[key] || '';
                    return (
                      <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">{labels[idx]}</label>
                          {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                        </div>
                        {val && <img src={val} alt={labels[idx]} className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                        <div className="flex gap-2 items-end">
                          <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                          <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = url; handleChange('sections', s as any); }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Imagens'}
</button>
                  </div>
                </div>
              </div>
            )}

            {selectedKey === 'diferenciais' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="diferenciais"
                  label="Diferenciais em Destaque"
                  sectionData={formData.sections?.diferenciais}
                  onChange={(data) => handleChange('sections', { ...formData.sections, diferenciais: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="comparativo"
                  label="Tabela Comparativa"
                  sectionData={formData.sections?.comparativo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, comparativo: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="depoimentos"
                  label="Depoimentos de Clientes"
                  sectionData={formData.sections?.depoimentos}
                  onChange={(data) => handleChange('sections', { ...formData.sections, depoimentos: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada para Ação (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />


                <div className="flex justify-center sm:justify-end pt-4 mt-6">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Diferenciais'}
</button>
                </div>

                {/* IMAGENS DA PÁGINA DIFERENCIAIS */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Fotos do Hero (carrossel) e CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Recomendado: 1920×1080px. Fotos aparecem no banner e na seção de contato final.</p>
                  </div>
                  {(['hero1','hero2','hero3','cta'] as const).map((key, idx) => {
                    const labels = ['Hero Foto 1', 'Hero Foto 2', 'Hero Foto 3', 'Foto de Fundo CTA'];
                    const val = (formData.sections?.images as any)?.[key] || '';
                    return (
                      <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">{labels[idx]}</label>
                          {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                        </div>
                        {val && <img src={val} alt={labels[idx]} className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                        <div className="flex gap-2 items-end">
                          <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                          <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = url; handleChange('sections', s as any); }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center sm:justify-end pt-4 mt-4">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Imagens'}
</button>
                  </div>
                </div>
              </div>
            )}

            {selectedKey === 'como-funciona' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="processo"
                  label="Etapas do Processo"
                  sectionData={formData.sections?.processo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, processo: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="regioes"
                  label="Regiões Atendidas"
                  sectionData={formData.sections?.regioes}
                  onChange={(data) => handleChange('sections', { ...formData.sections, regioes: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="compromissos"
                  label="Nossos Compromissos"
                  sectionData={formData.sections?.compromissos}
                  onChange={(data) => handleChange('sections', { ...formData.sections, compromissos: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada para Ação (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />


                <div className="flex justify-center sm:justify-end pt-4 mt-6">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Como Funciona'}
</button>
                </div>

                {/* IMAGENS DA PÁGINA COMO FUNCIONA */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Fotos do Hero (carrossel) e CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Recomendado: 1920×1080px.</p>
                  </div>
                  {(['hero1','hero2','hero3','cta'] as const).map((key, idx) => {
                    const labels = ['Hero Foto 1', 'Hero Foto 2', 'Hero Foto 3', 'Foto de Fundo CTA'];
                    const val = (formData.sections?.images as any)?.[key] || '';
                    return (
                      <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">{labels[idx]}</label>
                          {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                        </div>
                        {val && <img src={val} alt={labels[idx]} className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                        <div className="flex gap-2 items-end">
                          <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                          <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = url; handleChange('sections', s as any); }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center sm:justify-end pt-4 mt-4">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Imagens'}
</button>
                  </div>
                </div>
              </div>
            )}

            {selectedKey === 'duvidas' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="duvidas"
                  label="Perguntas e Respostas"
                  sectionData={formData.sections?.duvidas}
                  onChange={(data) => handleChange('sections', { ...formData.sections, duvidas: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada para Ação (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />


                <div className="flex justify-center sm:justify-end pt-4 mt-6">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Dúvidas'}
</button>
                </div>

                {/* IMAGENS DA PÁGINA DÚVIDAS */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Fotos do Hero (carrossel) e CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Recomendado: 1920×1080px.</p>
                  </div>
                  {(['hero1','hero2','hero3','cta'] as const).map((key, idx) => {
                    const labels = ['Hero Foto 1', 'Hero Foto 2', 'Hero Foto 3', 'Foto de Fundo CTA'];
                    const val = (formData.sections?.images as any)?.[key] || '';
                    return (
                      <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">{labels[idx]}</label>
                          {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                        </div>
                        {val && <img src={val} alt={labels[idx]} className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                        <div className="flex gap-2 items-end">
                          <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                          <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = url; handleChange('sections', s as any); }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center sm:justify-end pt-4 mt-4">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Imagens'}
</button>
                  </div>
                </div>
              </div>
            )}

            {['pressurizador', 'aquecedor-a-gas', 'aquecedor-solar', 'aquecedor-eletrico'].includes(selectedKey) && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                
                <DynamicSectionEditor
                  sectionKey="heroOverlay"
                  label="Textos Sobrepostos na Imagem Principal"
                  sectionData={formData.sections?.heroOverlay || { title: '', subtitle: '', badge: '' }}
                  onChange={(data) => handleChange('sections', { ...formData.sections, heroOverlay: data } as any)}
                />

                <DynamicSectionEditor
                  sectionKey="trustBadges"
                  label="Faixa de Confiança (4 Cards Abaixo do Hero)"
                  sectionData={formData.sections?.trustBadges || { title: '', items: [{ title: '', desc: '' }] }}
                  onChange={(data) => handleChange('sections', { ...formData.sections, trustBadges: data } as any)}
                />

                <div className="flex justify-center sm:justify-end pt-4">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Textos do Hero'}
</button>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">📝 Formulário de Orçamento (Lead) e Textos Auxiliares</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Selo Superior do Formulário (Badge)</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
                        value={formData.sections?.leadSectionBadge || ''}
                        onChange={e => handleChange('sections', { ...formData.sections, leadSectionBadge: e.target.value } as any)}
                        placeholder="Ex: Diagnóstico Rápido e Seguro" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Link do Formulário</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
                        value={formData.sections?.ctaFormLink || ''}
                        onChange={e => handleChange('sections', { ...formData.sections, ctaFormLink: e.target.value } as any)}
                        placeholder="Ex: Prefere que entremos em contato? ..." />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Marcas Atendidas</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
                        value={formData.sections?.brandsText || ''}
                        onChange={e => handleChange('sections', { ...formData.sections, brandsText: e.target.value } as any)}
                        placeholder="Ex: Marcas Atendidas: Rowa, Komeco..." />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Selo de Garantia 1 (Esquerda)</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
                        value={formData.sections?.ctaGuarantee1 || ''}
                        onChange={e => handleChange('sections', { ...formData.sections, ctaGuarantee1: e.target.value } as any)}
                        placeholder="Ex: Orçamento antes do início" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Selo de Garantia 2 (Direita)</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm"
                        value={formData.sections?.ctaGuarantee2 || ''}
                        onChange={e => handleChange('sections', { ...formData.sections, ctaGuarantee2: e.target.value } as any)}
                        placeholder="Ex: Garantia de 3 meses em peças" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center sm:justify-end pt-4">
                  <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Formulário e Selos'}
</button>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página de Captura</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Imagens em Destaque</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">A Imagem de Fundo aparece atrás dos textos principais. A Imagem Destaque (se houver) aparece ao lado.</p>
                  </div>
                  
                  {/* bg_image */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Foto de Fundo (Background)</label>
                      {formData.sections?.bg_image && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                    </div>
                    {formData.sections?.bg_image && <img src={formData.sections.bg_image} alt="Background" className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                    <div className="flex gap-2 items-end">
                      <input type="text" value={formData.sections?.bg_image || ''} onChange={e => handleChange('sections', { ...formData.sections, bg_image: e.target.value } as any)} className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                      <ImageUploadButton buttonText="Upload" onUpload={(url) => handleChange('sections', { ...formData.sections, bg_image: url } as any)} />
                    </div>
                  </div>

                  {/* image_url */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-slate-700 uppercase">Foto do Equipamento (Destaque)</label>
                      {formData.sections?.image_url && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                    </div>
                    {formData.sections?.image_url && <img src={formData.sections.image_url} alt="Equipamento" className="w-full h-20 object-cover rounded-lg border border-slate-200" />}
                    <div className="flex gap-2 items-end">
                      <input type="text" value={formData.sections?.image_url || ''} onChange={e => handleChange('sections', { ...formData.sections, image_url: e.target.value } as any)} className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                      <ImageUploadButton buttonText="Upload" onUpload={(url) => handleChange('sections', { ...formData.sections, image_url: url } as any)} />
                    </div>
                  </div>

                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
  {savedSuccess ? 'Salvo!' : 'Salvar Imagens'}
</button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
