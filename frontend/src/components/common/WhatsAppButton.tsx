import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const { settings } = useSiteData();

  const defaultMsg = 'Olá! Estou no site da Pressurize Prime e gostaria de falar com um técnico sobre meu equipamento.';
  const messageToSend = encodeURIComponent(customMessage || defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">

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
