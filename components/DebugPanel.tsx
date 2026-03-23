// components/DebugPanel.tsx

import React from 'react';
import { Job, User, Conversation } from '../types';
import { mockJobs, mockConversations, mockPostedJobs, mockApplicants, mockEmployerConversations } from '../data/mockData';
import { XIcon } from './Icons';

// A simple re-usable button for the panel
const DebugButton: React.FC<{ onClick: () => void, children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-800 transition-colors">
        {children}
    </button>
);

// A header for sections
const DebugSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

type LoginStep = 'phone' | 'otp' | 'role-selection' | 'register-details' | 'company-details';

// FIX: Updated sub-view setter prop types to match state types from App.tsx
interface DebugPanelProps {
  onClose: () => void;
  // Core State Control
  setShowSplash: (show: boolean) => void;
  setShowOnboarding: (show: boolean) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUserMode: (mode: 'worker' | 'employer') => void;
  setLoginScreenStep: (step: LoginStep) => void;
  
  // Worker Navigation
  setCurrentView: (view: string) => void;
  setProfileSubView: (subView: 'main' | 'payment-info' | 'security-verification' | 'edit-profile' | 'settings' | 'statistics' | 'public-profile' | 'wallet') => void;
  setSettingsSubView: (subView: 'main' | 'help' | 'contact' | 'privacy' | 'language-selection') => void;
  
  // Employer Navigation
  setEmployerCurrentView: (view: string) => void;
  setEmployerAccountSubView: (subView: 'main' | 'company-profile') => void;
  
  // Data Selection for Views
  handleViewJob: (job: Job) => void;
  handleSelectConversation: (conversation: Conversation) => void;
  handleSelectPostedJob: (job: Job, from?: 'chat' | null) => void;
  handleViewApplicantProfile: (applicant: User) => void;
  handleSelectJobForMessages: (job: Job) => void;
  setActiveConversationJob: (job: any) => void;

  // Overlays & Popups
  setShowNotifications: (show: boolean) => void;
  setShowQrPopup: (show: boolean) => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = (props) => {
    // Helper to reset to a logged-in state before navigating
    const goTo = (cb: () => void) => {
        props.setShowSplash(false);
        props.setShowOnboarding(false);
        props.setIsAuthenticated(true);
        cb();
        props.onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex justify-end" onClick={props.onClose}>
            <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b bg-gray-50 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800">Debug Panel</h2>
                    <button onClick={props.onClose} className="p-2 rounded-full hover:bg-gray-200">
                        <XIcon className="w-6 h-6 text-gray-700" />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 space-y-6">
                    <DebugSection title="App State">
                        <DebugButton onClick={() => { props.setShowSplash(true); props.setIsAuthenticated(false); props.onClose(); }}>Show Splash</DebugButton>
                        <DebugButton onClick={() => { props.setShowSplash(false); props.setShowOnboarding(true); props.setIsAuthenticated(false); props.onClose(); }}>Show Onboarding</DebugButton>
                        <DebugButton onClick={() => { props.setShowSplash(false); props.setShowOnboarding(false); props.setIsAuthenticated(false); props.setLoginScreenStep('phone'); props.onClose(); }}>Login - Phone Input</DebugButton>
                        <DebugButton onClick={() => { props.setShowSplash(false); props.setShowOnboarding(false); props.setIsAuthenticated(false); props.setLoginScreenStep('role-selection'); props.onClose(); }}>Login - Role Selection</DebugButton>
                        <DebugButton onClick={() => { props.setShowSplash(false); props.setShowOnboarding(false); props.setIsAuthenticated(false); props.setLoginScreenStep('company-details'); props.onClose(); }}>Login - Company Details</DebugButton>
                    </DebugSection>
                    
                    <DebugSection title="User Mode">
                        <DebugButton onClick={() => goTo(() => props.setUserMode('worker'))}>Switch to Worker</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.setUserMode('employer'))}>Switch to Employer</DebugButton>
                    </DebugSection>

                    <DebugSection title="Worker Views">
                        <DebugButton onClick={() => goTo(() => props.setCurrentView('home'))}>Home</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.handleViewJob(mockJobs[0]))}>Job Details</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.setCurrentView('map-view'))}>Map View</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setActiveConversationJob(null); props.setCurrentView('messages'); })}>Messages (List)</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.handleSelectConversation(mockConversations[0]))}>Messages (Chat)</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.setCurrentView('my-jobs'))}>My Jobs</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setProfileSubView('main'); props.setCurrentView('profile'); })}>Profile</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('payment-info'); })}>Profile - Payment Info</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('security-verification'); })}>Profile - Security</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('edit-profile'); })}>Profile - Edit</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('wallet'); })}>Profile - Wallet</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('public-profile'); })}>Profile - Public Preview</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('settings'); props.setSettingsSubView('main'); })}>Settings</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('settings'); props.setSettingsSubView('help'); })}>Settings - Help Center</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('settings'); props.setSettingsSubView('contact'); })}>Settings - Contact Us</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('settings'); props.setSettingsSubView('privacy'); })}>Settings - Privacy Policy</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('profile'); props.setProfileSubView('settings'); props.setSettingsSubView('language-selection'); })}>Settings - Language</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setCurrentView('my-jobs'); props.setProfileSubView('statistics'); })}>Statistics</DebugButton>
                    </DebugSection>

                    <DebugSection title="Employer Views">
                        <DebugButton onClick={() => goTo(() => props.setEmployerCurrentView('dashboard'))}>Dashboard</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.setEmployerCurrentView('post-job'))}>Post Job</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.handleSelectPostedJob(mockPostedJobs[0], null))}>Applicants</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.handleSelectPostedJob(mockPostedJobs[0], null); props.handleViewApplicantProfile(mockApplicants['6'][0]); })}>Applicant Profile</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.handleSelectJobForMessages(null); props.setActiveConversationJob(null); props.setEmployerCurrentView('messages'); })}>Messages (Job List)</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.handleSelectJobForMessages(mockPostedJobs[0]); props.setActiveConversationJob(null); props.setEmployerCurrentView('messages'); })}>Messages (Conversation List)</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.handleSelectConversation(mockEmployerConversations['6'][0]); })}>Messages (Chat)</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setEmployerAccountSubView('main'); props.setEmployerCurrentView('account'); })}>Account</DebugButton>
                        <DebugButton onClick={() => goTo(() => { props.setEmployerCurrentView('account'); props.setEmployerAccountSubView('company-profile'); })}>Account - Company Profile</DebugButton>
                    </DebugSection>

                    <DebugSection title="Overlays & Popups">
                        <DebugButton onClick={() => goTo(() => props.setShowNotifications(true))}>Show Notifications</DebugButton>
                        <DebugButton onClick={() => goTo(() => props.setShowQrPopup(true))}>Show QR Popup</DebugButton>
                    </DebugSection>
                </main>
            </div>
        </div>
    );
};