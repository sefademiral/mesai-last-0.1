// components/employer/EmployerBottomNav.tsx

import React from 'react';
import { BriefcaseIcon, PlusCircleIcon, MessageSquareIcon, UserIcon, FileTextIcon } from '../Icons';

interface EmployerBottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const EmployerBottomNav: React.FC<EmployerBottomNavProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: 'dashboard', label: 'Panelim', icon: <BriefcaseIcon /> },
    { view: 'my-jobs', label: 'İlanlarım', icon: <FileTextIcon /> },
    { view: 'messages', label: 'Mesajlar', icon: <MessageSquareIcon /> },
    { view: 'account', label: 'Hesabım', icon: <UserIcon /> },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--employer-card)] border-t border-[var(--employer-border)] flex items-center justify-around shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] z-40">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center justify-center w-1/4 transition-all duration-300 ${
              isActive ? 'text-[var(--employer-primary)]' : 'text-[var(--employer-text-secondary)]'
            } hover:text-[var(--employer-primary)]`}
          >
            <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
              {item.icon}
            </div>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};