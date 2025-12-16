export enum FileStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  TRANSLATING = 'TRANSLATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export enum FileType {
  EXCEL = 'xlsx',
  WORD = 'docx',
  CSV = 'csv',
  TEXT = 'txt',
  LOG = 'log',
  UNKNOWN = 'unknown',
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: FileType;
  status: FileStatus;
  progress: number;
  errorMessage?: string;
  translatedContent?: string; // For text/csv files where we can show preview/download easily in browser
}

export interface TranslationConfig {
  sourceLang: string;
  targetLang: string;
}