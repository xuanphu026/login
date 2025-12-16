import { FileType } from '../types';

export const getFileType = (filename: string): FileType => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'xlsx':
    case 'xls':
      return FileType.EXCEL;
    case 'docx':
    case 'doc':
      return FileType.WORD;
    case 'csv':
      return FileType.CSV;
    case 'txt':
      return FileType.TEXT;
    case 'log':
      return FileType.LOG;
    default:
      return FileType.UNKNOWN;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};