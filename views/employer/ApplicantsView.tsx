
// views/employer/ApplicantsView.tsx

import React from 'react';
import { Job, User } from '../../types';
import { ChevronLeftIcon, UsersIcon } from '../../components/Icons';
import { ApplicantCard } from '../../components/employer/ApplicantCard';

interface ApplicantsViewProps {
  job: Job;
  applicants: User[];
  onBack: () => void;
  onViewApplicant: (applicant: User) => void;
  onHire: (applicant: User) => void;
  onReject: (applicant: User) => void;
  onMessage: (applicant: User) => void;
}

export const ApplicantsView: React.FC<ApplicantsViewProps> = ({ job, applicants, onBack, onViewApplicant, onHire, onReject, onMessage }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--employer-bg)]">
      <header className="flex items-center p-4 bg-[var(--employer-card)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-[var(--employer-text-primary)]" />
        </button>
        <div className="ml-2 min-w-0">
            <h1 className="text-xl font-bold text-[var(--employer-text-primary)] truncate">{job.title}</h1>
            <p className="text-sm text-[var(--employer-text-secondary)] -mt-0.5">{applicants.length} Başvuru</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {applicants.length > 0 ? (
          applicants.map(applicant => (
            <ApplicantCard 
              key={applicant.id} 
              applicant={applicant} 
              onViewProfile={() => onViewApplicant(applicant)}
              onHire={() => onHire(applicant)}
              onReject={() => onReject(applicant)}
              onMessage={() => onMessage(applicant)}
            />
          ))
        ) : (
          <div className="text-center pt-20 flex flex-col items-center">
            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--employer-text-primary)]">Henüz başvuru yok.</h3>
            <p className="mt-1 text-sm text-[var(--employer-text-secondary)] max-w-xs">Bu ilana yeni başvurular geldiğinde burada listelenecektir.</p>
          </div>
        )}
      </main>
    </div>
  );
};
