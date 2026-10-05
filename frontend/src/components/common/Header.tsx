import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, Menu, X, ChevronDown, Shield, Gauge, Flame, Sun, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, services, openLeadModal } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gauge':
        return <Gauge className="w-4 h-4 text-primary" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <Shield className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src={settings.logo_url || '/logo.jpeg'}
              alt={settings.site_name}
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-slate-700 hover:text-primary'
              }`}
            >
              Início
            </Link>

            {/* Dropdown de Serviços */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-primary transition-colors py-2"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                <span>Serviços Especializados</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Soluções Técnicas em SP
                  </div>
                  {services.map(service => (
                    <Link
                      key={service.id}
                      to={`/${service.slug}`}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-50 shrink-0">
                        {getServiceIcon(service.icon_name)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                          {service.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          Conserto e instalação em até 24h
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="/#quem-somos" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              Quem Somos
            </a>
            <a href="/#diferenciais" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              Por que a Prime
            </a>
            <a href="/#como-funciona" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="/#faq" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors">
              Dúvidas
            </a>
          </nav>

          {/* Botões de Ação */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => openLeadModal()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary bg-slate-100 hover:bg-slate-200 px-3 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Pedir Orçamento
            </button>

            <a
              href={`tel:${settings.phone_raw}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-primary px-2.5 py-2 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{settings.phone_number}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Vim%20pelo%20site%20da%20Pressurize%20Prime%20e%20gostaria%20de%20um%20diagnóstico%20técnico.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow-sm hover:bg-secondary-dark transition-all text-xs group"
            >
              <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Botão Mobile Hamburguer */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Preciso%20de%20atendimento%20técnico.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-secondary bg-slate-900 rounded-lg hover:bg-slate-800"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Aberto Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:bg-slate-50"
          >
            Início
          </Link>

          <div className="px-3 pt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Nossos Serviços
          </div>
          <div className="grid grid-cols-1 gap-1 pl-2">
            {services.map(service => (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
              >
                {getServiceIcon(service.icon_name)}
                <span>{service.title}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="/#quem-somos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Quem Somos
            </a>
            <a
              href="/#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Como Funciona
            </a>
            <a
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Perguntas Frequentes
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openLeadModal();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-50 text-primary border border-blue-200 font-bold py-2.5 px-4 rounded-xl text-center text-sm cursor-pointer"
            >
              Pedir Orçamento Online
            </button>

            <a
              href={`https://wa.me/${settings.whatsapp_raw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-secondary text-slate-950 font-bold py-3 px-4 rounded-xl shadow text-center"
            >
              <MessageSquare className="w-5 h-5" />
              Chamar no WhatsApp
            </a>

            <a
              href={`tel:${settings.phone_raw}`}
              className="flex items-center justify-center gap-2 border border-slate-300 py-2.5 px-4 rounded-xl text-slate-800 font-semibold text-center text-sm"
            >
              <Phone className="w-4 h-4 text-primary" />
              Ligar para {settings.phone_number}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
