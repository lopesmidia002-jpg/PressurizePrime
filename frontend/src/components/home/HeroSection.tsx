import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, ShieldCheck } from 'lucide-react';

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
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80'
  ];

  return (
    <section 
      className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-28 border-b border-slate-200 min-h-[65vh] md:min-h-[70vh] flex flex-col justify-center transition-all duration-700"
    >
      {/* Imagem de Fundo com Transição Suave */}
      {displayServices.map((srv, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${activeTab === idx ? 'opacity-100' : 'opacity-0 z-0'}`}
        >
          <img
            src={srv.image_url || fallbackImages[idx % fallbackImages.length]}
            alt=""
            aria-hidden="true"
            className={`w-full h-full object-cover object-center ${activeTab === idx ? 'animate-hero-bg-pan' : ''}`}
          />
          {/* Overlay otimizado: mais claro no centro/topo do mobile para dar destaque à foto */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/90 sm:from-slate-900/80 sm:via-slate-900/50 sm:to-slate-900/90" />
        </div>
      ))}

      {/* Conteúdo Centralizado */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* O fundo de imagens continuará animando através do activeTab no map superior, 
            mas o conteúdo abaixo ficará fixo sem piscar. */}
        <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            Especialistas em Aquecedores e Pressurizadores
          </div>

          {/* Título H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance drop-shadow-lg">
            {pages['home']?.hero_title || 'Banho forte e água quente, sem esperar dias por um técnico.'}
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
            {pages['home']?.hero_subtitle || 'Venda, instalação e manutenção de pressurizadores e aquecedores a gás, solar e elétricos em São Paulo. Atendimento imediato, técnicos experientes e conserto em até 24 horas.'}
          </p>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mt-4">
            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm group hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <MessageSquare className="w-4.5 h-4.5 shrink-0" />
              <span>{pages['home']?.hero_cta_primary || 'Chamar no WhatsApp'}</span>
            </a>

            <a
              href={`tel:${settings.phone_raw}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{pages['home']?.hero_cta_secondary || 'Ligar agora'}</span>
            </a>
          </div>

          {/* Microcopy Oficial */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm mt-4 font-medium">
            <span>{pages['home']?.microcopy || 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.'}</span>
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
