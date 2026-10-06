import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { MessageSquare, ClipboardCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { settings } = useSiteData();

  const steps = [
    {
      step: '01',
      title: 'Conte o problema',
      desc: 'Entre em contato pelo WhatsApp ou telefone. Envie uma foto ou vídeo do seu pressurizador ou aquecedor para orientarmos o técnico antes da visita.',
      icon: <MessageSquare className="w-6 h-6 text-primary" />
    },
    {
      step: '02',
      title: 'Vistoria e orçamento',
      desc: 'O técnico avalia no local e passa o valor exato antes de iniciar o conserto. Aprovou o serviço? A taxa de vistoria e locomoção não é cobrada.',
      icon: <ClipboardCheck className="w-6 h-6 text-secondary" />
    },
    {
      step: '03',
      title: 'Problema resolvido',
      desc: 'Conserto ou instalação realizado de imediato ou em até 24 horas úteis, com garantia de 3 meses em peças e 30 dias em mão de obra.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />
    }
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Como Funciona o Atendimento?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed text-pretty">
            Processo ágil, sem burocracia e com transparência total de custos antes de qualquer reparo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, index) => (
            <div
              key={index}
              className="bg-slate-50/80 rounded-2xl p-8 border border-slate-200/90 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-slate-300 tracking-tighter">
                    {st.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center">
                    {st.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight text-balance">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty font-normal">
                  {st.desc}
                </p>
              </div>

              {index < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Gostaria%20de%20iniciar%20meu%20atendimento.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-8 py-4 rounded-xl shadow-md transition-all text-sm group"
          >
            <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Chamar no WhatsApp e Contar Meu Problema</span>
          </a>
        </div>
      </div>
    </section>
  );
};
