import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, CreditCard, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, services } = useSiteData();
  const currentYear = new Date().getFullYear();

  const brands = settings.footer?.brands?.length ? settings.footer.brands : [
    'Rowa', 'Komeco', 'Fluxonn', 'Syllent', 'Grundfos', 'Rinnai', 'Rheem', 'Cumulus', 'Heliotek'
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Faixa Superior: Diferenciais e Pagamento */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{settings.footer?.top_banner_title1 || 'Conserto e Instalação em até 24h'}</h4>
              <p className="text-xs text-slate-400">{settings.footer?.top_banner_desc1 || 'Atendimento rápido em dias úteis com técnicos experientes.'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{settings.footer?.top_banner_title2 || 'Garantia Comprovada'}</h4>
              <p className="text-xs text-slate-400">{settings.footer?.top_banner_desc2 || '3 meses em peças e 30 dias na mão de obra com suporte.'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{settings.footer?.top_banner_title3 || 'Facilidade no Pagamento'}</h4>
              <p className="text-xs text-slate-400">{settings.footer?.top_banner_desc3 || 'Pix, débito ou cartão de crédito em até 10x sem juros.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Sobre & Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-xl shadow-xs">
              <img
                src={settings.footer?.footer_logo_url || settings.logo_url || '/logo.jpeg'}
                alt={settings.site_name}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.footer?.about_text || 'O problema resolvido de primeira, por um técnico que responde pelo serviço. Mais de 10 anos de experiência prática em pressurizadores e aquecedores em São Paulo.'}
            </p>
            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.business_hours}</span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Serviços Especializados */}
          {settings.footer?.show_services !== false && (
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
                {settings.footer?.services_title || 'Serviços Especializados'}
              </h3>
              <ul className="space-y-2.5 text-xs">
                {(settings.footer?.footer_services_links || services.map(s => ({ label: s.title, url: `/${s.slug}` }))).map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.url}
                      className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coluna 3: Regiões de Atendimento Prioritário em SP */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{settings.footer?.coverage_title || 'Regiões Atendidas'}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {settings.footer?.coverage_desc || 'Atendimento com rota prioritária para condomínios e residências nas seguintes regiões:'}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(settings.address_coverage || []).map((bairro, idx) => (
                <span
                  key={idx}
                  className="bg-slate-900 border border-slate-800 text-[11px] text-slate-300 px-2 py-1 rounded"
                >
                  {bairro}
                </span>
              ))}
            </div>
          </div>

          {/* Coluna 4: Contato Direto & Chamada */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-secondary pl-3">
              {settings.footer?.contact_title || 'Atendimento Imediato'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {settings.footer?.contact_text || 'Atendimento 100% humano desde a primeira mensagem. Sem filas e sem robôs.'}
            </p>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${settings.whatsapp_raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary-dark text-slate-950 font-bold py-2.5 px-4 rounded-lg transition-colors text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{settings.footer?.btn_whatsapp_text || 'WhatsApp:'} {settings.whatsapp_number}</span>
              </a>

              <a
                href={`tel:${settings.phone_raw}`}
                className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-xs"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{settings.footer?.btn_phone_text || 'Ligar:'} {settings.phone_number}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Marcas Atendidas */}
        <div className="mt-12 pt-8 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 mb-3 text-center sm:text-left">
            <strong className="text-slate-300">{settings.footer?.brands_title || 'Equipamentos e Marcas Atendidas:'}</strong> {settings.footer?.brands_desc || 'Atendemos os principais fabricantes do mercado:'}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {brands.map((brand, i) => (
              <span
                key={i}
                className="text-xs bg-slate-900/90 text-slate-400 px-2.5 py-1 rounded border border-slate-800"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Links Institucionais */}
      <div className="border-t border-slate-900 bg-slate-900/30 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
          {(settings.footer?.institutional_links || [
            { label: 'Sobre', url: '/sobre' },
            { label: 'Diferenciais', url: '/diferenciais' },
            { label: 'Como funciona', url: '/como-funciona' },
            { label: 'Dúvidas', url: '/duvidas' },
            { label: 'Contato', url: '/contato' },
            { label: 'Privacidade', url: '/privacidade' },
            { label: 'Termos de Uso', url: '/termos' }
          ]).map((link, i) => (
            <Link key={i} to={link.url} className="hover:text-primary transition-colors">{link.label}</Link>
          ))}
        </div>
      </div>
      {/* Copyright e Acesso Administrativo */}
      <div className="border-t border-slate-900 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {settings.site_name}. {settings.footer?.copyright_text || 'Todos os direitos reservados.'}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">{settings.footer?.location_text || 'São Paulo — SP'}</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors"
              title="Acesso Administrativo"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Painel</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
