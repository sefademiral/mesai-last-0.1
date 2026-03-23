
// components/employer/StatCard.tsx

import React from 'react';
import { BriefcaseIcon, UsersIcon, CheckCircleIcon, ClockIcon, AwardIcon } from '../Icons';

interface StatCardProps {
    label: string;
    value: string;
    icon: 'briefcase' | 'users' | 'check' | 'clock' | 'award';
    color: 'green' | 'blue' | 'purple' | 'yellow' | 'indigo';
}

const iconMap = {
    briefcase: BriefcaseIcon,
    users: UsersIcon,
    check: CheckCircleIcon,
    clock: ClockIcon,
    award: AwardIcon,
};

const colorMap = {
    green: {
        bg: 'bg-[var(--employer-green-soft)]',
        text: 'text-green-600',
    },
    blue: {
        bg: 'bg-[var(--employer-blue-soft)]',
        text: 'text-blue-600',
    },
    purple: {
        bg: 'bg-[var(--employer-purple-soft)]',
        text: 'text-purple-600',
    },
    yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
    },
    indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
    }
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
    const Icon = iconMap[icon];
    const { bg, text } = colorMap[color];
    
    return (
        <div className="bg-[var(--employer-card)] p-3 rounded-2xl border border-[var(--employer-border)] flex flex-col justify-between text-left shadow-sm h-full">
            <div className={`p-2 ${bg} rounded-lg w-fit mb-3`}>
                <Icon className={`w-5 h-5 ${text}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--employer-text-primary)]">{value}</p>
              <p className="text-xs text-[var(--employer-text-secondary)] font-medium truncate">{label}</p>
            </div>
        </div>
    );
};
