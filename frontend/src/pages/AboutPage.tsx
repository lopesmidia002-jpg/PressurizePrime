import React, { useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { ShieldCheck, Droplets, Wrench, Users, Flame } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const AboutPage: React.FC = () => {
  const { settings } = useSiteData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-slate-950 to-slate-950"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Sobre a <span className="text-primary">Pressurize Prime</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              O ofício especializado em pressão de água e controle térmico. Uma década garantindo conforto e segurança hídrica em São Paulo.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Nossa História</h2>
              <div className="prose prose-slate text-slate-600">
                <p>
                  Fundada na capital paulista, a Pressurize Prime nasceu da percepção de que muitos problemas hidráulicos residenciais e comerciais — especialmente banhos frios ou com pouca pressão — eram tratados de forma amadora.
                </p>
                <p>
                  Nossa missão desde o primeiro dia foi elevar o padrão técnico do mercado de <strong>aquecimento a gás</strong> e <strong>pressurização de redes</strong>. Não queríamos apenas ser "instaladores", mas sim especialistas certificados capazes de dimensionar e resolver qualquer desafio hidráulico.
                </p>
                <p>
                  Hoje, atendemos milhares de clientes satisfeitos em condomínios de alto padrão, residências, academias e hotéis, sempre utilizando peças originais das melhores marcas do mercado mundial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <Droplets className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Especialistas em Pressão</h3>
                <p className="text-sm text-slate-600">Dimensionamento preciso para evitar rompimentos ou baixa vazão.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <Flame className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Controle Térmico</h3>
                <p className="text-sm text-slate-600">Certificação em aquecedores a gás, elétricos e conjugados.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <Wrench className="w-10 h-10 text-slate-700 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Técnicos de Fábrica</h3>
                <p className="text-sm text-slate-600">Treinamento oficial nas marcas Rinnai, Rowa, Lorenzetti e outras.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Garantia Comprovada</h3>
                <p className="text-sm text-slate-600">Nota fiscal e garantia real de serviço prestado em domicílio.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 py-16 border-y border-primary/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pronto para ter o banho perfeito?</h2>
            <p className="text-slate-600 mb-8">Nossa equipe técnica está aguardando o seu chamado.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg">
                Falar com um Especialista
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
