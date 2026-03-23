// components/Onboarding.tsx

import React, { useState, useEffect, useRef } from 'react';

interface OnboardingContent {
  id: string;
  title: string;
  image: string;
  desc: string;
}

const onboardingContents: OnboardingContent[] = [
  {
    id: "1",
    title: "Sana En Yakın İşleri Bul",
    image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1000&auto=format&fit=crop",
    desc: "Harita üzerinden konumuna en yakın günlük iş fırsatlarını anında görüntüle. Yolda vakit kaybetme, sana uygun işi hemen yakala.",
  },
  {
    id: "2",
    title: "Tek Tıkla Başvur, Hemen Başla",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    desc: "Uzun mülakatlar yok. Profilini oluştur, yeteneklerine uygun işe başvur ve işverenle anında sohbete başlayarak işi kap.",
  },
  {
    id: "3",
    title: "Emeğinin Karşılığını Güvenle Al",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1000&auto=format&fit=crop",
    desc: "İşi tamamla, kazancın Mesai Cüzdan'a yatsın. Ödemelerini garantili al, dilediğin zaman banka hesabına çek.",
  },
];

interface OnboardingProps {
  onOnboardingComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const newIndex = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.offsetWidth);
      setCurrentPage(newIndex);
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current && currentPage < onboardingContents.length - 1) {
      scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.offsetWidth, behavior: 'smooth' });
    } else {
      onOnboardingComplete();
    }
  };

  const handleSkip = () => {
    onOnboardingComplete();
  };

  return (
    <div className="flex flex-col h-full w-full font-mulish bg-white">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-grow flex overflow-x-auto no-scrollbar scroll-snap-x-mandatory h-full"
      >
        {onboardingContents.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-full flex flex-col items-center justify-start pt-10 pb-6 text-center scroll-snap-center h-full">
            {/* Image Section */}
            <div className="flex-[3] w-full px-6 flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full max-h-[400px] object-cover rounded-3xl shadow-lg"
              />
            </div>
            {/* Text Section */}
            <div className="flex-[2] flex flex-col justify-start items-center px-8 mt-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4 leading-tight">
                {item.title}
              </h2>
              <p className="text-base text-gray-600 text-center leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex-shrink-0 flex flex-col justify-end items-center pb-10">
        <div className="flex justify-center mb-8">
          {onboardingContents.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full mx-1 transition-all duration-300 ease-in-out ${
                currentPage === i ? 'w-8 bg-[#39FF14]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {currentPage + 1 === onboardingContents.length ? (
          <button
            onClick={handleNext}
            className="bg-black text-white font-bold text-lg rounded-2xl w-[85%] py-4 transition-transform duration-200 hover:scale-[1.02] shadow-xl shadow-black/10"
          >
            HEMEN BAŞLA
          </button>
        ) : (
          <div className="flex justify-between items-center w-full px-8">
            <button
              onClick={handleSkip}
              className="text-gray-500 text-sm font-semibold hover:text-gray-800 transition-colors px-4 py-2"
            >
              ATLA
            </button>
            <button
              onClick={handleNext}
              className="bg-black text-white font-bold text-lg rounded-2xl px-10 py-4 transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-black/10"
            >
              İLERİ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};