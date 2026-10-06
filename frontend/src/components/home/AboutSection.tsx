import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { CheckCircle2, Award, Wrench, Shield, MessageSquare } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, pages } = useSiteData();
  
  const aboutSection = pages['home']?.sections?.about;
  const title = aboutSection?.title || 'Técnicos de verdade, com nome e responsabilidade pelo serviço.';
  const content = (aboutSection as any)?.content || 'A Pressurize Prime nasceu de mais de uma década de experiência prática com pressurizadores e aquecedores. Uma equipe que aprendeu o ofício em campo, instalação por instalação, e conhece por dentro os equipamentos que você tem em casa.';
  const quote = (aboutSection as any)?.quote || '“Aqui, quem atende você é gente de verdade, do primeiro contato ao pós-serviço. E se algo não ficar certo, a gente volta.”';

  return (
    <section id="quem-somos" className="py-16 md:py-24 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna de Texto Principal */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.18] text-balance whitespace-pre-wrap">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-[1.7] max-w-[62ch] text-pretty font-normal whitespace-pre-wrap">
              {content}
            </p>

            <blockquote className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-l-4 border-secondary text-slate-800">
              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed italic text-pretty whitespace-pre-wrap">
                {quote}
              </p>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Técnicos identificados e qualificados</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Empresa com endereço e CNPJ ativo</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Instalações em conformidade com as normas ABNT</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">Pós-atendimento com suporte prioritário</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <a
                href={`https://wa.me/${settings.whatsapp_raw}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Pressurize%20Prime.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow transition-all text-sm w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Conversar com a Equipe</span>
              </a>
            </div>
          </div>

          {/* Coluna Visual Técnica (Sem fotos genéricas, com dados concretos de engenharia) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/30 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Padrão Operacional</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Garantia Ativa
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-secondary">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Ofício de Campo Especializado</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Conhecimento profundo das principais marcas: Rowa, Komeco, Grundfos, Rheem e Rinnai.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Resolução no Primeiro Atendimento</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Diagnóstico exato e troca de componentes no mesmo local sempre que possível.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-primary">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Compromisso de Pós-Venda</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Não sumimos após o pagamento. Qualquer retorno é tratado com máxima prioridade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                  Grande São Paulo e Capital • Atendimento Rápido
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
