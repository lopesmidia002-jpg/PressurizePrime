import React, { useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { LeadForm } from './LeadForm';
import { X } from 'lucide-react';

export const LeadModal: React.FC = () => {
  const { isLeadModalOpen, leadModalService, closeLeadModal } = useSiteData();

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLeadModalOpen) {
        closeLeadModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLeadModalOpen, closeLeadModal]);

  // Evitar scroll de fundo quando modal estiver aberto
  useEffect(() => {
    if (isLeadModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLeadModalOpen]);

  if (!isLeadModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={closeLeadModal}
    >
      <div
        className="relative w-full max-w-xl my-8 transition-transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={closeLeadModal}
          className="absolute -top-3 -right-3 z-10 w-9 h-9 bg-white text-slate-700 hover:text-slate-900 rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Formulário Embutido no Modal */}
        <LeadForm
          defaultService={leadModalService}
          compact={false}
          title="Solicitar Orçamento Técnico"
          subtitle="Preencha os dados e entraremos em contato via WhatsApp com o diagnóstico e agendamento da visita."
          className="shadow-2xl"
        />
      </div>
    </div>
  );
};
