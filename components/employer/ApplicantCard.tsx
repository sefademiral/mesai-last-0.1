
// components/employer/ApplicantCard.tsx

import React from 'react';
import { User } from '../../types';
import { ChevronRightIcon, CheckCircleIcon, XIcon, MessageSquareIcon } from '../Icons';

interface ApplicantCardProps {
  applicant: User;
  onViewProfile: () => void;
  onHire: () => void;
  onReject: () => void;
  onMessage: () => void;
}

const TrustScoreRing: React.FC<{ score: number; avatarUrl: string }> = ({ score, avatarUrl }) => {
    const radius = 30; // Slightly smaller for the card
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 70 70">
                {/* Background circle */}
                <circle
                    className="stroke-current text-[var(--employer-border)]"
                    strokeWidth="3"
                    fill="transparent"
                    r={radius}
                    cx="35"
                    cy="35"
                />
                {/* Progress circle */}
                <circle
                    className="stroke-current text-[var(--employer-primary)]"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="35"
                    cy="35"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                        transition: 'stroke-dashoffset 0.5s ease-out',
                    }}
                />
            </svg>
            <img
                src={avatarUrl}
                alt="applicant"
                className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--employer-card)]"
            />
        </div>
    );
};


export const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, onViewProfile, onHire, onReject, onMessage }) => {
  const trustScore = applicant.trustScore || 0;
  
  return (
    <div className="w-full bg-[var(--employer-card)] rounded-2xl border border-[var(--employer-border)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Top Section: Clickable to view profile */}
        <div 
            onClick={onViewProfile}
            className="p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
            <TrustScoreRing score={trustScore} avatarUrl={applicant.avatarUrl} />
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-[var(--employer-text-primary)] truncate">{applicant.name}</h3>
                <p className="text-sm text-[var(--employer-text-secondary)] mt-0.5 font-medium">
                    Güven Puanı: <span className="text-[var(--employer-primary)] font-bold">{trustScore}%</span>
                </p>
                <p className="text-xs text-[var(--employer-text-secondary)] truncate mt-1">
                    {applicant.skills?.slice(0, 3).join(' • ')}
                </p>
            </div>
            <div className="flex-shrink-0">
                 <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex border-t border-[var(--employer-border)] divide-x divide-[var(--employer-border)]">
            <button 
                onClick={(e) => { e.stopPropagation(); onReject(); }}
                className="flex-1 py-3 flex items-center justify-center space-x-1 text-red-600 hover:bg-red-50 transition-colors active:bg-red-100"
            >
                <XIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Reddet</span>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onMessage(); }}
                className="flex-1 py-3 flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 transition-colors active:bg-gray-200"
            >
                <MessageSquareIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Mesaj</span>
            </button>
             <button 
                onClick={(e) => { e.stopPropagation(); onHire(); }}
                className="flex-1 py-3 flex items-center justify-center space-x-1 text-green-600 hover:bg-green-50 transition-colors active:bg-green-100"
            >
                <CheckCircleIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Kabul Et</span>
            </button>
        </div>
    </div>
  );
};
