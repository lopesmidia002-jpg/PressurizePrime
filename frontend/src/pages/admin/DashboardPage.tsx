import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import {
  Users,
  Palette,
  FileText,
  Wrench,
  Search,
  Clock,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { leads, services, isBusinessHours } = useSiteData();

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'novo').length;
  const inProgressLeads = leads.filter(l => l.status === 'em_atendimento').length;

  const recentLeads = [...leads].slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'novo':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Novo
          </span>
        );
      case 'em_atendimento':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-600" />
            Em Atendimento
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Concluído
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Arquivado
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header do Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Administrativo
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Visão geral da operação da Pressurize Prime, contatos e atalhos rápidos de CMS.
          </p>
        </div>

        {/* Indicador de Status do Expediente */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-xs">
          {isBusinessHours ? (
            <span className="flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Horário Comercial Ativo (08h às 19h)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-bold text-amber-700">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Fora do Horário Comercial
            </span>
          )}
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total de Contatos
            </span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">
              {totalLeads}
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-primary rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Leads Novos
            </span>
            <span className="text-3xl font-black text-blue-900 mt-1 block">
              {newLeads}
            </span>
          </div>
          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Em Atendimento
            </span>
            <span className="text-3xl font-black text-amber-900 mt-1 block">
              {inProgressLeads}
            </span>
          </div>
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              Serviços Ativos
            </span>
            <span className="text-3xl font-black text-emerald-900 mt-1 block">
              {services.filter(s => s.is_active).length}
            </span>
          </div>
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Seção de Atalhos Rápidos */}
      <div>
        <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-4">
          Ações Rápidas do CMS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/settings"
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                <Palette className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Identidade & Cores</h3>
              <p className="text-xs text-slate-500 mt-1">
                Troque o logo e ajuste cores do site com reflexo em tempo real.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/pages"
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-primary group-hover:bg-blue-100 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Textos das Páginas</h3>
              <p className="text-xs text-slate-500 mt-1">
                Altere títulos H1, subtítulos, banners e CTAs da Home e LPs.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/services"
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors">
                <Wrench className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Gerenciar Serviços</h3>
              <p className="text-xs text-slate-500 mt-1">
                Adicione, reordene ou edite descrições e diferenciais dos equipamentos.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/seo"
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">SEO Individual</h3>
              <p className="text-xs text-slate-500 mt-1">
                Controle Meta Titles, Descriptions e tags para Google e WhatsApp.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Tabela de Leads Recentes */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Solicitações Recentes de Orçamento
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Últimos contatos captados pelo formulário inteligente
            </p>
          </div>

          <Link
            to="/admin/leads"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Ver todos os leads ({totalLeads})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            Nenhum contato recebido ainda.
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 whitespace-nowrap">
                  <tr>
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-4">Bairro</th>
                    <th className="py-3 px-4">Equipamento</th>
                    <th className="py-3 px-4">Problema</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentLeads.map(lead => {
                    const rawPhone = lead.whatsapp.replace(/\D/g, '');
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{lead.name}</span>
                          <span className="text-xs text-slate-500">{lead.whatsapp}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                          {lead.neighborhood}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                          {lead.service_category || 'Geral'}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 max-w-[200px] truncate" title={lead.problem_description}>
                          {lead.problem_description}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <a
                            href={`https://wa.me/55${rawPhone}?text=${encodeURIComponent(`Olá ${lead.name}, aqui é da Pressurize Prime sobre sua solicitação no bairro ${lead.neighborhood}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col divide-y divide-slate-100">
              {recentLeads.map(lead => {
                const rawPhone = lead.whatsapp.replace(/\D/g, '');
                
                return (
                  <div key={lead.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 block">{lead.name}</span>
                        <span className="text-xs text-slate-500 font-medium">{lead.whatsapp}</span>
                      </div>
                      <span className="shrink-0 mt-0.5">
                        {getStatusBadge(lead.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="block text-slate-400 font-semibold mb-0.5">Bairro:</span>
                        <span className="text-slate-700 font-medium">{lead.neighborhood}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-semibold mb-0.5">Serviço:</span>
                        <span className="text-slate-700 font-medium truncate block">{lead.service_category || 'Geral'}</span>
                      </div>
                    </div>

                    <div className="flex justify-end mt-1 pt-3 border-t border-slate-50">
                      <a
                        href={`https://wa.me/55${rawPhone}?text=${encodeURIComponent(`Olá ${lead.name}, aqui é da Pressurize Prime sobre sua solicitação no bairro ${lead.neighborhood}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors w-full"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chamar no WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
