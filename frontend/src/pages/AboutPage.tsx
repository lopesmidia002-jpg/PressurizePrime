import React, { useState, useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { ShieldCheck, Droplets, Wrench, Flame, Target, Eye, Heart } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const AboutPage: React.FC = () => {
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
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90" />
            </div>
          ))}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg text-white">
              Sobre a <span className="text-primary">Pressurize Prime</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              O ofício especializado em pressão de água e controle térmico. Uma década garantindo conforto e segurança hídrica em São Paulo.
            </p>
          </div>
          
          {/* Decorative Bottom Line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Quem Somos / História */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-blue-50 text-primary font-bold px-3 py-1 rounded-full text-sm">
                Nossa História
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Elevando o padrão técnico do mercado</h2>
              <div className="prose prose-slate text-slate-600 text-lg">
                <p>
                  Fundada na capital paulista, a Pressurize Prime nasceu da percepção de que muitos problemas hidráulicos residenciais e comerciais — especialmente banhos frios ou com pouca pressão — eram tratados de forma amadora.
                </p>
                <p>
                  Nossa missão desde o primeiro dia foi elevar o padrão técnico do mercado de <strong>aquecimento a gás</strong> e <strong>pressurização de redes</strong>. Não queríamos apenas ser "instaladores", mas sim especialistas certificados capazes de dimensionar e resolver qualquer desafio hidráulico com precisão cirúrgica.
                </p>
                <p>
                  Hoje, atendemos milhares de clientes satisfeitos em condomínios de alto padrão, residências, academias e hotéis, sempre utilizando peças originais das melhores marcas do mercado mundial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <Droplets className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Especialistas em Pressão</h3>
                <p className="text-sm text-slate-600">Dimensionamento preciso para evitar rompimentos ou baixa vazão em todos os pontos.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <Flame className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Controle Térmico</h3>
                <p className="text-sm text-slate-600">Certificação completa em aquecedores a gás, elétricos, solares e conjugados.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <Wrench className="w-10 h-10 text-slate-700 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Técnicos de Fábrica</h3>
                <p className="text-sm text-slate-600">Treinamento oficial nas marcas Rinnai, Rowa, Lorenzetti, Komeco e outras.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Garantia Comprovada</h3>
                <p className="text-sm text-slate-600">Nota fiscal e garantia real de serviço prestado em domicílio com respaldo técnico.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="bg-white py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Nosso Propósito</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">O que nos move e orienta cada atendimento que realizamos.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Missão</h3>
                <p className="text-slate-600">
                  Garantir segurança hídrica e conforto térmico excepcional, oferecendo soluções técnicas precisas e atendimento ágil e resolutivo para cada cliente.
                </p>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Visão</h3>
                <p className="text-slate-600">
                  Ser reconhecida como a maior e mais confiável autoridade em pressurização e aquecimento da Grande São Paulo até 2028.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Valores</h3>
                <p className="text-slate-600">
                  Transparência absoluta, excelência técnica, pontualidade britânica, respeito ao cliente e utilização de peças 100% originais.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Números */}
        <div className="bg-slate-950 py-20 border-y border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center md:divide-x divide-slate-800">
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-sm">10+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Anos de Experiência</div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-sm">5.000+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clientes Atendidos</div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-sm">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comprometimento</div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center px-4">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2 tracking-tight drop-shadow-sm">24h</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agilidade na Resposta</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80" 
              alt="Atendimento Especializado Pressurize Prime" 
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay Azul Premium */}
            <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-primary/70 to-slate-950/80"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
              Pronto para ter o banho perfeito?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
              Nossa equipe técnica altamente capacitada está aguardando o seu chamado para resolver seu problema hídrico de forma definitiva.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="bg-secondary hover:bg-secondary-dark text-slate-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Falar com um Especialista
              </a>
              <a href={`tel:${settings.phone_raw}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
