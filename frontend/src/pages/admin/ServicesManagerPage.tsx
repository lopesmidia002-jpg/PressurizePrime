import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import type { ServiceItem } from '../../types';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  X,
  Gauge,
  Flame,
  Sun,
  Zap,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { ImageUploadButton } from '../../components/admin/ImageUploadButton';

export const ServicesManagerPage: React.FC = () => {
  const { services, addService, updateService, deleteService } = useSiteData();

  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    slug: '',
    short_description: '',
    icon_name: 'Gauge',
    image_url: '',
    order: services.length + 1,
    is_active: true,
    features: []
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Gauge':
        return <Gauge className="w-4 h-4 text-primary" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <Shield className="w-4 h-4 text-primary" />;
    }
  };

  const handleStartCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      icon_name: 'Gauge',
      image_url: '/images/pressurizador.jpg',
      order: services.length + 1,
      is_active: true,
      features: ['Conserto em até 24 horas', 'Vistoria gratuita na aprovação', 'Garantia de 3 meses']
    });
    setIsCreating(true);
  };

  const handleStartEdit = (service: ServiceItem) => {
    setIsCreating(false);
    setEditingItem(service);
    setFormData({ ...service });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleToggleActive = (service: ServiceItem) => {
    updateService(service.id, { is_active: !service.is_active });
    showNotification(`Serviço "${service.title}" ${!service.is_active ? 'ativado' : 'desativado'}.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza que deseja remover o serviço "${title}"?`)) {
      deleteService(id);
      showNotification(`Serviço "${title}" removido com sucesso.`);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreating) {
      const newService: ServiceItem = {
        id: Date.now().toString(),
        slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-') || 'servico',
        title: formData.title || '',
        short_description: formData.short_description || '',
        icon_name: formData.icon_name || 'Gauge',
        image_url: formData.image_url || '/images/pressurizador.jpg',
        order: Number(formData.order) || services.length + 1,
        is_active: formData.is_active ?? true,
        features: formData.features || []
      };
      addService(newService);
      showNotification(`Serviço "${newService.title}" cadastrado com sucesso!`);
    } else if (editingItem) {
      updateService(editingItem.id, formData);
      showNotification(`Serviço "${formData.title}" atualizado com sucesso!`);
    }

    handleCancel();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Gestão de Serviços
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Cadastre novos equipamentos, altere descrições, fotos técnicas e ordene a exibição na Home.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Serviço</span>
        </button>
      </div>

      {successMsg && (
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Formulário Modal/Drawer de Criação ou Edição */}
      {(isCreating || editingItem) && (
        <div className="bg-white rounded-2xl p-6 border-2 border-primary/30 shadow-lg space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              <span>{isCreating ? 'Cadastrar Novo Serviço' : `Editar: ${editingItem?.title}`}</span>
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título do Serviço *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Bomba de Recirculação"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slug da URL (LP) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Ex: bomba-recirculacao"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ícone Representativo
                </label>
                <select
                  value={formData.icon_name}
                  onChange={e => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Gauge">Manômetro / Pressão (Gauge)</option>
                  <option value="Flame">Chama / Gás (Flame)</option>
                  <option value="Sun">Sol / Solar (Sun)</option>
                  <option value="Zap">Raio / Elétrico (Zap)</option>
                  <option value="ShieldCheck">Escudo / Segurança (ShieldCheck)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Imagem de Fundo (Carrossel da Home)
                </label>
                <div className="flex gap-2 items-center w-full">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="/images/pressurizador.jpg"
                    className="flex-1 w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <ImageUploadButton onUpload={(url) => setFormData({ ...formData, image_url: url })} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Descrição Curta (Card da Home) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.short_description}
                onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2 text-xs rounded-xl shadow-sm cursor-pointer"
              >
                {isCreating ? 'Salvar Novo Serviço' : 'Atualizar Serviço'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grade de Serviços Cadastrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl p-5 border transition-all shadow-xs flex flex-col justify-between ${
              service.is_active ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-100">
                    {getIcon(service.icon_name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{service.title}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">/{service.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(service)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title={service.is_active ? 'Desativar Serviço' : 'Ativar Serviço'}
                  >
                    {service.is_active ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(service)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                    title="Editar Serviço"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(service.id, service.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Excluir Serviço"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {service.short_description}
              </p>

              {service.image_url && (
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-10 h-7 object-cover rounded-md border border-slate-200"
                  />
                  <span className="truncate">{service.image_url}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Ordem na Home: #{service.order}</span>
              <span className={`font-bold ${service.is_active ? 'text-emerald-700' : 'text-slate-400'}`}>
                {service.is_active ? '● Ativo no Site' : '○ Oculto'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
