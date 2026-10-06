import React from 'react';
import { DollarSign, CheckCircle2, ShieldAlert, CreditCard } from 'lucide-react';

export const CommitmentsSection: React.FC = () => {
  const commitments = [
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      bg: 'bg-blue-50 border-blue-200',
      title: 'Orçamento antes do serviço',
      desc: 'Você sabe o valor exato antes de qualquer componente ser trocado. Sem surpresas na conta final.'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-secondary" />,
      bg: 'bg-amber-50 border-amber-200',
      title: 'Vistoria que sai de graça',
      desc: 'Aprovando o serviço com o nosso técnico durante a visita, a taxa de vistoria e locomoção não é cobrada.'
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200',
      title: 'Garantia de verdade',
      desc: '3 meses de garantia integral nas peças instaladas e 30 dias na mão de obra com assistência dedicada.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-500" />,
      bg: 'bg-yellow-50 border-yellow-200',
      title: 'Pagamento facilitado',
      desc: 'Parcelamento em até 10x sem juros no cartão de crédito, com opção de pagamento no Pix ou débito.'
    }
  ];

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            O que você pode cobrar da gente
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed text-pretty">
            Regras claras, garantia por escrito e respeito ao seu investimento desde o primeiro contato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((c, i) => (
            <div
              key={i}
              className="bg-slate-50/60 rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${c.bg}`}>
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight text-balance">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty font-normal">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
