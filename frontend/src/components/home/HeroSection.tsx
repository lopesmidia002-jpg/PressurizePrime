import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Phone, MessageSquare, Sparkles, Waves, Flame, VolumeX } from 'lucide-react';

interface SplashEffect {
  id: number;
  x: number;
  y: number;
  droplets: Array<{ dx: string; dy: string; size: number; color: string }>;
}

export const HeroSection: React.FC = () => {
  const { settings, pages } = useSiteData();
  const pageData = pages.home;

  const [splashes, setSplashes] = useState<SplashEffect[]>([]);
  const [justClicked, setJustClicked] = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Gerar 8 a 10 micro-gotículas com direções randômicas de impacto
    const dropletsCount = 10;
    const droplets = Array.from({ length: dropletsCount }).map((_, i) => {
      const angle = (i * (360 / dropletsCount) + Math.random() * 25) * (Math.PI / 180);
      const distance = 40 + Math.random() * 65;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;
      const size = 4 + Math.random() * 5;
      const color = i % 3 === 0 ? '#cfa349' : i % 2 === 0 ? '#38bdf8' : '#004b93';
      return { dx, dy, size, color };
    });

    const newSplash: SplashEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      droplets,
    };

    setSplashes(prev => [...prev.slice(-3), newSplash]);
    setJustClicked(true);

    setTimeout(() => {
      setJustClicked(false);
    }, 1800);

    setTimeout(() => {
      setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
    }, 900);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80 pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      {/* 1. Camada de Gradientes e Fundos Animados (Hidrodinâmica Suave & Não-Intrusiva) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        {/* Gradiente Mesh 1: Azul Royal Pressurize */}
        <div className="absolute -top-32 left-8 w-[44rem] h-[44rem] bg-gradient-to-br from-blue-400/18 via-primary/8 to-transparent rounded-full blur-3xl animate-aurora-mesh"></div>

        {/* Gradiente Mesh 2: Ciano Hidráulico Cristalino atrás do Card */}
        <div className="absolute top-10 right-0 w-[42rem] h-[42rem] bg-gradient-to-bl from-cyan-300/18 via-sky-500/8 to-transparent rounded-full blur-3xl animate-aurora-mesh-slow"></div>

        {/* Gradiente Mesh 3: Calor Térmico Âmbar / Ouro */}
        <div className="absolute -bottom-24 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-amber-300/15 via-secondary/8 to-transparent rounded-full blur-3xl animate-aurora-mesh"></div>

        {/* Linhas Técnicas de Pressão e Isobaras Hidráulicas em Opacidade Discreta (3%) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] opacity-[0.035] pointer-events-none"
          viewBox="0 0 980 980"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="490" cy="490" r="180" stroke="#004b93" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="490" cy="490" r="290" stroke="#004b93" strokeWidth="1.5" />
          <circle cx="490" cy="490" r="410" stroke="#004b93" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="490" cy="490" r="480" stroke="#004b93" strokeWidth="1.5" />
        </svg>

        {/* Partículas Flutuantes e Micro-bolhas de Água Pressurizada */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Bolha 1: Azul Royal - Lado Esquerdo Superior */}
          <div className="absolute top-[62%] left-[6%] animate-particle-1 opacity-70">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-400/35 to-white/80 border border-white/60 shadow-xs backdrop-blur-2xs"></div>
          </div>
          {/* Bolha 2: Ciano Cristal - Centro-Esquerda */}
          <div className="absolute top-[40%] left-[22%] animate-particle-2 opacity-65" style={{ animationDelay: '2.2s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400/40 to-white/85 border border-white/50"></div>
          </div>
          {/* Bolha 3: Âmbar Térmico - Centro */}
          <div className="absolute top-[78%] left-[42%] animate-particle-3 opacity-60" style={{ animationDelay: '4.5s' }}>
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-400/30 to-white/70 border border-white/50"></div>
          </div>
          {/* Bolha 4: Ciano Claro - Lado Direito atrás do Card */}
          <div className="absolute top-[48%] right-[16%] animate-particle-1 opacity-65" style={{ animationDelay: '1.2s' }}>
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500/25 to-white/85 border border-white/70 shadow-xs backdrop-blur-2xs"></div>
          </div>
          {/* Bolha 5: Azul Claro - Lado Direito Inferior */}
          <div className="absolute top-[82%] right-[30%] animate-particle-2 opacity-50" style={{ animationDelay: '5.8s' }}>
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-sky-400/30 to-white/70 border border-white/40"></div>
          </div>
          {/* Bolha 6: Vidro Líquido - Lado Direito Superior */}
          <div className="absolute top-[32%] right-[6%] animate-particle-3 opacity-55" style={{ animationDelay: '3.6s' }}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400/30 to-white/80 border border-white/60"></div>
          </div>
        </div>

        {/* Ondas Líquidas Contínuas no Fundo da Seção */}
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 overflow-hidden pointer-events-none opacity-35">
          {/* Onda 1 */}
          <svg
            className="absolute -bottom-2 left-0 w-[200%] h-14 text-blue-500/20 animate-bg-wave-1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C150,90 350,10 500,55 C650,100 900,20 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
          {/* Onda 2 */}
          <svg
            className="absolute -bottom-1 left-0 w-[200%] h-12 text-primary/15 animate-bg-wave-2"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C200,20 400,90 600,40 C800,90 1000,30 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna Esquerda: Texto, Chips e Ações (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Título H1 Exato com Destaque Azul */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-[-0.035em] leading-[1.12] text-balance">
              A pureza e o fluxo do seu banho com a{' '}
              <span className="text-primary">pressão perfeita</span> e temperatura exata.
            </h1>

            {/* Subtítulo / Descritivo */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-[1.65] text-pretty">
              Elimine banhos fracos, vazão irregular e oscilações bruscas. A{' '}
              <strong className="font-semibold text-slate-900">Pressurize Prime</strong> projeta e instala
              redes hidráulicas pressurizadas inteligentes e centrais térmicas digitais com suavidade,
              silêncio e garantia estendida.
            </p>

            {/* Três Chips de Diferenciais Tecnológicos */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {/* Chip 1: Fluxo Contínuo */}
              <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">Fluxo Contínuo</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-0.5">
                    Sem Oscilação
                  </div>
                </div>
              </div>

              {/* Chip 2: Controle Térmico */}
              <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 hover:border-amber-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">Controle Térmico</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-0.5">
                    Painel Digital
                  </div>
                </div>
              </div>

              {/* Chip 3: Operação Inaudível */}
              <div className="bg-white/95 border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs flex items-center gap-3 hover:border-cyan-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <VolumeX className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 leading-tight">Operação Inaudível</div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-0.5">
                    Motor Submerso
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação Imediata */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={`https://wa.me/${settings.whatsapp_raw}?text=Olá!%20Gostaria%20de%20um%20projeto%20ou%20conserto%20para%20minha%20pressão%20e%20aquecimento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-7 py-4 rounded-xl shadow-lg shadow-amber-900/10 transition-all text-center flex items-center justify-center gap-2.5 text-base group hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{pageData?.hero_cta_primary || 'Chamar no WhatsApp'}</span>
              </a>

              <a
                href={`tel:${settings.phone_raw}`}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/90 font-semibold px-7 py-4 rounded-xl shadow-2xs transition-all text-center flex items-center justify-center gap-2 text-base hover:border-primary hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>{pageData?.hero_cta_secondary || 'Ligar agora'}</span>
              </a>
            </div>

            {/* Microcopy de Atendimento */}
            <div className="mt-5">
              <p className="text-xs sm:text-[0.8125rem] text-slate-500 font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{pageData?.microcopy || 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.'}</span>
              </p>
            </div>
          </div>

          {/* Coluna Direita: Card Interativo com Logotipo e Efeito de Impacto (col-span-5) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              onClick={handleCardClick}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-blue-900/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer select-none transition-all duration-300 hover:shadow-3xl hover:border-blue-200 active:scale-[0.985] group"
            >
              {/* Barra de Acento Dourada no Topo Direito */}
              <div className="absolute top-0 right-8 w-24 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-b-full pointer-events-none"></div>

              {/* Renderização de Respingo e Ondulações de Impacto na Posição do Clique */}
              {splashes.map(splash => (
                <div
                  key={splash.id}
                  className="absolute pointer-events-none z-30"
                  style={{ left: splash.x, top: splash.y }}
                >
                  {/* Onda de Pressão de Impacto */}
                  <div className="w-20 h-20 rounded-full border-2 border-blue-400 bg-blue-400/15 animate-card-ripple"></div>
                  {/* Micro-gotículas Projetadas */}
                  {splash.droplets.map((d, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full animate-splash-droplet"
                      style={
                        {
                          '--dx': d.dx,
                          '--dy': d.dy,
                          width: `${d.size}px`,
                          height: `${d.size}px`,
                          backgroundColor: d.color,
                          top: 0,
                          left: 0,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              ))}

              {/* Emblema Oficial da Marca em Formato Vertical */}
              <div className="relative z-10 flex flex-col items-center pt-2 pb-1">
                <img
                  src={settings.logo_vertical_url || '/logo-vertical.png'}
                  alt="Pressurize Prime"
                  className="w-60 sm:w-68 max-w-full h-auto object-contain pointer-events-none drop-shadow-xs transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Pílula Interativa de Clique no Rodapé do Card */}
              <div
                className={`relative z-10 mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs ${
                  justClicked
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 scale-105'
                    : 'bg-blue-50/90 hover:bg-blue-100 text-blue-700 border border-blue-200/70'
                }`}
              >
                {justClicked ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    <span>Impacto gerado! Pressão em fluxo total</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">💧</span>
                    <span>Clique no card para produzir impacto e respingos d'água</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


