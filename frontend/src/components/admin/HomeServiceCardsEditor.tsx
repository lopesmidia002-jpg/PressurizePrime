import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { ImageUploadButton } from './ImageUploadButton';
import { Save, Plus, Trash2, CheckCircle } from 'lucide-react';

export const HomeServiceCardsEditor: React.FC = () => {
  const { services, updateService } = useSiteData();

  // Ordena os serviços por 'order' para exibir na mesma sequência da home
  const sortedServices = [...services].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6 mt-6 pt-6 border-t border-slate-100">
      <div>
        <h4 className="text-sm font-bold text-slate-800">Cartões de Serviços Individuais</h4>
        <p className="text-[11px] text-slate-500 mt-1">
          Edite as fotos, textos, botões e diferenciais (features) de cada cartão exibido na grade abaixo. As alterações feitas aqui refletirão na Home e no menu do site.
        </p>
      </div>

      <div className="space-y-6">
        {sortedServices.map(service => (
          <ServiceCardItem key={service.id} service={service} onSave={(updated) => updateService(service.id, updated)} />
        ))}
      </div>
    </div>
  );
};

const ServiceCardItem: React.FC<{ service: any, onSave: (s: any) => void }> = ({ service, onSave }) => {
  const [data, setData] = useState(service);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const updateFeature = (idx: number, value: string) => {
    const newFeatures = [...(data.features || [])];
    newFeatures[idx] = value;
    updateField('features', newFeatures);
  };

  const addFeature = () => {
    const newFeatures = [...(data.features || []), ''];
    updateField('features', newFeatures);
  };

  const removeFeature = (idx: number) => {
    const newFeatures = [...(data.features || [])].filter((_, i) => i !== idx);
    updateField('features', newFeatures);
  };

  return (
    <div className="border border-slate-200 bg-white p-5 rounded-xl space-y-4 shadow-sm">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
          <img src={data.image_url || '/logo.jpeg'} alt={data.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Título do Serviço</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={e => updateField('title', e.target.value)}
            className="w-full px-3 py-2 text-sm font-bold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <ImageUploadButton
            buttonText="Trocar Imagem"
            onUpload={(url) => updateField('image_url', url)}
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Descrição Curta</label>
        <textarea
          rows={3}
          value={data.short_description || ''}
          onChange={e => updateField('short_description', e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Texto do Botão</label>
        <input
          type="text"
          value={data.button_text || ''}
          onChange={e => updateField('button_text', e.target.value)}
          placeholder="Ex: Ver pressurizador"
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">Diferenciais (Checkmarks)</label>
        <div className="space-y-2">
          {(data.features || []).map((feat: string, idx: number) => (
            <div key={idx} className="flex gap-2 items-center">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <input
                type="text"
                value={feat}
                onChange={e => updateFeature(idx, e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
              <button onClick={() => removeFeature(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={addFeature}
            className="text-xs font-bold text-primary flex items-center gap-1 mt-2 hover:underline"
          >
            <Plus className="w-3 h-3" /> Adicionar Diferencial
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            saved ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Salvo!' : 'Salvar Alterações deste Cartão'}
        </button>
      </div>
    </div>
  );
};
