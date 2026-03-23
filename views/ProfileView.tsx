
// views/ProfileView.tsx

import React from 'react';
import { User } from '../types';
import { 
    LogOutIcon, CheckCircleIcon, ShieldIcon, FileTextIcon, 
    SettingsIcon, ChevronRightIcon, QrCodeIcon, 
    WalletIcon
} from '../components/Icons';
import { ProfileMenuItem } from '../components/ProfileMenuItem';

interface ProfileViewProps {
  user: User | null;
  onLogout: () => void;
  onNavigateToSubView: (view: 'security-verification' | 'edit-profile' | 'settings' | 'wallet') => void;
  onOpenQrPopup: () => void;
  trustScore: number;
  onNavigateToPublicProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onNavigateToSubView, onOpenQrPopup, trustScore, onNavigateToPublicProfile }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-full space-y-5 font-inter">
      {/* Compact Profile Card */}
      <div 
        onClick={onNavigateToPublicProfile}
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] transition-all duration-200 group"
      >
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-100" 
                    />
                    {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-white shadow-sm">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-[#39FF14]" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base font-medium text-gray-900 leading-tight group-hover:text-black transition-colors">{user.name}</h1>
                    <span className="text-[11px] text-gray-400 font-light mt-0.5 group-hover:text-gray-500 transition-colors">Profili Görüntüle</span>
                </div>
            </div>
            
            <button
              onClick={(e) => { e.stopPropagation(); onOpenQrPopup(); }}
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <QrCodeIcon className="w-5 h-5" />
            </button>
        </div>

        {/* Trust Score Section (Secondary Position) */}
        <div 
            className="mt-4 flex items-center space-x-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100/50 hover:bg-gray-100/80 transition-colors"
            onClick={(e) => { e.stopPropagation(); onNavigateToSubView('security-verification'); }}
        >
             <div className="p-1.5 bg-white rounded-full shadow-sm">
                <ShieldIcon className="w-3.5 h-3.5 text-[#39FF14]" />
             </div>
             <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Güven Puanı</span>
                    <span className="text-[10px] font-bold text-gray-900">%{trustScore}</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#39FF14] rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${trustScore}%` }} 
                    />
                 </div>
             </div>
             <ChevronRightIcon className="w-4 h-4 text-gray-300" />
        </div>
      </div>

      <div className="space-y-3">
        <ProfileMenuItem
          icon={FileTextIcon}
          title="Profilimi Düzenle"
          description="Profil fotoğrafı ve bilgilerini güncelle."
          onClick={() => onNavigateToSubView('edit-profile')}
        />
        <ProfileMenuItem
          icon={WalletIcon}
          title="Mesai Cüzdanım"
          description="Kazançlarını yönet ve ödeme al."
          onClick={() => onNavigateToSubView('wallet')}
        />
        <ProfileMenuItem
          icon={ShieldIcon}
          title="Güvenlik ve Doğrulama"
          description="Belgelerini yükle, güven puanını artır."
          onClick={() => onNavigateToSubView('security-verification')}
        />
        <ProfileMenuItem
          icon={SettingsIcon}
          title="Ayarlar"
          description="Uygulama tercihleri ve bildirimler."
          onClick={() => onNavigateToSubView('settings')}
        />
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 text-red-500 hover:bg-red-50 transition-colors group"
        >
          <span className="font-semibold text-base">Çıkış Yap</span>
          <LogOutIcon className="w-5 h-5 text-red-500 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
