import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { ImageUploadButton } from './ImageUploadButton';

interface DynamicSectionEditorProps {
  sectionKey: string;
  sectionData: any;
  onChange: (newSectionData: any) => void;
  label: string;
}

export const DynamicSectionEditor: React.FC<DynamicSectionEditorProps> = ({
  sectionKey: _sectionKey,
  sectionData,
  onChange,
  label
}) => {
  const data = sectionData || {};
  const isTopLevelArray = Array.isArray(data);

  const handleFieldChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleTopLevelArrayChange = (index: number, subField: string, value: any) => {
    const newArr = [...data];
    newArr[index] = { ...newArr[index], [subField]: value };
    onChange(newArr);
  };

  const handleTopLevelArrayAdd = () => {
    const newArr = [...data];
    const template = data.length > 0 ? Object.keys(data[0]).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) : { title: '', desc: '' };
    newArr.push(template);
    onChange(newArr);
  };

  const handleTopLevelArrayRemove = (index: number) => {
    const newArr = [...data];
    newArr.splice(index, 1);
    onChange(newArr);
  };

  const handleArrayChange = (field: string, index: number, subField: string, value: any) => {
    const newArr = [...(data[field] || [])];
    newArr[index] = { ...newArr[index], [subField]: value };
    handleFieldChange(field, newArr);
  };

  const handleArrayAdd = (field: string) => {
    const newArr = [...(data[field] || [])];
    const template = newArr.length > 0 ? Object.keys(newArr[0]).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) : { title: '', desc: '' };
    newArr.push(template);
    handleFieldChange(field, newArr);
  };

  const handleArrayRemove = (field: string, index: number) => {
    const newArr = [...(data[field] || [])];
    newArr.splice(index, 1);
    handleFieldChange(field, newArr);
  };

  const formatLabel = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  };

  const renderItemFields = (item: any, onChangeField: (subKey: string, val: any) => void) => {
    return Object.entries(item).map(([subKey, subVal]) => {
      if (typeof subVal === 'string' || typeof subVal === 'number' || subVal === null || subVal === undefined) {
        return (
          <div key={subKey} className="mt-2">
            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
              {formatLabel(subKey)}
            </label>
            {subKey.includes('image') || subKey.includes('icon') ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={(subVal as string) || ''}
                  onChange={(e) => onChangeField(subKey, e.target.value)}
                  className="flex-1 px-2 py-1.5 text-sm border border-slate-300 rounded-lg"
                  placeholder="URL da imagem/ícone"
                />
                <div className="w-10">
                  <ImageUploadButton 
                    onUpload={(url) => onChangeField(subKey, url)} 
                    className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-300 hover:bg-slate-200" 
                  />
                </div>
              </div>
            ) : subKey === 'title' || subKey === 'subtitle' || subKey === 'number' || subKey === 'badge' ? (
                <textarea
                  rows={2}
                  value={(subVal as string) || ''}
                  onChange={(e) => onChangeField(subKey, e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg resize-none"
                />
            ) : (
                <textarea
                  rows={3}
                  value={(subVal as string) || ''}
                  onChange={(e) => onChangeField(subKey, e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg resize-none"
                />
            )}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      <div>
        <span className="text-xs font-bold text-primary uppercase tracking-wider block">
          Seção: {label}
        </span>
      </div>

      {isTopLevelArray ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Itens da Seção
            </label>
            <button
              type="button"
              onClick={handleTopLevelArrayAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Item
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
                <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">#{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleTopLevelArrayRemove(idx)}
                  className="absolute top-2 right-2 p-1.5 text-red-500 bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                  title="Remover item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="mt-4">
                  {renderItemFields(item, (subKey, val) => handleTopLevelArrayChange(idx, subKey, val))}
                </div>
              </div>
            ))}
            {data.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                Nenhum item cadastrado nesta seção.
              </div>
            )}
          </div>
        </div>
      ) : (
        Object.entries(data).map(([key, value]) => {
          if (typeof value === 'string') {
            return (
              <div key={key}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {formatLabel(key)}
                </label>
                {key.includes('image') || key.includes('icon') ? (
                   <div className="flex gap-3">
                     <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="flex-1 px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                     />
                     <ImageUploadButton 
                        onUpload={(url) => handleFieldChange(key, url)} 
                        className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center hover:bg-slate-200" 
                     />
                   </div>
                ) : (
                  <textarea
                    rows={key === 'title' || key === 'subtitle' ? 2 : 4}
                    value={value}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                )}
              </div>
            );
          }
          
          if (Array.isArray(value)) {
            return (
              <div key={key} className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {formatLabel(key)} (Itens)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleArrayAdd(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Item
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {value.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove(key, idx)}
                        className="absolute top-2 right-2 p-1.5 text-red-500 bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="mt-4">
                        {renderItemFields(item, (subKey, val) => handleArrayChange(key, idx, subKey, val))}
                      </div>
                    </div>
                  ))}
                  {value.length === 0 && (
                    <div className="col-span-full py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                      Nenhum item cadastrado.
                    </div>
                  )}
                </div>
              </div>
            );
          }
          
          return null;
        })
      )}
    </div>
  );
};
