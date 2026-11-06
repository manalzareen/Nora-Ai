import React, { useState } from 'react';
import { PageView } from '../types';
import { NoraLogo } from './NoraLogo';
import { playPop, toggleMuteSound, isSoundMuted, playLevelUpFanfare } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Terminal, Flame, BookOpen, Bug, Award, History, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenMeetNora: () => void;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenMeetNora,
  streak
}) => {
  const [muted, setMuted] = useState(isSoundMuted());

  const handleNavClick = (view: PageView) => {
    playPop();
    onNavigate(view);
  };

  const handleToggleSound = () => {
    const isNowMuted = toggleMuteSound();
    setMuted(isNowMuted);
    if (!isNowMuted) playPop();
  };

  const handleStreakClick = () => {
    playLevelUpFanfare();
    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.1, x: 0.8 }
      });
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090E1D]/90 backdrop-blur-md border-b border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand Wordmark with Iconic Robot Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
          aria-label="NORA AI Home"
        >
          <NoraLogo size="md" showText={true} animated={true} />
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#929DB3]">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'home' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'dashboard' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('debug-studio')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] flex items-center gap-1.5 ${
              currentView === 'debug-studio' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            <Bug className="w-4 h-4 text-[#4ADFFF]" />
            Debug Studio
          </button>
          <button
            onClick={() => handleNavClick('languages')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'languages' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            Languages
          </button>
          <button
            onClick={() => handleNavClick('learn')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'learn' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => handleNavClick('mistake-replay')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'mistake-replay' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            Mistake Replay
          </button>
          <button
            onClick={() => handleNavClick('progress')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5F7FC] ${
              currentView === 'progress' ? 'text-[#4ADFFF] font-semibold' : ''
            }`}
          >
            My Progress
          </button>
        </nav>

        {/* Zone 3: Interactive Streak Easter Egg, Audio FX Toggle, & Meet NORA CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-[#121D35] hover:bg-[#192640] border border-white/5 text-[#929DB3] hover:text-[#4ADFFF] transition-colors"
            title={muted ? 'Unmute sounds' : 'Mute sound effects'}
            aria-label={muted ? 'Unmute sounds' : 'Mute sound effects'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#4ADFFF]" />}
          </button>

          {/* Interactive Streak Badge */}
          <button
            type="button"
            onClick={handleStreakClick}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#121D35] hover:bg-[#192640] border border-white/5 hover:border-orange-500/40 text-xs text-[#F5F7FC] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Click to celebrate your streak!"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/30 animate-bounce" />
            <span className="font-semibold tabular-nums">{streak}</span>
            <span className="text-[#929DB3]">day streak 🔥</span>
          </button>

          <button
            onClick={() => {
              playPop();
              onOpenMeetNora();
            }}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#090E1D] bg-[#4ADFFF] hover:bg-[#3ec4e0] rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(74,223,255,0.25)] flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            Meet NORA
          </button>
        </div>
      </div>

      {/* Mobile Bar Links */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-white/5 gap-4 text-xs font-medium text-[#929DB3] scrollbar-none">
        <button
          onClick={() => handleNavClick('dashboard')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'dashboard' ? 'text-[#4ADFFF]' : ''}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavClick('debug-studio')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'debug-studio' ? 'text-[#4ADFFF]' : ''}`}
        >
          Debug Studio
        </button>
        <button
          onClick={() => handleNavClick('languages')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'languages' ? 'text-[#4ADFFF]' : ''}`}
        >
          Languages
        </button>
        <button
          onClick={() => handleNavClick('learn')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'learn' ? 'text-[#4ADFFF]' : ''}`}
        >
          Learn
        </button>
        <button
          onClick={() => handleNavClick('mistake-replay')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'mistake-replay' ? 'text-[#4ADFFF]' : ''}`}
        >
          Mistake Replay
        </button>
        <button
          onClick={() => handleNavClick('progress')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'progress' ? 'text-[#4ADFFF]' : ''}`}
        >
          Progress
        </button>
      </div>
    </header>
  );
};
