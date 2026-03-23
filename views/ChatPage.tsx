// views/ChatPage.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Job, Message } from '../types';
import { ChevronLeftIcon, MoreVerticalIcon, SendIcon } from '../components/Icons';
import { chatHistoryMock } from '../data/mockData';

interface ChatPageProps {
  job: Job & { 
    employerAvatarUrl?: string;
    applicantName?: string;
    applicantAvatarUrl?: string;
  };
  onBack: () => void;
  onNavigateToJobDetails: () => void;
  userMode: 'worker' | 'employer';
}

export const ChatPage: React.FC<ChatPageProps> = ({ job, onBack, onNavigateToJobDetails, userMode }) => {
  const [messages, setMessages] = useState<Message[]>(chatHistoryMock);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        sender: userMode === 'worker' ? 'user' : 'employer',
        message: message.trim(),
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };
  
  const isMyMessage = (sender: 'user' | 'employer') => {
    if (userMode === 'worker') return sender === 'user';
    if (userMode === 'employer') return sender === 'employer';
    return false;
  };

  const chatPartnerName = userMode === 'worker' ? job.employer : job.applicantName;
  const chatPartnerAvatar = userMode === 'worker' ? job.employerAvatarUrl : job.applicantAvatarUrl;

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <header className="flex-shrink-0 bg-white px-4 py-3 border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-100 transition-colors" onClick={onBack}>
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>
          <img src={chatPartnerAvatar} alt={chatPartnerName} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 truncate">{chatPartnerName}</h3>
            <p className="text-xs text-green-600 font-semibold truncate">Şimdi aktif</p>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => alert('Daha fazla seçenek eklenecek.')}
          >
            <MoreVerticalIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Job Context Banner */}
      <div className="flex-shrink-0 bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{job.title}</p>
            <p className="text-xs text-gray-500 truncate">{job.payRate}/{job.payType} • {job.shiftTime}</p>
          </div>
          <button
            className="px-4 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors flex-shrink-0"
            onClick={onNavigateToJobDetails}
          >
            İşi Gör
          </button>
        </div>
      </div>

      {/* Messages */}
      <main className="flex-1 px-4 pt-4 pb-2 overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
              Bugün
            </span>
          </div>

          {messages.map((chat) => (
            <div key={chat.id} className={`flex items-end gap-2 ${isMyMessage(chat.sender) ? 'justify-end' : 'justify-start'}`}>
               {!isMyMessage(chat.sender) && <p className="text-[10px] text-gray-400 mb-1 flex-shrink-0">{chat.time}</p>}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                isMyMessage(chat.sender)
                  ? 'bg-[#39FF14] text-black rounded-br-lg'
                  : 'bg-white text-gray-800 rounded-bl-lg shadow-sm border border-gray-100'
              }`}>
                <p className="text-sm leading-snug">{chat.message}</p>
              </div>
               {isMyMessage(chat.sender) && <p className="text-[10px] text-gray-400 mb-1 flex-shrink-0">{chat.time}</p>}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </main>
      
      {/* Quick Replies */}
      <div className="flex-shrink-0 px-2 py-2 bg-gray-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['İlgileniyorum! 👍', 'Adres neresi? 📍', 'Yeniden planlayabilir miyiz? 📅'].map(reply => (
            <button key={reply} onClick={() => setMessage(reply)} className="flex-shrink-0 px-3 py-1.5 text-sm font-semibold text-blue-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <footer className="flex-shrink-0 bg-white px-3 py-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bir mesaj yaz..."
            className="flex-1 h-11 bg-gray-100 border-2 border-transparent rounded-full px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] focus:bg-white transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="h-11 w-11 rounded-full bg-[#39FF14] text-black flex items-center justify-center transition-transform transform active:scale-90"
            onClick={handleSend}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};