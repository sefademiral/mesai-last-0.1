// views/ConversationsListView.tsx

import React from 'react';
import { Conversation } from '../types';
import { ConversationItem } from './ConversationItem';
import { MessageSquareIcon } from '../components/Icons';

interface ConversationsListViewProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
}

export const ConversationsListView: React.FC<ConversationsListViewProps> = ({ conversations, onSelectConversation }) => {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="p-4 bg-white sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
      </header>
      <main className="flex-grow overflow-y-auto no-scrollbar p-3">
        {conversations.length > 0 ? (
          <div className="space-y-3">
            {conversations.map((conv) => (
              <ConversationItem 
                key={conv.id} 
                conversation={conv} 
                onSelect={onSelectConversation} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageSquareIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Gelen kutunuz boş</h2>
            <p className="text-gray-500 mt-2 max-w-xs">İşlere başvurduğunuzda işverenlerle olan sohbetleriniz burada görünecektir.</p>
          </div>
        )}
      </main>
    </div>
  );
};