// components/StaticMap.tsx

import React from 'react';

interface StaticMapProps {
  lat: number;
  lng: number;
}

export const StaticMap: React.FC<StaticMapProps> = ({ lat, lng }) => (
  <div className="h-48 rounded-2xl overflow-hidden bg-gray-200">
    <img
      src={`https://picsum.photos/seed/${lat},${lng}/400/200`}
      alt="Map of job location"
      className="w-full h-full object-cover"
    />
  </div>
);
