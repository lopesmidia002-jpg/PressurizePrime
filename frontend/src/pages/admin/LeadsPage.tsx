import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { Lead } from '../../types';
import {
  Users,
  Search,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle2,
  Archive,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const { leads, updateLeadStatus } = useSiteData();

  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'todos' || lead.status === filterStatus;
    const matchesSearch =
      searchTerm.trim() === '' ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.problem_description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'novo':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Novo Contato
          </span>
        );
      case 'em_atendimento':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Em Atendimento
          </span>
        );
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Concluído
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            <Archive className="w-3 h-3 text-slate-400" />
            Arquivado
          </span>
        );
    }
  };

  const handleStatusChange = (id: string | number, newStatus: Lead['status']) => {
    updateLeadStatus(id, newStatus);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gestão de Leads & Orçamentos
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Acompanhe solicitações de orçamento recebidas pelo site e acione os clientes com agilidade.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Users className="w-4 h-4 text-primary" />
          <span>Total: {leads.length} leads</span>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Filtro por Abas de Status */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { key: 'todos', label: 'Todos' },
            { key: 'novo', label: 'Novos' },
            { key: 'em_atendimento', label: 'Em Atendimento' },
            { key: 'concluido', label: 'Concluídos' },
            { key: 'arquivado', label: 'Arquivados' },
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterStatus(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === tab.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
              {tab.key !== 'todos' && (
                <span className="ml-1.5 opacity-70">
                  ({leads.filter(l => l.status === tab.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Campo de Busca Textual */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, bairro ou defeito..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
          />
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Nenhum contato encontrado para os filtros selecionados.
          </div>
        ) : (
          <>
            {/* Versão Desktop (Tabela) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 whitespace-nowrap">
                  <tr>
                    <th className="py-3 px-4">Data / Hora</th>
                    <th className="py-3 px-4">Cliente / Contato</th>
                    <th className="py-3 px-4">Bairro em SP</th>
                    <th className="py-3 px-4">Equipamento</th>
                    <th className="py-3 px-4">Problema Relatado</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ação Direta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map(lead => {
                    const rawPhone = lead.whatsapp.replace(/\D/g, '');
                    const dateStr = lead.created_at
                      ? new Date(lead.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Hoje';

                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                          {dateStr}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{lead.name}</span>
                          <span className="text-xs text-slate-500">{lead.whatsapp}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                          {lead.neighborhood}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                            {lead.service_category || 'Geral'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-600 max-w-[200px] truncate" title={lead.problem_description}>
                          {lead.problem_description}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={e => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                            className="text-xs font-bold py-1 px-2 rounded-lg border border-slate-200 bg-white focus:outline-none cursor-pointer"
                          >
                            <option value="novo">Novo</option>
                            <option value="em_atendimento">Em Atendimento</option>
                            <option value="concluido">Concluído</option>
                            <option value="arquivado">Arquivado</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/55${rawPhone}?text=${encodeURIComponent(
                                `Olá ${lead.name}, aqui é da assistência técnica Pressurize Prime! Recebemos sua solicitação para o bairro ${lead.neighborhood} referente a ${lead.problem_description}. Podemos conversar agora?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors"
                              title="Abrir WhatsApp com mensagem pronta"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Versão Mobile (Cards) */}
            <div className="md:hidden flex flex-col divide-y divide-slate-100">
              {filteredLeads.map(lead => {
                const rawPhone = lead.whatsapp.replace(/\D/g, '');
                const dateStr = lead.created_at
                  ? new Date(lead.created_at).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Hoje';

                return (
                  <div key={lead.id} className="p-4 flex flex-col gap-3" onClick={() => setSelectedLead(lead)}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 block">{lead.name}</span>
                        <span className="text-xs text-slate-500 font-medium">{lead.whatsapp}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                        {dateStr}
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

                    <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-50 gap-2">
                      <div onClick={e => e.stopPropagation()} className="flex-1">
                        <select
                          value={lead.status}
                          onChange={e => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                          className="w-full text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none cursor-pointer"
                        >
                          <option value="novo">Novo</option>
                          <option value="em_atendimento">Em Atendimento</option>
                          <option value="concluido">Concluído</option>
                          <option value="arquivado">Arquivado</option>
                        </select>
                      </div>
                      <a
                        onClick={e => e.stopPropagation()}
                        href={`https://wa.me/55${rawPhone}?text=${encodeURIComponent(
                          `Olá ${lead.name}, aqui é da assistência técnica Pressurize Prime! Recebemos sua solicitação para o bairro ${lead.neighborhood} referente a ${lead.problem_description}. Podemos conversar agora?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-colors flex-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chamar</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Detalhes do Chamado #{selectedLead.id}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {selectedLead.name}
                </h3>
              </div>
              <div>{getStatusBadge(selectedLead.status)}</div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="font-bold">Telefone:</span> {selectedLead.whatsapp}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-bold">Bairro:</span> {selectedLead.neighborhood}
              </div>

              {selectedLead.service_category && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Equipamento:</span> {selectedLead.service_category}
                </div>
              )}

              {selectedLead.origin_url && (
                <div className="flex items-center gap-2 text-slate-500">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Origem: {selectedLead.origin_url}</span>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-3">
                <span className="font-bold block text-slate-900 mb-1">
                  Descrição do Problema:
                </span>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {selectedLead.problem_description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Alterar Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={e => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                  className="text-xs font-bold py-1 px-2.5 rounded-lg border border-slate-300"
                >
                  <option value="novo">Novo</option>
                  <option value="em_atendimento">Em Atendimento</option>
                  <option value="concluido">Concluído</option>
                  <option value="arquivado">Arquivado</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
