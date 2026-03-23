
// views/PublicProfileView.tsx
import React, { useState } from 'react';
import { User, Job, CompletedJob, Badge } from '../types';
import { 
    ChevronLeftIcon, StarIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon, MessageSquareIcon, 
    PencilIcon, BriefcaseIcon, ShieldCheckIcon, ZapIcon, CrownIcon, AwardIcon, XIcon, CheckIcon
} from '../components/Icons';
import { JobCard } from '../components/JobCard';

interface PublicProfileViewProps {
  user: User;
  onBack: () => void;
  completedJobs: CompletedJob[];
  isEmployerView?: boolean; // New prop to check if viewed by an employer
  isOwnProfilePreview?: boolean; // To show the edit button
  onEdit?: () => void; // To handle edit navigation
  onHire?: () => void; // New prop for hiring
  onReject?: () => void; // New prop for rejecting
}

const BadgeIconMap: { [key: string]: React.ElementType } = {
  Star: StarIcon,
  ShieldCheck: ShieldCheckIcon,
  Zap: ZapIcon,
  Crown: CrownIcon,
  Award: AwardIcon,
};

const badgeColorMap: { [key: string]: { bg: string; text: string; } } = {
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const IconComponent = BadgeIconMap[badge.icon];
  const colors = badgeColorMap[badge.color] || badgeColorMap.blue;

  return (
    <div className="flex-shrink-0 w-32 h-32 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-2">
      <div className={`p-3 rounded-full ${colors.bg}`}>
        <IconComponent className={`w-6 h-6 ${colors.text}`} />
      </div>
      <p className="text-xs font-bold text-gray-800 leading-tight">{badge.name}</p>
    </div>
  );
};


export const PublicProfileView: React.FC<PublicProfileViewProps> = ({ 
    user, 
    onBack, 
    completedJobs, 
    isEmployerView = false, 
    isOwnProfilePreview = false, 
    onEdit,
    onHire,
    onReject
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  const getCertificateStatusIcon = (status: 'verified' | 'pending' | 'not-uploaded') => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
      case 'not-uploaded':
      default:
        return <AlertCircleIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getCertificateStatusText = (status: 'verified' | 'pending' | 'not-uploaded') => {
    switch (status) {
      case 'verified':
        return <span className="text-green-600 font-medium">Onaylı</span>;
      case 'pending':
        return <span className="text-gray-600 font-medium">Beklemede</span>;
      case 'not-uploaded':
      default:
        return <span className="text-yellow-600 font-medium">Yüklenmedi</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar pb-24">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-2">{isEmployerView ? "Aday Profili" : "Profil Önizlemesi"}</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* User Header Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          {user.trustScore !== undefined && (
            <div className="mt-4 w-full px-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Güven Puanı: {user.trustScore}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#39FF14] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${user.trustScore}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Badges Section */}
        {user.badges && user.badges.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 px-2">Rozetlerim</h2>
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {user.badges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex bg-gray-200/70 p-1 rounded-xl">
            <button
                onClick={() => setActiveTab('about')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'about' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                Hakkında
            </button>
            <button
                onClick={() => setActiveTab('reviews')}
                className={`w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activeTab === 'reviews' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            >
                Yorumlar ({user.reviews?.length || 0})
            </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Bio Section */}
            {user.bio && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Hakkımda</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{user.bio}</p>
              </div>
            )}

             {/* Work Experience Section */}
            {completedJobs && completedJobs.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-3 text-gray-800">İş Deneyimleri</h3>
                <div className="space-y-4">
                  {completedJobs.slice(0, 5).map(job => (
                    <div key={job.id} className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <BriefcaseIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{job.title}</p>
                        <p className="text-xs text-gray-500">{job.employer} • {job.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Becerilerim</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Section */}
            {user.certificates && user.certificates.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-3 text-gray-800">Sertifikalarım</h3>
                <div className="space-y-2">
                  {user.certificates.map(cert => (
                    <div key={cert.id} className="flex items-center justify-between text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="font-medium">{cert.name}</span>
                      <div className="flex items-center space-x-2">
                        {getCertificateStatusIcon(cert.status)}
                        {getCertificateStatusText(cert.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
           <div className="space-y-6">
            {user.reviews && user.reviews.length > 0 ? (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">İşveren Yorumları</h3>
                  <div className="space-y-4">
                    {user.reviews.map(review => (
                      <div key={review.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <img src={review.reviewerAvatarUrl} alt={review.reviewerName} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-gray-800">{review.reviewerName}</p>
                            <p className="text-xs text-gray-500">{review.jobTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600 ml-2">{review.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-2 text-right">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
            ) : (
                <div className="text-center py-10">
                    <h3 className="text-lg font-semibold text-gray-700">Henüz Yorum Yok</h3>
                    <p className="text-gray-500 mt-2">Bu kullanıcı için henüz bir işveren yorumu bulunmuyor.</p>
                </div>
            )}
          </div>
        )}
      </div>

       {isEmployerView && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100 flex items-center space-x-3">
          <button
              onClick={onReject}
              className="flex-1 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-100"
          >
              <XIcon className="w-5 h-5" />
              <span>Reddet</span>
          </button>
          
          <button
              onClick={() => alert('Sohbet başlatılıyor...')}
              className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200"
          >
              <MessageSquareIcon className="w-5 h-5" />
              <span>Mesaj</span>
          </button>

          <button
              onClick={onHire}
              className="flex-[1.5] py-4 bg-[#39FF14] text-black font-bold rounded-2xl hover:bg-opacity-90 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
          >
              <CheckIcon className="w-5 h-5" />
              <span>İşe Al</span>
          </button>
        </div>
      )}
      
      {isOwnProfilePreview && onEdit && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gray-100">
          <button
              onClick={onEdit}
              className="w-full py-4 bg-[#39FF14] text-black font-bold rounded-2xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_4px_14px_0_rgba(57,255,20,0.3)] flex items-center justify-center space-x-2"
          >
              <PencilIcon className="w-5 h-5" />
              <span>Profili Düzenle</span>
          </button>
        </div>
      )}
    </div>
  );
};
