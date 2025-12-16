import React from 'react';
import { FileSpreadsheet, FileText, CheckCircle, AlertCircle, Loader2, File as FileIcon, Download } from 'lucide-react';
import { UploadedFile, FileStatus, FileType } from '../types';
import { formatFileSize } from '../utils/fileUtils';

interface FileItemProps {
  file: UploadedFile;
}

const getFileIcon = (type: FileType) => {
  switch (type) {
    case FileType.EXCEL:
    case FileType.CSV:
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    case FileType.WORD:
      return <FileText className="w-5 h-5 text-blue-600" />;
    case FileType.TEXT:
    case FileType.LOG:
      return <FileText className="w-5 h-5 text-gray-600" />;
    default:
      return <FileIcon className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusIcon = (status: FileStatus) => {
  switch (status) {
    case FileStatus.COMPLETED:
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case FileStatus.ERROR:
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case FileStatus.PROCESSING:
    case FileStatus.TRANSLATING:
      return <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />;
    default:
      return <div className="w-5 h-5 rounded-full border-2 border-gray-200" />;
  }
};

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const downloadFile = () => {
    if (!file.translatedContent) return;
    
    // Simple download logic for text based files
    const blob = new Blob([file.translatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translated_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 flex-1">
        <div className="p-2 bg-gray-50 rounded-lg">
          {getFileIcon(file.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <div className="flex items-center space-x-2 mt-0.5">
            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
            {file.status === FileStatus.ERROR && (
              <span className="text-xs text-red-500">{file.errorMessage}</span>
            )}
            {(file.status === FileStatus.PROCESSING || file.status === FileStatus.TRANSLATING) && (
              <span className="text-xs text-indigo-500 font-medium">
                {file.status === FileStatus.PROCESSING ? 'Parsing...' : 'Translating...'} {file.progress}%
              </span>
            )}
          </div>
          {/* Progress Bar */}
          {(file.status !== FileStatus.PENDING && file.status !== FileStatus.COMPLETED && file.status !== FileStatus.ERROR) && (
             <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
               <div 
                 className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300" 
                 style={{ width: `${file.progress}%` }}
               ></div>
             </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-4">
        {file.status === FileStatus.COMPLETED && file.translatedContent && (
             <button 
                onClick={downloadFile}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Download Translated File"
             >
                <Download className="w-5 h-5" />
             </button>
        )}
        {getStatusIcon(file.status)}
      </div>
    </div>
  );
};

export default FileItem;