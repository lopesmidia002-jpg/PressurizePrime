import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { MessageSquare, Phone, ShieldCheck } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { settings, isBusinessHours, openLeadModal } = useSiteData();

  return (
    <section 
      className="py-20 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.55), rgba(23, 37, 84, 0.75)), url("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.035em] leading-[1.15] max-w-3xl mx-auto text-balance">
          Chuveiro fraco ou água fria não esperam. Nem a gente.
        </h2>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-[1.65] text-pretty">
          Fale agora com um técnico. Atendimento de segunda a sexta, das 8h às 19h. Conserto e instalação de imediato ou em até 24 horas.
        </p>

        {!isBusinessHours && (
          <div className="mt-4 inline-block bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs px-4 py-2 rounded-xl">
            Fora do horário comercial no momento: envie sua mensagem agora e responderemos a partir das 8h com prioridade.
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Meu%20chuveiro%20ou%20aquecedor%20está%20com%20problema,%20preciso%20de%20ajuda.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-secondary hover:bg-secondary-dark text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all text-center flex items-center justify-center gap-2.5 text-base group"
          >
            <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Chamar no WhatsApp</span>
          </a>

          <a
            href={`tel:${settings.phone_raw}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-xl shadow-sm transition-all text-center flex items-center justify-center gap-2 text-base backdrop-blur-xs"
          >
            <Phone className="w-5 h-5 text-amber-400" />
            <span>Ligar agora</span>
          </a>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => openLeadModal()}
            className="text-xs text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
          >
            Prefere que entremos em contato? Solicite orçamento online pelo formulário
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Diagnóstico sem compromisso
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Garantia de 3 meses em peças
          </span>
        </div>
      </div>
    </section>
  );
};
