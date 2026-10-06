import React, { useState, useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { MessageSquare, Wrench, CheckCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const HowItWorksPage: React.FC = () => {
  const { settings, pages } = useSiteData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const bgImages = [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: "1",
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Conte o problema",
      description: "Pelo WhatsApp ou telefone. Se puder, mande uma foto ou vídeo do equipamento."
    },
    {
      number: "2",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Vistoria e orçamento",
      description: "O técnico avalia no local e passa o valor antes de começar. Se você aprovar o serviço, a taxa de vistoria e locomoção não é cobrada."
    },
    {
      number: "3",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Problema resolvido",
      description: "Conserto ou instalação de imediato ou em até 24h, com garantia."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white py-32 relative overflow-hidden flex flex-col justify-center min-h-[45vh]">
          {/* Background Images Carousel */}
          {bgImages.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${activeImageIndex === idx ? 'opacity-100' : 'opacity-0 z-0'}`}
            >
              <img
                src={img}
                alt=""
                aria-hidden="true"
                className={`w-full h-full object-cover ${activeImageIndex === idx ? 'animate-hero-bg-pan' : ''}`}
              />
              {/* Overlay suave combinando com o azul escuro */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />
            </div>
          ))}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg text-white">
              {pages['como-funciona']?.hero_title || (
                <>Como <span className="text-primary">funciona?</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {pages['como-funciona']?.hero_subtitle || 'Um processo simples, rápido e transparente. Desenhado para poupar seu tempo e garantir sua tranquilidade.'}
            </p>
          </div>
          
          {/* Decorative Bottom Line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Processo Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group relative flex flex-col h-full">
                
                {/* Número no canto */}
                <div className="absolute -top-5 -right-5 md:-right-4 w-12 h-12 bg-primary rounded-full text-white font-bold flex items-center justify-center border-4 border-slate-50 text-xl shadow-md z-10">
                  {step.number}
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regiões Atendidas */}
        <div className="bg-slate-50 py-16 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Regiões atendidas</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Atendemos São Paulo e Grande São Paulo, com atendimento prioritário em Brooklin, Vila Olímpia, Vila Clementino, Chácara Santo Antônio, Morumbi, Alphaville, Barueri e Santana de Parnaíba.
            </p>
          </div>
        </div>

        {/* Nossos compromissos */}
        <div className="bg-white py-24 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Nossos compromissos
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                O que você pode cobrar da gente.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Compromisso 1 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Orçamento antes do serviço.</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Você sabe o valor antes de qualquer peça ser trocada.
                </p>
              </div>

              {/* Compromisso 2 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Vistoria que sai de graça.</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Aprovou o serviço, a taxa de vistoria e locomoção não é cobrada.
                </p>
              </div>

              {/* Compromisso 3 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Garantia de verdade.</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  3 meses em peças e 30 dias na mão de obra.
                </p>
              </div>

              {/* Compromisso 4 */}
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Pagamento facilitado.</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pix, débito ou crédito em até 10x sem juros.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-24 overflow-hidden border-y border-slate-800">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80" 
              alt="Iniciar Atendimento" 
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay Azul Premium */}
            <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-primary/70 to-slate-950/80"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
              Pronto para começar?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
              Nossa equipe de atendimento está a um clique de distância para resolver seu problema.
            </p>
            <div className="flex justify-center">
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="bg-secondary hover:bg-secondary-dark text-slate-950 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Iniciar Atendimento
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
