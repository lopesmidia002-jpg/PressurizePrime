import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { Gauge, Flame, Sun, Zap, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  const { services } = useSiteData();

  const getServiceVisuals = (slug: string) => {
    switch (slug) {
      case 'pressurizador':
        return {
          icon: <Gauge className="w-8 h-8 text-primary" />,
          accentBg: 'bg-blue-50 text-primary border-blue-200',
          btnText: 'Ver pressurizador',
          gradient: 'from-blue-600/10 to-transparent'
        };
      case 'aquecedor-a-gas':
        return {
          icon: <Flame className="w-8 h-8 text-amber-500" />,
          accentBg: 'bg-amber-50 text-amber-600 border-amber-200',
          btnText: 'Ver aquecedor a gás',
          gradient: 'from-amber-600/10 to-transparent'
        };
      case 'aquecedor-solar':
        return {
          icon: <Sun className="w-8 h-8 text-amber-400" />,
          accentBg: 'bg-yellow-50 text-amber-700 border-yellow-200',
          btnText: 'Ver aquecedor solar',
          gradient: 'from-yellow-500/10 to-transparent'
        };
      case 'aquecedor-eletrico':
        return {
          icon: <Zap className="w-8 h-8 text-blue-600" />,
          accentBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
          btnText: 'Ver aquecedor elétrico',
          gradient: 'from-indigo-600/10 to-transparent'
        };
      default:
        return {
          icon: <ShieldCheck className="w-8 h-8 text-primary" />,
          accentBg: 'bg-slate-50 text-slate-700 border-slate-200',
          btnText: 'Conhecer serviço',
          gradient: 'from-slate-600/10 to-transparent'
        };
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-tight text-balance">
            Nossos Serviços Especializados
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed text-pretty">
            Diagnóstico de precisão, peças originais e garantia por escrito em São Paulo. Escolha seu equipamento abaixo:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => {
            const visual = getServiceVisuals(service.slug);

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${visual.gradient} rounded-bl-full pointer-events-none`}></div>

                <div>
                  {/* Foto Realística do Produto com Badge de Ícone Sobreposta */}
                  <div className="relative mb-5 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 group-hover:border-primary/40 transition-colors">
                    <img
                      src={service.image_url || '/logo.jpeg'}
                      alt={service.title}
                      className="w-full h-44 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center border shadow-xs backdrop-blur-md ${visual.accentBg}`}>
                      {visual.icon}
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-primary transition-colors text-balance">
                    {service.title}
                  </h3>

                  {/* Copy Sintoma/Solução Oficial do PDF */}
                  <p className="text-sm text-slate-600 leading-[1.65] mb-6 text-pretty font-normal">
                    {service.short_description}
                  </p>

                  {/* Lista de Recursos / Diferenciais */}
                  {service.features && (
                    <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                      {(service.features || []).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Botão de Acesso à LP */}
                <Link
                  to={`/${service.slug}`}
                  className="mt-4 inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-primary text-slate-800 hover:text-white font-semibold text-xs tracking-wide transition-all border border-slate-200/80 group-hover:border-primary"
                >
                  <span>{visual.btnText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
