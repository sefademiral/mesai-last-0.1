// views/employer/EmployerMessagesView.tsx

import React from 'react';
import { Job, Conversation } from '../../types';
import { MessageSquareIcon } from '../../components/Icons';
import { getJobImageByCategory } from '../../data/mockData';

interface EmployerMessagesViewProps {
  jobs: (Job & { applicantCount?: number, status?: 'active' | 'completed' })[];
  conversationsByJob: { [jobId: string]: Conversation[] };
  onSelectJob: (job: Job) => void;
}

const JobConversationCard: React.FC<{
    job: Job & { applicantCount?: number };
    unreadCount: number;
    lastMessageTime: string;
    onClick: () => void;
}> = ({ job, unreadCount, lastMessageTime, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center p-4 bg-[var(--employer-card)] rounded-2xl border border-[var(--employer-border)] text-left hover:bg-gray-50 transition-colors group shadow-sm"
        >
            <img src={getJobImageByCategory(job.category)} alt={job.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0 mx-4">
                <h3 className="font-bold text-[var(--employer-text-primary)] truncate">{job.title}</h3>
                <p className="text-sm text-[var(--employer-text-secondary)] mt-0.5">{job.applicantCount || 0} Başvuru</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xs text-[var(--employer-text-secondary)] mb-1.5">{lastMessageTime}</span>
                {unreadCount > 0 ? (
                    <span className="bg-[var(--employer-primary)] text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md shadow-[var(--employer-primary)]/30">{unreadCount}</span>
                ) : (
                    <div className="w-6 h-6"></div> // Placeholder for alignment
                )}
            </div>
        </button>
    );
};

export const EmployerMessagesView: React.FC<EmployerMessagesViewProps> = ({ jobs, conversationsByJob, onSelectJob }) => {
    const activeJobsWithMessages = jobs
        .filter(job => job.status === 'active' && conversationsByJob[job.id]?.length > 0)
        .map(job => {
            const conversations = conversationsByJob[job.id] || [];
            const unreadCount = conversations.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0);
            const lastMessageTime = conversations.length > 0 ? conversations[0].lastMessageTime : ''; // Simple mock logic
            return { job, unreadCount, lastMessageTime };
        })
        .sort((a,b) => b.unreadCount - a.unreadCount); // Sort by unread count

  return (
    <div className="flex flex-col h-full bg-[var(--employer-bg)]">
      <header className="p-4 bg-[var(--employer-card)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
        <h1 className="text-2xl font-bold text-[var(--employer-text-primary)]">Mesajlar</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {activeJobsWithMessages.length > 0 ? (
            activeJobsWithMessages.map(({ job, unreadCount, lastMessageTime }) => (
                <JobConversationCard
                    key={job.id}
                    job={job}
                    unreadCount={unreadCount}
                    lastMessageTime={lastMessageTime}
                    onClick={() => onSelectJob(job)}
                />
            ))
        ) : (
          <div className="text-center pt-20 flex flex-col items-center">
            <MessageSquareIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--employer-text-primary)]">Henüz mesajınız yok.</h3>
            <p className="mt-1 text-sm text-[var(--employer-text-secondary)] max-w-xs">İlanlarınıza başvuru geldiğinde, adaylarla olan görüşmeleriniz burada listelenecektir.</p>
          </div>
        )}
      </main>
    </div>
  );
};