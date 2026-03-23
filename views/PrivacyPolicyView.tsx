// views/PrivacyPolicyView.tsx

import React from 'react';
import { ChevronLeftIcon } from '../components/Icons';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Gizlilik Politikası</h1>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 text-sm text-gray-600 leading-relaxed">
          <p className="font-semibold text-gray-500">Son Güncelleme: 29 Temmuz 2024</p>
          <p>Mesai olarak, gizliliğinize önem veriyoruz. Bu politika, hangi kişisel bilgileri topladığımızı, neden topladığımızı ve bu bilgilerle ne yaptığımızı açıklamaktadır.</p>
          
          <h3 className="font-semibold text-gray-800 pt-2 text-base">1. Topladığımız Bilgiler</h3>
          <p>Uygulamamızı kullandığınızda, hesap oluştururken sağladığınız ad, telefon numarası, e-posta, doğum tarihi gibi bilgileri toplarız. Konum tabanlı işler sunabilmek için cihazınızın konum verilerini (izninizle) kullanırız. Ayrıca, güvenlik ve doğrulama süreçleri için yüklediğiniz belgeleri (kimlik, adli sicil kaydı vb.) saklarız.</p>
          
          <h3 className="font-semibold text-gray-800 pt-2 text-base">2. Bilgilerin Kullanımı</h3>
          <p>Topladığımız bilgiler, hizmetlerimizi sunmak, geliştirmek, kişiselleştirmek ve güvenliği sağlamak amacıyla kullanılır. İşverenlerin, iş başvurularınızı değerlendirebilmesi için profil bilgilerinizi (adınız, becerileriniz, puanınız vb.) onlarla paylaşırız. İletişim bilgileriniz, sizinle doğrudan iletişime geçmeleri için kullanılmaz; tüm iletişim uygulama içi mesajlaşma üzerinden yürütülür.</p>

          <h3 className="font-semibold text-gray-800 pt-2 text-base">3. Veri Güvenliği</h3>
          <p>Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz. Tüm veriler şifrelenmiş sunucularda saklanmaktadır.</p>
        </div>
      </main>
    </div>
  );
};