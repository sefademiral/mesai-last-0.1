// views/MyJobsView.tsx

import React, { useState } from 'react';
import { Job, CompletedJob } from '../types';
import { DollarSignIcon, ClockIcon, BriefcaseIcon } from '../components/Icons';
import { UpcomingJobCard } from './UpcomingJobCard';
import { AppliedJobCard } from './AppliedJobCard';
import { CompletedJobCard } from './CompletedJobCard';
import { StatisticsView } from './StatisticsView'; // Import StatisticsView

interface MyJobsViewProps {
  completedJobs: CompletedJob[];
  upcomingJobs: Job[];
  appliedJobs: Job[];
  onNavigateToStatistics: () => void;
}

export const MyJobsView: React.FC<MyJobsViewProps> = ({ completedJobs, upcomingJobs, appliedJobs, onNavigateToStatistics }) => {
  const [activeTab, setActiveTab] = useState<'applied' | 'completed'>('applied');
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  const totalEarnings = completedJobs.reduce((acc, job) => acc + job.earnings, 0);
  const totalHours = completedJobs.reduce((acc, job) => acc + job.hoursWorked, 0);
  const completedJobsCount = completedJobs.length;

  const visibleUpcomingJobs = showAllUpcoming ? upcomingJobs : upcomingJobs.slice(0, 2);

  return (
    <div className="p-4 bg-gray-50 min-h-full space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Çalışma Geçmişim</h1>

      <div className="grid grid-cols-3 gap-3">
        <button
            onClick={onNavigateToStatistics} // Navigate to StatisticsView
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39FF14]"
        >
            <div className="p-3 rounded-full bg-green-100 mb-2">
                <DollarSignIcon className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">${totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">1 Aylık Toplam Kazanç</p>
        </button>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-100 mb-2">
                <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalHours}</p>
            <p className="text-sm text-gray-500 mt-1">Toplam Saat</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-purple-100 mb-2">
                <BriefcaseIcon className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{completedJobsCount}</p>
            <p className="text-sm text-gray-500 mt-1">Tamamlanan İş</p>
        </div>
      </div>

      {upcomingJobs.length > 0 && (
        <div>
            <h2 className="font-bold text-lg mb-4 text-gray-800">Yaklaşan İşlerim</h2>
            <div className="space-y-3">
                {visibleUpcomingJobs.map(job => <UpcomingJobCard key={job.id} job={job} />)}
                {upcomingJobs.length > 2 && !showAllUpcoming && (
                    <button
                        onClick={() => setShowAllUpcoming(true)}
                        className="w-full text-center py-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Daha fazlasını gör
                    </button>
                )}
            </div>
        </div>
      )}

      <div>
        <div className="flex bg-gray-200/70 p-1 rounded-xl mb-4">
            <button
                onClick={() => setActiveTab('applied')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'applied' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                Başvurulanlar
            </button>
            <button
                onClick={() => setActiveTab('completed')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'completed' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                Tamamlananlar
            </button>
        </div>
        <div className="space-y-3">
          {activeTab === 'applied' && (
            appliedJobs.length > 0 ? (
                appliedJobs.map(job => <AppliedJobCard key={job.id} job={job} />)
            ) : (
                <p className="text-center text-gray-500 pt-4">Henüz başvurduğunuz bir iş yok.</p>
            )
          )}
          {activeTab === 'completed' && (
             completedJobs.length > 0 ? (
                completedJobs.map(job => <CompletedJobCard key={job.id} job={job} />)
            ) : (
                <p className="text-center text-gray-500 pt-4">Henüz tamamlanan bir işiniz yok.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};