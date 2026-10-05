import React from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { CheckCircle2 } from 'lucide-react';

interface LPWhyUsProps {
  lp: LPPageDetail;
}

export const LPWhyUs: React.FC<LPWhyUsProps> = ({ lp }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Nossos Diferenciais em {lp.name}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Segurança, conhecimento prático e garantia real para a sua tranquilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lp.whyUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-secondary flex items-center justify-center shrink-0 border border-amber-500/20 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
