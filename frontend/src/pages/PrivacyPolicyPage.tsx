import React, { useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Política de Privacidade</h1>
              <p className="text-slate-500 mt-1">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
            <p>
              A <strong>Pressurize Prime</strong> respeita a sua privacidade e garante o sigilo total das informações que você nos fornece. 
              Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais.
            </p>

            <h3 className="text-lg font-bold text-slate-800">1. Coleta de Dados</h3>
            <p>
              Coletamos informações pessoais que você nos fornece voluntariamente por meio do formulário de contato do nosso site (Nome, Telefone/WhatsApp, Bairro e Descrição do Problema). Esses dados são estritamente necessários para o agendamento de visitas técnicas e elaboração de orçamentos.
            </p>

            <h3 className="text-lg font-bold text-slate-800">2. Uso das Informações</h3>
            <p>
              As informações coletadas são utilizadas exclusivamente para:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Entrar em contato via WhatsApp ou Telefone para responder sua solicitação.</li>
              <li>Otimizar a rota dos nossos técnicos baseado no seu bairro.</li>
              <li>Preparar peças de reposição com base na descrição do seu problema.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800">3. Compartilhamento de Dados</h3>
            <p>
              Nós <strong>não vendemos, alugamos ou compartilhamos</strong> seus dados pessoais com terceiros em nenhuma hipótese. Os dados são acessados apenas pela equipe técnica e de atendimento da Pressurize Prime.
            </p>

            <h3 className="text-lg font-bold text-slate-800">4. Segurança dos Dados</h3>
            <p>
              Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h3 className="text-lg font-bold text-slate-800">5. Seus Direitos</h3>
            <p>
              Você tem o direito de solicitar a exclusão, correção ou atualização dos seus dados cadastrais a qualquer momento. Para isso, basta entrar em contato conosco pelos canais oficiais de atendimento.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
