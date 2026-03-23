// components/BottomNav.tsx

import React from 'react';
import { NavItem } from './NavItem';
import { CompassIcon, MessageSquareIcon, BriefcaseIcon, UserIcon } from './Icons';

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: 'home', label: 'Keşfet', icon: <CompassIcon /> },
    { view: 'messages', label: 'Mesajlar', icon: <MessageSquareIcon /> },
    { view: 'my-jobs', label: 'İşlerim', icon: <BriefcaseIcon /> },
    { view: 'profile', label: 'Hesabım', icon: <UserIcon /> },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex items-center justify-around shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavItem
          key={item.view}
          icon={item.icon}
          label={item.label}
          isActive={currentView === item.view}
          onClick={() => setCurrentView(item.view)}
        />
      ))}
    </div>
  );
};
