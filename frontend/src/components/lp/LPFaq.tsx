import React, { useState } from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { ChevronDown } from 'lucide-react';

interface LPFaqProps {
  lp: LPPageDetail;
}

export const LPFaq: React.FC<LPFaqProps> = ({ lp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            {lp.faqsTitle || `Perguntas Frequentes sobre ${lp.name}`}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            {lp.faqsIntro || 'Dúvidas mais recorrentes solucionadas pelo nosso corpo técnico.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {lp.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`bg-slate-50/70 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/40 shadow-sm ring-1 ring-primary/10 bg-white'
                    : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`lp-faq-answer-${idx}`}
                  id={`lp-faq-btn-${idx}`}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-primary transition-colors focus:outline-none cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg tracking-tight text-balance">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 pointer-events-none ${
                      isOpen
                        ? 'bg-blue-50 border-blue-200 text-primary'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown className={`w-5 h-5 pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <div
                  id={`lp-faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`lp-faq-btn-${idx}`}
                  className={`faq-accordion-grid ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-accordion-content">
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-[1.65] text-pretty border-t border-slate-200/60">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
