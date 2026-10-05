import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, ShieldCheck } from 'lucide-react';

interface LPHeaderProps {
  serviceName?: string;
}

export const LPHeader: React.FC<LPHeaderProps> = ({ serviceName }) => {
  const { settings } = useSiteData();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial com Tag do Serviço */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={settings.logo_url || '/logo.jpeg'}
                alt={settings.site_name}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            {serviceName && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/60 text-primary text-xs font-bold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Especialista em {serviceName}
              </span>
            )}
          </div>

          {/* Botões Focados em Conversão Imediata (Sem distrações de menus) */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone_raw}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-primary px-3 py-2 rounded-lg border border-slate-200 hover:border-primary transition-all"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Ligue:</span>
              <span>{settings.phone_number}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Vim%20pela%20página%20de%20${encodeURIComponent(serviceName || 'serviços')}%20e%20preciso%20de%20atendimento.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow hover:bg-secondary-dark transition-all text-sm group"
            >
              <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden xs:inline">Chamar no WhatsApp</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
