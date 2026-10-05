import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { LeadFormData } from '../../types';
import {
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  User,
  Phone,
  Wrench
} from 'lucide-react';

interface LeadFormProps {
  defaultService?: string;
  origin?: string;
  onSuccess?: () => void;
  compact?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

// Bairros prioritários e regiões atendidas para sugestão rápida
const SP_NEIGHBORHOODS = [
  'Brooklin',
  'Vila Olímpia',
  'Itaim Bibi',
  'Moema',
  'Jardins / Cerqueira César',
  'Pinheiros',
  'Alto de Pinheiros',
  'Morumbi',
  'Campo Belo',
  'Vila Nova Conceição',
  'Perdizes',
  'Higienópolis',
  'Santana / Zona Norte',
  'Tatuapé / Anália Franco',
  'Alphaville / Tamboré',
  'Granja Viana'
];

// Sugestões de sintomas e serviços para chips de toque rápido
const QUICK_ISSUES = [
  'Sem pressão no chuveiro',
  'Água não esquenta',
  'Aparelho desliga sozinho',
  'Vazamento ou goteira',
  'Barulho forte / estalo',
  'Instalação de equipamento novo',
  'Manutenção preventiva periódica'
];

// Formatação e máscara de telefone celular (Brasil: DDD + 9 ou 8 dígitos)
export const formatPhoneMask = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

export const LeadForm: React.FC<LeadFormProps> = ({
  defaultService = '',
  origin = typeof window !== 'undefined' ? window.location.pathname : '',
  onSuccess,
  compact = false,
  title,
  subtitle,
  className = ''
}) => {
  const { addLead, isBusinessHours, settings, services } = useSiteData();

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    whatsapp: '',
    neighborhood: '',
    service_category: defaultService,
    problem_description: '',
    origin_url: origin
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadFormData | null>(null);

  // Sincronizar defaultService se a prop mudar
  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service_category: defaultService }));
    }
  }, [defaultService]);

  // Manipulação de mudança nos campos
  const handleChange = (field: keyof LeadFormData, value: string) => {
    if (field === 'whatsapp') {
      value = formatPhoneMask(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Alternar chip de sintoma rápido
  const handleToggleIssueChip = (issue: string) => {
    setFormData(prev => {
      const current = prev.problem_description.trim();
      if (!current) {
        return { ...prev, problem_description: issue };
      }
      if (current.includes(issue)) {
        // Remover caso já esteja presente
        const updated = current
          .replace(new RegExp(`(?:, )?${issue}`, 'g'), '')
          .replace(/^, /, '')
          .trim();
        return { ...prev, problem_description: updated };
      }
      return { ...prev, problem_description: `${current}, ${issue}` };
    });
    if (errors.problem_description) {
      setErrors(prev => ({ ...prev, problem_description: undefined }));
    }
  };

  // Validação dos campos
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Por favor, informe seu nome completo (mínimo 3 letras).';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD (ex: (11) 98765-4321).';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Informe seu bairro ou região em São Paulo.';
    }

    if (!formData.problem_description.trim() || formData.problem_description.trim().length < 5) {
      newErrors.problem_description = 'Descreva brevemente o problema ou selecione uma opção acima.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: LeadFormData = {
        ...formData,
        origin_url: origin || window.location.pathname
      };

      await addLead(payload);
      setSubmittedLead(payload);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setErrors(prev => ({
        ...prev,
        problem_description: 'Erro momentâneo ao registrar. Você também pode chamar diretamente no WhatsApp.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      whatsapp: '',
      neighborhood: '',
      service_category: defaultService,
      problem_description: '',
      origin_url: origin
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedLead(null);
  };

  // Mensagem pré-formatada para acelerar o atendimento via WhatsApp
  const generateWhatsAppDirectLink = () => {
    if (!submittedLead) return `https://wa.me/${settings.whatsapp_raw}`;
    const text = `Olá, meu nome é ${submittedLead.name}. Acabei de solicitar orçamento pelo site para o bairro ${submittedLead.neighborhood}. Problema: ${submittedLead.problem_description}. Gostaria de agilizar o atendimento.`;
    return `https://wa.me/${settings.whatsapp_raw}?text=${encodeURIComponent(text)}`;
  };

  // ESTADO DE SUCESSO
  if (isSubmitted && submittedLead) {
    return (
      <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200 ${className}`}>
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Solicitação Recebida com Sucesso
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
          Obrigado, {submittedLead.name.split(' ')[0]}!
        </h3>

        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          Registramos sua solicitação com prioridade. Nossa equipe técnica entrará em contato pelo WhatsApp{' '}
          <strong className="text-slate-800">{submittedLead.whatsapp}</strong>.
        </p>

        {/* Resumo do Pedido */}
        <div className="mt-4 bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-left text-xs text-slate-700 space-y-1.5 max-w-md mx-auto">
          <div>
            <strong className="text-slate-900">Bairro:</strong> {submittedLead.neighborhood}
          </div>
          {submittedLead.service_category && (
            <div>
              <strong className="text-slate-900">Equipamento:</strong>{' '}
              {services.find(s => s.slug === submittedLead.service_category)?.title || submittedLead.service_category}
            </div>
          )}
          <div>
            <strong className="text-slate-900">Descrição:</strong> {submittedLead.problem_description}
          </div>
        </div>

        {/* Horário de Atendimento Info */}
        <div className="mt-4 text-xs text-slate-500 max-w-md mx-auto">
          {isBusinessHours ? (
            <span className="text-emerald-700 font-medium flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Estamos em horário de atendimento. Resposta estimada em poucos minutos!
            </span>
          ) : (
            <span className="text-amber-700 font-medium flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Fora do expediente comercial: responderemos logo às 8h da manhã com prioridade máxima.
            </span>
          )}
        </div>

        {/* Botão de Dupla Aceleração no WhatsApp */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <a
            href={generateWhatsAppDirectLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm group"
          >
            <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Agilizar no WhatsApp Agora</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Novo Pedido</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl relative ${className}`}>
      {/* Cabeçalho do Formulário */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-primary border border-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Diagnóstico sem compromisso
          </span>

          {/* Indicador de Horário Comercial */}
          {isBusinessHours ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Atendimento Online
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <Clock className="w-3 h-3 text-amber-600" />
              Retorno às 8h
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {title || 'Solicitar Atendimento Técnico'}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          {subtitle || 'Preencha os campos abaixo. Retornamos rapidamente com diagnóstico inicial e disponibilidade de horário.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        {/* Campo: Nome Completo */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Seu Nome Completo *</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Ex: Carlos Eduardo Silva"
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
              errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-primary'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Linha dupla: WhatsApp e Bairro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Campo: WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>WhatsApp / Celular *</span>
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={e => handleChange('whatsapp', e.target.value)}
              placeholder="(11) 98765-4321"
              maxLength={15}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-primary'
              }`}
            />
            {errors.whatsapp && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.whatsapp}</span>
              </p>
            )}
          </div>

          {/* Campo: Bairro */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Bairro / Região em SP *</span>
            </label>
            <input
              type="text"
              list="sp-neighborhoods-list"
              value={formData.neighborhood}
              onChange={e => handleChange('neighborhood', e.target.value)}
              placeholder="Ex: Brooklin, Moema, Alphaville..."
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.neighborhood ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-primary'
              }`}
            />
            <datalist id="sp-neighborhoods-list">
              {SP_NEIGHBORHOODS.map(nh => (
                <option key={nh} value={nh} />
              ))}
            </datalist>
            {errors.neighborhood && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.neighborhood}</span>
              </p>
            )}
          </div>
        </div>

        {/* Campo: Categoria de Serviço */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Wrench className="w-3.5 h-3.5 text-slate-400" />
            <span>Tipo de Equipamento / Serviço</span>
          </label>
          <select
            value={formData.service_category || ''}
            onChange={e => handleChange('service_category', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 transition-all"
          >
            <option value="">Selecione o equipamento (ou geral)</option>
            {services.map(svc => (
              <option key={svc.id} value={svc.slug}>
                {svc.title}
              </option>
            ))}
          </select>
        </div>

        {/* Chips de Sugestões Rápidas */}
        {!compact && (
          <div>
            <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">
              Toque rápido para adicionar sintomas comuns:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_ISSUES.map(issue => {
                const isSelected = formData.problem_description.includes(issue);
                return (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => handleToggleIssueChip(issue)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-primary text-primary font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {issue}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Campo: Descrição do Problema */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Descrição do Problema ou Necessidade *
          </label>
          <textarea
            rows={compact ? 2 : 3}
            value={formData.problem_description}
            onChange={e => handleChange('problem_description', e.target.value)}
            placeholder="Conte brevemente o que está acontecendo (ex: aparelho fazendo barulho, água fria, vazamento, marca do equipamento)..."
            className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
              errors.problem_description ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-primary'
            }`}
          />
          {errors.problem_description && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.problem_description}</span>
            </p>
          )}
        </div>

        {/* Mensagem Amigável de Horário de Expediente */}
        {!isBusinessHours && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Fora do horário de expediente comercial:</strong> Nosso atendimento presencial e telefônico opera de segunda a sexta, das 8h às 19h. Deixe sua solicitação agora e ela será tratada com prioridade na primeira hora do próximo dia útil!
            </div>
          </div>
        )}

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary-dark text-slate-950 font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
              <span>Registrando seu pedido...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>Solicitar Orçamento Gratuito</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-400">
          🔒 Seus dados estão seguros e serão utilizados exclusivamente para contato técnico direto.
        </p>
      </form>
    </div>
  );
};
