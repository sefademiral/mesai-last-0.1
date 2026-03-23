// views/AppliedJobCard.tsx

import React from 'react';
import { Job } from '../types';

interface AppliedJobCardProps {
  job: Job;
}

export const AppliedJobCard: React.FC<AppliedJobCardProps> = ({ job }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
    <div>
      <p className="font-bold text-gray-800">{job.title}</p>
      <p className="text-sm text-gray-500">{job.employer} - {job.date}</p>
    </div>
    <div className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
      {job.applicationStatus}
    </div>
  </div>
);
