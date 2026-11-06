import React, { useState } from 'react';
import { LANGUAGE_GUIDES } from '../data/curriculumData';
import { LanguageGuide, SupportedLanguage, PageView } from '../types';
import { NoraCharacter } from './NoraCharacter';
import { playPop, playSuccessChime, playNoraChirp } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Code2, 
  Layers, 
  Briefcase, 
  BookOpen,
  Check
} from 'lucide-react';

interface LanguageGuideViewProps {
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onNavigate: (view: PageView) => void;
}

export const LanguageGuideView: React.FC<LanguageGuideViewProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onNavigate
}) => {
  const [activeLangId, setActiveLangId] = useState<SupportedLanguage>(selectedLanguage);
  const [snippetMode, setSnippetMode] = useState<'starter' | 'advanced'>('starter');

  const activeLang = LANGUAGE_GUIDES.find(g => g.id === activeLangId) || LANGUAGE_GUIDES[0];

  const handleSetTrack = (langId: SupportedLanguage) => {
    playSuccessChime();
    onSelectLanguage(langId);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const getNoraAdvice = (langId: SupportedLanguage) => {
    switch (langId) {
      case 'python':
        return "If you are brand new to programming or want to work in Artificial Intelligence, Machine Learning, or Automation, Python is 100% the best starting choice!";
      case 'javascript':
      case 'typescript':
        return "If you want to build websites, mobile apps, or full-stack software that people can open in a browser immediately, JavaScript & TypeScript are unbeatable!";
      case 'sql':
        return "Every single backend API, data warehouse, and SaaS company stores relational data. Learning SQL is a superpower for engineers and analysts alike!";
      case 'cpp':
        return "C++ is for when pure hardware speed matters: AAA video games, robotics, high-frequency trading, and graphics rendering.";
      default:
        return "Each language gives your brain a unique way of modeling problems!";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      {/* Banner */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-2">
            <span>Career Roadmaps</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A99BFF]">Language Decision Matrix</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F5F7FC] tracking-tight">
            Choose Your Programming Language
          </h1>
          <p className="text-sm sm:text-base text-[#929DB3] mt-2 max-w-3xl leading-relaxed">
            Not all languages are built for the same goals. NORA helps you choose the exact language tailored to your career dreams—from AI models to web apps and game engines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* NORA Guidance Banner */}
        <div className="p-5 rounded-2xl bg-[#121D35] border border-[#4ADFFF]/20 mb-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-24 h-24 shrink-0">
            <NoraCharacter
              size="sm"
              emotion="explaining"
              showSpeechBubble={false}
              interactive={true}
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-xs font-bold text-[#4ADFFF] uppercase tracking-wider">NORA's Recommendation</span>
              <span className="text-xs text-[#929DB3]">· For {activeLang.name}</span>
            </div>
            <p className="text-sm text-[#F5F7FC] leading-relaxed">
              "{getNoraAdvice(activeLangId)}"
            </p>
          </div>
          <div className="shrink-0">
            {selectedLanguage === activeLangId ? (
              <span className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Active Learning Track
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleSetTrack(activeLangId)}
                className="px-5 py-2.5 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(74,223,255,0.3)]"
              >
                Set as Active Track
              </button>
            )}
          </div>
        </div>

        {/* Language Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {LANGUAGE_GUIDES.map((lang) => {
            const isCurrentActive = activeLangId === lang.id;
            const isEnrolled = selectedLanguage === lang.id;

            return (
              <div
                key={lang.id}
                onClick={() => {
                  playPop();
                  setActiveLangId(lang.id);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isCurrentActive
                    ? 'bg-[#192640] border-[#4ADFFF] shadow-lg shadow-cyan-950/30 ring-1 ring-[#4ADFFF]/40'
                    : 'bg-[#121D35] border-white/5 hover:border-white/20'
                }`}
              >
                {isEnrolled && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-[#A99BFF] uppercase tracking-wider">
                      Rank #{lang.popularityRank}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      lang.learningCurve === 'Gentle' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : lang.learningCurve === 'Moderate' 
                        ? 'bg-amber-500/10 text-amber-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {lang.learningCurve} Curve
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#F5F7FC] mb-1">
                    {lang.name}
                  </h3>
                  <p className="text-xs text-[#929DB3] line-clamp-2 mb-3">
                    {lang.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold">{lang.averageSalary}</span>
                  {isEnrolled ? (
                    <span className="text-emerald-400 font-semibold text-[11px]">Enrolled</span>
                  ) : (
                    <span className="text-[#4ADFFF] font-semibold text-[11px] flex items-center gap-0.5">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive on Active Language */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Why Choose & Career Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6 p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider">
                  Deep Dive Analysis
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  Avg Salary: {activeLang.averageSalary}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#F5F7FC]">
                Why learn {activeLang.name}?
              </h2>
              <p className="text-sm text-[#929DB3] mt-2 leading-relaxed">
                {activeLang.whyChoose}
              </p>
            </div>

            {/* Best Projects for this Language */}
            <div>
              <span className="text-xs font-semibold text-[#F5F7FC] block mb-2 uppercase tracking-wider">
                Best Project Types:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLang.bestFor.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#090E1D] border border-white/5 flex items-center gap-2 text-xs text-[#F5F7FC]">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADFFF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Mindset Difference */}
            <div className="p-4 rounded-xl bg-[#192640] border border-white/5 text-xs">
              <span className="text-[11px] font-semibold text-[#A99BFF] block mb-1 uppercase tracking-wider">
                How Your Brain Thinks in {activeLang.name}:
              </span>
              <p className="text-[#F5F7FC] leading-relaxed">
                {activeLang.keyMindsetDifference}
              </p>
            </div>

            {/* Career Opportunities */}
            <div className="p-4 rounded-xl bg-[#090E1D] border border-white/5 text-xs text-[#929DB3]">
              <span className="text-[11px] font-semibold text-[#4ADFFF] block mb-1 uppercase tracking-wider">
                Career Roles & Demand:
              </span>
              <p className="leading-relaxed">
                {activeLang.careerImpact}
              </p>
            </div>

            {/* Jump to Practice */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-[#929DB3]">
                Ready to start debugging in {activeLang.name}?
              </span>
              <button
                type="button"
                onClick={() => {
                  handleSetTrack(activeLangId);
                  onNavigate('debug-studio');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                Open {activeLang.name} in Debug Studio
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Code Snippet Comparison (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Interactive Code Surface */}
            <div className="rounded-2xl bg-[#121D35] border border-white/10 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#090E1D] border-b border-white/5">
                <span className="text-xs font-mono text-[#929DB3] font-semibold">
                  {activeLang.name} Code Sample
                </span>

                {/* Beginner vs Advanced Toggle */}
                <div className="flex items-center gap-1 p-1 bg-[#121D35] rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setSnippetMode('starter');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      snippetMode === 'starter'
                        ? 'bg-[#4ADFFF] text-[#090E1D] font-bold shadow-sm'
                        : 'text-[#929DB3] hover:text-[#F5F7FC]'
                    }`}
                  >
                    Beginner
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setSnippetMode('advanced');
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      snippetMode === 'advanced'
                        ? 'bg-[#A99BFF] text-[#090E1D] font-bold shadow-sm'
                        : 'text-[#929DB3] hover:text-[#F5F7FC]'
                    }`}
                  >
                    Advanced
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-[#090E1D] font-mono text-xs text-[#F5F7FC] overflow-x-auto leading-relaxed whitespace-pre min-h-[220px]">
                {snippetMode === 'starter' ? activeLang.starterSnippet : activeLang.advancedSnippet}
              </pre>

              <div className="p-3 bg-[#0c1428] border-t border-white/5 text-[11px] text-[#929DB3]">
                {snippetMode === 'starter' 
                  ? "Basic pattern showing loops, data structures, and idiomatic syntax." 
                  : "Advanced pattern showcasing async concurrency, memoization, or memory safety."}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-4 rounded-xl bg-[#121D35] border border-white/5 text-xs text-[#929DB3]">
              <span className="text-[#4ADFFF] font-semibold block mb-1">
                💡 NORA's Advice for Beginners:
              </span>
              Master one language thoroughly before learning your second. The logic, algorithms, and debugging mental models you build in one language transfer 90% to any other language!
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
