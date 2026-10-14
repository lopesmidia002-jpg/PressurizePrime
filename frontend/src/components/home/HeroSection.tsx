import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { telHref } from '../../services/phone';

export const HeroSection: React.FC = () => {
  const { settings, services, pages } = useSiteData();
  const [activeTab, setActiveTab] = useState(0);

  const displayServices = services && services.length > 0 ? services : [
    { title: 'Pressão e calor perfeitos para o seu lar', short_description: 'Instalação, manutenção e garantia estendida em São Paulo. Atendimento técnico no mesmo dia.', image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80', icon_name: 'droplets' }
  ];

  useEffect(() => {
    if (displayServices.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % displayServices.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayServices.length]);

  const fallbackImages = [
    '/images/pressurizador.webp',
    '/images/aquecedor-a-gas.webp',
    '/images/aquecedor-solar.webp',
    '/images/aquecedor-eletrico.webp'
  ];

  const fallbackImagesSm = [
    '/images/pressurizador-sm.webp',
    '/images/aquecedor-a-gas-sm.webp',
    '/images/aquecedor-solar-sm.webp',
    '/images/aquecedor-eletrico-sm.webp'
  ];

  return (
    <section 
      role="banner"
      aria-label="Seção principal - Pressurize Prime"
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-28 border-b border-slate-200 min-h-[65vh] md:min-h-[70vh] flex flex-col justify-center transition-all duration-700"
    >
      {/* Imagem de Fundo com Transição Suave e Picture Responsivo */}
      {displayServices.map((srv, idx) => {
        const fullImg = srv.image_url ? (srv.image_url.includes('unsplash') ? fallbackImages[idx % fallbackImages.length] : srv.image_url.replace(/\.jpg$/, '.webp')) : fallbackImages[idx % fallbackImages.length];
        const smImg = fullImg.includes('pressurizador') ? '/images/pressurizador-sm.webp' : (fullImg.includes('aquecedor-a-gas') ? '/images/aquecedor-a-gas-sm.webp' : (fullImg.includes('aquecedor-solar') ? '/images/aquecedor-solar-sm.webp' : (fullImg.includes('aquecedor-eletrico') ? '/images/aquecedor-eletrico-sm.webp' : fallbackImagesSm[idx % fallbackImagesSm.length])));

        const isFirst = idx === 0;
        const isActive = activeTab === idx;

        return (
          <div 
            key={idx}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${isFirst && activeTab === 0 ? 'opacity-100' : (isActive ? 'opacity-100 transition-opacity duration-700' : 'opacity-0 z-0 transition-opacity duration-700')}`}
          >
            <picture>
              <source media="(max-width: 640px)" srcSet={smImg} type="image/webp" width="480" height="358" />
              <img
                src={fullImg}
                alt={srv.title ? `${srv.title} - Pressurize Prime, especialistas em pressurização e aquecimento` : 'Equipamentos de Pressurização e Aquecimento de Água em São Paulo'}
                width="1280"
                height="720"
                loading={isFirst ? "eager" : "lazy"}
                fetchPriority={isFirst ? "high" : "low"}
                decoding={isFirst ? "sync" : "async"}
                className={`w-full h-full object-cover object-center ${isActive ? 'hidden md:block md:animate-hero-bg-pan' : ''} ${isFirst && activeTab === 0 ? 'block' : ''}`}
              />
            </picture>
            {/* Overlay otimizado: mais claro no centro/topo do mobile para dar destaque à foto */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/90 sm:from-slate-900/80 sm:via-slate-900/50 sm:to-slate-900/90" />
          </div>
        );
      })}

      {/* Conteúdo Centralizado */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* O fundo de imagens continuará animando através do activeTab no map superior, 
            mas o conteúdo abaixo ficará fixo sem piscar. */}
        <div className="flex flex-col items-center gap-6">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            {pages['home']?.hero_badge || 'Especialistas em Aquecedores e Pressurizadores'}
          </div>

          {/* Título H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance drop-shadow-lg">
            {pages['home']?.hero_title || 'Água na temperatura certa e na pressão que você merece.'}
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
            {pages['home']?.hero_subtitle || 'Conserto, venda e instalação de pressurizadores e aquecedores a gás, solar e elétrico em São Paulo. Atendimento rápido, peças originais e garantia formal em todos os serviços.'}
          </p>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mt-4">
            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar orçamento pelo WhatsApp - Pressurize Prime"
              className="relative overflow-hidden bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm group hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" aria-hidden="true" />
              <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
              <span>{pages['home']?.hero_cta_primary || 'Chamar no WhatsApp'}</span>
            </a>

            <a
              href={telHref(settings.phone_raw)}
              aria-label={`Ligar agora para a Pressurize Prime: ${settings.phone_number}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{pages['home']?.hero_cta_secondary || 'Ligar agora'}</span>
            </a>
          </div>

          {/* Microcopy Oficial */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm mt-4 font-medium">
            <span>{pages['home']?.microcopy || 'Atendimento técnico de segunda a sexta, das 8h às 19h. Conserto em até 24 horas.'}</span>
          </div>

        </div>
      </div>

      {/* Ondas suaves na base */}
      <div className="absolute bottom-0 inset-x-0 h-16 overflow-hidden pointer-events-none opacity-25">
        <svg className="absolute -bottom-2 left-0 w-[200%] h-14 text-white animate-bg-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C150,90 350,10 500,55 C650,100 900,20 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};
