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
