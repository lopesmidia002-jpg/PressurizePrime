import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicSectionEditorProps {
  sectionKey: string;
  sectionData: any;
  onChange: (newSectionData: any) => void;
  label: string;
}

export const DynamicSectionEditor: React.FC<DynamicSectionEditorProps> = ({
  sectionKey,
  sectionData,
  onChange,
  label
}) => {
  const data = sectionData || {};

  const handleFieldChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleArrayChange = (field: string, index: number, subField: string, value: any) => {
    const newArr = [...(data[field] || [])];
    newArr[index] = { ...newArr[index], [subField]: value };
    handleFieldChange(field, newArr);
  };

  // Helper to format labels
  const formatLabel = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      <div>
        <span className="text-xs font-bold text-primary uppercase tracking-wider block">
          Seção: {label}
        </span>
      </div>

      {Object.entries(data).map(([key, value]) => {
        if (typeof value === 'string') {
          return (
            <div key={key}>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {formatLabel(key)}
              </label>
              <textarea
                rows={key === 'title' || key === 'subtitle' ? 2 : 4}
                value={value}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          );
        }
        
        if (Array.isArray(value)) {
          return (
            <div key={key} className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {formatLabel(key)} (Itens)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {value.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative">
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">#{idx + 1}</span>
                    {Object.entries(item).map(([subKey, subVal]) => {
                      if (typeof subVal === 'string') {
                        return (
                          <div key={subKey} className="mt-2">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                              {formatLabel(subKey)}
                            </label>
                            {subKey === 'title' ? (
                                <input
                                  type="text"
                                  value={subVal}
                                  onChange={(e) => handleArrayChange(key, idx, subKey, e.target.value)}
                                  className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg"
                                />
                            ) : (
                                <textarea
                                  rows={3}
                                  value={subVal}
                                  onChange={(e) => handleArrayChange(key, idx, subKey, e.target.value)}
                                  className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg resize-none"
                                />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
};
