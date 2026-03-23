// views/EditProfileView.tsx

import React, { useState, useEffect } from 'react';
import { User, Badge } from '../types';
import { 
    ChevronLeftIcon, XIcon, PlusCircleIcon, StarIcon, ShieldCheckIcon, 
    ZapIcon, CrownIcon, AwardIcon 
} from '../components/Icons';

interface EditProfileViewProps {
  user: User;
  onBack: () => void;
  onSave: (updatedData: { name: string, bio: string, skills: string[] }) => void;
}

const BadgeIconMap: { [key: string]: React.ElementType } = {
  Star: StarIcon,
  ShieldCheck: ShieldCheckIcon,
  Zap: ZapIcon,
  Crown: CrownIcon,
  Award: AwardIcon,
};

const badgeColorMap: { [key: string]: { bg: string; text: string; } } = {
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const IconComponent = BadgeIconMap[badge.icon];
  const colors = badgeColorMap[badge.color] || badgeColorMap.blue;

  return (
    <div className="flex-shrink-0 w-32 h-32 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-2">
      <div className={`p-3 rounded-full ${colors.bg}`}>
        <IconComponent className={`w-6 h-6 ${colors.text}`} />
      </div>
      <p className="text-xs font-bold text-gray-800 leading-tight">{badge.name}</p>
    </div>
  );
};

export const EditProfileView: React.FC<EditProfileViewProps> = ({ user, onBack, onSave }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || '');
    const [skills, setSkills] = useState(user.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const skillsChanged = JSON.stringify(skills.sort()) !== JSON.stringify((user.skills || []).sort());
        if (name !== user.name || bio !== (user.bio || '') || skillsChanged) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    }, [name, bio, skills, user]);


    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSave = () => {
        if (!isDirty) return;
        onSave({ name, bio, skills });
        // The alert is in App.tsx, which is called by onSave
        onBack();
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 ml-2">Profilimi Düzenle</h1>
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
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <div className="relative">
                        <img src={user.avatarUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                        <button className="absolute bottom-1 right-1 p-2 bg-[#39FF14] rounded-full text-black hover:bg-opacity-90 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9z"></path><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="12" y1="15" x2="12.01" y2="15"></line></svg>
                        </button>
                    </div>
                    <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                        Fotoğrafı Değiştir
                    </button>
                </div>

                {/* Badges Section (non-editable) */}
                {user.badges && user.badges.length > 0 && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Kazanılan Rozetler</h3>
                    <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                      {user.badges.map(badge => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Name and Bio */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                        <input
                            type="text"
                            id="fullName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-12 rounded-lg bg-gray-100 border border-gray-200 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Hakkımda</label>
                        <textarea
                            id="bio"
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Kendinizi tanıtın..."
                            className="w-full rounded-lg bg-gray-100 border border-gray-200 p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                        />
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Becerilerim</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map(skill => (
                            <div key={skill} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">
                                {skill}
                                <button onClick={() => handleRemoveSkill(skill)} className="ml-2 -mr-1 p-0.5 rounded-full hover:bg-blue-200">
                                    <XIcon className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Yeni beceri ekle..."
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                            className="flex-1 h-12 rounded-lg bg-gray-100 border border-gray-200 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                        />
                        <button onClick={handleAddSkill} className="h-12 w-12 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                            <PlusCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
