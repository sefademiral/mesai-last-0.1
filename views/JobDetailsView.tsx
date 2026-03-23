
// views/JobDetailsView.tsx

import React, { useState } from 'react';
import { Job } from '../types';
import {
  ChevronLeftIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  MessageSquareIcon
} from '../components/Icons';
import { StaticMap } from '../components/StaticMap';
import { getJobImageForDetails, getEmployerAvatarUrl } from '../data/mockData';

interface JobDetailsViewProps {
  job: Job;
  onBack: () => void;
  onApply: (job: Job) => void;
  onViewEmployer: (employerName: string) => void;
}

export const JobDetailsView: React.FC<JobDetailsViewProps> = ({ job, onBack, onApply, onViewEmployer }) => {
  const [hasApplied, setHasApplied] = useState(job.applicationStatus === 'İnceleniyor' || job.applicationStatus === 'Görüldü');
  const employerAvatar = job.employerAvatarUrl || getEmployerAvatarUrl(job.employer);

  const handleApplyClick = () => {
    if (!hasApplied) {
      // First click: Only update the UI state to show "Applied" status.
      // We do NOT call onApply(job) yet, because that triggers immediate navigation in App.tsx.
      setHasApplied(true);
    } else {
      // Second click (Button says "Mesaj At"): Navigate to chat/messages.
      onApply(job);
    }
  };

  return (
    <div className="relative bg-white h-full flex flex-col font-inter">
      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          {/* HERO IMAGE SECTION (Monochrome) */}
          <div className="relative h-80 w-full grayscale">
            <img 
                src={getJobImageForDetails(job.category)} 
                alt={job.title} 
                className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

            {/* Navbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                <button onClick={onBack} className="p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-colors text-white border border-white/10">
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                 <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20 uppercase tracking-wider">
                    {job.category}
                </div>
            </div>

            {/* Title & Employer on Image */}
            <div className="absolute bottom-10 left-6 right-6">
                <h1 className="text-3xl font-black text-white leading-tight mb-2">{job.title}</h1>
                <div 
                    onClick={() => onViewEmployer(job.employer)}
                    className="flex items-center space-x-3 cursor-pointer group"
                >
                    <img src={employerAvatar} alt={job.employer} className="w-8 h-8 rounded-full border border-white/50 grayscale group-hover:grayscale-0 transition-all" />
                    <span className="text-white font-medium text-sm group-hover:underline">{job.employer}</span>
                    <div className="flex items-center bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">
                        <StarIcon className="w-2.5 h-2.5 mr-0.5 fill-current" />
                        {job.employerRating}
                    </div>
                </div>
            </div>
          </div>

          {/* CONTENT CONTAINER */}
          <div className="px-6 py-8">
            
            {/* PRICE & STATUS ROW */}
            <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-6">
                <div>
                     <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Ücret</p>
                     <div className="flex items-baseline space-x-1">
                        <span className="text-4xl font-black text-black tracking-tighter">{job.payRate}</span>
                        <span className="text-sm font-medium text-gray-500">/{job.payType === 'hourly' ? 'saat' : 'gün'}</span>
                     </div>
                </div>
                {hasApplied ? (
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-400 mb-1">DURUM</span>
                        <div className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full flex items-center">
                            <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                            BAŞVURULDU
                        </div>
                    </div>
                ) : job.isUrgent && (
                    <div className="px-3 py-1 border border-black text-black text-xs font-bold rounded-full flex items-center">
                        <ClockIcon className="w-3.5 h-3.5 mr-1" />
                        ACİL İLAN
                    </div>
                )}
            </div>

            {/* MODERN INFO SECTION (Replaces Grid) */}
            <div className="mb-8 space-y-4">
                {/* Date & Time Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-gray-50 rounded-full text-gray-500">
                            <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Tarih</p>
                            <p className="text-sm font-bold text-gray-900">{job.date}</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-gray-100 mx-2"></div>
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-gray-50 rounded-full text-gray-500">
                            <ClockIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Saat</p>
                            <p className="text-sm font-bold text-gray-900">{job.shiftTime}</p>
                        </div>
                    </div>
                </div>

                {/* Location Row */}
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                    <div className="p-2 bg-white rounded-full text-gray-900 shadow-sm">
                        <MapPinIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium">Konum</p>
                        <p className="text-sm font-bold text-gray-900 truncate leading-tight">{job.location.address}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm whitespace-nowrap">
                        {job.distance} km
                    </span>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-black mb-3">İş Tanımı</h3>
                <p className="text-gray-600 text-sm leading-7">
                    {job.description}
                </p>
            </div>

            {/* REQUIREMENTS TAGS */}
            {job.requirements && job.requirements.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-bold text-lg text-black mb-3">Gereksinimler</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wide border border-gray-300 text-gray-700">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* MAP (Grayscale) */}
            <div className="mb-8">
                <h3 className="font-bold text-lg text-black mb-3">Harita</h3>
                <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 grayscale contrast-125">
                    <StaticMap lat={job.location.lat} lng={job.location.lng} />
                </div>
            </div>

            {/* APPLY BUTTON - NOW UNDER THE MAP */}
            <div className="mt-6">
                <button
                    onClick={handleApplyClick}
                    className={`w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                        hasApplied 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-[#39FF14] text-black hover:bg-opacity-90'
                    }`}
                >
                    {hasApplied ? (
                        <>
                            <MessageSquareIcon className="w-5 h-5" />
                            <span>Mesaj At</span>
                        </>
                    ) : (
                        <>
                            <span>Hemen Başvur</span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>

          </div>
      </div>
    </div>
  );
};
