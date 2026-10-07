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
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="symptoms"
                  label="Dores e Sintomas (Algum desses está acontecendo?)"
                  sectionData={formData.sections?.symptoms}
                  onChange={(data) => handleChange('sections', { ...formData.sections, symptoms: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="whatWeDo"
                  label="Serviços (O que fazemos por você)"
                  sectionData={formData.sections?.whatWeDo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whatWeDo: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="whyUs"
                  label="Diferenciais"
                  sectionData={formData.sections?.whyUs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whyUs: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="processo"
                  label="Como Funciona (Passo a Passo)"
                  sectionData={formData.sections?.processo}
                  onChange={(data) => handleChange('sections', { ...formData.sections, processo: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="leadSection"
                  label="Formulário de Agendamento (Lead Section)"
                  sectionData={formData.sections?.leadSection}
                  onChange={(data) => handleChange('sections', { ...formData.sections, leadSection: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="objections"
                  label="Objeções Respondidas"
                  sectionData={formData.sections?.objections}
                  onChange={(data) => handleChange('sections', { ...formData.sections, objections: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="faqs"
                  label="Perguntas Frequentes da LP"
                  sectionData={formData.sections?.faqs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, faqs: data } as any)}
                />
                <DynamicSectionEditor
                  sectionKey="finalCta"
                  label="Chamada para Ação (Rodapé)"
                  sectionData={formData.sections?.finalCta}
                  onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                />
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
                <DynamicSectionEditor
                  sectionKey="whyUs"
                  label="Diferenciais (Por que escolher a Pressurize Prime?)"
                  sectionData={formData.sections?.whyUs}
                  onChange={(data) => handleChange('sections', { ...formData.sections, whyUs: data } as any)}
                />

                {/* HOW IT WORKS SECTION */}
                <DynamicSectionEditor
                  sectionKey="howItWorks"
                  label="Processo (Como Funciona)"
                  sectionData={formData.sections?.howItWorks}
                  onChange={(data) => handleChange('sections', { ...formData.sections, howItWorks: data } as any)}
                />

                {/* COMMITMENTS SECTION */}
                <DynamicSectionEditor
                  sectionKey="commitments"
                  label="Nossos Compromissos e Garantias"
                  sectionData={formData.sections?.commitments}
                  onChange={(data) => handleChange('sections', { ...formData.sections, commitments: data } as any)}
                />

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
                </div>

                {/* FAQ SECTION */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      Seção: Dúvidas Frequentes
                    </span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Título e subtítulo do FAQ (as perguntas são gerenciadas na área de Serviços)</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título do FAQ</label>
                    <textarea rows={2} value={(formData.sections?.faq as any)?.title || ''} onChange={e => { const s = { ...formData.sections }; if (!s.faq) s.faq = {} as any; (s.faq as any).title = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Perguntas Frequentes" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo do FAQ</label>
                    <textarea rows={2} value={(formData.sections?.faq as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.faq) s.faq = {} as any; (s.faq as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Respostas diretas e transparentes sobre nosso atendimento em São Paulo." />
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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo / Argumento (Lado Esquerdo e Formulário)</label>
                    <textarea rows={3} value={(formData.sections?.homeLead as any)?.subtitle || ''} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; (s.homeLead as any).subtitle = e.target.value; handleChange('sections', s as any); }} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Evite técnicos amadores ou soluções provisórias..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <input type="text" value={item.title} onChange={e => { const s = { ...formData.sections }; if (!s.homeLead) s.homeLead = {} as any; if (!(s.homeLead as any).items) (s.homeLead as any).items = []; (s.homeLead as any).items[idx] = { ...item, title: e.target.value }; handleChange('sections', s as any); }} className="w-full px-3 py-2 text-sm mb-3 border border-slate-300 rounded-lg" />
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
                </div>
              </div>
            )}

            {selectedKey === 'sobre' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="historia"
                  label="História e Diferenciais (Quem Somos)"
                  sectionData={formData.sections?.historia}
                  onChange={(data) => handleChange('sections', { ...formData.sections, historia: data } as any)}
                />
                
                <DynamicSectionEditor
                  sectionKey="proposito"
                  label="Missão, Visão e Valores"
                  sectionData={formData.sections?.proposito}
                  onChange={(data) => handleChange('sections', { ...formData.sections, proposito: data } as any)}
                />

                <DynamicSectionEditor
                  sectionKey="numeros"
                  label="Estatísticas e Números"
                  sectionData={formData.sections?.numeros}
                  onChange={(data) => handleChange('sections', { ...formData.sections, numeros: data } as any)}
                />

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
                </div>
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
