import React from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { CheckCircle2, Wrench } from 'lucide-react';

interface LPSymptomsProps {
  lp: LPPageDetail;
}

export const LPSymptoms: React.FC<LPSymptomsProps> = ({ lp }) => {
  return (
    <section className="py-18 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            {lp.symptomsTitle}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Identifique os sinais de falha do seu equipamento antes que ocorra uma pane completa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lp.symptoms.map((symptom, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-3 hover:border-amber-400 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-800 leading-snug">
                {symptom}
              </span>
            </div>
          ))}
        </div>

        {/* Bloco de Fechamento Oficial da Copy */}
        <div className="mt-8 bg-blue-50/70 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Aviso Técnico de Campo
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {lp.symptomsClosing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
