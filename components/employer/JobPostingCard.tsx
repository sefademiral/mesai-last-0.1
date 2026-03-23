// components/employer/JobPostingCard.tsx

import React from 'react';
import { Job } from '../../types';
import { ChevronRightIcon, UsersIcon, CalendarIcon, TagIcon } from '../Icons';

interface JobPostingCardProps {
  job: Job & { applicantCount?: number, status?: 'active' | 'completed' };
  onSelect: () => void;
}

export const JobPostingCard: React.FC<JobPostingCardProps> = ({ job, onSelect }) => {
  const applicantCount = job.applicantCount || 0;
  
  return (
    <div
      className="w-full bg-[var(--employer-card)] p-4 rounded-2xl border border-[var(--employer-border)] text-left transition-all duration-300 hover:shadow-lg hover:scale-[1.02] shadow-sm"
    >
      {/* Top Section: Title & Category */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-[var(--employer-text-primary)] text-lg leading-tight">{job.title}</h3>
          <div className="flex items-center space-x-1.5 text-xs text-[var(--employer-text-secondary)] mt-1.5">
            <TagIcon className="w-3.5 h-3.5" />
            <span>{job.category}</span>
          </div>
        </div>
        {job.status === 'active' && (
          <span className="bg-[var(--employer-green-soft)] text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Aktif</span>
        )}
        {job.status === 'completed' && (
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">Tamamlandı</span>
        )}
      </div>

      {/* Middle Section: Stats */}
      <div className="flex items-center space-x-4 text-sm text-[var(--employer-text-secondary)] mt-4">
        <div className="flex items-center space-x-2">
          <UsersIcon className="w-5 h-5" />
          <p><span className="font-bold text-[var(--employer-text-primary)]">{applicantCount}</span> Başvuru</p>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5" />
          <p><span className="font-bold text-[var(--employer-text-primary)]">{job.date}</span></p>
        </div>
      </div>

      {/* Bottom Section: Action */}
      <div className="mt-4 pt-4 border-t border-[var(--employer-border)]">
        <button
          onClick={onSelect}
          className="w-full flex justify-between items-center text-left text-[var(--employer-primary)] font-semibold group"
        >
          <span>Adayları Gör</span>
          <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};