import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { MapPin, CheckCircle } from 'lucide-react';

export const CoverageSection: React.FC = () => {
  const { settings, pages } = useSiteData();
  const coverageData = pages['home']?.sections?.coverage as any;

  const title = coverageData?.title || 'Regiões Atendidas em São Paulo';
  const subtitle = coverageData?.subtitle || 'Nossos técnicos atuam com rotas diárias otimizadas na capital e na Grande São Paulo, garantindo agilidade no deslocamento e pontualidade na visita técnica.';
  const badge = coverageData?.badge || 'Atendimento prioritário em condomínios e residências de médio e alto padrão';

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance whitespace-pre-wrap">
                {title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-[1.65] text-pretty font-normal whitespace-pre-wrap">
                {subtitle}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-pre-wrap">{badge}</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Bairros e Municípios com Atendimento Prioritário:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(coverageData?.locations || settings.address_coverage || []).map((bairro: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold text-slate-800 hover:border-primary transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span className="leading-snug text-left">{bairro}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
