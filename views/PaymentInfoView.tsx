// views/PaymentInfoView.tsx

import React, { useState } from 'react';
import { User } from '../types';
import { ChevronLeftIcon } from '../components/Icons';

interface PaymentInfoViewProps {
  user: User;
  onBack: () => void;
}

export const PaymentInfoView: React.FC<PaymentInfoViewProps> = ({ user, onBack }) => {
  const [bankName, setBankName] = useState('');
  const [iban, setIban] = useState('');

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!value.startsWith('TR')) {
      value = 'TR' + value; // Auto-prefix TR if not present
    }
    setIban(value.slice(0, 26)); // Max 26 characters for TR IBAN
  };

  const isIbanValid = iban.startsWith('TR') && iban.length === 26;
  const isFormValid = !!bankName && isIbanValid; // Double negation to convert to boolean

  const handleSave = () => {
    if (isFormValid) {
      alert('Ödeme bilgileriniz başarıyla kaydedildi!');
      onBack();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Ödeme Bilgileri</h1>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm" role="alert">
          Güvenlik nedeniyle, ödemeler sadece kimliğinizle eşleşen ad ve soyada sahip banka hesaplarına yapılır.
        </div>

        <div className="space-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <label htmlFor="accountHolderName" className="block mb-2 text-sm font-medium text-gray-700">Hesap Sahibi Adı Soyadı</label>
            <input
              id="accountHolderName"
              type="text"
              value={user.name}
              disabled
              className="w-full h-12 rounded-lg bg-gray-100 border border-gray-200 px-4 text-lg text-gray-700"
              aria-label="Hesap Sahibi Adı Soyadı"
              aria-disabled="true"
            />
          </div>
          <div>
            <label htmlFor="bankName" className="block mb-2 text-sm font-medium text-gray-700">Banka Adı</label>
            <select
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-12 rounded-lg bg-gray-50 border border-gray-200 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-colors appearance-none"
              aria-label="Banka Adı Seçiniz"
            >
              <option value="" disabled>Banka Seçiniz</option>
              <option value="Garanti BBVA">Garanti BBVA</option>
              <option value="Ziraat Bankası">Ziraat Bankası</option>
              <option value="İş Bankası">İş Bankası</option>
              <option value="Akbank">Akbank</option>
              <option value="Yapı Kredi">Yapı Kredi</option>
              <option value="Halkbank">Halkbank</option>
            </select>
          </div>
          <div>
            <label htmlFor="iban" className="block mb-2 text-sm font-medium text-gray-700">IBAN Numarası</label>
            <input
              id="iban"
              type="text"
              placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
              value={iban}
              onChange={handleIbanChange}
              maxLength={26}
              className={`w-full h-12 rounded-lg bg-gray-50 border px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-colors ${
                iban.length > 0 && !isIbanValid ? 'border-red-400' : 'border-gray-200'
              }`}
              aria-label="IBAN Numarası"
            />
            {iban.length > 0 && !isIbanValid && <p className="text-red-500 text-xs mt-1">Geçerli bir IBAN giriniz (TR ile başlamalı, 26 karakter olmalı).</p>}
          </div>
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-xl text-black font-bold text-lg transition-colors ${
            isFormValid ? 'bg-[#39FF14] hover:bg-opacity-90 shadow-md' : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};
