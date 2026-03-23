// components/NavItem.tsx

import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 transition-all duration-300 ${
      isActive ? 'text-[#39FF14]' : 'text-gray-400'
    } hover:text-[#39FF14]`}
  >
    <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
        {icon}
    </div>
    <span className="text-xs mt-1 font-medium">{label}</span>
  </button>
);
