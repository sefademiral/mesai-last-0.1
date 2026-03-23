// components/ProfileMenuItem.tsx

import React from 'react';
import { ChevronRightIcon } from './Icons';

interface ProfileMenuItemProps {
  icon: React.ElementType; // Icon component, e.g., CreditCardIcon
  title: string;
  description: string;
  onClick: () => void;
  mode?: 'worker' | 'employer';
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon: Icon, title, description, onClick, mode = 'worker' }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-start space-x-4 p-4 rounded-xl border group transition-all duration-200 ${
        mode === 'worker' 
        ? 'bg-white border-gray-100 shadow-sm hover:bg-gray-50' 
        : 'bg-[var(--employer-card)] border-[var(--employer-border)] shadow-sm hover:bg-gray-50'
    }`}
  >
    <div className={`p-3 rounded-full flex-shrink-0 transition-colors ${
        mode === 'worker' ? 'bg-gray-100' : 'bg-gray-100'
    }`}>
      <Icon className={`w-6 h-6 transition-colors ${
          mode === 'worker' ? 'text-gray-600' : 'text-gray-600'
      }`} />
    </div>
    <div className="flex-1 text-left">
      <h3 className={`font-semibold text-lg ${
          mode === 'worker' ? 'text-gray-800' : 'text-[var(--employer-text-primary)]'
      }`}>{title}</h3>
      <p className={`text-sm mt-0.5 ${
          mode === 'worker' ? 'text-gray-500' : 'text-[var(--employer-text-secondary)]'
      }`}>{description}</p>
    </div>
    <ChevronRightIcon className={`w-5 h-5 group-hover:translate-x-1 transition-transform mt-3 ${
        mode === 'worker' ? 'text-gray-400' : 'text-gray-400'
    }`} />
  </button>
);