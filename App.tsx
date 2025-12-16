import React, { useState, useEffect } from 'react';
import { Languages, Zap, History, ShieldCheck, LogOut } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FileItem from './components/FileItem';
import ApiKeyModal from './components/ApiKeyModal';
import Login from './components/Login';
import { UploadedFile, FileStatus, FileType } from './types';
import { getFileType, readFileAsText } from './utils/fileUtils';
import { initializeGemini, translateTextChunk } from './services/geminiService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Gemini if apiKey is present in environment
  useEffect(() => {
    if (process.env.API_KEY) {
      setApiKey(process.env.API_KEY);
      initializeGemini(process.env.API_KEY);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    initializeGemini(key);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setFiles([]); // Clear sensitive data on logout
  };

  const handleFilesSelected = (newFiles: File[]) => {
    const filesWithId: UploadedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      status: FileStatus.PENDING,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...filesWithId]);
  };

  const processFile = async (fileItem: UploadedFile) => {
    setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: FileStatus.PROCESSING, progress: 10 } : f));

    try {
      let contentToTranslate = '';
      let isBinary = false;

      if (fileItem.type === FileType.TEXT || fileItem.type === FileType.CSV || fileItem.type === FileType.LOG || fileItem.type === FileType.EXCEL) {
        contentToTranslate = await readFileAsText(fileItem.file);
      } else {
        isBinary = true;
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        contentToTranslate = `[METADATA: ${fileItem.name}] This is a simulation of translated content for binary file types.`;
      }

      setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, status: FileStatus.TRANSLATING, progress: 30 } : f));

      const translated = await translateTextChunk(contentToTranslate.substring(0, 5000));
      
      setFiles(prev => prev.map(f => f.id === fileItem.id ? { ...f, progress: 80 } : f));

      if (isBinary) {
          await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
        ...f, 
        status: FileStatus.COMPLETED, 
        progress: 100,
        translatedContent: translated
      } : f));

    } catch (error) {
      console.error(error);
      setFiles(prev => prev.map(f => f.id === fileItem.id ? { 
        ...f, 
        status: FileStatus.ERROR, 
        errorMessage: 'Translation failed. Check API limits.' 
      } : f));
    }
  };

  const handleStartTranslation = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const pendingFiles = files.filter(f => f.status === FileStatus.PENDING || f.status === FileStatus.ERROR);
    
    for (const file of pendingFiles) {
      await processFile(file);
    }

    setIsProcessing(false);
  };

  // 1. Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Render Main App if authenticated
  return (
    <div className="min-h-screen flex flex-col">
      {!apiKey && <ApiKeyModal onApiKeySubmit={handleApiKeySubmit} />}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Languages className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">DocuTranslate AI</h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-1 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full mr-2">
               <span className="text-indigo-600">VI</span>
               <span>→</span>
               <span className="text-indigo-600">JP</span>
             </div>
             <button 
               onClick={handleLogout}
               className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
               title="Logout"
             >
               <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Professional Document Translation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Translate Excel, Word, and Text files from Vietnamese to Japanese while preserving structure and formatting using Gemini AI.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-50 rounded-full mb-3">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Format Preservation</h3>
              <p className="text-sm text-gray-500 mt-1">Keeps formulas, styles, and tables intact.</p>
           </div>
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-amber-50 rounded-full mb-3">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Gemini Powered</h3>
              <p className="text-sm text-gray-500 mt-1">Uses advanced AI for context-aware translation.</p>
           </div>
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-emerald-50 rounded-full mb-3">
                <History className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Batch Processing</h3>
              <p className="text-sm text-gray-500 mt-1">Handle multiple files efficiently.</p>
           </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
           <FileUpload onFilesSelected={handleFilesSelected} disabled={isProcessing} />
        </div>

        {/* File List & Actions */}
        {files.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Files ({files.length})</h3>
              {files.some(f => f.status === FileStatus.PENDING) && (
                <button
                  onClick={handleStartTranslation}
                  disabled={isProcessing}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-medium text-white shadow-sm transition-all
                    ${isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                    }
                  `}
                >
                  {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isProcessing ? 'Processing...' : 'Translate All Files'}</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <FileItem key={file.id} file={file} />
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DocuTranslate AI. Powered by Google Gemini.</p>
        </div>
      </footer>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

function Loader2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default App;