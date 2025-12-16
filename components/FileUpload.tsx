import React, { useCallback } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, disabled }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected, disabled]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-50' : 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-500 cursor-pointer'}
      `}
    >
      <input
        type="file"
        multiple
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        accept=".xlsx,.xls,.docx,.doc,.csv,.txt,.log"
      />
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="p-3 bg-white rounded-full shadow-sm">
          <UploadCloud className={`w-8 h-8 ${disabled ? 'text-gray-400' : 'text-indigo-600'}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported: Excel, Word, CSV, TXT, LOG
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;