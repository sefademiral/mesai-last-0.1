// views/employer/JobConversationListView.tsx

import React from 'react';
import { Job, Conversation } from '../../types';
import { ChevronLeftIcon } from '../../components/Icons';

interface JobConversationListViewProps {
  job: Job;
  conversations: Conversation[];
  onBack: () => void;
  onSelectConversation: (conversation: Conversation) => void;
}

const ApplicantConversationItem: React.FC<{
    conversation: Conversation;
    onClick: () => void;
}> = ({ conversation, onClick }) => {
    const isUnread = conversation.unreadCount && conversation.unreadCount > 0;
    return (
        <button onClick={onClick} className="w-full flex items-start space-x-4 p-4 bg-[var(--employer-card)] border-b border-[var(--employer-border)] hover:bg-gray-50 transition-colors text-left group">
            <div className="relative flex-shrink-0">
                <img src={conversation.applicantAvatarUrl} alt={conversation.applicantName} className="w-14 h-14 rounded-full object-cover" />
                {isUnread && (
                    <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full bg-[var(--employer-primary)] ring-2 ring-[var(--employer-card)]"></span>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[var(--employer-text-primary)] truncate">{conversation.applicantName}</h3>
                        <p className={`text-sm mt-1 truncate ${isUnread ? 'text-[var(--employer-text-primary)] font-semibold' : 'text-[var(--employer-text-secondary)]'}`}>
                            {conversation.lastMessage}
                        </p>
                    </div>
                    <span className="text-xs text-[var(--employer-text-secondary)] flex-shrink-0 ml-2 pt-1">{conversation.lastMessageTime}</span>
                </div>
            </div>
            {isUnread && (
                <div className="self-center ml-2">
                    <span className="bg-[var(--employer-primary)] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">
                        {conversation.unreadCount}
                    </span>
                </div>
            )}
        </button>
    );
};

export const JobConversationListView: React.FC<JobConversationListViewProps> = ({ job, conversations, onBack, onSelectConversation }) => {
  return (
    <div className="flex flex-col h-full bg-[var(--employer-bg)]">
      <header className="flex items-center p-4 bg-[var(--employer-card)] sticky top-0 z-10 border-b border-[var(--employer-border)]">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-[var(--employer-text-primary)]" />
        </button>
        <div className="ml-2 min-w-0">
            <h1 className="text-xl font-bold text-[var(--employer-text-primary)] truncate">{job.title}</h1>
            <p className="text-sm text-[var(--employer-text-secondary)] -mt-0.5">{conversations.length} Aday Mesajı</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {conversations.length > 0 ? (
          conversations.map(conv => (
            <ApplicantConversationItem 
                key={conv.id} 
                conversation={conv} 
                onClick={() => onSelectConversation(conv)}
            />
          ))
        ) : (
          <div className="text-center pt-20">
            <h3 className="text-lg font-semibold text-[var(--employer-text-primary)]">Henüz mesaj yok.</h3>
            <p className="mt-1 text-sm text-[var(--employer-text-secondary)]">Bu ilana başvuran adaylarla yaptığınız görüşmeler burada listelenir.</p>
          </div>
        )}
      </main>
    </div>
  );
};