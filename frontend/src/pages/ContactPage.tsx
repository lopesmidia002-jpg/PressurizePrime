import React, { useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const ContactPage: React.FC = () => {
  const { settings, openLeadModal } = useSiteData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Fale Conosco</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tem alguma dúvida, precisa de um orçamento urgente ou deseja agendar uma visita técnica? Nossa equipe está de prontidão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Informações de Contato */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">WhatsApp</h3>
              <p className="text-slate-600 text-sm mb-4">Atendimento rápido para urgências.</p>
              <a href={`https://wa.me/${settings.whatsapp_raw}`} className="text-primary font-bold hover:underline">
                {settings.whatsapp_number}
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Telefone Fixo</h3>
              <p className="text-slate-600 text-sm mb-4">Fale diretamente com nossa central.</p>
              <a href={`tel:${settings.phone_raw}`} className="text-slate-900 font-bold hover:text-primary transition-colors">
                {settings.phone_number}
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">E-mail</h3>
              <p className="text-slate-600 text-sm mb-4">Dúvidas corporativas e parcerias.</p>
              <a href="mailto:contato@pressurizeprime.com.br" className="text-slate-900 font-bold hover:text-primary transition-colors">
                contato@pressurizeprime.com.br
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Horário de Funcionamento</h3>
              <p className="text-slate-600 text-sm">
                {settings.business_hours}
              </p>
            </div>
          </div>

          {/* Área de Ação e Mapa */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Send className="w-10 h-10 text-primary ml-1" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Solicite um Orçamento Rápido</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Preencha os dados do seu problema e deixe que nossa equipe técnica entre em contato para agendar a visita.
              </p>
              <button 
                onClick={() => openLeadModal()}
                className="bg-primary hover:bg-primary-dark text-white font-extrabold text-lg py-4 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Abrir Formulário de Orçamento
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
