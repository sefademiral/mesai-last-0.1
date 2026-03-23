
// views/EmployerPublicProfileView.tsx

import React, { useState } from 'react';
import { User, Job } from '../types';
import { ChevronLeftIcon, BriefcaseIcon, GlobeIcon, MapPinIcon, StarIcon, CheckCircleIcon } from '../components/Icons';
import { JobCard } from '../components/JobCard';
import { getJobImageByCategory } from '../data/mockData';

interface EmployerPublicProfileViewProps {
  employer: User;
  employerJobs: Job[];
  onBack: () => void;
  onViewJob: (job: Job) => void;
}

export const EmployerPublicProfileView: React.FC<EmployerPublicProfileViewProps> = ({ employer, employerJobs, onBack, onViewJob }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'about'>('jobs');

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar">
      {/* Header with Cover Effect */}
      <div className="relative bg-gray-800 h-40 flex-shrink-0">
        <img 
            src={`https://picsum.photos/seed/${employer.name}cover/600/200`} 
            className="w-full h-full object-cover opacity-50" 
            alt="cover"
        />
        <div className="absolute top-0 left-0 p-4">
             <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors text-white">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-12 relative z-10 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center">
            <img 
                src={employer.avatarUrl} 
                alt={employer.name} 
                className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md -mt-14 bg-white"
            />
            <h1 className="text-2xl font-bold text-gray-900 mt-3">{employer.name}</h1>
            <p className="text-gray-500 text-sm font-medium">{employer.industry || 'Hizmet Sektörü'}</p>
            
            <div className="flex items-center justify-center space-x-4 mt-4 w-full border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center">
                     <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="font-bold text-lg">4.8</span>
                        <StarIcon className="w-4 h-4 fill-current" />
                     </div>
                     <span className="text-xs text-gray-400">Puan</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center space-x-1 text-blue-600">
                        <span className="font-bold text-lg">{employerJobs.length}</span>
                     </div>
                     <span className="text-xs text-gray-400">Aktif İlan</span>
                </div>
                 <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span className="font-bold text-sm">Onaylı</span>
                     </div>
                     <span className="text-xs text-gray-400">Hesap</span>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-gray-200/70 p-1 rounded-xl">
            <button
                onClick={() => setActiveTab('jobs')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'jobs' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                İlanlar ({employerJobs.length})
            </button>
            <button
                onClick={() => setActiveTab('about')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'about' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                Hakkında
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-8 space-y-4">
        {activeTab === 'jobs' ? (
             <div className="space-y-4">
                {employerJobs.length > 0 ? (
                    employerJobs.map(job => (
                        <JobCard key={job.id} job={job} onViewJob={onViewJob} onApply={onViewJob} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        Bu işverenin şu an aktif ilanı bulunmuyor.
                    </div>
                )}
             </div>
        ) : (
            <div className="space-y-4">
                {employer.bio && (
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                            <BriefcaseIcon className="w-5 h-5 mr-2 text-gray-500" />
                            Şirket Hakkında
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {employer.bio}
                        </p>
                    </div>
                )}
                
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                    {employer.website && (
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg"><GlobeIcon className="w-5 h-5 text-gray-600" /></div>
                            <div>
                                <p className="text-xs text-gray-500">Web Sitesi</p>
                                <p className="text-sm font-semibold text-blue-600">{employer.website}</p>
                            </div>
                        </div>
                    )}
                    {employer.address && (
                         <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded-lg"><MapPinIcon className="w-5 h-5 text-gray-600" /></div>
                            <div>
                                <p className="text-xs text-gray-500">Adres</p>
                                <p className="text-sm font-semibold text-gray-800">{employer.address}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
