import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { LPPageDetail } from '../../services/lpData';
import { MessageSquare, Phone, Clock, ShieldCheck } from 'lucide-react';

interface LPFinalCtaProps {
  lp: LPPageDetail;
}

export const LPFinalCta: React.FC<LPFinalCtaProps> = ({ lp }) => {
  const { settings, isBusinessHours, openLeadModal } = useSiteData();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 border border-amber-500/25 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Atendimento Imediato em São Paulo</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.035em] leading-[1.14] max-w-3xl mx-auto text-balance">
          {lp.ctaTitle}
        </h2>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-[1.65] text-pretty">
          {lp.ctaText} Atendimento de segunda a sexta, das 8h às 19h. Conserto em até 24h.
        </p>

        {!isBusinessHours && (
          <div className="mt-4 inline-block bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs px-4 py-2 rounded-xl">
            Fora do horário comercial: envie sua mensagem no WhatsApp e responderemos a partir das 8h do próximo dia útil.
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Preciso%20de%20ajuda%20com%20${encodeURIComponent(lp.name)}.`}
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
            onClick={() => openLeadModal(lp.slug)}
            className="text-xs text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
          >
            Prefere que entremos em contato? Solicite orçamento online pelo formulário
          </button>
        </div>

        {/* Marcas Atendidas no Final da LP */}
        {lp.brands && lp.brands.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Marcas Atendidas:</span>{' '}
            {lp.brands.join(' • ')} e outras líderes de mercado.
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Orçamento antes do início
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
