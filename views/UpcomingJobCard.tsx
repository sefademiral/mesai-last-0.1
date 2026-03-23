// views/UpcomingJobCard.tsx

import React from 'react';
import { Job } from '../types';
import { CalendarIcon } from '../components/Icons';

interface UpcomingJobCardProps {
  job: Job;
}

export const UpcomingJobCard: React.FC<UpcomingJobCardProps> = ({ job }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-xl">
          <CalendarIcon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
          <p className="font-bold text-gray-800">{job.title}</p>
          <p className="text-sm text-gray-500">{job.employer} - <span className="font-medium text-blue-600">{job.date}</span></p>
      </div>
  </div>
);
