import React, { useState } from 'react';
import { Image, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface ImageUrlFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}

export const ImageUrlField: React.FC<ImageUrlFieldProps> = ({ label, value, onChange, hint }) => {
  const [previewStatus, setPreviewStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  const handleChange = (url: string) => {
    onChange(url);
    setPreviewStatus('idle');
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      {hint && (
        <p className="text-xs text-slate-500 leading-relaxed">{hint}</p>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={value}
            onChange={e => handleChange(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors flex items-center gap-1 shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver
          </a>
        )}
      </div>

      {/* Preview */}
      {value && (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50" style={{ maxHeight: 160 }}>
          <img
            src={value}
            alt="Preview"
            className="w-full object-cover"
            style={{ maxHeight: 160 }}
            onLoad={() => setPreviewStatus('ok')}
            onError={() => setPreviewStatus('error')}
          />
          {previewStatus === 'ok' && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> OK
            </div>
          )}
          {previewStatus === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-50 text-red-500 text-xs font-bold">
              <AlertCircle className="w-5 h-5" />
              URL inválida ou imagem não carregada
            </div>
          )}
        </div>
      )}
    </div>
  );
};
