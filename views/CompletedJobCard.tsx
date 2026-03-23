// views/CompletedJobCard.tsx

import React from 'react';
import { CompletedJob } from '../types';
import { CheckCircleIcon, ClockIcon } from '../components/Icons';

interface CompletedJobCardProps {
  job: CompletedJob;
}

export const CompletedJobCard: React.FC<CompletedJobCardProps> = ({ job }) => {
  const isApproved = job.status === 'approved';
  const statusColor = isApproved ? 'text-green-600 bg-green-100' : 'text-yellow-800 bg-yellow-100';
  const StatusIcon = isApproved ? CheckCircleIcon : ClockIcon;
  const statusText = isApproved ? 'Onaylandı' : 'Onay Bekliyor';

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 truncate">{job.title}</p>
        <p className="text-sm text-gray-500 truncate">{job.employer} - {job.date}</p>
        <div className={`mt-2 inline-flex items-center space-x-1.5 px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusText}</span>
        </div>
      </div>
      <p className="font-bold text-lg text-green-600 ml-2 flex-shrink-0">${job.earnings}</p>
    </div>
  );
};