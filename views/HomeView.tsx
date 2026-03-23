// views/HomeView.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { Job, AppNotification, FilterState, User } from '../types';
import { NotificationIcon, MapIcon, FilterIcon } from '../components/Icons';
import { JobCard } from '../components/JobCard';
import { categories, campaigns } from '../data/mockData';
import { FilterOverlay } from '../components/FilterOverlay';

interface HomeViewProps {
  user: User;
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onApply: (job: Job) => void; // New: for direct apply from card
  onToggleNotifications: () => void;
  notifications: AppNotification[];
  onNavigateToMap: () => void; // New: for navigating to the map view
}

const getNormalizedPayRate = (job: Job): number => {
    const pay = parseInt(job.payRate.replace(/[^0-9]/g, ''), 10);
    if (job.payType === 'hourly') {
        return pay * 8; // Normalize to a daily rate for comparison
    }
    if (job.payType === 'daily' && job.hourlyEquivalent) {
        const hourly = parseInt(job.hourlyEquivalent.replace(/[^0-9]/g, ''), 10);
        return hourly * 8;
    }
    return pay; // It's a daily rate
};

export const HomeView: React.FC<HomeViewProps> = ({ user, jobs, onViewJob, onApply, onToggleNotifications, notifications, onNavigateToMap }) => {
  const [currentCampaign, setCurrentCampaign] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: 'All',
    sortBy: 'date',
    payType: 'all',
    maxDistance: 50,
    minPay: 0,
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    minRating: 0,
  });

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCampaign((prev) => (prev === campaigns.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);
  
  const handleApplyFilters = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
    setIsFilterOpen(false);
  };
  
  const displayedJobs = useMemo(() => {
      let filtered = [...jobs];

      // Filter by category
      if (activeFilters.category !== 'All') {
          filtered = filtered.filter(job => job.category === activeFilters.category);
      }
      
      // Filter by pay type
      if (activeFilters.payType !== 'all') {
          filtered = filtered.filter(job => job.payType === activeFilters.payType);
      }

      // Filter by distance
      filtered = filtered.filter(job => job.distance <= activeFilters.maxDistance);

      // Filter by minimum pay
      if (activeFilters.minPay > 0) {
          filtered = filtered.filter(job => {
              const jobPay = parseInt(job.payRate.replace(/[^0-9]/g, ''), 10);
              return jobPay >= activeFilters.minPay;
          });
      }

      // Filter by employer rating
      if (activeFilters.minRating > 0) {
          filtered = filtered.filter(job => job.employerRating >= activeFilters.minRating);
      }

      // Filter by location text
      if (activeFilters.location && activeFilters.location !== 'Mevcut Konum') {
        filtered = filtered.filter(job =>
          job.location.address.toLowerCase().includes(activeFilters.location.toLowerCase())
        );
      }
      
      // Filter by date
      if (activeFilters.date) {
        const filterDate = new Date(activeFilters.date + 'T00:00:00');
        const nextDay = new Date(filterDate);
        nextDay.setDate(filterDate.getDate() + 1);

        filtered = filtered.filter(job => {
            const jobDate = new Date(job.date);
            return jobDate >= filterDate && jobDate < nextDay;
        });
      }

      // Filter by time
      if (activeFilters.startTime && activeFilters.endTime) {
        const timeToMinutes = (timeStr: string): number | null => {
            if (!timeStr) return null;
            const lowerTime = timeStr.toLowerCase();
            const isPM = lowerTime.includes('pm');
            let [hoursStr, minutesStr] = lowerTime.replace(/am|pm/g, '').trim().split(':');
            let hours = parseInt(hoursStr, 10);
            let minutes = minutesStr ? parseInt(minutesStr, 10) : 0;

            if (isNaN(hours) || isNaN(minutes)) return null;

            if (isPM && hours < 12) hours += 12;
            else if (!isPM && hours === 12) hours = 0; // 12 AM is midnight
            
            return hours * 60 + minutes;
        };
        const filterStartMinutes = timeToMinutes(activeFilters.startTime);
        const filterEndMinutes = timeToMinutes(activeFilters.endTime);

        if (filterStartMinutes !== null && filterEndMinutes !== null) {
            filtered = filtered.filter(job => {
                const [jobStartStr, jobEndStr] = job.shiftTime.split(' - ');
                if (!jobStartStr || !jobEndStr) return false;
                
                const jobStartMinutes = timeToMinutes(jobStartStr);
                const jobEndMinutes = timeToMinutes(jobEndStr);
                
                if (jobStartMinutes === null || jobEndMinutes === null) return false;
                
                return jobStartMinutes <= filterEndMinutes && jobEndMinutes >= filterStartMinutes;
            });
        }
      }


      // Sort
      switch (activeFilters.sortBy) {
          case 'date':
              filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              break;
          case 'distance':
              filtered.sort((a, b) => a.distance - b.distance);
              break;
          case 'payRate':
              filtered.sort((a, b) => getNormalizedPayRate(b) - getNormalizedPayRate(a));
              break;
      }

      return filtered;

  }, [jobs, activeFilters]);

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-poppins font-bold text-gray-900 lowercase">mesai.</h1>
        <button className="relative p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={onToggleNotifications}>
          <NotificationIcon className="w-6 h-6 text-gray-600" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-50" aria-label={`${unreadNotificationCount} okunmamış bildirim`}/>
          )}
        </button>
      </header>

      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">
          Hoşgeldin, <span className="font-semibold text-gray-800">{user.name}</span>
        </p>
        <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentCampaign * 100}%)` }}
          >
            {campaigns.map((campaign) => (
              <div key={campaign.id} className={`w-full flex-shrink-0 p-5 bg-gradient-to-br ${campaign.bgColor} text-white flex flex-col justify-center`}>
                <h2 className="font-bold text-lg">{campaign.title}</h2>
                <p className="text-sm text-white/90 mt-1">{campaign.description}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {campaigns.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCampaign(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentCampaign === index ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`Go to campaign ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button onClick={onNavigateToMap} className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
            <MapIcon className="w-5 h-5 text-gray-500" />
            <span>Harita ile Ara</span>
          </button>
          <button onClick={() => setIsFilterOpen(true)} className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
            <FilterIcon className="w-5 h-5 text-gray-500" />
            <span>Filtrele</span>
          </button>
        </div>

        <div className="space-y-4 pt-2">
            {displayedJobs.length > 0 ? (
                displayedJobs.map(job => (
                    <JobCard key={job.id} job={job} onViewJob={onViewJob} onApply={onViewJob} />
                ))
            ) : (
                <div className="text-center py-10">
                    <h3 className="text-lg font-semibold text-gray-700">Sonuç Bulunamadı</h3>
                    <p className="text-gray-500 mt-2">Filtre kriterlerinizi değiştirmeyi deneyin.</p>
                </div>
            )}
        </div>
      </div>
      <FilterOverlay 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        initialFilters={activeFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
};