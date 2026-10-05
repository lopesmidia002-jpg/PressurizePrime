import React from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { LeadForm } from '../common/LeadForm';
import { ShieldCheck, Clock, CheckCircle2, Award } from 'lucide-react';

interface LPLeadSectionProps {
  lp: LPPageDetail;
}

export const LPLeadSection: React.FC<LPLeadSectionProps> = ({ lp }) => {
  return (
    <section id="orcamento-lp" className="py-20 bg-slate-100/80 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna da Esquerda: Benefícios e Diagnóstico da LP */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-primary border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Diagnóstico Rápido e Seguro</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Prefere agendar pelo site? <br />
              <span className="text-primary">Receba contato em minutos.</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Deixe os dados do seu chamado técnico para <strong>{lp.name}</strong>. Nossa equipe técnica entra em contato via WhatsApp com uma pré-avaliação do caso e agendamento da visita.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Garantias Pressurize Prime
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vistoria sem custo</strong> abatida na aprovação do conserto ou instalação.
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>3 meses de garantia legal e formal</strong> em peças substituídas e mão de obra técnica.
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pagamento em até 10x sem juros</strong> no cartão de crédito após a conclusão e teste.
                  </span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Técnicos certificados</strong> com ferramentas adequadas para marcas como{' '}
                    {lp.brands.slice(0, 3).join(', ')}.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Atendimento em residências, coberturas, condomínios e comércios em SP.</span>
            </div>
          </div>

          {/* Coluna da Direita: Formulário Reutilizável com Default Service */}
          <div className="lg:col-span-6">
            <LeadForm
              defaultService={lp.slug}
              origin={`/${lp.slug}#orcamento-lp`}
              title={`Orçamento para ${lp.name}`}
              subtitle="Informe seu WhatsApp e o sintoma do equipamento para direcionarmos o técnico certo."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
