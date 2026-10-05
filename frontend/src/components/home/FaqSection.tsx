import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs } = useSiteData();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Perguntas Frequentes
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-normal max-w-xl mx-auto text-pretty">
            Respostas diretas e transparentes sobre nosso atendimento em São Paulo.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map(faq => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-primary/40 shadow-sm ring-1 ring-primary/10'
                    : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-primary transition-colors focus:outline-none cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg tracking-tight text-balance">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 pointer-events-none ${
                      isOpen
                        ? 'rotate-180 bg-blue-50 border-blue-200 text-primary'
                        : 'rotate-0 bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 pointer-events-none" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`faq-accordion-grid ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-accordion-content">
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-[1.65] text-pretty border-t border-slate-100/90">
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
