import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Save, CheckCircle2, LayoutTemplate, MapPin, Building2, Phone, Link as LinkIcon, Info } from 'lucide-react';
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';

export const FooterManagerPage: React.FC = () => {
  const { settings, updateSettings, services } = useSiteData();

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
      services_title: settings.footer?.services_title || 'Serviços Especializados',
      show_services: settings.footer?.show_services !== false,
      coverage_title: settings.footer?.coverage_title || 'Regiões Atendidas',
      coverage_desc: settings.footer?.coverage_desc || 'Atendimento com rota prioritária para condomínios e residências nas seguintes regiões:',
      address_coverage: (settings.address_coverage || ['São Paulo', 'Barueri (Alphaville)', 'Santana de Parnaíba', 'Cotia (Granja Viana)', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul']).join(', '),
      contact_title: settings.footer?.contact_title || 'Atendimento Imediato',
      brands_title: settings.footer?.brands_title || 'Equipamentos e Marcas Atendidas:',
      brands_desc: settings.footer?.brands_desc || 'Atendemos os principais fabricantes do mercado:',
      btn_whatsapp_text: settings.footer?.btn_whatsapp_text || 'WhatsApp:',
      btn_phone_text: settings.footer?.btn_phone_text || 'Ligar:',
      institutional_links: settings.footer?.institutional_links || [
        { label: 'Sobre', url: '/sobre' },
        { label: 'Diferenciais', url: '/diferenciais' },
        { label: 'Como funciona', url: '/como-funciona' },
        { label: 'Dúvidas', url: '/duvidas' },
        { label: 'Contato', url: '/contato' },
        { label: 'Privacidade', url: '/privacidade' },
        { label: 'Termos de Uso', url: '/termos' },
      ],
      footer_services_links: settings.footer?.footer_services_links || services.map(s => ({ label: s.title, url: `/${s.slug}` })),
      copyright_text: settings.footer?.copyright_text || 'Todos os direitos reservados.',
      location_text: settings.footer?.location_text || 'São Paulo — SP',
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings({
      address_coverage: formData.address_coverage.split(',').map((s: string) => s.trim()).filter(Boolean),
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
        brands: formData.brands.split(',').map((s: string) => s.trim()).filter(Boolean),
        services_title: formData.services_title,
        show_services: formData.show_services,
        coverage_title: formData.coverage_title,
        coverage_desc: formData.coverage_desc,
        contact_title: formData.contact_title,
        brands_title: formData.brands_title,
        brands_desc: formData.brands_desc,
        btn_whatsapp_text: formData.btn_whatsapp_text,
        btn_phone_text: formData.btn_phone_text,
        institutional_links: formData.institutional_links,
        footer_services_links: formData.footer_services_links,
        copyright_text: formData.copyright_text,
        location_text: formData.location_text,
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const SaveButton = () => (
    <div className="flex justify-center sm:justify-end pt-4 mt-6">
      <button type="submit" className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white font-bold rounded-xl transition-colors shadow-sm ${savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}`}>
  {savedSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
</button>
    </div>
  );

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

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
        <h4 className="text-blue-800 font-bold text-sm mb-1 flex items-center gap-2">
          <Info className="w-4 h-4" /> Dica sobre Informações Globais
        </h4>
        <p className="text-xs text-blue-700">O horário de funcionamento (relógio abaixo da bio) e os números de telefone (WhatsApp e Ligação) são configurações gerais. Para editá-los, acesse a aba <strong>"Configurações Globais"</strong> no menu principal.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Faixa Superior */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Faixa Superior: Diferenciais e Pagamento</h2>
              <p className="text-xs text-slate-500">Informações de destaque acima do conteúdo principal do rodapé.</p>
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
          <SaveButton />
        </div>

        {/* Informações da Empresa */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-slate-50 text-slate-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Informações da Empresa</h2>
              <p className="text-xs text-slate-500">Logo e bio da primeira coluna do rodapé.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Logo Específico do Rodapé</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">Se quiser usar um logo diferente (ex: versão branca/negativa) apenas para o rodapé. Se deixar em branco, usará o logo principal.</p>
              </div>
              <div className="shrink-0 flex items-center gap-4">
                {formData.footer_logo_url && (
                  <div className="bg-slate-950 p-2 rounded-lg">
                    <img src={formData.footer_logo_url} alt="Footer Logo" className="h-10 w-auto object-contain" />
                  </div>
                )}
                <ImageUploadButton onUpload={(url) => handleChange('footer_logo_url', url)} className="bg-white border-slate-300" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto "Sobre a Empresa" (Abaixo do Logo)</label>
              <textarea rows={3} value={formData.about_text} onChange={e => handleChange('about_text', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto Direitos Autorais (Copyright)</label>
                <input type="text" value={formData.copyright_text} onChange={e => handleChange('copyright_text', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto de Localização</label>
                <input type="text" value={formData.location_text} onChange={e => handleChange('location_text', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>
          <SaveButton />
        </div>

        {/* Serviços e Contato */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Serviços e Contato</h2>
              <p className="text-xs text-slate-500">Títulos e botões da coluna de comunicação.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título da coluna Serviços</label>
                <input type="text" value={formData.services_title} onChange={e => handleChange('services_title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input type="checkbox" checked={formData.show_services} onChange={e => handleChange('show_services', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-sm font-medium text-slate-700">Mostrar Serviços do Banco de Dados no Rodapé</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Contato</label>
                <input type="text" value={formData.contact_title} onChange={e => handleChange('contact_title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto da coluna "Atendimento Imediato"</label>
                <textarea rows={2} value={formData.contact_text} onChange={e => handleChange('contact_text', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Botão WhatsApp</label>
                  <input type="text" value={formData.btn_whatsapp_text} onChange={e => handleChange('btn_whatsapp_text', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Texto do Botão Telefone</label>
                  <input type="text" value={formData.btn_phone_text} onChange={e => handleChange('btn_phone_text', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>
          </div>
          <SaveButton />
        </div>

        {/* Links de Serviços (Coluna do Rodapé) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Links de Serviços Especializados</h2>
              <p className="text-xs text-slate-500">Personalize quais serviços aparecem listados na coluna de Serviços do rodapé.</p>
            </div>
          </div>

          <div className="space-y-3">
            {formData.footer_services_links.map((link: any, idx: number) => (
              <div key={idx} className="flex gap-3">
                <input type="text" value={link.label} onChange={e => {
                  const newLinks = [...formData.footer_services_links];
                  newLinks[idx].label = e.target.value;
                  handleChange('footer_services_links', newLinks);
                }} placeholder="Nome do Serviço" className="w-1/3 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <input type="text" value={link.url} onChange={e => {
                  const newLinks = [...formData.footer_services_links];
                  newLinks[idx].url = e.target.value;
                  handleChange('footer_services_links', newLinks);
                }} placeholder="URL (Ex: /pressurizador)" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <button type="button" onClick={() => {
                  const newLinks = formData.footer_services_links.filter((_, i) => i !== idx);
                  handleChange('footer_services_links', newLinks);
                }} className="px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-medium text-sm">
                  Remover
                </button>
              </div>
            ))}
            <button type="button" onClick={() => {
              handleChange('footer_services_links', [...formData.footer_services_links, { label: '', url: '' }]);
            }} className="text-sm font-bold text-primary hover:text-primary-dark">
              + Adicionar Serviço
            </button>
          </div>
          <SaveButton />
        </div>

        {/* Regiões Atendidas */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Regiões Atendidas</h2>
              <p className="text-xs text-slate-500">Locais de atendimento.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título Regiões Atendidas</label>
                <input type="text" value={formData.coverage_title} onChange={e => handleChange('coverage_title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtítulo Regiões</label>
                <textarea rows={2} value={formData.coverage_desc} onChange={e => handleChange('coverage_desc', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Regiões Atendidas (separadas por vírgula)</label>
              <textarea rows={5} value={formData.address_coverage} onChange={e => handleChange('address_coverage', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="São Paulo, Barueri, Santo André..." />
            </div>
          </div>
          <SaveButton />
        </div>

        {/* Marcas Atendidas */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-slate-50 text-slate-600">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Marcas Atendidas</h2>
              <p className="text-xs text-slate-500">Fabricantes suportados pela sua equipe.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Título da Seção de Marcas</label>
                <input type="text" value={formData.brands_title} onChange={e => handleChange('brands_title', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Descrição da Seção de Marcas</label>
                <input type="text" value={formData.brands_desc} onChange={e => handleChange('brands_desc', e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Marcas Atendidas (separadas por vírgula)</label>
              <textarea rows={5} value={formData.brands} onChange={e => handleChange('brands', e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Rowa, Komeco, Rinnai..." />
            </div>
          </div>
          <SaveButton />
        </div>

        {/* Links Institucionais */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Links Institucionais</h2>
              <p className="text-xs text-slate-500">Gerencie a lista de páginas do site no rodapé.</p>
            </div>
          </div>

          <div className="space-y-3">
            {formData.institutional_links.map((link: any, idx: number) => (
              <div key={idx} className="flex gap-3">
                <input type="text" value={link.label} onChange={e => {
                  const newLinks = [...formData.institutional_links];
                  newLinks[idx].label = e.target.value;
                  handleChange('institutional_links', newLinks);
                }} placeholder="Label (Ex: Contato)" className="w-1/3 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <input type="text" value={link.url} onChange={e => {
                  const newLinks = [...formData.institutional_links];
                  newLinks[idx].url = e.target.value;
                  handleChange('institutional_links', newLinks);
                }} placeholder="URL (Ex: /contato)" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <button type="button" onClick={() => {
                  const newLinks = formData.institutional_links.filter((_, i) => i !== idx);
                  handleChange('institutional_links', newLinks);
                }} className="px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-medium text-sm">
                  Remover
                </button>
              </div>
            ))}
            <button type="button" onClick={() => {
              handleChange('institutional_links', [...formData.institutional_links, { label: '', url: '' }]);
            }} className="text-sm font-bold text-primary hover:text-primary-dark">
              + Adicionar Link
            </button>
          </div>
          <SaveButton />
        </div>

      </form>
    </div>
  );
};
