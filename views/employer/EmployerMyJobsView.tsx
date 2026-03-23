import React, { useState } from 'react';
import { Job } from '../../types';
import { ChevronRightIcon, PlusCircleIcon, CalendarIcon, UsersIcon, TagIcon, ClockIcon } from '../../components/Icons';

interface EmployerMyJobsViewProps {
    postedJobs: Job[];
    onSelectJob: (job: Job) => void;
    onPostNewJob: () => void;
}

export const EmployerMyJobsView: React.FC<EmployerMyJobsViewProps> = ({ postedJobs, onSelectJob, onPostNewJob }) => {
    const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');

    const filteredJobs = postedJobs.filter(job => {
        const status = job.status || 'active'; // Default to active if undefined
        return status === activeTab;
    });

    const tabs = [
        { id: 'active', label: 'Yayında' },
        { id: 'pending', label: 'Onay Bekliyor' },
        { id: 'completed', label: 'Geçmiş' }
    ];

    return (
        <div className="flex flex-col h-full bg-[var(--employer-bg)]">
            <header className="p-4 bg-white sticky top-0 z-10 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">İlanlarım</h1>
                <button 
                    onClick={onPostNewJob}
                    className="flex items-center space-x-2 bg-[var(--employer-primary)] text-black px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-sm"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>Yeni İlan</span>
                </button>
            </header>

            {/* Tabs */}
            <div className="flex p-2 bg-white border-b border-gray-200 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-2 px-4 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${
                            activeTab === tab.id 
                            ? 'bg-black text-white' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-24">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} onClick={() => onSelectJob(job)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden">
                             {/* Status Indicator Strip */}
                             <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                 activeTab === 'active' ? 'bg-green-500' : 
                                 activeTab === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                             }`}></div>

                            <div className="pl-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 leading-tight">{job.title}</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md flex items-center">
                                                <TagIcon className="w-3 h-3 mr-1"/>
                                                {job.category}
                                            </span>
                                            {job.isUrgent && (
                                                <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-md">
                                                    ACİL
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-lg text-gray-900">{job.payRate}</span>
                                        <span className="text-xs text-gray-500">{job.payType === 'daily' ? 'Günlük' : 'Saatlik'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3">
                                    <div className="flex items-center space-x-1.5">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{job.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{job.shiftTime}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <UsersIcon className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold text-gray-700">{(job as any).applicantCount || 0} Başvuru</span>
                                    </div>
                                    <span className="text-[var(--employer-primary)] group-hover:translate-x-1 transition-transform">
                                        <ChevronRightIcon className="w-5 h-5 text-black" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-8 opacity-60">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <PlusCircleIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">İlan Bulunamadı</h3>
                        <p className="text-sm text-gray-500 mt-2">Bu kategoride henüz bir ilanınız bulunmuyor.</p>
                        {activeTab === 'active' && (
                            <button onClick={onPostNewJob} className="mt-4 text-[var(--employer-primary)] font-bold hover:underline">
                                Hemen İlan Oluştur
                            </button>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
