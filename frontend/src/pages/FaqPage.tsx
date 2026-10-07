import React, { useState, useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { Search, ChevronDown, MessageSquare } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const FaqPage: React.FC = () => {
  const { settings, pages } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pageImages = (pages['duvidas']?.sections?.images as any) || {};
  const bgImages = [
    pageImages.hero1 || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
    pageImages.hero2 || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80',
    pageImages.hero3 || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80'
  ];
  const ctaImage = pageImages.cta || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80';

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const defaultFaqs = [
    {
      question: "De quanto em quanto tempo devo fazer manutenção?",
      answer: "O recomendado pelos fabricantes é uma revisão por ano, ou conforme o manual do seu modelo."
    },
    {
      question: "Meu aquecedor desliga no meio do banho. O que pode ser?",
      answer: "Pode ser sensor, exaustão obstruída, baixa pressão de água ou gás. Só o diagnóstico no local confirma."
    },
    {
      question: "Vocês trabalham com quais marcas?",
      answer: "Atendemos aquecedores Rinnai, Rheem e Komeco, entre outras."
    },
    {
      question: "Atendem gás natural e GLP?",
      answer: "Sim, os dois. Só não executamos tubulação de gás: o ponto precisa estar pronto no local."
    },
    {
      question: "Qual a garantia?",
      answer: "3 meses em peças e 30 dias na mão de obra."
    }
  ];

  const cmsFaqs = (pages['duvidas']?.sections?.duvidas as any)?.items;
  const faqs: { question: string; answer: string }[] = cmsFaqs?.map((item: any) => ({
    question: item.title,
    answer: item.desc
  })) || defaultFaqs;

  const filteredFaqs = faqs.filter((faq: { question: string; answer: string }) => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {pages['duvidas']?.hero_badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
                <span>{pages['duvidas'].hero_badge}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg text-white">
              {pages['duvidas']?.hero_title || (
                <>Perguntas <span className="text-primary">frequentes</span></>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              {pages['duvidas']?.hero_subtitle || 'Tire suas dúvidas rapidamente. Encontre respostas para as perguntas mais comuns dos nossos clientes.'}
            </p>
            
            {/* Barra de Busca */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 transition-all text-lg backdrop-blur-sm"
                placeholder="Pesquisar uma dúvida..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {(pages['duvidas']?.sections?.duvidas as any)?.title || 'Dúvidas Frequentes'}
            </h2>
            <p className="text-lg text-slate-600">
              {(pages['duvidas']?.sections?.duvidas as any)?.subtitle || 'As perguntas que mais recebemos.'}
            </p>
          </div>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Nenhuma pergunta encontrada para "{searchTerm}". Tente usar outros termos.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
                  >
                    <button
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className={`font-bold text-lg pr-4 ${isOpen ? 'text-primary' : 'text-slate-900'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Seção de Contato Extra */}
        <div className="relative py-24 overflow-hidden border-y border-slate-800">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={ctaImage}
              alt="Atendimento Rápido"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay Azul Premium */}
            <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-primary/70 to-slate-950/80"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
              {pages['duvidas']?.sections?.finalCta?.title || 'Ainda tem alguma dúvida?'}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md whitespace-pre-wrap">
              {pages['duvidas']?.sections?.finalCta?.subtitle || 'Nossa equipe de atendimento humano está pronta para responder qualquer pergunta que não esteja na lista.'}
            </p>
            <div className="flex justify-center">
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="bg-secondary hover:bg-secondary-dark text-slate-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {pages['duvidas']?.sections?.finalCta?.cta || 'Perguntar no WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
