import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Clock, Phone, AlertCircle } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { settings, isBusinessHours } = useSiteData();

  return (
    <div className="hidden sm:block bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
          <span>
            <strong className="text-white font-medium">Horário de Atendimento:</strong> {settings.business_hours}
          </span>
          {!isBusinessHours && (
            <span className="hidden md:inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-500/30">
              <AlertCircle className="w-3 h-3" />
              Fora do expediente comercial • Retornamos a partir das 8h
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden lg:inline text-slate-400">Atendimento prioritário em SP e Grande SP</span>
          <a
            href={`tel:${settings.phone_raw}`}
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Ligue: {settings.phone_number}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
