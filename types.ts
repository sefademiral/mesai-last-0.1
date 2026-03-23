
// types.ts

export interface Job {
  id: string;
  title: string;
  employer: string;
  employerRating: number;
  distance: number;
  payRate: string;
  payType: 'hourly' | 'daily';
  shiftTime: string;
  category: string;
  description: string;
  date: string;
  hourlyEquivalent?: string;
  applicationStatus?: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  isUrgent?: boolean; // New: To indicate if a job is urgent
  employerAvatarUrl?: string; // New: For employer logo/avatar in job card
  requirements?: string[]; // New: For job requirements like 'SRC Belgesi'
  status?: 'active' | 'pending' | 'completed' | 'draft'; // New: Status of the job
}

export interface Skill {
  name: string;
}

export interface Review {
  id:string;
  reviewerName: string; // The employer who gave the review
  jobTitle: string; // Context for the review
  rating: number; // 1-5 stars
  comment: string;
  date: string; // e.g., "3 ay önce"
  reviewerAvatarUrl: string; // For the employer giving the review
}

export interface Badge {
  id: string;
  name: 'Haftanın Yıldızı' | 'Ultra Güvenilir' | 'Süper Hızlı Başvuruyor' | 'Mesai Pro' | 'Yüksek Kazanan';
  icon: 'Star' | 'ShieldCheck' | 'Zap' | 'Crown' | 'Award';
  description: string;
  color: 'yellow' | 'blue' | 'purple' | 'indigo' | 'green';
}

export interface User {
  id: string;
  name: string;
  phone: string;
  avatarUrl: string;
  isVerified: boolean;
  email: string;
  dob: string;
  gender: string;
  trustScore?: number; // Add this
  bio?: string; // New: About me section for public profile
  skills?: string[]; // New: Array of skill names for public profile
  certificates?: Certificate[]; // New: Certificates for public profile, reusing existing type
  reviews?: Review[]; // New: Employer reviews for public profile
  badges?: Badge[]; // New: for gamification badges
  // Employer-specific fields
  industry?: string;
  website?: string;
  address?: string;
}

export interface CompletedJob {
  id: string;
  title: string;
  employer: string;
  date: string;
  hoursWorked: number;
  earnings: number;
  category: string;
  status: 'approved' | 'pending';
}

export interface Message {
    id: string;
    sender: 'user' | 'employer';
    message: string; // Renamed from 'text' to 'message' to match current usage in ChatPage
    time: string; // Renamed from 'timestamp' to 'time' to match current usage in ChatPage
}

export interface Conversation {
  id: string;
  jobId: string;
  applicantId?: string; // Who the employer is talking to
  applicantName?: string; // For display
  applicantAvatarUrl?: string; // For display
  employer: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  employerAvatarUrl: string;
  unreadCount?: number; // For employer view
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  bgColor: string;
}

export interface Certificate {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'not-uploaded';
}

export interface AppNotification {
  id: string;
  type: 'job' | 'campaign' | 'message';
  title: string;
  description: string;
  timestamp: string; // e.g., "Şimdi", "10 dk önce", "Dün"
  relatedItemId?: string; // ID of the related job, campaign, or conversation
  isRead: boolean;
}

export interface Transaction {
  id: string;
  type: 'earning' | 'payout' | 'bonus' | 'deposit' | 'expense'; // Added deposit (add money) and expense (pay worker)
  title: string;
  date: string;
  amount: number;
}

export interface FilterState {
  category: string;
  sortBy: 'date' | 'payRate' | 'distance';
  payType: 'all' | 'hourly' | 'daily';
  maxDistance: number; // in km
  minPay: number; // in currency units
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  minRating: number; // 0 for all, 4 for 4.0+, 4.5 for 4.5+
}
