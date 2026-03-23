// components/QRCodePopup.tsx

import React from 'react';

interface QRCodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userAvatarUrl: string;
  userName: string;
  userPhone: string;
}

export const QRCodePopup: React.FC<QRCodePopupProps> = ({ isOpen, onClose, userAvatarUrl, userName, userPhone }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Close when clicking the overlay
    >
      <div 
        className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative transform scale-100 opacity-100 transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the popup from closing it
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Kapat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">QR Kodum</h2>
          <img src={userAvatarUrl} alt={userName} className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 shadow-md" />
          <p className="text-xl font-semibold text-gray-800">{userName}</p>
          {/* Phone number removed for privacy */}
          
          {/* Mock QR Code Image */}
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://mesai.app/profile/uguryilmaz"
            alt="User QR Code"
            className="w-48 h-48 rounded-lg border border-gray-200 p-2 bg-white"
          />
          <p className="text-sm text-gray-600 mt-2">Bu QR kodu işverenlerinizle paylaşarak profilinize hızlıca erişmelerini sağlayabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
};