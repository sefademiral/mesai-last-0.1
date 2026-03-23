import React from 'react';
import { Job } from '../../types';
import { ChevronLeftIcon, MapPinIcon, CalendarIcon, ClockIcon, DollarSignIcon, UsersIcon, PencilIcon, TagIcon } from '../../components/Icons';

interface EmployerJobDetailsViewProps {
    job: Job;
    onBack: () => void;
    onEdit: (job: Job) => void;
    onViewApplicants: (job: Job) => void;
}

export const EmployerJobDetailsView: React.FC<EmployerJobDetailsViewProps> = ({ job, onBack, onEdit, onViewApplicants }) => {
    const status = (job as any).status || 'active';
    const applicantCount = (job as any).applicantCount || 0;

    return (
        <div className="flex flex-col h-full bg-[var(--employer-bg)] relative">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-gray-200">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 ml-2">İlan Detayı</h1>
                </div>
                <button 
                    onClick={() => onEdit(job)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <PencilIcon className="w-5 h-5" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-24">
                {/* Status Banner */}
                <div className={`p-3 rounded-lg flex items-center justify-between ${
                    status === 'active' ? 'bg-green-100 text-green-800' :
                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    <span className="font-bold flex items-center">
                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
                            status === 'active' ? 'bg-green-500' :
                            status === 'pending' ? 'bg-yellow-500' :
                            'bg-gray-500'
                        }`}></span>
                        {status === 'active' ? 'Yayında' : status === 'pending' ? 'Onay Bekliyor' : 'Geçmiş'}
                    </span>
                </div>

                {/* Job Title & Category */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{job.title}</h2>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                <TagIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                                {job.category}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center" onClick={() => onViewApplicants(job)}>
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                            <UsersIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{applicantCount}</span>
                        <span className="text-xs text-gray-500 font-medium">Başvuru</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                         <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-2">
                            <DollarSignIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{job.payRate}</span>
                        <span className="text-xs text-gray-500 font-medium">{job.payType === 'daily' ? 'Günlük' : 'Saatlik'}</span>
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg">Detaylar</h3>
                    
                    <div className="flex items-start space-x-3">
                        <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Tarih</p>
                            <p className="text-sm text-gray-500">{job.date}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <ClockIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Saat</p>
                            <p className="text-sm text-gray-500">{job.shiftTime}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Konum</p>
                            <p className="text-sm text-gray-500">{job.location.address}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-2">Açıklama</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Gereksinimler</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.requirements.map((req, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Action Button */}
            <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20">
                <button 
                    onClick={() => onViewApplicants(job)}
                    className="w-full py-3.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 flex items-center justify-center"
                >
                    <UsersIcon className="w-5 h-5 mr-2" />
                    Başvuruları Gör ({applicantCount})
                </button>
            </footer>
        </div>
    );
};
