// views/SettingsView.tsx

import React, { useState } from 'react';
// FIX: Import BriefcaseIcon to be used in the component.
import { ChevronLeftIcon, ChevronRightIcon, BellIcon, MessageSquareIcon, GlobeIcon, MoonIcon, HelpCircleIcon, MailIcon, FileTextIcon, BriefcaseIcon } from '../components/Icons';

interface SettingsViewProps {
  onBack: () => void;
  onNavigate: (view: 'help' | 'contact' | 'privacy' | 'language-selection') => void;
  language: 'tr' | 'en';
}

const SettingsToggleRow: React.FC<{
  icon: React.ElementType;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}> = ({ icon: Icon, label, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center space-x-4">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="text-gray-800 font-medium">{label}</span>
    </div>
    <button
      onClick={() => onToggle(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? 'bg-[#39FF14]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const SettingsRow: React.FC<{
  icon: React.ElementType;
  label: string;
  value?: string;
  onClick?: () => void;
}> = ({ icon: Icon, label, value, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-3 text-left">
    <div className="flex items-center space-x-4">
      <Icon className="w-5 h-5 text-gray-500" />
      <span className="text-gray-800 font-medium">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-gray-500">{value}</span>}
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
  </button>
);


export const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onNavigate, language }) => {
    const [jobAlerts, setJobAlerts] = useState(true);
    const [messageAlerts, setMessageAlerts] = useState(true);
    const [campaignAlerts, setCampaignAlerts] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 ml-2">Ayarlar</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider pb-2">Bildirimler</h3>
                    <SettingsToggleRow icon={BriefcaseIcon} label="Yeni İş İlanları" enabled={jobAlerts} onToggle={setJobAlerts} />
                    <SettingsToggleRow icon={MessageSquareIcon} label="Mesajlar" enabled={messageAlerts} onToggle={setMessageAlerts} />
                    <SettingsToggleRow icon={BellIcon} label="Kampanyalar & Promosyonlar" enabled={campaignAlerts} onToggle={setCampaignAlerts} />
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider pb-2">Tercihler</h3>
                    <SettingsRow icon={GlobeIcon} label="Dil" value={language === 'tr' ? 'Türkçe' : 'English'} onClick={() => onNavigate('language-selection')} />
                    <SettingsToggleRow icon={MoonIcon} label="Karanlık Mod" enabled={darkMode} onToggle={setDarkMode} />
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wider pb-2">Destek & Yasal</h3>
                    <SettingsRow icon={HelpCircleIcon} label="Yardım Merkezi" onClick={() => onNavigate('help')} />
                    <SettingsRow icon={MailIcon} label="Bize Ulaşın" onClick={() => onNavigate('contact')} />
                    <SettingsRow icon={FileTextIcon} label="Gizlilik Politikası" onClick={() => onNavigate('privacy')} />
                    <SettingsRow icon={FileTextIcon} label="Hizmet Şartları" onClick={() => onNavigate('privacy')} />
                </div>
            </main>
        </div>
    );
};