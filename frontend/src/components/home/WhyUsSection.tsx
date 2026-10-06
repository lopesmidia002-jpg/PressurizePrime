import React from 'react';
import { Target, RotateCcw, Zap, Users } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const differentials = [
    {
      icon: <Target className="w-7 h-7 text-primary" />,
      bg: 'bg-blue-50 border-blue-100',
      title: 'Resolvemos de primeira',
      desc: 'Diagnóstico técnico antes de trocar qualquer peça. Você paga pelo que realmente precisa, sem adivinhações ou tentativa e erro.'
    },
    {
      icon: <RotateCcw className="w-7 h-7 text-secondary" />,
      bg: 'bg-amber-50 border-amber-100',
      title: 'Se voltar, a gente volta',
      desc: 'Nosso pós-atendimento existe para resolver qualquer retorno. Técnico com nome, empresa com endereço físico e serviço garantido.'
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-500" />,
      bg: 'bg-yellow-50 border-yellow-100',
      title: 'Rápido de verdade',
      desc: 'Atendimento imediato, conserto em até 24 horas e instalação de equipamentos novos sem semanas de espera angustiante.'
    },
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      bg: 'bg-blue-50 border-blue-100',
      title: 'Gente, não robô',
      desc: 'Do primeiro "oi" no WhatsApp até a visita técnica na sua casa, você fala diretamente com profissionais que dominam o assunto.'
    }
  ];

  return (
    <section id="diferenciais" className="py-16 md:py-24 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Por que escolher a Pressurize Prime?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed text-pretty">
            Enquanto outros barateiam a mão de obra e somem quando surgem problemas, nós assumimos compromisso integral com o resultado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${diff.bg}`}>
                  {diff.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 tracking-tight text-balance">
                  {diff.title}
                </h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty font-normal">
                  {diff.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
