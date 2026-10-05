import React from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { ShoppingBag, Wrench, RefreshCw } from 'lucide-react';

interface LPWhatWeDoProps {
  lp: LPPageDetail;
}

export const LPWhatWeDo: React.FC<LPWhatWeDoProps> = ({ lp }) => {
  const getBlockIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShoppingBag className="w-6 h-6 text-primary" />;
      case 1:
        return <Wrench className="w-6 h-6 text-secondary" />;
      default:
        return <RefreshCw className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            O que fazemos por você
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Da indicação correta do modelo até a manutenção de longo prazo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lp.whatWeDo.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-8 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {getBlockIcon(idx)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100/70 text-primary">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight text-balance">
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
