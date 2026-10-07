import React from 'react';
import type { LPPageDetail } from '../../services/lpData';

interface LPObjectionsProps {
  lp: LPPageDetail;
}

export const LPObjections: React.FC<LPObjectionsProps> = ({ lp }) => {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            {lp.objectionsTitle || 'Objeções Respondidas'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            {lp.objectionsIntro || 'Respostas honestas para as perguntas mais comuns antes de contratar.'}
          </p>
        </div>

        <div className="space-y-5">
          {lp.objections.map((obj, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight text-balance">
                {obj.question}
              </h3>
              <p className="text-sm text-slate-600 leading-[1.65] text-pretty">
                {obj.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
