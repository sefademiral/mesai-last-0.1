// components/JobCard.tsx

import React from 'react';
import { Job } from '../types';
import { CalendarIcon, MapPinIcon, ClockIcon, StarIcon } from './Icons';
import { getEmployerAvatarUrl } from '../data/mockData';

interface JobCardProps {
  job: Job;
  onViewJob: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewJob, onApply }) => {
  const employerAvatar = job.employerAvatarUrl || getEmployerAvatarUrl(job.employer);

  return (
    <div
      className="bg-white rounded-3xl shadow-xl border border-gray-100 hover:scale-[1.01] transition-all duration-300 flex flex-col overflow-hidden px-4"
    >
      {/* TOP SECTION: Employer Info, Job Title, Logistics (Clickable for Job Details) */}
      <div onClick={() => onViewJob(job)} className="flex-grow cursor-pointer">
        {/* TOP ROW: Employer Info & Urgent Tag */}
        <div className="flex items-center justify-between pt-4 pb-0">
          <div className="flex items-center space-x-3">
            {/* Employer Logo */}
            <img src={employerAvatar} alt={job.employer} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="flex items-center">
                {/* Employer Name */}
                <span className="text-sm font-semibold text-gray-800">{job.employer}</span>
                {/* Employer Rating */}
                <div className="flex items-center space-x-0.5 ml-2 text-black">
                    <StarIcon className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">{job.employerRating}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Urgent Tag */}
          {job.isUrgent && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">ACİL</span>
          )}
        </div>

        {/* JOB TITLE */}
        <div className="py-3">
          <h3 className="font-bold text-xl text-gray-900 truncate">{job.title}</h3>
        </div>

        {/* LOGISTICS INFO */}
        <div className="pb-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{job.distance} km uzaklıkta</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{job.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{job.shiftTime}</span>
          </div>
        </div>
      </div> {/* End of clickable job details area */}

      {/* BOTTOM SECTION: EARNINGS & APPLY BUTTON */}
      <div className="py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
        {/* Earnings */}
        <div>
          <p className="font-bold text-xl text-gray-900">
            {job.payRate}/{job.payType === 'daily' ? 'günlük' : 'saatlik'}
          </p>
          {job.payType === 'daily' && job.hourlyEquivalent && (
            <p className="text-sm font-normal text-gray-500 mt-1">
              yaklaşık {job.hourlyEquivalent}/saatlik
            </p>
          )}
        </div>

        {/* Apply Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent any parent div's onClick from firing
            onApply(job);
          }}
          className="flex-shrink-0 px-6 py-2 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-opacity-90 transition-colors shadow-md transform hover:scale-[1.01] text-base"
        >
          Başvur
        </button>
      </div>
    </div>
  );
};