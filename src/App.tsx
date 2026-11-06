import React, { useState, useEffect } from 'react';
import { PageView, StudentProfile } from './types';
import { STUDENT_PROFILE } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { DashboardView } from './components/DashboardView';
import { DebugStudioView } from './components/DebugStudioView';
import { LearnLibraryView } from './components/LearnLibraryView';
import { ChallengesView } from './components/ChallengesView';
import { MistakeReplayView } from './components/MistakeReplayView';
import { ProgressView } from './components/ProgressView';
import { LanguageGuideView } from './components/LanguageGuideView';
import { MeetNoraModal } from './components/MeetNoraModal';
import { FloatingCompanion } from './components/FloatingCompanion';
import { NoraLogo } from './components/NoraLogo';
import { SupportedLanguage } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [profile, setProfile] = useState<StudentProfile>(STUDENT_PROFILE);
  const [isMeetNoraOpen, setIsMeetNoraOpen] = useState(false);

  // Check URL query parameters for test automation / quick navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const viewParam = params.get('view') as PageView;

    if (viewParam && ['home', 'dashboard', 'debug-studio', 'learn', 'challenges', 'mistake-replay', 'progress'].includes(viewParam)) {
      setCurrentView(viewParam);
    } else if (autostart === '1') {
      setCurrentView('dashboard');
    }
  }, []);

  const handleAwardXp = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      totalXp: prev.totalXp + amount,
      overallScore: Math.min(1000, prev.overallScore + Math.round(amount / 5))
    }));
  };

  return (
    <div className="min-h-screen bg-[#090E1D] text-[#F5F7FC] flex flex-col font-sans selection:bg-[#4ADFFF]/20 selection:text-[#4ADFFF]">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenMeetNora={() => setIsMeetNoraOpen(true)}
        streak={profile.currentStreak}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeHero
            onNavigate={setCurrentView}
            onOpenMeetNora={() => setIsMeetNoraOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            profile={profile}
            onNavigate={setCurrentView}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'debug-studio' && (
          <DebugStudioView
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'languages' && (
          <LanguageGuideView
            selectedLanguage={profile.selectedLanguage}
            onSelectLanguage={(lang: SupportedLanguage) => {
              setProfile(prev => ({ ...prev, selectedLanguage: lang }));
            }}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'learn' && (
          <LearnLibraryView
            onNavigate={setCurrentView}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'challenges' && (
          <ChallengesView
            onNavigate={setCurrentView}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'mistake-replay' && (
          <MistakeReplayView
            onNavigate={setCurrentView}
            onAwardXp={handleAwardXp}
          />
        )}

        {currentView === 'progress' && (
          <ProgressView
            profile={profile}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Persistent Floating Companion */}
      <FloatingCompanion
        onOpenStudio={() => setCurrentView('debug-studio')}
      />

      {/* Interactive Meet NORA Modal */}
      <MeetNoraModal
        isOpen={isMeetNoraOpen}
        onClose={() => setIsMeetNoraOpen(false)}
        onStartLearning={() => {
          setIsMeetNoraOpen(false);
          setCurrentView('debug-studio');
        }}
      />

      {/* Editorial Footer */}
      <footer className="border-t border-white/5 bg-[#070b17] py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#929DB3]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NoraLogo size="sm" showText={true} animated={false} />
            <span className="text-[11px] text-[#929DB3]">· Learn. Debug. Understand. Grow.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('debug-studio')} className="hover:text-[#F5F7FC] transition-colors">
              Debug Studio
            </button>
            <button onClick={() => setCurrentView('mistake-replay')} className="hover:text-[#F5F7FC] transition-colors">
              Mistake Replay
            </button>
            <button onClick={() => setIsMeetNoraOpen(true)} className="hover:text-[#4ADFFF] transition-colors">
              Meet NORA
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
