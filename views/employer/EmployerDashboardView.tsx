
// views/employer/EmployerDashboardView.tsx

import React, { useState, useMemo } from 'react';
import { Job, User, AppNotification } from '../../types';
import { JobPostingCard } from '../../components/employer/JobPostingCard';
import { StatCard } from '../../components/employer/StatCard';
import { BellIcon, BriefcaseIcon } from '../../components/Icons';

interface EmployerDashboardViewProps {
  user: User;
  postedJobs: (Job & { applicantCount?: number, status?: 'active' | 'completed' })[];
  onSelectJob: (job: Job) => void;
  onPostNewJobClick: () => void;
  notifications: AppNotification[];
  onToggleNotifications: () => void;
}

export const EmployerDashboardView: React.FC<EmployerDashboardViewProps> = ({ user, postedJobs, onSelectJob, onPostNewJobClick, notifications, onToggleNotifications }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const unreadNotificationCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const { activeJobsCount, totalApplicants, completedJobsCount } = useMemo(() => {
    const activeJobs = postedJobs.filter(job => job.status === 'active');
    const completedJobs = postedJobs.filter(job => job.status === 'completed');
    const totalApplicants = activeJobs.reduce((sum, job) => sum + (job.applicantCount || 0), 0);
    
    return {
      activeJobsCount: activeJobs.length,
      totalApplicants,
      completedJobsCount: completedJobs.length,
    };
  }, [postedJobs]);

  const filteredJobs = postedJobs.filter(job => job.status === activeTab);

  return (
    <div className="flex flex-col h-full bg-[var(--employer-bg)] relative">
      <header className="p-4 bg-[var(--employer-bg)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
        <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[var(--employer-text-secondary)]">Hoş Geldin,</p>
              <h1 className="text-2xl font-bold text-[var(--employer-text-primary)] -mt-1">{user.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={onToggleNotifications} className="relative p-2 rounded-full hover:bg-gray-200 transition-colors">
                <BellIcon className="w-6 h-6 text-gray-600" />
                {unreadNotificationCount > 0 && (
                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--employer-bg)]" aria-label={`${unreadNotificationCount} okunmamış bildirim`}/>
                )}
              </button>
            </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        {/* Stats Grid - Updated to 3 columns */}
        <div className="grid grid-cols-3 gap-2">
             <div className="col-span-1">
                 <StatCard label="Aktif İlan" value={activeJobsCount.toString()} icon="briefcase" color="green" />
             </div>
             <div className="col-span-1">
                 <StatCard label="Başvurular" value={totalApplicants.toString()} icon="users" color="blue" />
             </div>
             <div className="col-span-1">
                 <StatCard label="Tamamlanan" value={completedJobsCount.toString()} icon="check" color="purple" />
             </div>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gray-200/70 p-1 rounded-full">
            <button
                onClick={() => setActiveTab('active')}
                className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === 'active' ? 'bg-[var(--employer-card)] shadow text-[var(--employer-text-primary)]' : 'text-[var(--employer-text-secondary)]'}`}
            >
                Aktif İlanlar
            </button>
            <button
                onClick={() => setActiveTab('completed')}
                className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === 'completed' ? 'bg-[var(--employer-card)] shadow text-[var(--employer-text-primary)]' : 'text-[var(--employer-text-secondary)]'}`}
            >
                Geçmiş İlanlar
            </button>
        </div>

        {/* Job List */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map(job => <JobPostingCard key={job.id} job={job} onSelect={() => onSelectJob(job)} />)}
          </div>
        ) : (
          <div className="text-center pt-10 flex flex-col items-center">
              <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--employer-text-primary)]">Henüz {activeTab === 'active' ? 'aktif' : 'geçmiş'} ilanınız yok.</h3>
              <p className="mt-1 text-sm text-[var(--employer-text-secondary)] max-w-xs">
                {activeTab === 'active' 
                    ? 'Yeni bir ilan yayınlayarak hemen çalışan bulmaya başlayın.'
                    : 'Tamamlanan ilanlarınız burada görünecektir.'}
              </p>
          </div>
        )}
      </main>
    </div>
  );
};
