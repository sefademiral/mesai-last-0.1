// views/ConversationItem.tsx

import React from 'react';
import { Conversation } from '../types';

interface ConversationItemProps {
  conversation: Conversation;
  onSelect: (conversation: Conversation) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, onSelect }) => {
  const isUnread = conversation.unreadCount && conversation.unreadCount > 0;

  return (
    <button
      onClick={() => onSelect(conversation)}
      className={`w-full flex items-start space-x-4 p-4 text-left transition-colors duration-200 rounded-xl shadow-sm border ${
        isUnread ? 'bg-green-50 hover:bg-green-100 border-green-200' : 'bg-white hover:bg-gray-50 border-gray-100'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img src={conversation.employerAvatarUrl} alt={conversation.employer} className="w-14 h-14 rounded-full object-cover" />
        {isUnread && (
          <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full bg-[#39FF14] ring-2 ring-white"></span>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          {/* This inner div is crucial for truncation */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 truncate">{conversation.employer}</h3>
            <p className={`text-sm mt-0.5 truncate ${isUnread ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{conversation.jobTitle}</p>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2 pt-1">{conversation.lastMessageTime}</span>
        </div>
        <div className="flex justify-between items-end mt-1.5">
            <p className={`text-sm truncate pr-2 ${isUnread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{conversation.lastMessage}</p>
            {isUnread && (
                <span className="bg-[#39FF14] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">
                    {conversation.unreadCount}
                </span>
            )}
        </div>
      </div>
    </button>
  );
};