// views/LanguageSelectionView.tsx

import React from 'react';
import { ChevronLeftIcon, CheckIcon } from '../components/Icons';

interface LanguageSelectionViewProps {
  onBack: () => void;
  currentLanguage: 'tr' | 'en';
  onSelectLanguage: (language: 'tr' | 'en') => void;
}

export const LanguageSelectionView: React.FC<LanguageSelectionViewProps> = ({ onBack, currentLanguage, onSelectLanguage }) => {
  
  const handleSelect = (language: 'tr' | 'en') => {
    onSelectLanguage(language);
    onBack();
  };

  const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Dil Seçimi</h1>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className={`font-medium ${currentLanguage === lang.code ? 'text-[#39FF14]' : 'text-gray-800'}`}>
                {lang.name}
              </span>
              {currentLanguage === lang.code && (
                <CheckIcon className="w-6 h-6 text-[#39FF14]" />
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};