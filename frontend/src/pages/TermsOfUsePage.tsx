import React, { useEffect } from 'react';
import { TopBar, Header, Footer } from '../components/common';
import { Layers } from 'lucide-react';

export const TermsOfUsePage: React.FC = () => {
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
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Termos de Uso</h1>
              <p className="text-slate-500 mt-1">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
            <p>
              Ao acessar e utilizar os serviços do site da <strong>Pressurize Prime</strong>, você concorda com os Termos e Condições de Uso descritos abaixo.
            </p>

            <h3 className="text-lg font-bold text-slate-800">1. Agendamentos e Orçamentos</h3>
            <p>
              O preenchimento do formulário no site caracteriza uma solicitação de contato, e não a contratação imediata do serviço. 
              Um técnico da Pressurize Prime entrará em contato para confirmar a disponibilidade, validar o problema e agendar a visita técnica.
            </p>

            <h3 className="text-lg font-bold text-slate-800">2. Taxa de Visita Técnica</h3>
            <p>
              Dependendo da região de atendimento em São Paulo ou Grande SP, pode haver cobrança de taxa de visita e deslocamento. 
              Este valor é sempre informado previamente durante o atendimento via WhatsApp ou telefone, antes do técnico ir até o local.
            </p>

            <h3 className="text-lg font-bold text-slate-800">3. Garantia de Serviços</h3>
            <p>
              Oferecemos garantia legal em todos os serviços prestados, sendo 90 dias para peças de reposição e 30 dias para mão de obra, 
              contados a partir da emissão da ordem de serviço. A garantia cobre apenas o problema específico que foi consertado pela nossa equipe.
            </p>

            <h3 className="text-lg font-bold text-slate-800">4. Propriedade Intelectual</h3>
            <p>
              Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens e código fonte, é de propriedade exclusiva da Pressurize Prime 
              e está protegido por leis de direitos autorais.
            </p>

            <h3 className="text-lg font-bold text-slate-800">5. Modificações</h3>
            <p>
              A Pressurize Prime reserva-se o direito de alterar estes Termos de Uso a qualquer momento, sem aviso prévio. Recomendamos visitar esta página periodicamente.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
