import React, { useState } from 'react';
import { NoraCharacter } from './NoraCharacter';
import { NoraLogo } from './NoraLogo';
import { PageView } from '../types';
import { playPop, playNoraChirp, playSuccessChime } from '../utils/soundEffects';
import { ArrowRight, Sparkles, CheckCircle2, XCircle, Code2, Cpu, Zap, HelpCircle } from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (view: PageView) => void;
  onOpenMeetNora: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate, onOpenMeetNora }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);

  const sampleQuestions = [
    {
      q: "Why do Python lists start at 0 instead of 1?",
      a: "Think of an index as an offset distance from the starting address in memory! The very first item is 0 steps away from the start."
    },
    {
      q: "What is the difference between return and print()?",
      a: "print() only writes ink to your terminal screen for humans to read. return hands the computed data back to other parts of your code to use!"
    },
    {
      q: "Why did my dictionary crash with a KeyError?",
      a: "Because user['key'] assumes the key is 100% guaranteed. If there's any chance it might be missing, use user.get('key', fallback) instead!"
    }
  ];

  const handleSelectQuestion = (q: string, a: string) => {
    playNoraChirp();
    setSelectedQuestion(q);
    setSampleAnswer(a);
  };

  return (
    <div className="relative overflow-hidden bg-[#090E1D]">
      {/* Subtle Atmospheric Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#4ADFFF]/10 via-[#A99BFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#121D35]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Programming Symbols */}
      <div className="absolute top-20 left-[15%] text-[#4ADFFF]/20 font-mono text-xl select-none animate-float-gentle pointer-events-none">
        {'{ }'}
      </div>
      <div className="absolute top-44 right-[35%] text-[#A99BFF]/25 font-mono text-lg select-none animate-float-slow pointer-events-none">
        {'def() -> py'}
      </div>
      <div className="absolute bottom-32 left-[8%] text-[#4ADFFF]/25 font-mono text-sm select-none animate-float-slow pointer-events-none">
        {'[0 : -1]'}
      </div>
      <div className="absolute bottom-20 right-[10%] text-[#A99BFF]/20 font-mono text-lg select-none animate-float-gentle pointer-events-none">
        {'lambda x: x*2'}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Clean Sub-header Kicker with Brand Logo */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#4ADFFF] mb-4">
              <NoraLogo size="sm" showText={false} animated={true} />
              <span>Personal Programming Teacher</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A99BFF]">Zero Cryptic Errors</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F7FC] tracking-tight leading-[1.1] mb-6 max-w-2xl text-balance">
              Programming makes sense when someone teaches you <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ADFFF] via-[#85e7ff] to-[#A99BFF]">why.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#929DB3] leading-relaxed mb-8 max-w-xl">
              Meet NORA, an intelligent robot companion who sits with you line by line. No passive videos. No copy-pasting answers. Just patient, intuitive guidance that builds real mental models.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => {
                  playPop();
                  onNavigate('debug-studio');
                }}
                className="px-6 py-3.5 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(74,223,255,0.3)] hover:shadow-[0_0_25px_rgba(74,223,255,0.5)] flex items-center gap-2 shrink-0"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playPop();
                  onOpenMeetNora();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#121D35] hover:bg-[#192640] border border-white/10 hover:border-[#4ADFFF]/40 text-[#F5F7FC] font-semibold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#A99BFF]" />
                Meet NORA
              </button>

              <button
                onClick={() => {
                  playPop();
                  onNavigate('languages');
                }}
                className="px-4 py-3.5 rounded-xl text-[#4ADFFF] hover:text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shrink-0 hover:bg-[#121D35]/50"
              >
                <Code2 className="w-4 h-4" />
                Choose Language Path
              </button>
            </div>

            {/* Real Proof Highlights: Unboxed text */}
            <div className="pt-6 border-t border-white/5 w-full flex flex-wrap items-center gap-6 text-xs text-[#929DB3]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADFFF]" />
                <span>Interactive Python Debugger</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADFFF]" />
                <span>Progressive 3-Tier Hints</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADFFF]" />
                <span>Mistake Replay & Mental Models</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Animated NORA Robot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <NoraCharacter
              size="hero"
              emotion="waving"
              speechText="Hey! I'm NORA. Ready to understand programming?"
              interactive={true}
              showTricks={true}
            />
          </div>

        </div>

        {/* Section 2: Interactive "Ask NORA" Teaser Tray */}
        <div className="mt-16 p-6 rounded-2xl bg-[#121D35]/80 border border-white/5 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4ADFFF]/10 border border-[#4ADFFF]/30 flex items-center justify-center text-[#4ADFFF]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-[#F5F7FC]">
                  Try asking NORA how code works:
                </h3>
                <p className="text-xs text-[#929DB3]">
                  Click any question to see how NORA translates confusing computer jargon into intuitive mental models.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Questions Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {sampleQuestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuestion(item.q, item.a)}
                className={`p-3.5 rounded-xl text-left text-xs transition-all border ${
                  selectedQuestion === item.q
                    ? 'bg-[#192640] border-[#4ADFFF] text-[#F5F7FC] shadow-[0_0_12px_rgba(74,223,255,0.15)]'
                    : 'bg-[#090E1D]/60 border-white/5 text-[#929DB3] hover:text-[#F5F7FC] hover:border-white/20'
                }`}
              >
                <span className="font-medium">{item.q}</span>
              </button>
            ))}
          </div>

          {/* Answer Preview Box */}
          {sampleAnswer && (
            <div className="p-4 rounded-xl bg-[#192640]/90 border border-[#4ADFFF]/30 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
              <div className="p-1.5 rounded-md bg-[#4ADFFF]/20 text-[#4ADFFF] shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4ADFFF] uppercase tracking-wider block mb-1">
                  NORA's Intuitive Explanation
                </span>
                <p className="text-sm text-[#F5F7FC] leading-relaxed">
                  {sampleAnswer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Why Traditional Tutorials Fail vs How NORA Teaches */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider block mb-2">
              Pedagogical Architecture
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
              Why traditional tutorials leave you stuck
            </h2>
            <p className="text-sm text-[#929DB3] mt-2">
              Most learners get trapped in tutorial hell because traditional platforms tell you what to type, but never explain why the computer thinks the way it does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-[#121D35]/50 border border-red-500/10">
              <div className="flex items-center gap-2.5 mb-4 text-red-400">
                <XCircle className="w-5 h-5" />
                <h3 className="font-display font-semibold text-base text-[#F5F7FC]">The Old Way</h3>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#929DB3]">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Cryptic terminal errors:</strong> `IndexError: list index out of range` leaves beginners guessing blindly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Passive video watching:</strong> Feeling like you understand while watching someone else code, then freezing on a blank file.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Copy-pasting answers:</strong> Spoiling the solution without letting your brain form the mental pathways to solve it next time.</span>
                </li>
              </ul>
            </div>

            {/* The NORA AI Way */}
            <div className="p-6 rounded-2xl bg-[#121D35] border border-[#4ADFFF]/20 shadow-lg shadow-cyan-950/20">
              <div className="flex items-center gap-2.5 mb-4 text-[#4ADFFF]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-display font-semibold text-base text-[#F5F7FC]">The NORA AI Way</h3>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-[#F5F7FC]">
                <li className="flex items-start gap-2">
                  <span className="text-[#4ADFFF] font-bold shrink-0">✓</span>
                  <span><strong>Real-world analogies:</strong> Translating computer internals into relatable metaphors (hotel rooms, recipes, postal boxes).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ADFFF] font-bold shrink-0">✓</span>
                  <span><strong>Progressive hints:</strong> Giving you just enough of a gentle nudge so that YOU experience the breakthrough discovery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ADFFF] font-bold shrink-0">✓</span>
                  <span><strong>Mistake Replay:</strong> Reviewing the specific conceptual traps you struggled with so you never repeat them on real projects.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
