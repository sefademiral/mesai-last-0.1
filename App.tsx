
// App.tsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Import Types
import { Job, Conversation, User, AppNotification, Transaction } from './types';

// Import Mock Data
import { mockJobs, mockUser, mockCompletedJobs, mockUpcomingJobs, mockAppliedJobs, mockConversations, mockNotifications, mockPostedJobs, mockApplicants, mockEmployerUser, mockEmployerConversations, getEmployerAvatarUrl, mockEmployerTransactions } from './data/mockData';

// Import Components
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { BottomNav } from './components/BottomNav';
import { NotificationOverlay } from './components/NotificationOverlay';
import { QRCodePopup } from './components/QRCodePopup'; // Import new QR popup
import { ModeSwitcher } from './components/ModeSwitcher'; // Import ModeSwitcher
import { EmployerBottomNav } from './components/employer/EmployerBottomNav';
import { DebugPanel } from './components/DebugPanel'; // New Import
import { CogIcon } from './components/Icons'; // New Import

// Import Views
import { LoginScreen } from './views/LoginScreen';
import { HomeView } from './views/HomeView';
import { JobDetailsView } from './views/JobDetailsView';
import { ChatPage } from './views/ChatPage';
import { ConversationsListView } from './views/ConversationsListView';
import { MyJobsView } from './views/MyJobsView';
import { ProfileView } from './views/ProfileView';
import { PaymentInfoView } from './views/PaymentInfoView';
import { SecurityVerificationView } from './views/SecurityVerificationView';
import { EditProfileView } from './views/EditProfileView';
import { SettingsView } from './views/SettingsView';
import { StatisticsView } from './views/StatisticsView';
import { MapView } from './views/MapView';
import { PublicProfileView } from './views/PublicProfileView';
import { HelpCenterView } from './views/HelpCenterView';
import { ContactUsView } from './views/ContactUsView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { LanguageSelectionView } from './views/LanguageSelectionView';
import { WalletView } from './views/WalletView';
import { EmployerPublicProfileView } from './views/EmployerPublicProfileView'; // New View
import { EmployerMyJobsView } from './views/employer/EmployerMyJobsView';
import { EmployerJobDetailsView } from './views/employer/EmployerJobDetailsView';

// EMPLOYER VIEWS
import { EmployerDashboardView } from './views/employer/EmployerDashboardView';
import { PostJobView } from './views/employer/PostJobView';
import { ApplicantsView } from './views/employer/ApplicantsView';
import { EmployerAccountView } from './views/employer/EmployerAccountView';
import { EmployerMessagesView } from './views/employer/EmployerMessagesView';
import { JobConversationListView } from './views/employer/JobConversationListView';
import { CompanyProfileView } from './views/employer/CompanyProfileView';

type LoginStep = 'phone' | 'otp' | 'role-selection' | 'register-details' | 'company-details';

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeConversationJob, setActiveConversationJob] = useState<(Job & {
    employerAvatarUrl?: string;
    applicantName?: string;
    applicantAvatarUrl?: string;
  }) | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profileSubView, setProfileSubView] = useState<'main' | 'payment-info' | 'security-verification' | 'edit-profile' | 'settings' | 'statistics' | 'public-profile' | 'wallet'>('main');
  const [settingsSubView, setSettingsSubView] = useState<'main' | 'help' | 'contact' | 'privacy' | 'language-selection'>('main');
  const [userMode, setUserMode] = useState<'worker' | 'employer'>('worker');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  
  // New state for viewing an employer's profile from the worker side
  const [selectedEmployerProfile, setSelectedEmployerProfile] = useState<User | null>(null);
  const [selectedEmployerJobs, setSelectedEmployerJobs] = useState<Job[]>([]);


  // Employer state
  const [employerCurrentView, setEmployerCurrentView] = useState('dashboard');
  const [postedJobs, setPostedJobs] = useState(mockPostedJobs);
  const [selectedPostedJob, setSelectedPostedJob] = useState<Job | null>(null);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null); // New state for editing
  const [selectedApplicant, setSelectedApplicant] = useState<User | null>(null);
  const [selectedJobForMessages, setSelectedJobForMessages] = useState<Job | null>(null);
  const [employerAccountSubView, setEmployerAccountSubView] = useState<'main' | 'company-profile' | 'wallet'>('main');

  // Wallet State
  const [employerWalletBalance, setEmployerWalletBalance] = useState(12500.00);
  const [employerTransactionList, setEmployerTransactionList] = useState<Transaction[]>(mockEmployerTransactions);

  // New state to handle navigation context for employer back button
  const [navigationSource, setNavigationSource] = useState<'chat' | null>(null);

  // New state to control LoginScreen step
  const [loginScreenStep, setLoginScreenStep] = useState<LoginStep>('phone');


  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState<AppNotification[]>(mockNotifications);

  // QR Code Popup states
  const [showQrPopup, setShowQrPopup] = useState(false);
  const handleOpenQrPopup = useCallback(() => setShowQrPopup(true), []);
  const handleCloseQrPopup = useCallback(() => setShowQrPopup(false), []);

  // Trust Score State (for profile verification percentage)
  const [totalTrustScore, setTotalTrustScore] = useState(0);
  const handleUpdateTrustScore = useCallback((score: number) => {
    setTotalTrustScore(score);
    // Optionally update user object if trustScore should persist across App.tsx
    setUser(prevUser => prevUser ? { ...prevUser, trustScore: score } : null);
  }, []);

  // Debug Panel State
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // Check if we are in post-job view to hide bottom nav
  const isEmployerPostJob = userMode === 'employer' && employerCurrentView === 'post-job';

  // Splash screen timer
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setShowOnboarding(true); // Transition to onboarding after splash
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Onboarding completion handler
  const handleOnboardingComplete = useCallback(() => {
      setShowOnboarding(false);
      // After onboarding, go to login.
      setCurrentView('login');
  }, []);

  // User mode toggle handler
  const handleToggleMode = useCallback(() => {
    setUserMode(prev => {
        const newMode = prev === 'worker' ? 'employer' : 'worker';
        if (newMode === 'worker') {
            setCurrentView('home');
            setUser(mockUser);
        } else {
            setEmployerCurrentView('dashboard');
            setUser(mockEmployerUser); // Switch to employer user data
        }
        return newMode;
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
        if (userMode === 'worker') {
            setUser(mockUser);
            setTotalTrustScore(mockUser.trustScore !== undefined ? mockUser.trustScore : 0);
        } else {
            setUser(mockEmployerUser);
            // Employers might not have a trust score, so we can set it to 0 or handle it differently
            setTotalTrustScore(0);
        }
    } else {
        setUser(null);
        setTotalTrustScore(0);
    }
}, [isAuthenticated, userMode]);


  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentView('home');
    setLoginScreenStep('phone'); // Reset login step on successful login
  }, []);

  const handleViewJob = useCallback((job: Job) => {
    setSelectedJob(job);
    setCurrentView('job-details');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('home');
    setSelectedJob(null);
  }, []);
  
  const handleViewEmployerProfile = useCallback((employerName: string) => {
      // In a real app, we would fetch by ID. Here we match by name or default to mockEmployerUser
      let employer = mockEmployerUser;
      // Generate a dummy employer if it's not the mock one, just for display
      if (employerName !== mockEmployerUser.name) {
          employer = {
              ...mockEmployerUser,
              id: `emp-${employerName}`,
              name: employerName,
              avatarUrl: getEmployerAvatarUrl(employerName),
              industry: 'Hizmet',
              address: 'İstanbul, Türkiye',
              bio: `${employerName} olarak kaliteli hizmet sunmayı amaçlıyoruz.`
          };
      }
      
      // Filter jobs for this employer
      const jobs = mockJobs.filter(j => j.employer === employerName);
      
      setSelectedEmployerProfile(employer);
      setSelectedEmployerJobs(jobs);
      setCurrentView('employer-public-profile');
  }, []);

  const handleBackFromEmployerProfile = useCallback(() => {
      // If we came from job details, go back there, otherwise home
      if (selectedJob) {
          setCurrentView('job-details');
      } else {
          setCurrentView('home');
      }
      setSelectedEmployerProfile(null);
  }, [selectedJob]);

  // New: Handles navigation to Map View
  const handleNavigateToMap = useCallback(() => {
    setCurrentView('map-view');
  }, []);

  // Handles navigation from JobDetailsView directly to ChatPage for a specific job
  const handleApplyAndChat = useCallback((job: Job) => {
      const jobWithAvatar = {
          ...job,
          employerAvatarUrl: job.employerAvatarUrl || `https://picsum.photos/seed/${job.employer}/40/40` // Add avatar for chat view if not present
      };
      setActiveConversationJob(jobWithAvatar);
      setCurrentView('messages'); // This will trigger ConversationsListView first if activeConversationJob is null
      // For now, if 'Apply & Chat' is pressed, directly go to chat for that job
  }, []);

  // Handles selecting a conversation from the ConversationsListView
  const handleSelectConversation = useCallback((conversation: Conversation) => {
    setNavigationSource(null); // Reset navigation source when entering a chat
    const allJobs = [...mockJobs, ...postedJobs];
    const job = allJobs.find(j => j.id === conversation.jobId);

    if (job) {
        setActiveConversationJob({
            ...job,
            employerAvatarUrl: conversation.employerAvatarUrl,
            applicantName: conversation.applicantName,
            applicantAvatarUrl: conversation.applicantAvatarUrl,
        });

        if (userMode === 'worker') {
            setCurrentView('messages');
        } else {
            setEmployerCurrentView('messages');
        }
    }
  }, [userMode, postedJobs]);

  // Handles navigating back from ChatPage to ConversationsListView
  const handleBackToConversations = useCallback(() => {
      setActiveConversationJob(null); // Clear selected conversation to show list
       if (userMode === 'worker') {
          setCurrentView('messages'); // Stay on the messages tab, but show list
       } else {
          // For employer, this goes back to the applicant list for that job. The state `selectedJobForMessages` is still active.
          setEmployerCurrentView('messages');
       }
  }, [userMode]);

  const handleNavigateToProfileSubView = useCallback((subView: 'payment-info' | 'security-verification' | 'edit-profile' | 'settings' | 'wallet') => {
      setProfileSubView(subView);
      setCurrentView('profile'); // Ensure we are on the profile tab
  }, []);

  const handleBackFromProfileSubView = useCallback(() => {
      setProfileSubView('main');
      setSettingsSubView('main'); // Also reset settings sub-view
      setCurrentView('profile'); // Ensure we are on the profile tab
  }, []);

  // NEW: Navigation handlers for Settings sub-views
  const handleNavigateToSettingsSubView = useCallback((subView: 'help' | 'contact' | 'privacy' | 'language-selection') => {
    setSettingsSubView(subView);
  }, []);

  const handleBackFromSettingsSubView = useCallback(() => {
    setSettingsSubView('main');
  }, []);

  const handleNavigateToStatisticsFromMyJobs = useCallback(() => {
    setProfileSubView('statistics');
    setCurrentView('my-jobs'); // MyJobsView handles the actual rendering of StatisticsView
  }, []);

  // New: Handles navigation to PublicProfileView
  const handleNavigateToPublicProfile = useCallback(() => {
    setProfileSubView('public-profile');
    setCurrentView('profile'); // Ensure we are on the profile tab
  }, []);

  const handleUpdateUser = useCallback((updatedData: Pick<User, 'name' | 'bio' | 'skills'>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...updatedData } : null);
    alert('Profil başarıyla güncellendi!');
  }, []);

  const totalEarningsForProfile = useMemo(() => {
    return mockCompletedJobs.reduce((acc, job) => acc + job.earnings, 0);
  }, []);

  // Notification Handlers
  const handleToggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  const handleNotificationClick = useCallback((notification: AppNotification) => {
    setAppNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
    setShowNotifications(false); // Close notifications after clicking one

    if (notification.type === 'job' && notification.relatedItemId) {
      const job = mockJobs.find(j => j.id === notification.relatedItemId);
      if (job) {
        handleViewJob(job);
      }
    } else if (notification.type === 'message' && notification.relatedItemId) {
        // Find in both worker and employer conversations for robustness
        const allConversations = [...mockConversations, ...Object.values(mockEmployerConversations).flat()];
        const conversation = allConversations.find(c => c.id === notification.relatedItemId);
        if (conversation) {
            handleSelectConversation(conversation);
        }
    }
    // For 'campaign' type, we just close the overlay for now.
  }, [handleViewJob, handleSelectConversation]);

    // --- REFACTORED EMPLOYER HANDLERS ---
    const handleSelectPostedJob = useCallback((job: Job, from?: 'chat' | null) => {
        if (from === 'chat') {
            setNavigationSource('chat');
        } else {
            setNavigationSource(null);
        }
        setSelectedPostedJob(job);
        setEmployerCurrentView('applicants');
    }, []);

    const handleBackToEmployerDashboard = useCallback(() => {
        if (navigationSource === 'chat') {
            setNavigationSource(null);
            setSelectedPostedJob(null);
            setEmployerCurrentView('messages'); // Return to the chat view
        } else {
            setSelectedPostedJob(null);
            setSelectedApplicant(null);
            setEmployerCurrentView('dashboard');
        }
    }, [navigationSource]);
    
    const handleBackToApplicants = useCallback(() => {
        setSelectedApplicant(null);
        setEmployerCurrentView('applicants');
    }, []);

    const handleViewApplicantProfile = useCallback((applicant: User) => {
        setSelectedApplicant(applicant);
        setEmployerCurrentView('applicant-profile');
    }, []);
    
    const handlePostNewJob = useCallback((newJob: Omit<Job, 'id' | 'employer' | 'employerRating' | 'distance' | 'employerAvatarUrl'> & { id?: string, status?: 'active' | 'pending' | 'completed' }) => {
        if (newJob.id) {
            // Editing existing job
            setPostedJobs(prev => prev.map(job => job.id === newJob.id ? { ...job, ...newJob } as Job : job));
            setJobToEdit(null); // Clear edit state
            // If we were editing from details view, update selected job too
            if (selectedPostedJob && selectedPostedJob.id === newJob.id) {
                setSelectedPostedJob({ ...selectedPostedJob, ...newJob } as Job);
                setEmployerCurrentView('job-details'); // Go back to details
            } else {
                 setEmployerCurrentView('my-jobs'); // Go back to list
            }
        } else {
            // Creating new job
            const jobToAdd: Job = {
                id: `job-${Date.now()}`,
                employer: mockEmployerUser.name,
                employerRating: 4.8,
                distance: 0,
                ...newJob,
                employerAvatarUrl: mockEmployerUser.avatarUrl,
                applicationStatus: 'active', // Custom status for employer view
                status: 'pending', // New jobs go to pending
            } as Job;
            setPostedJobs(prev => [jobToAdd, ...prev]);
            setEmployerCurrentView('my-jobs');
        }
    }, [selectedPostedJob]);

    const handleEditJob = useCallback((job: Job) => {
        setJobToEdit(job);
        setEmployerCurrentView('post-job');
    }, []);

    const handleViewJobDetails = useCallback((job: Job) => {
        setSelectedPostedJob(job);
        setEmployerCurrentView('job-details');
    }, []);

    // New handlers for employer message navigation
    const handleSelectJobForMessages = useCallback((job: Job) => {
        setSelectedJobForMessages(job);
        setActiveConversationJob(null); // Ensure we don't jump straight to a chat
    }, []);

    const handleBackToMessageJobList = useCallback(() => {
        setSelectedJobForMessages(null);
    }, []);
    
    const handleNavigateToPostJob = useCallback(() => {
      setEmployerCurrentView('post-job');
    }, []);
    
    // New handlers for employer account sub-views
    const handleNavigateToEmployerAccountSubView = useCallback((subView: 'company-profile' | 'wallet') => {
        setEmployerAccountSubView(subView);
    }, []);

    const handleBackFromEmployerAccountSubView = useCallback(() => {
        setEmployerAccountSubView('main');
    }, []);

    const handleUpdateEmployerUser = useCallback((updatedData: Partial<User>) => {
        setUser(prevUser => prevUser ? { ...prevUser, ...updatedData } : null);
        alert('Şirket profili başarıyla güncellendi!');
    }, []);
    
    // --- HIRING AND WALLET LOGIC ---

    const handleHireApplicant = useCallback((applicant?: User) => {
        const targetApplicant = applicant || selectedApplicant;
        if (targetApplicant && selectedPostedJob) {
            alert(`${targetApplicant.name} adlı kullanıcıyı ${selectedPostedJob.title} pozisyonu için işe aldınız!`);
            // In a real app, we would update the backend.
            if (selectedApplicant) {
                 handleBackToEmployerDashboard();
            }
            // If calling from list, we might want to stay on the list, so we do nothing else here.
        }
    }, [selectedApplicant, selectedPostedJob, handleBackToEmployerDashboard]);

    const handleRejectApplicant = useCallback((applicant?: User) => {
        const targetApplicant = applicant || selectedApplicant;
        if (targetApplicant) {
             const confirmReject = window.confirm(`${targetApplicant.name} adlı başvuruyu reddetmek istediğinize emin misiniz?`);
             if (confirmReject) {
                 alert('Başvuru reddedildi.');
                 if (selectedApplicant) {
                    handleBackToApplicants();
                 }
             }
        }
    }, [selectedApplicant, handleBackToApplicants]);

    const handleMessageApplicant = useCallback((applicant: User) => {
        alert(`${applicant.name} ile sohbet başlatılıyor...`);
        // In a real implementation, this would find/create a conversation and navigate to chat
    }, []);

    const handleWalletTransaction = useCallback((amount: number, type: 'deposit' | 'withdraw') => {
        if (type === 'deposit') {
            setEmployerWalletBalance(prev => prev + amount);
            setEmployerTransactionList(prev => [
                {
                    id: `new-tx-${Date.now()}`,
                    type: 'deposit',
                    title: 'Bakiye Yükleme',
                    date: new Date().toLocaleDateString('tr-TR'),
                    amount: amount
                },
                ...prev
            ]);
            alert(`${amount} TL bakiye başarıyla yüklendi.`);
        } else {
             setEmployerWalletBalance(prev => prev - amount);
             setEmployerTransactionList(prev => [
                {
                    id: `new-tx-${Date.now()}`,
                    type: 'payout',
                    title: 'Para Çekme',
                    date: new Date().toLocaleDateString('tr-TR'),
                    amount: -amount
                },
                ...prev
            ]);
            alert(`${amount} TL çekim talebi alındı.`);
        }
    }, []);


  // This function will render the *inner* content that goes inside the framed mobile container
  const renderInnerContent = () => {
    if (showSplash) {
      return <SplashScreen onComplete={() => {
          setShowSplash(false);
          setShowOnboarding(true);
      }}/>;
    }

    if (showOnboarding) {
      return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
    }

    if (!isAuthenticated) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} initialStep={loginScreenStep} />;
    }

    // Authenticated content always has main + optional bottom nav
    return (
      <>
        {userMode === 'worker' ? (
          <>
            <main className="flex-grow overflow-y-auto pb-20 no-scrollbar">
              {(() => {
                switch (currentView) {
                  case 'home':
                    return user && <HomeView user={user} jobs={mockJobs} onViewJob={handleViewJob} onApply={handleApplyAndChat} onToggleNotifications={handleToggleNotifications} notifications={appNotifications} onNavigateToMap={handleNavigateToMap} />;
                  case 'job-details':
                    return selectedJob ? <JobDetailsView job={selectedJob} onBack={handleBack} onApply={() => handleApplyAndChat(selectedJob)} onViewEmployer={handleViewEmployerProfile} /> : user && <HomeView user={user} jobs={mockJobs} onViewJob={handleViewJob} onApply={handleApplyAndChat} onToggleNotifications={handleToggleNotifications} notifications={appNotifications} onNavigateToMap={handleNavigateToMap} />;
                  case 'employer-public-profile':
                    return selectedEmployerProfile ? <EmployerPublicProfileView employer={selectedEmployerProfile} employerJobs={selectedEmployerJobs} onBack={handleBackFromEmployerProfile} onViewJob={handleViewJob} /> : null;
                  case 'map-view': // New case for MapView
                    return <MapView jobs={mockJobs} onBack={handleBack} onViewJob={handleViewJob} onApply={handleApplyAndChat} />;
                  case 'messages':
                    return activeConversationJob ? (
                      <ChatPage
                        job={activeConversationJob}
                        onBack={handleBackToConversations}
                        onNavigateToJobDetails={() => handleViewJob(activeConversationJob)}
                        userMode={userMode}
                      />
                    ) : (
                      <ConversationsListView
                        conversations={mockConversations}
                        onSelectConversation={handleSelectConversation}
                      />
                    );
                  case 'my-jobs':
                    // MyJobsView itself handles internal navigation to StatisticsView
                    return profileSubView === 'statistics' ?
                      <StatisticsView completedJobs={mockCompletedJobs} onClose={handleBackFromProfileSubView} /> :
                      <MyJobsView
                        completedJobs={mockCompletedJobs}
                        upcomingJobs={mockUpcomingJobs}
                        appliedJobs={mockAppliedJobs}
                        onNavigateToStatistics={handleNavigateToStatisticsFromMyJobs}
                      />;
                  case 'profile':
                    switch (profileSubView) {
                      case 'payment-info':
                        return user && <PaymentInfoView user={user} onBack={handleBackFromProfileSubView} />;
                      case 'security-verification':
                        return user && <SecurityVerificationView user={user} onBack={handleBackFromProfileSubView} onUpdateTrustScore={handleUpdateTrustScore} />; // Pass trust score callback
                      case 'edit-profile':
                        return user && <EditProfileView user={user} onBack={handleBackFromProfileSubView} onSave={handleUpdateUser} />;
                      case 'wallet':
                        return user && <WalletView user={user} onBack={handleBackFromProfileSubView} availableBalance={totalEarningsForProfile} onNavigate={handleNavigateToProfileSubView} />;
                      case 'settings':
                        switch (settingsSubView) {
                          case 'help':
                            return <HelpCenterView onBack={handleBackFromSettingsSubView} />;
                          case 'contact':
                            return <ContactUsView onBack={handleBackFromSettingsSubView} />;
                          case 'privacy':
                            return <PrivacyPolicyView onBack={handleBackFromSettingsSubView} />;
                          case 'language-selection':
                            return <LanguageSelectionView onBack={handleBackFromSettingsSubView} currentLanguage={language} onSelectLanguage={setLanguage} />;
                          case 'main':
                          default:
                            return <SettingsView language={language} onBack={handleBackFromProfileSubView} onNavigate={handleNavigateToSettingsSubView} />;
                        }
                      case 'statistics':
                        return <StatisticsView completedJobs={mockCompletedJobs} onClose={handleBackFromProfileSubView} />;
                      case 'public-profile':
                        return user && <PublicProfileView 
                                        user={user} 
                                        onBack={handleBackFromProfileSubView} 
                                        isOwnProfilePreview={true}
                                        onEdit={() => handleNavigateToProfileSubView('edit-profile')}
                                        completedJobs={mockCompletedJobs}
                                      />;
                      case 'main':
                      default:
                        return user && <ProfileView
                          user={user}
                          onLogout={() => setIsAuthenticated(false)}
                          onNavigateToSubView={handleNavigateToProfileSubView}
                          onOpenQrPopup={handleOpenQrPopup}
                          trustScore={totalTrustScore}
                          onNavigateToPublicProfile={handleNavigateToPublicProfile}
                        />;
                    }
                  default:
                    return user && <HomeView user={user} jobs={mockJobs} onViewJob={handleViewJob} onApply={handleApplyAndChat} onToggleNotifications={handleToggleNotifications} notifications={appNotifications} onNavigateToMap={handleNavigateToMap} />;
                }
              })()}
            </main>
            <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
          </>
        ) : (
             <main className={`flex-grow overflow-y-auto no-scrollbar ${isEmployerPostJob ? 'pb-0' : 'pb-20'}`}>
                {(() => {
                    switch(employerCurrentView) {
                        case 'dashboard':
                            return user && <EmployerDashboardView 
                              user={user}
                              postedJobs={postedJobs} 
                              onSelectJob={(job) => handleSelectPostedJob(job, null)}
                              onPostNewJobClick={handleNavigateToPostJob}
                              notifications={appNotifications}
                              onToggleNotifications={handleToggleNotifications}
                            />;
                        case 'my-jobs':
                            return <EmployerMyJobsView 
                                postedJobs={postedJobs} 
                                onSelectJob={handleViewJobDetails} 
                                onPostNewJob={() => { setJobToEdit(null); handleNavigateToPostJob(); }} 
                            />;
                        case 'job-details':
                            return selectedPostedJob ? 
                                <EmployerJobDetailsView 
                                    job={selectedPostedJob} 
                                    onBack={() => setEmployerCurrentView('my-jobs')} 
                                    onEdit={handleEditJob}
                                    onViewApplicants={(job) => handleSelectPostedJob(job, null)}
                                /> : null;
                        case 'post-job':
                            return <PostJobView 
                                onBack={() => {
                                    setJobToEdit(null);
                                    setEmployerCurrentView(selectedPostedJob ? 'job-details' : 'my-jobs');
                                }} 
                                onPostJob={handlePostNewJob} 
                                jobToEdit={jobToEdit}
                            />;
                        case 'applicants':
                            return selectedPostedJob ? 
                                <ApplicantsView 
                                    job={selectedPostedJob} 
                                    applicants={mockApplicants[selectedPostedJob.id] || []} 
                                    onBack={handleBackToEmployerDashboard} 
                                    onViewApplicant={handleViewApplicantProfile}
                                    onHire={handleHireApplicant}
                                    onReject={handleRejectApplicant}
                                    onMessage={handleMessageApplicant}
                                /> 
                                : ( user && <EmployerDashboardView user={user} postedJobs={postedJobs} onSelectJob={(job) => handleSelectPostedJob(job, null)} onPostNewJobClick={handleNavigateToPostJob} notifications={appNotifications} onToggleNotifications={handleToggleNotifications}/> );
                        case 'applicant-profile':
                            // Re-using PublicProfileView for the applicant's profile
                            return selectedApplicant ? 
                                <PublicProfileView 
                                    user={selectedApplicant} 
                                    onBack={handleBackToApplicants} 
                                    isEmployerView={true} 
                                    completedJobs={mockCompletedJobs}
                                    onHire={() => handleHireApplicant()} // Calls with selectedApplicant
                                    onReject={() => handleRejectApplicant()}
                                /> 
                                : null;
                        case 'messages':
                            if (activeConversationJob) {
                                return <ChatPage job={activeConversationJob} onBack={handleBackToConversations} onNavigateToJobDetails={() => handleSelectPostedJob(activeConversationJob, 'chat')} userMode={userMode} />;
                            }
                            if (selectedJobForMessages) {
                                return <JobConversationListView 
                                    job={selectedJobForMessages} 
                                    conversations={mockEmployerConversations[selectedJobForMessages.id] || []}
                                    onBack={handleBackToMessageJobList}
                                    onSelectConversation={handleSelectConversation}
                                />;
                            }
                            return <EmployerMessagesView 
                                jobs={postedJobs}
                                conversationsByJob={mockEmployerConversations} 
                                onSelectJob={handleSelectJobForMessages}
                            />;
                        case 'account':
                             switch (employerAccountSubView) {
                                case 'company-profile':
                                    return user && <CompanyProfileView 
                                                        user={user} 
                                                        onBack={handleBackFromEmployerAccountSubView} 
                                                        onSave={handleUpdateEmployerUser} 
                                                    />;
                                case 'wallet':
                                    return user && <WalletView 
                                        user={user} 
                                        onBack={handleBackFromEmployerAccountSubView} 
                                        availableBalance={employerWalletBalance} // Use dynamic state
                                        onNavigate={() => {}} // No sub-nav for employer wallet for now
                                        userMode="employer"
                                        employerTransactions={employerTransactionList} // Use dynamic state
                                        onTransaction={handleWalletTransaction}
                                    />;
                                case 'main':
                                default:
                                    return user && <EmployerAccountView 
                                                        user={user} 
                                                        onLogout={() => setIsAuthenticated(false)} 
                                                        onNavigate={handleNavigateToEmployerAccountSubView}
                                                    />;
                            }
                        default:
                            return user && <EmployerDashboardView 
                              user={user}
                              postedJobs={postedJobs} 
                              onSelectJob={(job) => handleSelectPostedJob(job, null)} 
                              onPostNewJobClick={handleNavigateToPostJob}
                              notifications={appNotifications}
                              onToggleNotifications={handleToggleNotifications}
                            />;
                    }
                })()}
            </main>
        )}
        
        {isAuthenticated && !isEmployerPostJob && userMode === 'employer' && (
            <EmployerBottomNav currentView={employerCurrentView} setCurrentView={setEmployerCurrentView} />
        )}
        
        {isAuthenticated && (
             <ModeSwitcher currentMode={userMode} onToggle={handleToggleMode} />
        )}

        {/* Notification Overlay */}
        <NotificationOverlay
          isOpen={showNotifications}
          onClose={handleToggleNotifications}
          notifications={appNotifications}
          onNotificationClick={handleNotificationClick}
        />

        {/* QR Code Popup */}
        {user && userMode === 'worker' && (
          <QRCodePopup
            isOpen={showQrPopup}
            onClose={handleCloseQrPopup}
            userAvatarUrl={user.avatarUrl}
            userName={user.name}
            userPhone={user.phone}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-inter">
      <div className={`relative w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col ${userMode === 'employer' ? 'employer-mode' : ''}`}>
        {renderInnerContent()}
      </div>

      {/* DEBUG PANEL TRIGGER - MOVED TO TOP RIGHT */}
      <button
          onClick={() => setShowDebugPanel(true)}
          className="fixed top-4 right-4 z-[99] w-9 h-9 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Open Debug Panel"
      >
          <CogIcon className="w-5 h-5" />
      </button>
      
      {/* DEBUG PANEL */}
      {showDebugPanel && (
          <DebugPanel
              onClose={() => setShowDebugPanel(false)}
              setShowSplash={setShowSplash}
              setShowOnboarding={setShowOnboarding}
              setIsAuthenticated={setIsAuthenticated}
              setUserMode={setUserMode}
              setCurrentView={setCurrentView}
              setProfileSubView={setProfileSubView}
              setSettingsSubView={setSettingsSubView}
              setEmployerCurrentView={setEmployerCurrentView}
              setEmployerAccountSubView={setEmployerAccountSubView}
              handleViewJob={handleViewJob}
              handleSelectConversation={handleSelectConversation}
              handleSelectPostedJob={handleSelectPostedJob}
              handleViewApplicantProfile={handleViewApplicantProfile}
              handleSelectJobForMessages={handleSelectJobForMessages}
              setActiveConversationJob={setActiveConversationJob}
              setShowNotifications={setShowNotifications}
              setShowQrPopup={setShowQrPopup}
              setLoginScreenStep={setLoginScreenStep}
          />
      )}
    </div>
  );
};
