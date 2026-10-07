import React, { useState, useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { Shield, Clock, Wrench, ThumbsUp, Medal, Zap, HeartHandshake, CheckCircle2, Star } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const DiferenciaisPage: React.FC = () => {
  const { settings, pages } = useSiteData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pageImages = (pages['diferenciais']?.sections?.images as any) || {};
  const bgImages = [
    pageImages.hero1 || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    pageImages.hero2 || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80',
    pageImages.hero3 || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80'
  ];
  const ctaImage = pageImages.cta || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80';

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const defaultDiferenciais = [
    {
      icon: <Medal className="w-8 h-8 text-primary" />,
      title: "Qualidade Premium",
      description: "Utilizamos apenas peças originais e ferramentas de alta precisão em nossos serviços."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Segurança Absoluta",
      description: "Técnicos certificados NR-35 e NR-10. Todos os testes de estanqueidade rigorosamente executados."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Rapidez no Atendimento",
      description: "Amplo estoque de peças que nos permite resolver a maioria dos problemas na primeira visita."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-rose-500" />,
      title: "Atendimento Humanizado",
      description: "Sem robôs. Você fala diretamente com nossa equipe técnica pronta para ajudar."
    },
    {
      icon: <Wrench className="w-8 h-8 text-slate-700" />,
      title: "Tecnologia de Ponta",
      description: "Equipamentos de diagnóstico avançado para localizar o problema sem quebra-quebra desnecessário."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Pontualidade Britânica",
      description: "Chegamos no horário combinado. Valorizamos o seu tempo tanto quanto você."
    }
  ];

  const defaultIcons = [
    <Medal className="w-8 h-8 text-primary" />,
    <Shield className="w-8 h-8 text-emerald-500" />,
    <Zap className="w-8 h-8 text-amber-500" />,
    <HeartHandshake className="w-8 h-8 text-rose-500" />,
    <Wrench className="w-8 h-8 text-slate-700" />,
    <Clock className="w-8 h-8 text-blue-500" />
  ];

  const cmsDiferenciais = (pages['diferenciais']?.sections?.diferenciais as any)?.items;
  const items = cmsDiferenciais || defaultDiferenciais;

  const diferenciais = items.map((item: any, idx: number) => ({
    icon: defaultIcons[idx % defaultIcons.length],
    title: item.title,
    description: item.desc || item.description
  }));

  const comparativo = pages['diferenciais']?.sections?.comparativo as any;
  const compTitle = comparativo?.title || 'A Diferença Pressurize Prime';
  const compSubtitle = comparativo?.subtitle || 'Veja por que nossos clientes não trocam nosso serviço.';
  const compItems = comparativo?.items || [
    { bad: "Orçamentos surpresa após iniciar", good: "Diagnóstico claro e orçamento fixo" },
    { bad: "Peças paralelas sem procedência", good: "100% Peças Originais de fábrica" },
    { bad: "Garantia apenas 'de boca'", good: "Garantia documentada em Nota Fiscal" },
    { bad: "Atrasos e desmarcações", good: "Pontualidade e respeito à agenda" },
    { bad: "Sujeira após o serviço", good: "Limpeza completa do local de trabalho" }
  ];

  const depoimentos = pages['diferenciais']?.sections?.depoimentos as any;
  const depTitle = depoimentos?.title || 'O que dizem sobre nós';
  const depSubtitle = depoimentos?.subtitle || 'A satisfação dos nossos clientes é nossa melhor propaganda.';
  const depItems = depoimentos?.items || [];


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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            {pages['diferenciais']?.hero_badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
                <span>{pages['diferenciais'].hero_badge}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg text-white">
              {pages['diferenciais']?.hero_title || (
                <>Por que escolher a <span className="text-primary">nossa solução?</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {pages['diferenciais']?.hero_subtitle || 'Não somos apenas instaladores. Somos uma engenharia de conforto focada em resolver o seu problema hídrico ou térmico de forma definitiva.'}
            </p>
          </div>
          
          {/* Decorative Bottom Line */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Grid de Diferenciais */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diferenciais.map((item: any, index: number) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparativo */}
        <div className="bg-white py-16 md:py-24 lg:py-28 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 whitespace-pre-wrap">{compTitle}</h2>
              <p className="text-slate-600 whitespace-pre-wrap">{compSubtitle}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 border-b border-slate-200">
                <div className="p-6 font-bold text-slate-500 text-center border-r border-slate-200">Curiosos / Amadores</div>
                <div className="p-6 font-bold text-primary text-center bg-blue-50/50">Pressurize Prime</div>
              </div>
              
              {compItems.map((row: any, idx: number) => (
                <div key={idx} className="grid grid-cols-2 border-b border-slate-100 last:border-0">
                  <div className="p-4 sm:p-6 text-slate-500 border-r border-slate-200 flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs">✕</span>
                    <span className="text-sm sm:text-base whitespace-pre-wrap">{row.bad}</span>
                  </div>
                  <div className="p-4 sm:p-6 text-slate-900 bg-blue-50/20 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm sm:text-base font-medium whitespace-pre-wrap">{row.good}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prova Social */}
        {depItems.length > 0 && (
          <div className="bg-slate-50 py-16 md:py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 whitespace-pre-wrap">{depTitle}</h2>
                <p className="text-slate-600 whitespace-pre-wrap">{depSubtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {depItems.map((dep: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-slate-600 italic mb-6">"{dep.desc}"</p>
                    <p className="font-bold text-slate-900">— {dep.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={ctaImage}
              alt="Instalação Segura"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay Azul Premium */}
            <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-primary/70 to-slate-950/80"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
              {pages['diferenciais']?.sections?.finalCta?.title || 'Não arrisque sua segurança com amadores.'}
            </h2>
            <div className="flex justify-center">
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="bg-secondary hover:bg-secondary-dark text-slate-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 text-lg flex items-center justify-center gap-2 group">
                <ThumbsUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                {pages['diferenciais']?.sections?.finalCta?.cta || 'Agendar Atendimento Seguro'}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
