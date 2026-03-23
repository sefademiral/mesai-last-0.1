
// data/mockData.ts

import { Job, User, CompletedJob, Message, Conversation, Campaign, Certificate, AppNotification, Transaction, Badge } from '../types';

// Helper function to get a consistent avatar URL for employers based on their name
// This function needs to be declared before mockUser, as it's used within mockUser's reviews.
export const getEmployerAvatarUrl = (employerName: string) => {
  // Use a simple hashing approach for a consistent seed
  const seed = employerName.split(' ').map(s => s.charCodeAt(0)).reduce((acc, val) => acc + val, 0);
  return `https://picsum.photos/seed/${seed}/40/40`;
};

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Barista for Morning Shift',
    employer: 'The Coffee Spot',
    employerRating: 4.8,
    distance: 1.2,
    payRate: '$22',
    payType: 'hourly',
    shiftTime: '7:00 AM - 3:00 PM',
    category: 'Waiter',
    description: 'Experienced barista needed for a busy downtown cafe. Must be proficient with espresso machines and latte art. Friendly and customer-oriented attitude is a must.',
    date: 'July 28, 2024',
    location: { address: '123 Main St, Anytown, USA', lat: 34.0522, lng: -118.2437 },
    isUrgent: false,
    employerAvatarUrl: 'https://picsum.photos/seed/TheCoffeeSpot/40/40'
  },
  {
    id: '2',
    title: 'Event Security Staff',
    employer: 'SecureEvents Inc.',
    employerRating: 4.5,
    distance: 3.5,
    payRate: '$250',
    payType: 'daily',
    shiftTime: '6:00 PM - 2:00 AM',
    category: 'Security',
    description: 'Security personnel required for a corporate event. Responsibilities include access control, monitoring the premises, and ensuring guest safety. Prior security experience preferred.',
    date: 'July 29, 2024',
    hourlyEquivalent: '$31.25',
    location: { address: '456 Oak Ave, Anytown, USA', lat: 34.065, lng: -118.27 },
    isUrgent: true,
    employerAvatarUrl: 'https://picsum.photos/seed/SecureEventsInc/40/40'
  },
  {
    id: '3',
    title: 'Hotel Room Cleaner',
    employer: 'Grand Vista Hotel',
    employerRating: 4.6,
    distance: 2.1,
    payRate: '$19',
    payType: 'hourly',
    shiftTime: '9:00 AM - 5:00 PM',
    category: 'Cleaning',
    description: 'Detail-oriented cleaner to maintain our guest rooms. Duties include making beds, cleaning bathrooms, and restocking amenities. Training provided.',
    date: 'July 28, 2024',
    location: { address: '789 Pine Rd, Anytown, USA', lat: 34.04, lng: -118.23 },
    isUrgent: false,
    employerAvatarUrl: 'https://picsum.photos/seed/GrandVistaHotel/40/40'
  },
  {
    id: '4',
    title: 'Wedding Photographer Assistant',
    employer: 'Everlast Photos',
    employerRating: 5.0,
    distance: 8.2,
    payRate: '$400',
    payType: 'daily',
    shiftTime: '12:00 PM - 10:00 PM',
    category: 'Photographer',
    description: 'Assist lead photographer at a wedding. Must be able to carry equipment, manage lighting, and take secondary shots. Own camera is a plus but not required.',
    date: 'August 3, 2024',
    hourlyEquivalent: '$40.00',
    location: { address: '101 Maple Blvd, Anytown, USA', lat: 34.02, lng: -118.26 },
    isUrgent: false,
    employerAvatarUrl: 'https://picsum.photos/seed/EverlastPhotos/40/40'
  },
  {
    id: '5',
    title: 'Yacht Deckhand',
    employer: 'Ocean Breeze Charters',
    employerRating: 4.9,
    distance: 5.4,
    payRate: '$350',
    payType: 'daily',
    shiftTime: '8:00 AM - 6:00 PM',
    category: 'Yacht Crew',
    description: 'Deckhand needed for a private yacht charter. Responsibilities include cleaning the deck, assisting with docking, and providing excellent service to guests. Must be a strong swimmer.',
    date: 'August 1, 2024',
    hourlyEquivalent: '$35.00',
    location: { address: 'Marina Del Rey, Dock 5', lat: 33.9799, lng: -118.4526 },
    isUrgent: true,
    employerAvatarUrl: 'https://picsum.photos/seed/OceanBreezeCharters/40/40'
  },
   {
    id: '6',
    title: 'Waiter Needed - Beach Club',
    employer: 'Sunset Beach Club',
    employerRating: 4.7,
    distance: 2.5,
    payRate: '₺250',
    payType: 'daily',
    shiftTime: '10:00 - 18:00',
    category: 'Waiter',
    description: 'Energetic waiter needed for our busy beach club. Must be friendly and able to handle high-volume service. Experience preferred but not required.',
    date: 'August 10, 2024',
    hourlyEquivalent: '₺31.25',
    location: { address: 'Beachfront Road, Sunny Isles', lat: 33.99, lng: -118.40 },
    isUrgent: false,
    employerAvatarUrl: 'https://picsum.photos/seed/SunsetBeachClub/40/40',
    requirements: ['Hijyen Belgesi', 'İngilizce (Orta Seviye)'],
  }
];

export const mockAdliSicilStatus = 'not-uploaded'; // 'not-uploaded', 'pending', 'verified'
export const mockDriverLicenseStatus = 'not-uploaded'; // 'not-uploaded', 'pending', 'verified'
export const mockResidencePermitStatus = 'not-uploaded'; // 'not-uploaded', 'pending', 'verified'
export const mockDiplomaStatus = 'not-uploaded'; // 'not-uploaded', 'pending', 'verified'
export const mockHealthReportStatus = 'not-uploaded'; // 'not-uploaded', 'pending', 'verified'
export const mockCertificates: Certificate[] = [
  { id: '1', name: 'Hijyen Belgesi.pdf', status: 'verified' },
  { id: '2', name: 'SRC2.jpg', status: 'pending' },
];

export const mockBadges: Badge[] = [
  {
    id: 'badge1',
    name: 'Haftanın Yıldızı',
    icon: 'Star',
    description: 'Bu hafta en çok olumlu yorum alan kullanıcı oldu.',
    color: 'yellow',
  },
  {
    id: 'badge2',
    name: 'Ultra Güvenilir',
    icon: 'ShieldCheck',
    description: 'Tüm doğrulama adımlarını tamamladı ve %100 Güven Puanına sahip.',
    color: 'blue',
  },
  {
    id: 'badge3',
    name: 'Süper Hızlı Başvuruyor',
    icon: 'Zap',
    description: 'Yeni ilanlara en hızlı başvuran kullanıcılardan biri.',
    color: 'purple',
  },
  {
    id: 'badge4',
    name: 'Mesai Pro',
    icon: 'Crown',
    description: '50\'den fazla işi başarıyla tamamladı.',
    color: 'indigo',
  },
  {
    id: 'badge5',
    name: 'Yüksek Kazanan',
    icon: 'Award',
    description: 'Toplam kazancı belirli bir seviyeyi aştı.',
    color: 'green',
  }
];


export const mockUser: User = {
  id: 'u1',
  name: 'Uğur Yılmaz',
  phone: '+90 555-123-4567',
  avatarUrl: 'https://picsum.photos/id/237/200/200',
  isVerified: true,
  email: 'ugur.yilmaz@example.com',
  dob: '1990-01-15',
  gender: 'male',
  trustScore: 80, // Example initial trust score
  bio: 'Deneyimli ve dinamik bir garsonum. Müşteri memnuniyetini her zaman ön planda tutarım. Yeni beceriler öğrenmeye ve kendimi geliştirmeye açığım.',
  skills: ['Garsonluk', 'Müşteri Hizmetleri', 'Hızlı Servis', 'Takım Çalışması', 'Etkinlik Yönetimi'],
  certificates: mockCertificates, // Using existing mockCertificates
  badges: [mockBadges[0], mockBadges[2], mockBadges[4]],
  reviews: [
    {
      id: 'rev1',
      reviewerName: 'The Coffee Spot',
      jobTitle: 'Barista (Sabah Vardiyası)',
      rating: 5,
      comment: 'Uğur, sabah vardiyasında harika bir iş çıkardı. Kahveler mükemmeldi ve müşterilerle iletişimi çok iyiydi. Kesinlikle tekrar çalışmak isteriz!',
      date: '2 ay önce',
      reviewerAvatarUrl: getEmployerAvatarUrl('The Coffee Spot'),
    },
    {
      id: 'rev2',
      reviewerName: 'SecureEvents Inc.',
      jobTitle: 'Etkinlik Güvenlik Görevlisi',
      rating: 4,
      comment: 'Görevini titizlikle yerine getirdi. Etkinlik boyunca herhangi bir sorun yaşanmadı. Biraz daha proaktif olabilir.',
      date: '1 ay önce',
      reviewerAvatarUrl: getEmployerAvatarUrl('SecureEvents Inc.'),
    },
    {
      id: 'rev3',
      reviewerName: 'Grand Vista Hotel',
      jobTitle: 'Otel Oda Temizliği',
      rating: 5,
      comment: 'Odaları pırıl pırıl yaptı, çok detaycı ve hızlıydı. Ekibimize büyük destek oldu.',
      date: '3 hafta önce',
      reviewerAvatarUrl: getEmployerAvatarUrl('Grand Vista Hotel'),
    },
  ],
};

// --- NEW MOCK DATA FOR EMPLOYER MODE ---

export const mockEmployerUser: User = {
  id: 'e1',
  name: 'Sunset Beach Club',
  phone: '+90 212-987-6543',
  avatarUrl: 'https://picsum.photos/seed/SunsetBeachClub/200/200',
  isVerified: true,
  email: 'contact@sunsetbeach.com',
  dob: '2010-05-20', // Founding date
  gender: 'company',
  bio: 'Sahil kenarında, kaliteli hizmet ve eşsiz bir atmosfer sunan birinci sınıf bir mekanız. Ekibimize katılacak enerjik ve yetenekli takım arkadaşları arıyoruz.',
};

export const mockPostedJobs: (Job & { applicantCount?: number, status?: 'active' | 'completed' | 'pending' })[] = [
    {
        ...mockJobs[5], // Waiter Needed - Beach Club
        applicantCount: 4, // Corrected from 8
        status: 'active',
    },
    {
        id: 'pj2',
        title: 'Özel Parti için Barmen',
        employer: 'Sunset Beach Club',
        employerRating: 4.7,
        distance: 0,
        payRate: '₺400',
        payType: 'daily',
        shiftTime: '19:00 - 02:00',
        category: 'Waiter',
        description: 'Özel bir doğum günü partisi için deneyimli barmen aranıyor. Kokteyl hazırlama konusunda yetenekli olmalı.',
        date: '15 Ağustos 2024',
        location: { address: 'Beachfront Road, Sunny Isles', lat: 33.99, lng: -118.40 },
        applicantCount: 2, // Corrected from 3
        status: 'active',
    },
    {
        id: 'pj3',
        title: 'Vale Görevlisi',
        employer: 'Sunset Beach Club',
        employerRating: 4.7,
        distance: 0,
        payRate: '₺300',
        payType: 'daily',
        shiftTime: '18:00 - 01:00',
        category: 'Driver',
        description: 'Hafta sonları için vale görevlisi aranıyor. B sınıfı ehliyet ve sürüş deneyimi gereklidir.',
        date: '12 Ağustos 2024',
        location: { address: 'Beachfront Road, Sunny Isles', lat: 33.99, lng: -118.40 },
        applicantCount: 1, // Corrected from 12
        status: 'completed',
    },
    {
        id: 'pj4',
        title: 'Bulaşıkçı',
        employer: 'Sunset Beach Club',
        employerRating: 4.7,
        distance: 0,
        payRate: '₺250',
        payType: 'daily',
        shiftTime: '14:00 - 22:00',
        category: 'Cleaning',
        description: 'Mutfak ekibimize yardımcı olacak bulaşıkçı.',
        date: '16 Ağustos 2024',
        location: { address: 'Beachfront Road, Sunny Isles', lat: 33.99, lng: -118.40 },
        applicantCount: 0,
        status: 'pending',
    }
];

const generateApplicant = (id: number, name: string, score: number, skills: string[]): User => ({
  id: `u${id}`,
  name: name,
  phone: `+90 555-111-${id.toString().padStart(4,'0')}`,
  avatarUrl: `https://picsum.photos/id/${100 + id}/200/200`,
  isVerified: true,
  email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
  dob: '1995-03-10',
  gender: 'male',
  trustScore: score,
  bio: 'Çalışkan ve güvenilir biriyim. Ekip çalışmasına yatkınım ve yeni şeyler öğrenmeyi seviyorum.',
  skills: skills,
  certificates: [],
  reviews: [],
});

const applicant2 = generateApplicant(2, 'Ayşe Kaya', 95, ['Müşteri Hizmetleri', 'Satış Danışmanlığı']);
const applicant3 = generateApplicant(3, 'Mehmet Öztürk', 75, ['Garsonluk', 'Barista']);
const applicant4 = generateApplicant(4, 'Fatma Demir', 88, ['Hızlı Servis', 'Takım Liderliği', 'İngilizce']);
const applicant5 = generateApplicant(5, 'Caner Yıldız', 92, ['Barmen', 'Kokteyl Hazırlama', 'Miksolog']);

export const mockApplicants: { [jobId: string]: User[] } = {
  '6': [ mockUser, applicant2, applicant3, applicant4 ],
  'pj2': [ applicant5, generateApplicant(6, 'Selin Arslan', 81, ['Barista', 'Garsonluk']) ],
  'pj3': [ generateApplicant(7, 'Burak Çetin', 98, ['Vale', 'B Sınıfı Ehliyet', 'İleri Sürüş Teknikleri']) ]
};

export const mockEmployerConversations: { [jobId: string]: Conversation[] } = {
  '6': [
    {
      id: 'emp_conv_1',
      jobId: '6',
      applicantId: 'u1',
      applicantName: mockUser.name,
      applicantAvatarUrl: mockUser.avatarUrl,
      employer: 'Sunset Beach Club',
      jobTitle: 'Waiter Needed - Beach Club',
      lastMessage: 'Mükemmel! Saat 14:00\'te orada olacağım.',
      lastMessageTime: '10:37 AM',
      employerAvatarUrl: mockEmployerUser.avatarUrl,
      unreadCount: 1,
    },
    {
      id: 'emp_conv_2',
      jobId: '6',
      applicantId: 'u2',
      applicantName: applicant2.name,
      applicantAvatarUrl: applicant2.avatarUrl,
      employer: 'Sunset Beach Club',
      jobTitle: 'Waiter Needed - Beach Club',
      lastMessage: 'Başvurunuz için teşekkürler, inceliyoruz.',
      lastMessageTime: 'Dün',
      employerAvatarUrl: mockEmployerUser.avatarUrl,
    }
  ],
  'pj2': [
    {
      id: 'emp_conv_3',
      jobId: 'pj2',
      applicantId: 'u5',
      applicantName: applicant5.name,
      applicantAvatarUrl: applicant5.avatarUrl,
      employer: 'Sunset Beach Club',
      jobTitle: 'Özel Parti için Barmen',
      lastMessage: 'Görüşme için yarın uygun musunuz?',
      lastMessageTime: '15:20',
      employerAvatarUrl: mockEmployerUser.avatarUrl,
      unreadCount: 3,
    }
  ]
};


// --- END OF EMPLOYER MOCK DATA ---


export const mockCompletedJobs: CompletedJob[] = [
  { id: 'c1', title: 'Waiter at Gala Event', employer: 'Catering Co.', date: '2023-10-15', hoursWorked: 8, earnings: 200, category: 'Waiter', status: 'approved' },
  { id: 'c2', title: 'Office Cleaning', employer: 'CleanCorp', date: '2023-10-17', hoursWorked: 4, earnings: 80, category: 'Cleaning', status: 'approved' },
  { id: 'c3', title: 'Concert Security', employer: 'SecureEvents Inc.', date: '2023-10-20', hoursWorked: 10, earnings: 300, category: 'Security', status: 'pending' },
  { id: 'c4', title: 'Barista', employer: 'The Coffee Spot', date: '2023-10-22', hoursWorked: 8, earnings: 176, category: 'Waiter', status: 'approved' },
  { id: 'c5', title: 'Yacht Crew', employer: 'Ocean Breeze Charters', date: '2023-10-25', hoursWorked: 9, earnings: 315, category: 'Yacht Crew', status: 'approved' },
  { id: 'c6', title: 'Event Security', employer: 'SecureEvents Inc.', date: '2023-11-01', hoursWorked: 7, earnings: 210, category: 'Security', status: 'pending' },
  { id: 'c7', title: 'Hotel Room Cleaner', employer: 'Grand Vista Hotel', date: '2023-11-03', hoursWorked: 6, earnings: 114, category: 'Cleaning', status: 'approved' },
  { id: 'c8', title: 'Wedding Photographer', employer: 'Everlast Photos', date: '2023-11-10', hoursWorked: 12, earnings: 480, category: 'Photographer', status: 'approved' },
  { id: 'c9', title: 'Restaurant Waiter', employer: 'Fine Dining Ltd.', date: '2023-11-12', hoursWorked: 5, earnings: 125, category: 'Waiter', status: 'approved' },
  { id: 'c10', title: 'Warehouse Assistant', employer: 'Logistics Co.', date: '2023-11-15', hoursWorked: 8, earnings: 160, category: 'Other', status: 'approved' },
  { id: 'c11', title: 'Yacht Deckhand', employer: 'Luxury Cruises', date: '2023-11-20', hoursWorked: 10, earnings: 400, category: 'Yacht Crew', status: 'pending' },
  { id: 'c12', title: 'Cafe Barista', employer: 'Brew Haven', date: '2023-11-25', hoursWorked: 7, earnings: 154, category: 'Waiter', status: 'approved' },
  { id: 'c13', title: 'Festival Security', employer: 'Mega Events', date: '2023-12-01', hoursWorked: 12, earnings: 360, category: 'Security', status: 'approved' },
  { id: 'c14', title: 'Home Cleaning', employer: 'Sparkle Homes', date: '2023-12-05', hoursWorked: 3, earnings: 60, category: 'Cleaning', status: 'approved' },
  { id: 'c15', title: 'Portrait Session', employer: 'Artistic Shots', date: '2023-12-10', hoursWorked: 4, earnings: 180, category: 'Photographer', status: 'approved' },
];

export const mockUpcomingJobs: Job[] = [
    {
        ...mockJobs[1],
        id: 'up1',
        date: 'August 5, 2024',
    },
    {
        ...mockJobs[4],
        id: 'up2',
        date: 'August 6, 2024',
    },
    {
        ...mockJobs[0],
        id: 'up3',
        date: 'August 8, 2024',
    }
];

export const mockAppliedJobs: Job[] = [
    {
        ...mockJobs[2],
        id: 'app1',
        applicationStatus: 'İnceleniyor',
    },
    {
        ...mockJobs[3],
        id: 'app2',
        applicationStatus: 'Görüldü',
    },
];


export const mockMessages: Message[] = [
    { id: 'm1', sender: 'employer', message: 'Hi Alex, we saw your application for the Barista position. Are you available for a quick chat tomorrow?', time: '10:30 AM' },
    { id: 'm2', sender: 'user', message: 'Hi! Yes, I am. What time works for you?', time: '10:32 AM' },
    { id: 'm3', sender: 'employer', message: 'Great. How about 10 AM?', time: '10:35 AM' },
    { id: 'm4', sender: 'user', message: 'Sounds good. Talk to you then!', time: '10:36 AM' },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    jobId: '1',
    employer: 'The Coffee Spot',
    jobTitle: 'Barista for Morning Shift',
    lastMessage: 'Sounds good. Talk to you then!',
    lastMessageTime: '10:36 AM',
    employerAvatarUrl: 'https://picsum.photos/seed/TheCoffeeSpot/40/40',
  },
  {
    id: 'conv2',
    jobId: '6',
    employer: 'Sunset Beach Club',
    jobTitle: 'Waiter Needed - Beach Club',
    lastMessage: 'Please bring your ID and any relevant certificates if you have them. Looking forward to meeting you!',
    lastMessageTime: '10:40 AM',
    employerAvatarUrl: 'https://picsum.photos/seed/SunsetBeachClub/40/40',
    unreadCount: 2,
  },
  {
    id: 'conv3',
    jobId: '2',
    employer: 'SecureEvents Inc.',
    jobTitle: 'Event Security Staff',
    lastMessage: 'Thank you for your application, we will get back to you soon.',
    lastMessageTime: 'Yesterday',
    employerAvatarUrl: 'https://picsum.photos/seed/SecureEventsInc/40/40',
  }
];

export const categories = ['All', 'Waiter', 'Security', 'Cleaning', 'Photographer', 'Yacht Crew', 'Driver'];

export const campaigns: Campaign[] = [
  { id: 1, title: 'Garsonlar için Yüksek Maaş!', description: 'Bu hafta tüm garson işlerinde %25\'e varan bonus kazanın.', bgColor: 'from-green-400 to-teal-400' },
  { id: 2, title: 'Gece Vardiyası Bonusu', description: 'Saat 22:00\'den sonra tamamlanan tüm güvenlik işleri için ekstra 50 TL.', bgColor: 'from-blue-500 to-indigo-600' },
  { id: 3, title: 'Arkadaşını Getir, 20 TL Kazan', description: 'Mesai\'ye arkadaşlarınızı davet edin ve ilk işlerinden sonra ödül kazanın.', bgColor: 'from-yellow-400 to-orange-500' }
];


export const getJobImageByCategory = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'Waiter': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&h=250&fit=crop',
    'Security': 'https://images.unsplash.com/photo-1570497530283-a4a39f6745ab?q=80&w=400&h=250&fit=crop',
    'Cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&h=250&fit=crop',
    'Photographer': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=250&fit=crop',
    'Yacht Crew': 'https://images.unsplash.com/photo-1574993111029-734789d09085?q=80&w=400&h=250&fit=crop',
    'Driver': 'https://images.unsplash.com/photo-1533106418989-88406e76825a?q=80&w=400&h=250&fit=crop',
  };
  return categoryMap[category] || 'https://images.unsplash.com/photo-1521790797524-b249679b6720?q=80&w=400&h=250&fit=crop';
};

export const getJobImageForDetails = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'Waiter': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&h=400&fit=crop',
    'Security': 'https://images.unsplash.com/photo-1570497530283-a4a39f6745ab?q=80&w=600&h=400&fit=crop',
    'Cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&h=400&fit=crop',
    'Photographer': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=400&fit=crop',
    'Yacht Crew': 'https://images.unsplash.com/photo-1574993111029-734789d09085?q=80&w=600&h=400&fit=crop',
    'Driver': 'https://images.unsplash.com/photo-1533106418989-88406e76825a?q=80&w=600&h=400&fit=crop',
  };
  return categoryMap[category] || 'https://images.unsplash.com/photo-1521790797524-b249679b6720?q=80&w=600&h=400&fit=crop';
};

export const chatHistoryMock: Message[] = [
  {
    id: '1',
    sender: 'employer',
    message: 'Merhaba! Garson pozisyonu başvurunuzu gördük. Yarın kısa bir görüşme için müsait misiniz?',
    time: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    message: 'Evet, yarın müsaitim. Sizin için hangi saat uygun olur?',
    time: '10:32 AM',
  },
  {
    id: '3',
    sender: 'employer',
    message: 'Harika! Saat 14:00\'te plaj kulübümüzde ne dersiniz? Detayları konuşabilir ve size etrafı gösterebiliriz.',
    time: '10:35 AM',
  },
  {
    id: '4',
    sender: 'user',
    message: 'Mükemmel! Saat 14:00\'te orada olacağım. Yanımda herhangi bir belge getirmem gerekiyor mu?',
    time: '10:37 AM',
  },
  {
    id: '5',
    sender: 'employer',
    message: 'Lütfen kimliğinizi ve varsa ilgili sertifikalarınızı getirin. Sizinle tanışmayı dört gözle bekliyorum!',
    time: '10:40 AM',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif1',
    type: 'job',
    title: 'Yeni İş Fırsatı!',
    description: 'Yeni garsonluk işi Kadıköy\'de sizi bekliyor. Hemen başvur!',
    timestamp: 'Şimdi',
    relatedItemId: '1', // Corresponds to mockJobs[0] (Barista)
    isRead: false,
  },
  {
    id: 'notif2',
    type: 'campaign',
    title: 'Kampanya Hatırlatıcısı',
    description: 'Garsonlara özel %25 bonus fırsatı son 3 gün! Fırsatı kaçırma.',
    timestamp: '10 dk önce',
    relatedItemId: '1', // Corresponds to campaigns[0]
    isRead: false,
  },
  {
    id: 'notif3',
    type: 'message',
    title: 'Okunmamış Mesaj',
    description: 'Sunset Beach Club\'dan yeni mesaj var. Sohbeti kontrol et.',
    timestamp: '25 dk önce',
    relatedItemId: 'conv2', // Corresponds to mockConversations[1]
    isRead: false,
  },
  {
    id: 'notif4',
    type: 'job',
    title: 'Acil İş İlanı!',
    description: 'Güvenlik görevlisi aranıyor! Acil ihtiyaç, yüksek ödeme.',
    timestamp: '1 saat önce',
    relatedItemId: '2', // Corresponds to mockJobs[1] (Event Security)
    isRead: true,
  },
  {
    id: 'notif5',
    type: 'campaign',
    title: 'Mesai\'ye Hoş Geldiniz!',
    description: 'İlk işinize başvur, 10 TL bonus kazan!',
    timestamp: 'Dün',
    relatedItemId: '3', // Corresponds to campaigns[2]
    isRead: true,
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'payout', title: 'Haftalık Ödeme', date: '22 Temmuz 2024', amount: -850.50 },
  { id: 't2', type: 'earning', title: 'Barista for Morning Shift', date: '21 Temmuz 2024', amount: 176.00 },
  { id: 't3', type: 'earning', title: 'Event Security Staff', date: '20 Temmuz 2024', amount: 300.00 },
  { id: 't4', type: 'bonus', title: 'Arkadaşını Getir Bonusu', date: '18 Temmuz 2024', amount: 20.00 },
  { id: 't5', type: 'payout', title: 'Anında Ödeme', date: '15 Temmuz 2024', amount: -450.00 },
  { id: 't6', type: 'earning', title: 'Hotel Room Cleaner', date: '14 Temmuz 2024', amount: 114.00 },
];

export const mockEmployerTransactions: Transaction[] = [
    { id: 'et1', type: 'deposit', title: 'Kredi Kartı ile Yükleme', date: '1 Ağustos 2024', amount: 5000.00 },
    { id: 'et2', type: 'expense', title: 'Ödeme: Ahmet Yılmaz (Garson)', date: '2 Ağustos 2024', amount: -400.00 },
    { id: 'et3', type: 'expense', title: 'Ödeme: Ayşe Demir (Vale)', date: '3 Ağustos 2024', amount: -350.00 },
    { id: 'et4', type: 'deposit', title: 'Havale ile Yükleme', date: '5 Ağustos 2024', amount: 2500.00 },
    { id: 'et5', type: 'expense', title: 'Ödeme: Mehmet Öz (Güvenlik)', date: '6 Ağustos 2024', amount: -500.00 },
];
