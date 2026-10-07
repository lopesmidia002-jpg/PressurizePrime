import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Save, CheckCircle2, LayoutTemplate } from 'lucide-react';
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';

export const FooterManagerPage: React.FC = () => {
  const { settings, updateSettings } = useSiteData();

  const [formData, setFormData] = useState(() => {
    return {
      footer_logo_url: settings.footer?.footer_logo_url || settings.logo_url || '',
      top_banner_title1: settings.footer?.top_banner_title1 || 'Conserto e Instalação em até 24h',
      top_banner_desc1: settings.footer?.top_banner_desc1 || 'Atendimento rápido em dias úteis com técnicos experientes.',
      top_banner_title2: settings.footer?.top_banner_title2 || 'Garantia Comprovada',
      top_banner_desc2: settings.footer?.top_banner_desc2 || '3 meses em peças e 30 dias na mão de obra com suporte.',
      top_banner_title3: settings.footer?.top_banner_title3 || 'Facilidade no Pagamento',
      top_banner_desc3: settings.footer?.top_banner_desc3 || 'Pix, débito ou cartão de crédito em até 10x sem juros.',
      about_text: settings.footer?.about_text || 'O problema resolvido de primeira, por um técnico que responde pelo serviço. Mais de 10 anos de experiência prática em pressurizadores e aquecedores em São Paulo.',
      contact_text: settings.footer?.contact_text || 'Atendimento 100% humano desde a primeira mensagem. Sem filas e sem robôs.',
      brands: settings.footer?.brands?.join(', ') || 'Rowa, Komeco, Fluxonn, Syllent, Grundfos, Rinnai, Rheem, Cumulus, Heliotek',
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      footer: {
        footer_logo_url: formData.footer_logo_url,
        top_banner_title1: formData.top_banner_title1,
        top_banner_desc1: formData.top_banner_desc1,
        top_banner_title2: formData.top_banner_title2,
        top_banner_desc2: formData.top_banner_desc2,
        top_banner_title3: formData.top_banner_title3,
        top_banner_desc3: formData.top_banner_desc3,
        about_text: formData.about_text,
        contact_text: formData.contact_text,
        brands: formData.brands.split(',').map(s => s.trim()).filter(Boolean),
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gestão do Rodapé
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Edite todos os textos e informações presentes no rodapé (footer) do site.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Rodapé atualizado com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Faixa Superior: Diferenciais e Pagamento
              </h2>
              <p className="text-xs text-slate-500">
                Informações de destaque acima do conteúdo principal do rodapé.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 1 (Relógio) - Título</label>
                <input type="text" value={formData.top_banner_title1} onChange={e => handleChange('top_banner_title1', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 1 - Descrição</label>
                <textarea rows={2} value={formData.top_banner_desc1} onChange={e => handleChange('top_banner_desc1', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 2 (Escudo) - Título</label>
                <input type="text" value={formData.top_banner_title2} onChange={e => handleChange('top_banner_title2', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 2 - Descrição</label>
                <textarea rows={2} value={formData.top_banner_desc2} onChange={e => handleChange('top_banner_desc2', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 3 (Cartão) - Título</label>
                <input type="text" value={formData.top_banner_title3} onChange={e => handleChange('top_banner_title3', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Bloco 3 - Descrição</label>
                <textarea rows={2} value={formData.top_banner_desc3} onChange={e => handleChange('top_banner_desc3', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Conteúdo Principal do Rodapé
              </h2>
              <p className="text-xs text-slate-500">
                Textos e listas mostrados no corpo do rodapé.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Logo Específico do Rodapé</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Se quiser usar um logo diferente (ex: versão branca/negativa) apenas para o rodapé. Se deixar em branco, usará o logo principal.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-4">
                {formData.footer_logo_url && (
                  <div className="bg-slate-950 p-2 rounded-lg">
                    <img src={formData.footer_logo_url} alt="Footer Logo" className="h-10 w-auto object-contain" />
                  </div>
                )}
                <ImageUploadButton
                  onUpload={(url) => handleChange('footer_logo_url', url)}
                  className="bg-white border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto "Sobre a Empresa" (Abaixo do Logo)</label>
              <textarea rows={3} value={formData.about_text} onChange={e => handleChange('about_text', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto da coluna "Atendimento Imediato"</label>
              <textarea rows={2} value={formData.contact_text} onChange={e => handleChange('contact_text', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Marcas Atendidas (separadas por vírgula)</label>
              <textarea rows={3} value={formData.brands} onChange={e => handleChange('brands', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Rowa, Komeco, Rinnai..." />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Rodapé</span>
          </button>
        </div>
      </form>
    </div>
  );
};
