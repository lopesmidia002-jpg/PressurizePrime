import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings } = useSiteData();

  return (
    <section className="relative overflow-hidden pt-24 pb-24 md:pt-36 md:pb-36 border-b border-slate-200 min-h-[80vh] flex items-center">
      {/* Imagem de Fundo com Efeito Ken Burns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover animate-hero-bg-pan"
        />
        {/* Overlay: mais translúcido para deixar a imagem aparecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-primary/60 to-slate-900/80" />
      </div>

      {/* Conteúdo Centralizado */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            Especialistas em Aquecedores e Pressurizadores
          </div>

          {/* Título H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
            Pressão e calor perfeitos para o seu lar
          </h1>

          {/* Subtítulo curto */}
          <p className="text-lg text-white/80 font-medium max-w-xl leading-relaxed">
            Instalação, manutenção e garantia estendida em São Paulo. Atendimento técnico no mesmo dia.
          </p>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mt-2">
            <a
              href={`https://wa.me/${settings.whatsapp_raw}?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento.`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm group hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <MessageSquare className="w-4.5 h-4.5 shrink-0" />
              <span>Pedir Orçamento Grátis</span>
            </a>

            <a
              href={`tel:${settings.phone_raw}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{settings.phone_number}</span>
            </a>
          </div>

          {/* Prova Social compacta */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 text-sm mt-1">
            <span className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="font-semibold text-white ml-1">4,9</span> no Google
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30" />
            <span>+10 anos de mercado</span>
            <span className="hidden sm:block w-px h-4 bg-white/30" />
            <span>+5.000 instalações</span>
          </div>

          {/* Status de Atendimento */}
          <p className="text-xs text-white/60 flex items-center justify-center gap-1.5 -mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Atendimento seg–sex, 8h às 19h · Conserto em até 24h
          </p>

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
