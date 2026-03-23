// views/MapView.tsx

import React, { useState, useCallback } from 'react';
import { Job } from '../types';
import { ChevronLeftIcon, MapPinIcon } from '../components/Icons';
import { JobCard } from '../components/JobCard';

interface MapViewProps {
  jobs: Job[];
  onBack: () => void;
  onViewJob: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const MapView: React.FC<MapViewProps> = ({ jobs, onBack, onViewJob, onApply }) => {
  const [selectedJobOnMap, setSelectedJobOnMap] = useState<Job | null>(null);

  // Define a bounding box for our mock data (roughly Los Angeles area)
  const MIN_LAT = 33.9799; // Roughly Marina Del Rey south
  const MAX_LAT = 34.065;  // Roughly north of downtown LA
  const MIN_LNG = -118.4526; // Roughly Marina Del Rey west
  const MAX_LNG = -118.23;   // Roughly east of downtown LA

  const getMarkerPosition = (lat: number, lng: number) => {
    // Normalize coordinates to 0-1 range within the bounding box
    const normalizedLat = (lat - MIN_LAT) / (MAX_LAT - MIN_LAT);
    const normalizedLng = (lng - MIN_LNG) / (MAX_LNG - MIN_LNG);

    // Map to percentage for CSS top/left (top is inverted for latitude)
    const top = (1 - normalizedLat) * 100;
    const left = normalizedLng * 100;

    return { top: `${top}%`, left: `${left}%` };
  };

  const handleMapClick = useCallback((e: React.MouseEvent) => {
    // If the click target is not a job marker, close the job card
    if (!(e.target as HTMLElement).closest('.job-marker')) {
      setSelectedJobOnMap(null);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      <header className="flex items-center p-4 bg-white absolute top-0 left-0 right-0 z-20 shadow-sm border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Harita Üzerinde İşler</h1>
      </header>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden mt-16" onClick={handleMapClick}>
        <img
          src="https://picsum.photos/seed/mapview/600/800" // Generic map image
          alt="Job Map"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-0 bg-black opacity-10" /> {/* Slight overlay for contrast */}

        {/* Job Markers */}
        {jobs.map((job) => {
          const position = getMarkerPosition(job.location.lat, job.location.lng);
          return (
            <button
              key={job.id}
              className="job-marker absolute p-1 bg-white rounded-full shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={position}
              onClick={(e) => {
                e.stopPropagation(); // Prevent map click from closing card immediately
                setSelectedJobOnMap(job);
              }}
              aria-label={`Show details for ${job.title}`}
            >
              <MapPinIcon className={`w-6 h-6 ${selectedJobOnMap?.id === job.id ? 'text-[#39FF14]' : 'text-red-500'}`} />
            </button>
          );
        })}
      </div>

      {/* Job Card Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-transparent transition-transform duration-300 ease-in-out z-30
          ${selectedJobOnMap ? 'translate-y-0' : 'translate-y-full'}
          ${selectedJobOnMap ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div className="bg-white rounded-t-3xl shadow-xl border-t border-gray-100 p-4 relative">
          {selectedJobOnMap && (
            <>
              <button
                onClick={() => setSelectedJobOnMap(null)}
                className="absolute top-2 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-40"
                aria-label="Kapat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <JobCard job={selectedJobOnMap} onViewJob={onViewJob} onApply={onViewJob} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
