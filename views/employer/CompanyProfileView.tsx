// views/employer/CompanyProfileView.tsx

import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { ChevronLeftIcon, BriefcaseIcon, GlobeIcon, MapPinIcon } from '../../components/Icons';

interface CompanyProfileViewProps {
  user: User;
  onBack: () => void;
  onSave: (updatedData: Partial<User>) => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({ user, onBack, onSave }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || '');
    const [industry, setIndustry] = useState(user.industry || '');
    const [website, setWebsite] = useState(user.website || '');
    const [address, setAddress] = useState(user.address || '');
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (
            name !== user.name ||
            bio !== (user.bio || '') ||
            industry !== (user.industry || '') ||
            website !== (user.website || '') ||
            address !== (user.address || '')
        ) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    }, [name, bio, industry, website, address, user]);

    const handleSave = () => {
        if (!isDirty) return;
        onSave({ name, bio, industry, website, address });
        onBack();
    };

    const FormInput = ({ id, label, value, onChange, placeholder, icon: Icon }: { id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; icon: React.ElementType }) => (
         <div>
            <label htmlFor={id} className="block text-sm font-medium text-[var(--employer-text-secondary)] mb-1">{label}</label>
            <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg transition-all duration-300 focus-within:border-[var(--employer-primary)] focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--employer-primary)]/20">
                <span className="pl-3 pr-2 text-gray-400"><Icon className="w-5 h-5" /></span>
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent h-12 pr-4 focus:outline-none text-[var(--employer-text-primary)]"
                />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[var(--employer-bg)]">
            <header className="flex items-center justify-between p-4 bg-[var(--employer-card)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeftIcon className="w-6 h-6 text-[var(--employer-text-primary)]" />
                    </button>
                    <h1 className="text-xl font-bold text-[var(--employer-text-primary)] ml-2">Şirket Profili</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`font-bold text-base transition-colors ${
                        isDirty
                        ? 'text-blue-600 hover:text-blue-800'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Kaydet
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6 pb-6">
                {/* Profile Picture */}
                <div className="bg-[var(--employer-card)] p-4 rounded-xl shadow-sm border border-[var(--employer-border)] flex flex-col items-center">
                    <div className="relative">
                        <img src={user.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                    </div>
                    <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                        Logoyu Değiştir
                    </button>
                </div>

                {/* Details */}
                <div className="bg-[var(--employer-card)] p-4 rounded-xl shadow-sm border border-[var(--employer-border)] space-y-4">
                     <FormInput
                        id="companyName"
                        label="Şirket Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={BriefcaseIcon}
                    />
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-[var(--employer-text-secondary)] mb-1">Şirket Açıklaması</label>
                        <textarea
                            id="bio"
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Şirketinizi tanıtın..."
                            className="w-full rounded-lg bg-gray-50 border-2 border-gray-200 p-4 focus:outline-none focus:border-[var(--employer-primary)] focus:ring-2 focus:ring-[var(--employer-primary)]/20 resize-none"
                        />
                    </div>
                     <FormInput
                        id="industry"
                        label="Sektör"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Örn: Gıda & Restoran"
                        icon={BriefcaseIcon}
                    />
                     <FormInput
                        id="website"
                        label="Web Sitesi"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.sirketiniz.com"
                        icon={GlobeIcon}
                    />
                     <FormInput
                        id="address"
                        label="Adres"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Şirketinizin açık adresi"
                        icon={MapPinIcon}
                    />
                </div>
            </main>
        </div>
    );
};
