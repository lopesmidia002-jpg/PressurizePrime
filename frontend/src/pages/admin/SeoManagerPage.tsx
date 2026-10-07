import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { SeoMeta } from '../../types';
import {
  Save,
  CheckCircle2,
  Globe,
  Share2,
  ChevronRight,
  Layers
} from 'lucide-react';
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';

export const SeoManagerPage: React.FC = () => {
  const { pages, updatePageData } = useSiteData();

  const pageKeys = [
    { key: 'home', label: 'Página Inicial (Home)', path: 'https://pressurizeprime.com.br/' },
    { key: 'sobre', label: 'Página Sobre', path: 'https://pressurizeprime.com.br/sobre' },
    { key: 'diferenciais', label: 'Página Diferenciais', path: 'https://pressurizeprime.com.br/diferenciais' },
    { key: 'como-funciona', label: 'Página Como Funciona', path: 'https://pressurizeprime.com.br/como-funciona' },
    { key: 'duvidas', label: 'Página Dúvidas', path: 'https://pressurizeprime.com.br/duvidas' },
    { key: 'pressurizador', label: 'LP Pressurizador de Água', path: 'https://pressurizeprime.com.br/pressurizador' },
    { key: 'aquecedor-a-gas', label: 'LP Aquecedor a Gás', path: 'https://pressurizeprime.com.br/aquecedor-a-gas' },
    { key: 'aquecedor-solar', label: 'LP Aquecedor Solar & Boiler', path: 'https://pressurizeprime.com.br/aquecedor-solar' },
    { key: 'aquecedor-eletrico', label: 'LP Aquecedor Elétrico & Boiler', path: 'https://pressurizeprime.com.br/aquecedor-eletrico' },
  ];

  const [selectedKey, setSelectedKey] = useState('home');
  const defaultSeoData: Record<string, SeoMeta> = {
    home: { page_slug: 'home', meta_title: 'Pressurize Prime | Pressurizador e Aquecedores em São Paulo', meta_description: 'Venda, instalação e manutenção de pressurizador, aquecedor a gás, solar e elétrico em SP. Técnicos experientes e conserto em até 24h. Chame no WhatsApp.', keywords: 'pressurizador, aquecedor a gas, sao paulo, conserto', canonical_url: 'https://pressurizeprime.com.br/', og_title: 'Pressurize Prime — Especialistas em Pressurização em SP', og_description: 'Conserto em até 24 horas.', og_image: '/logo.jpeg' },
    sobre: { page_slug: 'sobre', meta_title: 'Sobre Nós | Pressurize Prime', meta_description: 'Especialistas em pressurização de água e aquecimento a gás e elétrico em São Paulo. Conheça nossa história e compromisso.', keywords: 'pressurize prime, sobre, empresa, sao paulo', canonical_url: 'https://pressurizeprime.com.br/sobre', og_title: 'Sobre a Pressurize Prime', og_description: 'Conheça nossa história e equipe.', og_image: '/logo.jpeg' },
    diferenciais: { page_slug: 'diferenciais', meta_title: 'Nossos Diferenciais | Pressurize Prime', meta_description: 'Descubra por que a Pressurize Prime é a escolha certa para a instalação e manutenção do seu equipamento.', keywords: 'diferenciais, garantia, tecnico especializado', canonical_url: 'https://pressurizeprime.com.br/diferenciais', og_title: 'Diferenciais Pressurize Prime', og_description: 'O que nos torna a melhor escolha.', og_image: '/logo.jpeg' },
    'como-funciona': { page_slug: 'como-funciona', meta_title: 'Como Funciona | Pressurize Prime', meta_description: 'Entenda o nosso processo de atendimento, do primeiro contato até a resolução do problema e emissão da garantia.', keywords: 'como funciona, processo, atendimento', canonical_url: 'https://pressurizeprime.com.br/como-funciona', og_title: 'Como Funciona a Pressurize Prime', og_description: 'Processo simples e transparente.', og_image: '/logo.jpeg' },
    duvidas: { page_slug: 'duvidas', meta_title: 'Dúvidas Frequentes | Pressurize Prime', meta_description: 'Tire suas dúvidas sobre instalação, conserto, garantia e funcionamento de pressurizadores e aquecedores a gás.', keywords: 'faq, duvidas, pressurizador, aquecedor', canonical_url: 'https://pressurizeprime.com.br/duvidas', og_title: 'Dúvidas Frequentes', og_description: 'Respostas rápidas para as suas perguntas.', og_image: '/logo.jpeg' },
    pressurizador: { page_slug: 'pressurizador', meta_title: 'Pressurizador de Água em SP | Instalação e Conserto em 24h', meta_description: 'Chuveiro fraco? Venda, instalação e conserto de pressurizador residencial em São Paulo. Técnicos experientes, atendimento imediato. Chame no WhatsApp.', keywords: 'pressurizador, chuveiro fraco, sao paulo, conserto', canonical_url: 'https://pressurizeprime.com.br/pressurizador', og_title: 'Pressurizador de Água em SP', og_description: 'Instalação e conserto em até 24h.', og_image: '/images/pressurizador.jpg' },
    'aquecedor-a-gas': { page_slug: 'aquecedor-a-gas', meta_title: 'Conserto e Instalação de Aquecedor a Gás em SP | Em até 24h', meta_description: 'Aquecedor a gás não acende ou desliga no banho? Conserto, manutenção e instalação conforme as normas em São Paulo. Técnicos experientes. Chame agora.', keywords: 'aquecedor a gas, conserto, instalacao, sao paulo', canonical_url: 'https://pressurizeprime.com.br/aquecedor-a-gas', og_title: 'Aquecedor a Gás em SP', og_description: 'Conserto e instalação em até 24h.', og_image: '/images/aquecedor-a-gas.jpg' },
    'aquecedor-solar': { page_slug: 'aquecedor-solar', meta_title: 'Aquecedor Solar em SP | Instalação, Manutenção e Conserto', meta_description: 'Água morna mesmo com sol? Instalação, manutenção e conserto de aquecedor solar e boiler em São Paulo. Técnicos experientes, atendimento imediato.', keywords: 'aquecedor solar, boiler, instalacao, sao paulo', canonical_url: 'https://pressurizeprime.com.br/aquecedor-solar', og_title: 'Aquecedor Solar em SP', og_description: 'Instalação e manutenção de aquecedor solar.', og_image: '/images/aquecedor-solar.jpg' },
    'aquecedor-eletrico': { page_slug: 'aquecedor-eletrico', meta_title: 'Aquecedor Elétrico e Boiler em SP | Conserto em até 24h', meta_description: 'Boiler elétrico não esquenta ou desarma o disjuntor? Venda, instalação e conserto de aquecedor elétrico em São Paulo. Técnicos experientes. Chame agora.', keywords: 'aquecedor eletrico, boiler eletrico, conserto, sao paulo', canonical_url: 'https://pressurizeprime.com.br/aquecedor-eletrico', og_title: 'Aquecedor Elétrico em SP', og_description: 'Conserto de boiler elétrico em até 24h.', og_image: '/images/aquecedor-eletrico.jpg' },
  };

  const getSeoForKey = (key: string): SeoMeta => {
    const saved = pages[key]?.seo;
    const def = defaultSeoData[key];
    if (!saved || (!saved.meta_title && !saved.meta_description)) return def || { page_slug: key, meta_title: '', meta_description: '', keywords: '', canonical_url: pageKeys.find(p => p.key === key)?.path || '', og_title: '', og_description: '', og_image: '/logo.jpeg' };
    // Merge: if a field is empty, use default
    return {
      ...def,
      ...Object.fromEntries(Object.entries(saved).filter(([, v]) => v !== '' && v !== null && v !== undefined))
    } as SeoMeta;
  };

  const [formData, setFormData] = useState<SeoMeta>(() => getSeoForKey(selectedKey));

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectPage = (key: string) => {
    setSelectedKey(key);
    setFormData(getSeoForKey(key));
    setSavedSuccess(false);
  };

  const handleChange = (field: keyof SeoMeta, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePageData(selectedKey, { seo: formData });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const currentMeta = pageKeys.find(p => p.key === selectedKey);

  // Contadores de caracteres
  const titleLen = formData.meta_title.length;
  const descLen = formData.meta_description.length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gestão de SEO Individual por Página
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Controle Meta Title, Description, OpenGraph e indexação individual de cada rota no Google e WhatsApp.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>SEO salvo com sucesso!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Seletor de Páginas */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Selecionar Rota</span>
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

        {/* Formulário de SEO */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  Metadados de Indexação
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  {currentMeta?.label}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                /{selectedKey === 'home' ? '' : selectedKey}
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Meta Title */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Title (Título na Aba e Google) *
                  </label>
                  <span className={`text-[11px] font-bold shrink-0 ${titleLen > 65 ? 'text-red-500' : 'text-slate-400'}`}>
                    {titleLen}/60 caracteres recomendados
                  </span>
                </div>
                <textarea
                  rows={2}
                  required
                  value={formData.meta_title}
                  onChange={e => handleChange('meta_title', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Description (Resumo nos Resultados de Busca) *
                  </label>
                  <span className={`text-[11px] font-bold shrink-0 ${descLen > 165 ? 'text-red-500' : 'text-slate-400'}`}>
                    {descLen}/160 caracteres recomendados
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formData.meta_description}
                  onChange={e => handleChange('meta_description', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Palavras-chave e Canonical */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Palavras-Chave (Separadas por vírgula)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.keywords || ''}
                    onChange={e => handleChange('keywords', e.target.value)}
                    placeholder="pressurizador, conserto, sao paulo"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={formData.canonical_url || ''}
                    onChange={e => handleChange('canonical_url', e.target.value)}
                    placeholder="https://pressurizeprime.com.br/pressurizador"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* OpenGraph para Redes Sociais / WhatsApp */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tags de Compartilhamento (OpenGraph / WhatsApp)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      og:title (Título no WhatsApp)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.og_title || ''}
                      onChange={e => handleChange('og_title', e.target.value)}
                      placeholder={formData.meta_title}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      og:image (Imagem do Card)
                    </label>
                    <div className="flex gap-2 items-center w-full">
                      <input
                        type="text"
                        value={formData.og_image || ''}
                        onChange={e => handleChange('og_image', e.target.value)}
                        placeholder="/images/pressurizador.jpg"
                        className="flex-1 w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ImageUploadButton onUpload={(url) => handleChange('og_image', url)} />
                    </div>
                  </div>
                </div>
              </div>

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
                  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{savedSuccess ? 'Salvo!' : 'Salvar Configurações de SEO'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Pré-visualização no Google Search (SERP) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Prévia no Google Search:</span>
            </span>

            <div className="bg-white p-4 rounded-xl border border-slate-200 max-w-xl">
              <div className="text-xs text-slate-600 mb-0.5 break-all">
                {currentMeta?.path}
              </div>
              <h4 className="text-blue-800 hover:underline font-medium text-base cursor-pointer leading-tight">
                {formData.meta_title || 'Título da Página'}
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {formData.meta_description || 'Descrição informativa nos resultados de busca do Google.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
