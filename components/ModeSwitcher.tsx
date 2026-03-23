
// components/ModeSwitcher.tsx

import React from 'react';
import { BriefcaseIcon, UserIcon, RefreshCwIcon } from './Icons';

interface ModeSwitcherProps {
  currentMode: 'worker' | 'employer';
  onToggle: () => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onToggle }) => {
  const isWorker = currentMode === 'worker';
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-16 z-[98] flex items-center gap-2 px-3 h-9 bg-black/80 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-black transition-all transform hover:scale-105"
      aria-label={`Switch to ${isWorker ? 'Employer' : 'Worker'} mode`}
    >
      {isWorker ? <UserIcon className="w-3.5 h-3.5" /> : <BriefcaseIcon className="w-3.5 h-3.5" />}
      <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
        {isWorker ? 'Çalışan' : 'İşveren'}
      </span>
      <RefreshCwIcon className="w-3 h-3 text-gray-400 ml-1" />
    </button>
  );
};
