import React from 'react';
import { DollarSign, CheckCircle2, ShieldAlert, CreditCard } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';

export const CommitmentsSection: React.FC = () => {
  const { pages } = useSiteData();
  const commitmentsData = pages['home']?.sections?.commitments as any;

  const title = commitmentsData?.title || 'O que você pode cobrar da gente';
  const subtitle = commitmentsData?.subtitle || 'Regras claras, garantia por escrito e respeito ao seu investimento desde o primeiro contato.';

  const defaultItems = [
    { title: 'Pontualidade', desc: 'Chegamos no horário combinado.' },
    { title: 'Limpeza', desc: 'Deixamos o local exatamente como encontramos.' },
    { title: 'Segurança', desc: 'Serviço realizado dentro de todas as normas técnicas vigentes (NBR).' },
    { title: 'Transparência', desc: 'Você acompanha cada etapa do conserto ou instalação.' }
  ];

  const items = commitmentsData?.items || defaultItems;

  const defaultIcons = [
    { icon: <DollarSign className="w-6 h-6 text-primary" />, bg: 'bg-blue-50 border-blue-200' },
    { icon: <CheckCircle2 className="w-6 h-6 text-secondary" />, bg: 'bg-amber-50 border-amber-200' },
    { icon: <ShieldAlert className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200' },
    { icon: <CreditCard className="w-6 h-6 text-amber-500" />, bg: 'bg-yellow-50 border-yellow-200' }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance whitespace-pre-wrap">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed text-pretty whitespace-pre-wrap">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((c: any, i: number) => {
            const iconData = defaultIcons[i % defaultIcons.length];
            return (
            <div
              key={i}
              className="bg-slate-50/60 rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${iconData.bg}`}>
                  {iconData.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight text-balance">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty font-normal">{c.desc}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
