import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadButtonProps {
  onUpload: (base64Url: string) => void;
  className?: string;
  buttonText?: string;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ 
  onUpload, 
  className = '', 
  buttonText = 'Upload' 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onUpload(result);
      }
    };
    reader.readAsDataURL(file);
    
    // Reset the input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleButtonClick}
        className={`inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl border border-slate-300 transition-colors cursor-pointer text-xs shrink-0 ${className}`}
      >
        <Upload className="w-3.5 h-3.5" />
        <span>{buttonText}</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};
