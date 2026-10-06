import React, { useState, useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { MessageSquare, Wrench, CheckCircle, Smile } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const HowItWorksPage: React.FC = () => {
  const { settings } = useSiteData();
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
      title: "Contato e Agendamento",
      description: "Você entra em contato conosco pelo WhatsApp ou telefone. Um especialista entenderá sua necessidade inicial e agendará uma visita técnica no melhor horário para você."
    },
    {
      number: "2",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Diagnóstico Especializado",
      description: "Nosso técnico uniformizado comparece ao local, analisa o equipamento ou a infraestrutura e emite um diagnóstico técnico detalhado e transparente."
    },
    {
      number: "3",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Orçamento e Aprovação",
      description: "Apresentamos o orçamento fixo com todas as peças necessárias. Sem surpresas ou custos ocultos. Com sua aprovação, iniciamos o serviço na mesma hora ou agendamos."
    },
    {
      number: "4",
      icon: <Smile className="w-8 h-8 text-primary" />,
      title: "Solução e Garantia",
      description: "O serviço é executado com peças originais e testado exaustivamente. Entregamos a ordem de serviço, nota fiscal e o termo de garantia."
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
              Como <span className="text-primary">funciona?</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Um processo simples, rápido e transparente. Desenhado para poupar seu tempo e garantir sua tranquilidade.
            </p>
          </div>
          
          {/* Decorative Bottom Line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Processo Visual */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-6">
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

        {/* Benefícios do Processo */}
        <div className="bg-slate-50 py-24 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              O que você ganha com o nosso processo?
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
              Nosso método foi desenhado para eliminar frustrações e garantir a melhor experiência.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-5xl font-extrabold bg-gradient-to-br from-primary via-blue-500 to-sky-400 bg-clip-text text-transparent mb-6 inline-block opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all">
                  Zero
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Dor de cabeça</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Nós cuidamos de tudo de ponta a ponta: da avaliação criteriosa à limpeza final do local após a instalação.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-5xl font-extrabold bg-gradient-to-br from-primary via-blue-500 to-sky-400 bg-clip-text text-transparent mb-6 inline-block opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all">
                  100%
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Transparência</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Orçamento claro e fixo. Você sabe exatamente o que está pagando e por quê, sem custos ocultos de última hora.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-5xl font-extrabold bg-gradient-to-br from-primary via-blue-500 to-sky-400 bg-clip-text text-transparent mb-6 inline-block opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all">
                  Paz
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">De Espírito</h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  Garantia total e documentada do serviço prestado para você tomar seu banho tranquilo, todos os dias.
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
