import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { LPPageDetail } from '../../services/lpData';
import { MessageSquare, ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react';

interface LPStepsProps {
  lp: LPPageDetail;
}

export const LPSteps: React.FC<LPStepsProps> = ({ lp }) => {
  const { settings } = useSiteData();

  const processo = (lp as any).processo || {
    title: 'Como Funciona o Conserto ou Instalação',
    subtitle: 'Três etapas diretas para resolver a pressão ou aquecimento da sua casa.',
    items: [
      { title: 'Chame no WhatsApp', desc: 'Conte o sintoma e envie foto ou vídeo do equipamento. Agilizamos a triagem em minutos.' },
      { title: 'Vistoria e Orçamento', desc: 'O técnico avalia no local e passa o valor antes de começar. Aprovou o serviço? A taxa de vistoria não é cobrada.' },
      { title: 'Problema Resolvido', desc: 'Conserto ou instalação imediata ou em até 24h, com emissão de garantia real e assistência.' }
    ]
  };

  const getStepIcon = (idx: number) => {
    if (idx === 0) return <MessageSquare className="w-5 h-5" />;
    if (idx === 1) return <ClipboardList className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  const getStepColorClass = (idx: number) => {
    if (idx === 0) return "text-primary";
    if (idx === 1) return "text-secondary";
    return "text-emerald-600";
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            {processo.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            {processo.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {processo.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-50/80 rounded-2xl p-7 border border-slate-200/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-extrabold text-slate-300 font-mono tracking-tighter">0{idx + 1}</span>
                  <div className={`w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs ${getStepColorClass(idx)}`}>
                    {getStepIcon(idx)}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight text-balance">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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
