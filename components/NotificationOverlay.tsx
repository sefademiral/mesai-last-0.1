
// components/NotificationOverlay.tsx

import React from 'react';
import { AppNotification } from '../types';
import { ChevronLeftIcon, BriefcaseIcon, BellIcon, MessageSquareIcon } from './Icons';

interface NotificationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onNotificationClick: (notification: AppNotification) => void;
}

export const NotificationOverlay: React.FC<NotificationOverlayProps> = ({
  isOpen,
  onClose,
  notifications,
  onNotificationClick,
}) => {
  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'job':
        return <BriefcaseIcon className="w-6 h-6 text-gray-700" />;
      case 'campaign':
        return <BellIcon className="w-6 h-6 text-gray-700" />;
      case 'message':
        return <MessageSquareIcon className="w-6 h-6 text-gray-700" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-700" />;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
    >
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Bildirimler</h1>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {notifications.length > 0 ? (
          <div className="max-w-md mx-auto space-y-3"> {/* Added max-w-md and mx-auto here */}
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick(notification)}
                className={`flex items-start space-x-3 px-4 py-3 rounded-2xl shadow-md border border-gray-100 w-full text-left transition-colors ${
                  notification.isRead ? 'bg-white hover:bg-gray-50' : 'bg-green-50 hover:bg-green-100'
                }`}
              >
                <div className="p-2 rounded-full bg-gray-100 flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notification.title}
                  </h3>
                  <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 p-8">Henüz hiç bildiriminiz yok.</p>
        )}
      </div>
    </div>
  );
};
