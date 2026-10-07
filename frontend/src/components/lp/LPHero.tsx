import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import type { LPPageDetail } from '../../services/lpData';
import { ShieldCheck, MessageSquare, Phone, AlertTriangle, Sparkles, Droplets, CheckCircle2 } from 'lucide-react';

interface LPHeroProps {
  lp: LPPageDetail;
}

export const LPHero: React.FC<LPHeroProps> = ({ lp }) => {
  const { settings, pages } = useSiteData();
  const [searchParams] = useSearchParams();

  const cmsPage = pages[lp.slug];

  // Detecção de variação de H1 por grupo de anúncio via URL (?h1=conserto ou ?intent=conserto)
  const h1Param = searchParams.get('h1') || searchParams.get('intent');
  let currentH1 = cmsPage?.hero_title || lp.defaultH1;

  if (h1Param && lp.h1Variants) {
    const key = h1Param.toLowerCase() as keyof typeof lp.h1Variants;
    if (lp.h1Variants[key]) {
      currentH1 = lp.h1Variants[key]!;
    }
  }

  const currentSubtitle = cmsPage?.hero_subtitle || lp.subtitle;
  const currentMicrocopy = cmsPage?.microcopy || lp.microcopy;
  const ctaPrimary = cmsPage?.hero_cta_primary || 'Chamar no WhatsApp agora';
  const ctaSecondary = cmsPage?.hero_cta_secondary || 'Ligar agora';
  const heroImage = (cmsPage?.sections?.image_url as any) || lp.image_url;

  const overlayTitle = (cmsPage?.sections?.heroOverlay as any)?.title || 'Instalação e Reparo Oficial';
  const overlaySubtitle = (cmsPage?.sections?.heroOverlay as any)?.subtitle || 'Peças com garantia de 3 meses';
  const overlayBadge = (cmsPage?.sections?.heroOverlay as any)?.badge || 'Até 24h';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/70 pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna da Copy e Conversão (7 colunas) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge do Tipo de Serviço */}
            <div className="inline-flex items-center gap-2 bg-white/90 border border-slate-200/90 text-slate-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-5 shadow-2xs backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>{cmsPage?.hero_badge || lp.badge}</span>
            </div>

            {/* H1 Dinâmico por Grupo de Anúncio / Busca */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.15] text-balance">
              {currentH1}
            </h1>

            {/* Subtítulo Específico da LP */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-[1.65] max-w-2xl text-pretty">
              {currentSubtitle}
            </p>

            {/* Botões de Ação Imediata */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <a
                href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Estou%20na%20página%20de%20${encodeURIComponent(lp.name)}%20e%20gostaria%20de%20um%20diagnóstico%20técnico.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-secondary hover:bg-secondary-dark text-slate-950 font-extrabold px-6 py-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-base group hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{ctaPrimary}</span>
              </a>

              <a
                href={`tel:${settings.phone_raw}`}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold px-6 py-4 rounded-xl shadow-xs transition-all text-center flex items-center justify-center gap-2 text-base hover:border-primary hover:text-primary"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>{ctaSecondary}</span>
              </a>
            </div>

            {/* Microcopy Oficial da LP */}
            <p className="mt-4 text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{currentMicrocopy}</span>
            </p>

            {/* Alerta de Segurança Discreto (Exclusivo para Aquecedor a Gás) */}
            {lp.safetyAlert && (
              <div className="mt-6 w-full max-w-xl bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-left shadow-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                    Alerta de Segurança Importante
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {lp.safetyAlert}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Coluna da Imagem Técnica do Produto com Efeito Motion (5 colunas) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Moldura da Fotografia Técnica */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200/90 shadow-2xl bg-white group">
                <img
                  src={heroImage}
                  alt={`Equipamento de ${lp.name}`}
                  className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
                />

                {/* Efeito Motion de Gota d'Água sobreposto */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="relative w-12 h-15 bg-gradient-to-b from-blue-400 to-primary rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-lg border border-white/80 flex items-center justify-center animate-water-drop">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Selo Inferior de Garantia Técnica */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3.5 rounded-2xl border border-slate-700/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/30 flex items-center justify-center text-amber-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{overlayTitle}</div>
                      <div className="text-[11px] text-slate-300">{overlaySubtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-secondary text-slate-950 px-2 py-1 rounded">
                    {overlayBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
