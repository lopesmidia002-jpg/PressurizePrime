import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { LeadForm } from '../common/LeadForm';
import { ShieldCheck, Zap, CreditCard, Phone, MapPin } from 'lucide-react';

export const HomeLeadSection: React.FC = () => {
  const { settings } = useSiteData();

  return (
    <section id="orcamento" className="py-16 md:py-24 lg:py-28 bg-gradient-to-b from-slate-100 to-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna da Esquerda: Autoridade e Motivos para Contato */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.18] text-balance">
              Problema no pressurizador ou aquecedor? <span className="text-primary font-black">Fale com quem entende.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-[1.65] max-w-[55ch] text-pretty font-normal">
              Evite técnicos amadores ou soluções provisórias que colocam sua casa em risco. Solicite uma avaliação com nossos especialistas e receba um atendimento transparente.
            </p>

            {/* Destaques Técnicos */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 text-primary border border-blue-100 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Vistoria sem custo na aprovação</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    O valor da visita é 100% abatido quando você aprova o conserto ou a instalação conosco.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Agilidade em até 24 horas</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Sabemos que banho frio ou falta de água não podem esperar. Agendamos seu atendimento com urgência.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Até 10x sem juros no cartão</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Condições facilitadas de pagamento para consertos, peças originais e equipamentos novos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Cobertura em toda a Grande São Paulo</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Técnicos equipados com ferramentas e peças de reposição frequentes nos principais bairros.
                  </p>
                </div>
              </div>
            </div>

            {/* Atendimento Telefônico Direto */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-4">
              <a
                href={`tel:${settings.phone_raw}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Ou ligue diretamente: {settings.phone_number}</span>
              </a>
            </div>
          </div>

          {/* Coluna da Direita: Formulário Inteligente */}
          <div className="lg:col-span-6">
            <LeadForm
              origin="/#orcamento"
              title="Solicitar Orçamento Online"
              subtitle="Preencha os dados e receba nosso contato imediato com estimativa e horários disponíveis."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
