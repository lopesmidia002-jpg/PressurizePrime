import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { MessageSquare, X } from 'lucide-react';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const { settings, isBusinessHours } = useSiteData();
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = 'Olá! Estou no site da Pressurize Prime e gostaria de falar com um técnico sobre meu equipamento.';
  const messageToSend = encodeURIComponent(customMessage || defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Tooltip Balão Flutuante */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2.5 px-4 rounded-2xl shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-col text-left">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Técnico Online
            </span>
            <span className="text-[11px] text-slate-500">
              {isBusinessHours ? 'Atendimento imediato sem robô' : 'Deixe sua mensagem, retornamos às 8h'}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Botão Principal com Efeito de Pulso */}
      <a
        href={`https://wa.me/${settings.whatsapp_raw}?text=${messageToSend}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar técnico no WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </div>
  );
};
