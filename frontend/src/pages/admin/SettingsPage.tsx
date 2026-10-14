import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import {
  Palette,
  Image as ImageIcon,
  Phone,
  MessageSquare,
  Clock,
  Save,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  MapPin,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';
import { extractGa4Id, extractGtmId } from '../../services/tracking';


export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSiteData();

  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);


  // Paletas de cores sugeridas
  const primaryPalette = ['#004b93', '#0f2b5c', '#002d62', '#1e40af', '#0284c7'];
  const secondaryPalette = ['#cfa349', '#f59e0b', '#d97706', '#eab308', '#ca8a04'];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Reflexo em tempo real de cores no site
    if (field === 'primary_color' || field === 'secondary_color') {
      updateSettings({ [field]: value });
    }
  };

  // Rastreamento: aceita o ID puro ou o snippet inteiro colado do Google; se achar o ID, guarda só ele
  const handleTrackingChange = (field: 'ga4_measurement_id' | 'gtm_container_id', raw: string) => {
    const id = field === 'ga4_measurement_id' ? extractGa4Id(raw) : extractGtmId(raw);
    handleChange(field, id || raw);
  };

  const ga4Value = formData.ga4_measurement_id || '';
  const gtmValue = formData.gtm_container_id || '';
  const ga4Invalid = ga4Value.trim() !== '' && extractGa4Id(ga4Value) !== ga4Value.trim();
  const gtmInvalid = gtmValue.trim() !== '' && extractGtmId(gtmValue) !== gtmValue.trim();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (ga4Invalid || gtmInvalid) {
      document.getElementById('bloco-rastreamento')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    updateSettings({
      ...formData,
      ga4_measurement_id: ga4Value.trim(),
      gtm_container_id: gtmValue.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetColors = () => {
    const defaultColors = {
      primary_color: '#004b93',
      secondary_color: '#cfa349'
    };
    setFormData(prev => ({ ...prev, ...defaultColors }));
    updateSettings(defaultColors);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Identidade Visual & Configurações
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Personalize o logotipo, a paleta de cores do site, telefones de plantão e regras de atendimento.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Configurações salvas e aplicadas em tempo real!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Bloco 1: Gestão de Cores Dinâmicas em Tempo Real */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Cores do Site (Variáveis de Estilo CSS)
                </h2>
                <p className="text-xs text-slate-500">
                  Qualquer mudança reflete imediatamente em botões, destaques e cabeçalhos em todo o site.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetColors}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Cores Padrão
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Seletor de Cor Primária */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cor Primária (Identidade da Marca)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.primary_color}
                  onChange={e => handleChange('primary_color', e.target.value)}
                  className="w-12 h-12 rounded-xl border border-slate-300 cursor-pointer p-1 bg-white"
                />
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={e => handleChange('primary_color', e.target.value)}
                  placeholder="#004b93"
                  className="flex-1 px-3.5 py-2.5 text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-400">Sugestões:</span>
                {primaryPalette.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleChange('primary_color', color)}
                    className="w-6 h-6 rounded-full border border-slate-300 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Seletor de Cor Secundária */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cor Secundária (CTAs e Destaques Dourados)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.secondary_color}
                  onChange={e => handleChange('secondary_color', e.target.value)}
                  className="w-12 h-12 rounded-xl border border-slate-300 cursor-pointer p-1 bg-white"
                />
                <input
                  type="text"
                  value={formData.secondary_color}
                  onChange={e => handleChange('secondary_color', e.target.value)}
                  placeholder="#cfa349"
                  className="flex-1 px-3.5 py-2.5 text-sm font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-400">Sugestões:</span>
                {secondaryPalette.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleChange('secondary_color', color)}
                    className="w-6 h-6 rounded-full border border-slate-300 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview de Combinação de Cores */}
          <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Pré-visualização ao Vivo dos Componentes:
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-sm flex items-center gap-2 cursor-default"
                style={{ backgroundColor: formData.primary_color }}
              >
                Botão Primário Institucional
              </button>

              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-extrabold text-xs text-slate-950 shadow-sm flex items-center gap-2 cursor-default"
                style={{ backgroundColor: formData.secondary_color }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Botão de Conversão Secundário
              </button>

              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  color: formData.primary_color,
                  borderColor: `${formData.primary_color}40`,
                  backgroundColor: `${formData.primary_color}10`
                }}
              >
                Badge de Garantia
              </span>
            </div>
          </div>
        </div>

        {/* Bloco 2: Logotipo e Dados Oficiais */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-blue-50 text-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Logotipo e Nome da Empresa
              </h2>
              <p className="text-xs text-slate-500">
                Configuração da marca exibida no cabeçalho, rodapé e abas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nome da Empresa
              </label>
              <input
                type="text"
                value={formData.site_name}
                onChange={e => handleChange('site_name', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Caminho / URL do Logotipo
              </label>
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={formData.logo_url}
                  onChange={e => handleChange('logo_url', e.target.value)}
                  placeholder="/logo.jpeg"
                  className="flex-1 w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <ImageUploadButton onUpload={(url) => handleChange('logo_url', url)} />
              </div>
            </div>
          </div>

          {/* Preview do Logotipo Oficial */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left overflow-hidden">
            <span className="text-xs font-bold text-slate-500 uppercase shrink-0">Logo Atual:</span>
            <img
              src={formData.logo_url || '/logo.jpeg'}
              alt="Logo Preview"
              className="h-12 w-auto object-contain bg-white p-1 rounded-lg border border-slate-200 shrink-0"
            />
            <span className="text-xs text-slate-500 min-w-0 w-full sm:w-auto">
              Arquivo oficial: <code className="text-slate-700 font-bold break-all inline-block mt-1 sm:mt-0">asserts/WhatsApp Image 2026-10-05 at 15.25.27.jpeg</code>
            </span>
          </div>
        </div>

        {/* Bloco 3: Contatos e Horário de Atendimento */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Canais de Contato e Horário de Expediente
              </h2>
              <p className="text-xs text-slate-500">
                Telefones clicáveis e detecção de atendimento no site.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp de Atendimento (Formatado)</span>
              </label>
              <input
                type="text"
                value={formData.whatsapp_number}
                onChange={e => handleChange('whatsapp_number', e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Raw (Apenas dígitos para link wa.me)
              </label>
              <input
                type="text"
                value={formData.whatsapp_raw}
                onChange={e => handleChange('whatsapp_raw', e.target.value)}
                placeholder="5511987654321"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Telefone Fixo / Comercial (Formatado)</span>
              </label>
              <input
                type="text"
                value={formData.phone_number}
                onChange={e => handleChange('phone_number', e.target.value)}
                placeholder="(11) 3456-7890"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Texto de Horário de Atendimento</span>
              </label>
              <input
                type="text"
                value={formData.business_hours}
                onChange={e => handleChange('business_hours', e.target.value)}
                placeholder="Segunda a Sexta, das 08h às 19h"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-end pt-2 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Contatos</span>
            </button>
          </div>
        </div>

        {/* Bloco 4: Regiões Atendidas */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Regiões Atendidas (Bairros e Municípios)
              </h2>
              <p className="text-xs text-slate-500">
                Lista de locais exibida na seção de cobertura. Separe os locais por vírgula.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Locais de Cobertura
            </label>
            <textarea
              value={formData.address_coverage?.join(', ') || ''}
              onChange={e => handleChange('address_coverage', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="São Paulo, Barueri (Alphaville), Santana de Parnaíba..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>
        </div>

        {/* Bloco 5: Rastreamento (Google Analytics 4 e Google Tag Manager) */}
        <div id="bloco-rastreamento" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Rastreamento e Análise (Google Analytics e Tag Manager)
              </h2>
              <p className="text-xs text-slate-500">
                Cole o ID ou o código completo fornecido pelo Google: o painel identifica o ID automaticamente. Deixe em branco para desativar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ga4_measurement_id" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Analytics 4 (ID de Métricas)
              </label>
              <textarea
                id="ga4_measurement_id"
                value={ga4Value}
                onChange={e => handleTrackingChange('ga4_measurement_id', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                rows={1}
                className={`w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${ga4Invalid ? 'border-red-400' : 'border-slate-300'}`}
              />
              {ga4Invalid ? (
                <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  ID não encontrado. Use o formato G-XXXXXXXXXX ou cole o código do gtag.js.
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Carrega o <code>gtag.js</code> em todas as páginas públicas do site.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="gtm_container_id" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Google Tag Manager (ID do Contêiner)
              </label>
              <textarea
                id="gtm_container_id"
                value={gtmValue}
                onChange={e => handleTrackingChange('gtm_container_id', e.target.value)}
                placeholder="GTM-XXXXXXX"
                rows={1}
                className={`w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none ${gtmInvalid ? 'border-red-400' : 'border-slate-300'}`}
              />
              {gtmInvalid ? (
                <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  ID não encontrado. Use o formato GTM-XXXXXXX ou cole o código do Tag Manager.
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Equivale aos códigos de <code>&lt;head&gt;</code> e <code>&lt;body&gt;</code> do Tag Manager.
                </p>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] sm:text-xs text-amber-900 leading-relaxed">
            <strong>Dica:</strong> se o GA4 também estiver configurado como tag dentro do Tag Manager, preencha só o campo do Tag Manager, para não contar cada visita duas vezes. Os acessos ao painel <code>/admin</code> não são rastreados.
          </div>

          <div className="flex justify-center sm:justify-end pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Rastreamento</span>
            </button>
          </div>
        </div>

        {/* Botão de Salvar Flutuante ou no Fim */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 pt-4 border-t border-slate-100">
          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvo com sucesso!</span>
            </div>
          )}
          <button
            type="submit"
            className={`${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'} text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 text-sm cursor-pointer w-full sm:w-auto`}
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}
            <span>{savedSuccess ? 'Salvo!' : 'Salvar Todas as Configurações'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
