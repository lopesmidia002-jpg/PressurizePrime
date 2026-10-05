import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { LPPageDetail } from '../../services/lpData';
import { MessageSquare, ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react';

interface LPStepsProps {
  lp: LPPageDetail;
}

export const LPSteps: React.FC<LPStepsProps> = ({ lp }) => {
  const { settings } = useSiteData();

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Como Funciona o Conserto ou Instalação
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Três etapas diretas para resolver a pressão ou aquecimento da sua casa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-extrabold text-slate-300 font-mono tracking-tighter">01</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary shadow-2xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight text-balance">Chame no WhatsApp</h3>
              <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                Conte o sintoma e envie foto ou vídeo do equipamento. Agilizamos a triagem em minutos.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-extrabold text-slate-300 font-mono tracking-tighter">02</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-secondary shadow-2xs">
                  <ClipboardList className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight text-balance">Vistoria e Orçamento</h3>
              <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                O técnico avalia no local e passa o valor antes de começar. Aprovou o serviço? A taxa de vistoria não é cobrada.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-extrabold text-slate-300 font-mono tracking-tighter">03</span>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight text-balance">Problema Resolvido</h3>
              <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                Conserto ou instalação imediata ou em até 24h, com emissão de garantia real e assistência.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20${encodeURIComponent(lp.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-slate-950 font-extrabold px-8 py-4 rounded-xl shadow transition-all text-sm group"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Solicitar Orçamento para {lp.name}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
