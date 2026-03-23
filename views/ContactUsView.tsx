// views/ContactUsView.tsx

import React from 'react';
import { ChevronLeftIcon, MailIcon } from '../components/Icons';

interface ContactUsViewProps {
  onBack: () => void;
}

export const ContactUsView: React.FC<ContactUsViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Bize Ulaşın</h1>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <MailIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Yardıma mı ihtiyacınız var?</h2>
            <p className="text-gray-700 mt-2">Herhangi bir soru veya geri bildirim için bize e-posta gönderin:</p>
            <a href="mailto:destek@mesai.app" className="block font-bold text-lg text-blue-600 hover:underline my-2">destek@mesai.app</a>
            <p className="text-gray-600 text-sm mt-4">Destek ekibimiz size en kısa sürede geri dönüş yapacaktır.</p>
        </div>
      </main>
    </div>
  );
};