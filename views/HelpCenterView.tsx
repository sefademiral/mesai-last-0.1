// views/HelpCenterView.tsx

import React from 'react';
import { ChevronLeftIcon } from '../components/Icons';

interface HelpCenterViewProps {
  onBack: () => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Yardım Merkezi</h1>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Sıkça Sorulan Sorular</h2>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Ödememi ne zaman alırım?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Ödemeler, tamamlanan bir işin işveren tarafından onaylanmasını takiben 7 gün içinde Mesai Cüzdanınıza otomatik olarak yatırılır. Cüzdanınıza yatan tutarı dilediğiniz zaman banka hesabınıza çekebilirsiniz.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Bir işi nasıl iptal edebilirim?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">'İşlerim' sekmesindeki 'Yaklaşan İşler' bölümünden ilgili işi seçerek iptal etme seçeneğini kullanabilirsiniz. İşe 24 saatten az bir süre kala yapılan iptallerde hizmet puanınız düşebilir.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Güven Puanı nedir ve nasıl artırabilirim?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Güven Puanı, profilinizin ne kadar eksiksiz ve doğrulanmış olduğunu gösterir. 'Güvenlik ve Doğrulama' sayfasındaki adımları (kimlik, adli sicil kaydı, sertifikalar) tamamlayarak puanınızı %100'e çıkarabilirsiniz.</p>
          </div>
        </div>
      </main>
    </div>
  );
};