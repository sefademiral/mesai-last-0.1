// components/FilterOverlay.tsx

import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';
import { XIcon, MapPinIcon, CrosshairIcon, StarIcon } from './Icons';
import { categories } from '../data/mockData';

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

interface FilterButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border flex items-center justify-center space-x-1.5 ${
            isActive
            ? 'bg-[#39FF14] text-black border-transparent shadow-md'
            : 'bg-white text-gray-600 border-gray-200'
        }`}
    >
        {children}
        <span>{label}</span>
    </button>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
        {children}
    </div>
);


export const FilterOverlay: React.FC<FilterOverlayProps> = ({ isOpen, onClose, onApply, initialFilters }) => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    useEffect(() => {
        if (isOpen) {
            setFilters(initialFilters);
        }
    }, [initialFilters, isOpen]);

    const handleClear = () => {
        const clearedFilters: FilterState = {
            ...initialFilters,
            category: 'All',
            sortBy: 'date',
            payType: 'all',
            maxDistance: 50,
            minPay: 0,
            location: '',
            date: '',
            startTime: '',
            endTime: '',
            minRating: 0,
        };
        setFilters(clearedFilters);
    };
    
    const handleApply = () => {
        onApply(filters);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'} flex flex-col`}>
            <header className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-900">Filtrele & Sırala</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                    <XIcon className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
                <Section title="Sırala">
                    <div className="grid grid-cols-3 gap-2">
                        <FilterButton label="Yeni İlanlar" isActive={filters.sortBy === 'date'} onClick={() => setFilters(f => ({ ...f, sortBy: 'date' }))} />
                        <FilterButton label="Yüksek Maaş" isActive={filters.sortBy === 'payRate'} onClick={() => setFilters(f => ({ ...f, sortBy: 'payRate' }))} />
                        <FilterButton label="Yakınlık" isActive={filters.sortBy === 'distance'} onClick={() => setFilters(f => ({ ...f, sortBy: 'distance' }))} />
                    </div>
                </Section>

                <Section title="Kategoriler">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <FilterButton
                                key={category}
                                label={category}
                                isActive={filters.category === category}
                                onClick={() => setFilters(f => ({ ...f, category }))}
                            />
                        ))}
                    </div>
                </Section>

                <Section title="İşveren Puanı">
                    <div className="grid grid-cols-3 gap-2">
                        <FilterButton label="Tümü" isActive={filters.minRating === 0} onClick={() => setFilters(f => ({ ...f, minRating: 0 }))} />
                        <FilterButton label="4.0+" isActive={filters.minRating === 4.0} onClick={() => setFilters(f => ({ ...f, minRating: 4.0 }))}>
                           <StarIcon className="w-4 h-4 text-yellow-400" />
                        </FilterButton>
                         <FilterButton label="4.5+" isActive={filters.minRating === 4.5} onClick={() => setFilters(f => ({ ...f, minRating: 4.5 }))}>
                           <StarIcon className="w-4 h-4 text-yellow-400" />
                        </FilterButton>
                    </div>
                </Section>

                <Section title="Konum">
                     <div className="relative flex items-center bg-gray-100 border border-gray-200 rounded-lg mb-3">
                        <span className="pl-3 pr-2 text-gray-400"><MapPinIcon className="w-5 h-5" /></span>
                        <input type="text" name="location" value={filters.location} onChange={handleInputChange} placeholder="Adres, şehir veya ilçe girin" className="flex-1 bg-transparent h-12 pr-4 focus:outline-none" />
                    </div>
                    <button onClick={() => setFilters(f => ({ ...f, location: 'Mevcut Konum' }))} className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-semibold text-blue-600 hover:text-blue-800">
                        <CrosshairIcon className="w-5 h-5" />
                        <span>Mevcut Konumumu Kullan</span>
                    </button>
                    <div className="flex justify-between items-center mt-2 mb-2">
                        <h4 className="font-medium text-sm text-gray-800">Mesafe</h4>
                        <span className="text-sm font-medium text-gray-600">En fazla {filters.maxDistance} km</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        name="maxDistance"
                        value={filters.maxDistance}
                        onChange={handleInputChange}
                        className="w-full cursor-pointer range-slider"
                    />
                </Section>
                
                <Section title="Tarih & Saat">
                    <input type="date" name="date" value={filters.date} onChange={handleInputChange} className="w-full h-12 rounded-lg bg-gray-100 border border-gray-200 px-4 mb-3" />
                     <div className="grid grid-cols-2 gap-3">
                        <input type="time" name="startTime" value={filters.startTime} onChange={handleInputChange} className="w-full h-12 rounded-lg bg-gray-100 border border-gray-200 px-4" />
                        <input type="time" name="endTime" value={filters.endTime} onChange={handleInputChange} className="w-full h-12 rounded-lg bg-gray-100 border border-gray-200 px-4" />
                    </div>
                </Section>

                <Section title="Diğer Filtreler">
                    <h4 className="font-medium text-sm text-gray-800 mb-2">Ödeme Tipi</h4>
                    <div className="grid grid-cols-3 gap-2">
                        <FilterButton label="Tümü" isActive={filters.payType === 'all'} onClick={() => setFilters(f => ({ ...f, payType: 'all' }))} />
                        <FilterButton label="Günlük" isActive={filters.payType === 'daily'} onClick={() => setFilters(f => ({ ...f, payType: 'daily' }))} />
                        <FilterButton label="Saatlik" isActive={filters.payType === 'hourly'} onClick={() => setFilters(f => ({ ...f, payType: 'hourly' }))} />
                    </div>
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <h4 className="font-medium text-sm text-gray-800">Minimum Ücret</h4>
                        <span className="text-sm font-medium text-gray-600">Min. {filters.minPay} ₺</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        name="minPay"
                        value={filters.minPay}
                        onChange={handleInputChange}
                        className="w-full cursor-pointer range-slider"
                    />
                </Section>
            </main>
            
            <footer className="p-4 bg-white border-t border-gray-100 flex items-center gap-3 flex-shrink-0">
                <button onClick={handleClear} className="flex-1 py-3 text-sm font-bold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors">
                    Filtreleri Temizle
                </button>
                <button onClick={handleApply} className="flex-1 py-3 text-base font-bold text-black bg-[#39FF14] rounded-xl hover:bg-opacity-90 shadow-md">
                    Sonuçları Göster
                </button>
            </footer>
        </div>
    );
};