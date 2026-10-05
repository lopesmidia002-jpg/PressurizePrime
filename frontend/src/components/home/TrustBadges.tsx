import React from 'react';
import { Award, Clock, CreditCard, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Award className="w-6 h-6 text-secondary" />,
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Mais de 10 Anos',
      subtitle: 'De experiência prática em campo'
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Em até 24 Horas',
      subtitle: 'Conserto e instalação com agilidade'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-secondary" />,
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Até 10x sem juros',
      subtitle: 'No cartão, ou desconto no Pix'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Garantia Comprovada',
      subtitle: '3 meses peças e 30 dias mão de obra'
    }
  ];

  return (
    <section className="bg-white py-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${b.bg}`}>
                {b.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-[0.9375rem] tracking-tight leading-snug">{b.title}</h4>
                <p className="text-xs text-slate-500 font-normal leading-normal mt-0.5">{b.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
