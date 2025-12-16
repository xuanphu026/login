import React, { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  onApiKeySubmit: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onApiKeySubmit }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }
    onApiKeySubmit(inputKey.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Key className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Enter API Key</h2>
        </div>
        
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          To use the professional translation engine, you need a Google Gemini API key. 
          Your key is never stored on our servers and is only used for this session.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                Gemini API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="AIza..."
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
            >
              Start Translating
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100">
           <a 
             href="https://aistudio.google.com/app/apikey" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
           >
             <span>Get your API Key here</span>
             <ExternalLink className="w-3 h-3 ml-1.5" />
           </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;