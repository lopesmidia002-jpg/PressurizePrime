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


  // Dados mockados para o gráfico de leads
  const chartData = [
    { day: 'Seg', value: 3 },
    { day: 'Ter', value: 7 },
    { day: 'Qua', value: 4 },
    { day: 'Qui', value: Math.max(1, newLeads) }, // usa o valor real para o dia atual simulado
    { day: 'Sex', value: 0 },
    { day: 'Sáb', value: 0 },
    { day: 'Dom', value: 0 },
  ];
  const maxChartValue = Math.max(...chartData.map(d => d.value), 10);
  const inProgressList = leads.filter(l => l.status === 'em_atendimento').slice(0, 3);
  const activeServicesList = services.filter(s => s.is_active).slice(0, 4);
  const [showServicesChart, setShowServicesChart] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Tudo o que você precisa para gerenciar a Pressurize Prime.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/services" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            + Adicionar Serviço
          </Link>
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs text-xs">
            {isBusinessHours ? (
              <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Aberto
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-bold text-amber-700">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Fechado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cards de Métricas (Top Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 items-stretch relative z-20">
        
        {/* Card Principal (Solid Dark/Primary) */}
        <div className="bg-primary text-white p-5 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform group">
          <div className="absolute -right-4 -top-12 opacity-10">
            <Users className="w-32 h-32" />
          </div>
          <div className="flex items-center justify-between z-10">
            <span className="text-sm font-bold text-white/80">Total de Contatos</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white -rotate-45" />
            </div>
          </div>
          <div className="z-10 mt-4">
            <span className="text-4xl font-black">{totalLeads}</span>
            <span className="text-xs text-emerald-300 ml-2 font-semibold">
              {(newLeads > 0) ? `+${newLeads} hoje` : 'atualizado'}
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Leads Novos</span>
            <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-50 transition-colors">
              <TrendingUp className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-4xl font-black text-slate-800">{newLeads}</span>
            <span className="text-xs text-slate-400 font-medium mb-1">Aguardando</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform group">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Em Atendimento</span>
            <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-50 transition-colors">
              <Clock className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-4xl font-black text-slate-800">{inProgressLeads}</span>
            <span className="text-xs text-amber-500 font-bold mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Fila
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div 
          onClick={() => setShowServicesChart(!showServicesChart)}
          className={`bg-white p-5 rounded-3xl border ${showServicesChart ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-slate-100 shadow-sm'} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Serviços Ativos</span>
            <div className={`w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 transition-colors ${showServicesChart ? 'bg-primary/10 text-primary border-primary/20' : 'group-hover:bg-slate-50'}`}>
              <Wrench className="w-3 h-3" />
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-4xl font-black text-slate-800">{services.filter(s => s.is_active).length}</span>
            <span className="text-xs text-slate-400 font-medium mb-1">no site</span>
          </div>
          
          {/* Aba Flutuante */}
          {showServicesChart && (
            <div className="absolute top-[105%] left-0 w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-xl z-50 animate-in slide-in-from-top-2 fade-in duration-300 space-y-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-2">Em Exibição no Site</span>
              
              {activeServicesList.length === 0 ? (
                <div className="text-[11px] font-bold text-primary/70 text-center py-3 bg-primary/10 rounded-lg">Nenhum serviço ativo.</div>
              ) : (
                <div className="space-y-1.5 flex flex-col items-start w-full">
                  {activeServicesList.map(srv => (
                    <div key={srv.id} className="flex justify-between items-center bg-white/60 p-2 rounded-lg border border-primary/20 w-full">
                      <span className="text-[10px] font-bold text-slate-700 truncate">{srv.title}</span>
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0 ml-2" />
                    </div>
                  ))}
                  {services.filter(s => s.is_active).length > 4 && (
                    <span className="text-[9px] font-bold text-primary/70 pt-1 w-full text-center">+ {services.filter(s => s.is_active).length - 4} outros</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Middle Area: Gráfico e Fila */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
        
        {/* Gráfico de Barras */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-black text-slate-800">Captação Semanal</h2>
              <p className="text-xs text-slate-400 font-medium">Desempenho dos últimos 7 dias</p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-primary/20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_3px)]"></span> Anterior
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Atual
              </span>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-40 gap-3 w-full px-2">
            {chartData.map((d, i) => {
              const isPast = i < 3; 
              const isFuture = i > 3;

              let bgClass = "bg-primary";
              if (isPast) bgClass = "bg-primary/40"; // barras passadas na cor primária mais clara
              if (isFuture) bgClass = "bg-slate-100 border border-slate-200 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_5px)]";

              const heightPct = isFuture ? 60 + (i*5) : Math.max(10, (d.value / maxChartValue) * 100);

              return (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 group/bar h-full justify-end relative">
                  {/* Tooltip */}
                  {!isFuture && (
                    <span className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded-lg transition-opacity shadow-sm pointer-events-none z-10">
                      {d.value} leads
                    </span>
                  )}
                  
                  <div 
                    className={`w-full max-w-[40px] rounded-full transition-all duration-700 ease-out origin-bottom animate-in zoom-in-y ${bgClass} hover:opacity-90 cursor-pointer`}
                    style={{ height: `${heightPct}%` }}
                  ></div>
                  <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fila / Progresso */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-black text-slate-800">Fila de Atendimento</h2>
              <p className="text-xs text-slate-400 font-medium">Prioridades do momento</p>
            </div>
            <button className="text-primary text-xs font-bold hover:underline bg-primary/10 px-2 py-1 rounded-lg">Ver tudo</button>
          </div>

          <div className="flex-1 overflow-hidden">
            {inProgressList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-200 mb-2" />
                <span className="text-sm font-bold text-slate-500">Tudo em dia!</span>
              </div>
            ) : (
              <div className="space-y-3">
                {inProgressList.map(lead => (
                  <div key={lead.id} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <span className="font-bold text-xs">{lead.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{lead.name}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{lead.service_category || 'Serviço Geral'}</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ações Rápidas & Tabela de Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
        
        {/* Atalhos Rápidas */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">CMS / Atalhos</h2>
          
          <Link to="/admin/pages" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-primary hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Textos do Site</h3>
              <p className="text-[10px] text-slate-400">Páginas e botões</p>
            </div>
          </Link>

          <Link to="/admin/settings" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-primary hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Cores e Logo</h3>
              <p className="text-[10px] text-slate-400">Identidade visual</p>
            </div>
          </Link>

          <Link to="/admin/seo" className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-primary hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">SEO & Buscas</h3>
              <p className="text-[10px] text-slate-400">Google e WhatsApp</p>
            </div>
          </Link>
        </div>

        {/* Tabela */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800">Leads Recentes</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Últimos contatos recebidos</p>
            </div>
            <Link to="/admin/leads" className="text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg">
              Ver Tabela Completa
            </Link>
          </div>

          <div className="flex-1 p-2">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-4">Bairro</th>
                    <th className="py-3 px-4">Equipamento</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentLeads.slice(0, 4).map(lead => {
                    const rawPhone = lead.whatsapp.replace(/\D/g, '');
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-800 block text-sm">{lead.name}</span>
                          <span className="text-[10px] text-slate-400">{lead.whatsapp}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-600 text-xs">{lead.neighborhood}</td>
                        <td className="py-3 px-4 text-xs text-slate-500">{lead.service_category || 'Geral'}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <a
                            href={`https://wa.me/55${rawPhone}`}
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

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3 p-2">
              {recentLeads.slice(0, 4).map(lead => {
                const rawPhone = lead.whatsapp.replace(/\D/g, '');
                return (
                  <div key={lead.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-800 block text-sm">{lead.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">{lead.whatsapp}</span>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(lead.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Bairro</span>
                        <span className="text-xs font-medium text-slate-700">{lead.neighborhood}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Equipamento</span>
                        <span className="text-xs font-medium text-slate-700 truncate block">{lead.service_category || 'Geral'}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/55${rawPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center justify-center gap-2 w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2.5 rounded-xl font-bold text-xs transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Iniciar Conversa no WhatsApp</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
