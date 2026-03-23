
// views/employer/EmployerAccountView.tsx

import React from 'react';
import { User } from '../../types';
import { LogOutIcon, ChevronRightIcon, CreditCardIcon, BriefcaseIcon, SettingsIcon, WalletIcon } from '../../components/Icons';
import { ProfileMenuItem } from '../../components/ProfileMenuItem';

interface EmployerAccountViewProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'company-profile' | 'wallet') => void;
}

export const EmployerAccountView: React.FC<EmployerAccountViewProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--employer-bg)]">
        <header className="p-4 bg-[var(--employer-card)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
            <h1 className="text-2xl font-bold text-[var(--employer-text-primary)]">Hesabım</h1>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
            {/* Company Info */}
            <div className="bg-[var(--employer-card)] p-4 rounded-2xl border border-[var(--employer-border)] flex items-center space-x-4 shadow-sm">
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--employer-border)]"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-[var(--employer-text-primary)]">{user.name}</h2>
                    <p className="text-[var(--employer-text-secondary)] text-sm mt-0.5">{user.email}</p>
                </div>
                 <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronRightIcon className="w-5 h-5 text-[var(--employer-text-secondary)]" />
                </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-3">
                <ProfileMenuItem
                    icon={BriefcaseIcon}
                    title="Şirket Profili"
                    description="Şirket bilgilerinizi ve logonuzu güncelleyin."
                    onClick={() => onNavigate('company-profile')}
                    mode="employer"
                />
                 <ProfileMenuItem
                    icon={WalletIcon}
                    title="Mesai Cüzdanım"
                    description="Bakiye yükleyin ve ödemelerinizi takip edin."
                    onClick={() => onNavigate('wallet')}
                    mode="employer"
                />
                <ProfileMenuItem
                    icon={CreditCardIcon}
                    title="Ödeme Yöntemleri"
                    description="Kayıtlı kartlarınızı yönetin."
                    onClick={() => alert("Ödeme yöntemleri sayfasına git...")}
                    mode="employer"
                />
                <ProfileMenuItem
                    icon={SettingsIcon}
                    title="Ayarlar"
                    description="Bildirimler, dil ve uygulama tercihleri."
                    onClick={() => alert("Ayarlar sayfasına git...")}
                    mode="employer"
                />
            </div>
            
            <button
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 bg-[var(--employer-card)] rounded-xl shadow-sm border border-[var(--employer-border)] text-red-500 hover:bg-red-50 transition-colors group mt-4"
            >
                <span className="font-semibold text-lg">Çıkış Yap</span>
                <LogOutIcon className="w-5 h-5 text-red-500 transition-transform group-hover:translate-x-1" />
            </button>
        </main>
    </div>
  );
};
