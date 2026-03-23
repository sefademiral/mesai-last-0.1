// components/SplashScreen.tsx

import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Display splash for 2 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#39FF14] splash-fade-in z-50">
      <h1 className="text-5xl font-poppins font-bold text-white lowercase">mesai.</h1>
    </div>
  );
};
