import React, { useState } from 'react';
import { NoraCharacter } from './NoraCharacter';
import { StudentProfile, PageView } from '../types';
import { playPop, playNoraChirp, playSuccessChime } from '../utils/soundEffects';
import { 
  Flame, 
  Clock, 
  Award, 
  ArrowRight, 
  Play, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  ChevronRight,
  Send,
  BookOpen,
  Bug,
  RotateCcw
} from 'lucide-react';

interface DashboardViewProps {
  profile: StudentProfile;
  onNavigate: (view: PageView) => void;
  onAwardXp: (amount: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  onNavigate,
  onAwardXp
}) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'nora'; text: string }[]>([
    {
      sender: 'nora',
      text: "Welcome back, Alex! You're on a 12-day streak. Today we're mastering how dictionaries handle missing keys so your apps never crash in production."
    }
  ]);
  const [currentCompanionEmotion, setCurrentCompanionEmotion] = useState<'idle' | 'happy' | 'thinking' | 'explaining'>('idle');

  // Interactive habit preview widget inside the "App Idea -> Build -> Ship" card (matching screenshot!)
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink Water', streak: 7, done: true },
    { id: 2, name: 'Morning Run', streak: 4, done: true },
    { id: 3, name: 'Read Book', streak: 3, done: false }
  ]);

  const toggleHabit = (id: number) => {
    const target = habits.find(h => h.id === id);
    if (target && !target.done) {
      playSuccessChime();
    } else {
      playPop();
    }
    setHabits(habits.map(h => h.id === id ? { ...h, done: !h.done, streak: !h.done ? h.streak + 1 : h.streak - 1 } : h));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    playPop();
    const userText = chatInput.trim();
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setCurrentCompanionEmotion('thinking');

    setTimeout(() => {
      playNoraChirp();
      let noraResponse = "Great question! When designing state machines or data lookups, always think about the empty/zero state first.";
      const lower = userText.toLowerCase();

      if (lower.includes('streak') || lower.includes('goal')) {
        noraResponse = `You have a blazing ${profile.currentStreak}-day streak! Just 15 more minutes of coding completes your daily goal.`;
      } else if (lower.includes('error') || lower.includes('bug') || lower.includes('debug')) {
        noraResponse = "Head into the Debug Studio! I've loaded an exercise where a shopping cart crashes on list index boundaries.";
      } else if (lower.includes('dictionary') || lower.includes('key')) {
        noraResponse = "Remember: `data['key']` throws KeyError if missing, but `data.get('key', default)` is safe and calm!";
      }

      setChatHistory(prev => [...prev, { sender: 'nora', text: noraResponse }]);
      setCurrentCompanionEmotion('happy');
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      
      {/* Top Welcome Ribbon */}
      <div className="bg-[#121D35]/40 border-b border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
              <span>Student Dashboard</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A99BFF]">Level 4 Apprentice</span>
              <span aria-hidden="true">·</span>
              <button 
                onClick={() => onNavigate('languages')}
                className="text-[#4ADFFF] hover:underline flex items-center gap-1 font-bold lowercase"
              >
                Track: {profile.selectedLanguage} (Switch)
              </button>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#929DB3] mt-1">
              Your personal AI teacher is ready. Let's conquer new mental models today.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#121D35] border border-white/5 flex items-center gap-2 text-xs">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <span className="text-[10px] text-[#929DB3] block leading-none">Streak</span>
                <span className="font-bold tabular-nums text-sm text-[#F5F7FC]">{profile.currentStreak} Days</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#121D35] border border-white/5 flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-[#4ADFFF]" />
              <div>
                <span className="text-[10px] text-[#929DB3] block leading-none">Time Spent</span>
                <span className="font-bold tabular-nums text-sm text-[#F5F7FC]">{profile.hoursSpent} hrs</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#121D35] border border-white/5 flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-[#A99BFF]" />
              <div>
                <span className="text-[10px] text-[#929DB3] block leading-none">Score</span>
                <span className="font-bold tabular-nums text-sm text-[#F5F7FC]">{profile.overallScore}/1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Area: Today's Journey & Interactive Habit Sandbox (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step Pipeline: Idea -> Build -> Ship (Matching reference screenshot) */}
            <div className="p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#F5F7FC]">
                    Today's Learning Journey
                  </h2>
                  <p className="text-xs text-[#929DB3]">
                    Milestone 2 of 3: Turning your data structures into working UI components
                  </p>
                </div>
                
                <span className="text-xs font-semibold text-[#4ADFFF] bg-[#4ADFFF]/10 px-3 py-1 rounded-full border border-[#4ADFFF]/20">
                  In Progress
                </span>
              </div>

              {/* Stepper track */}
              <div className="flex items-center justify-between relative mb-6">
                <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
                
                {/* Step 1: Idea (Complete) */}
                <div className="flex flex-col items-center gap-2 z-10 bg-[#121D35] px-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold text-xs shadow-md shadow-emerald-950/40">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#F5F7FC]">Idea</span>
                </div>

                {/* Step 2: Build (Active) */}
                <div className="flex flex-col items-center gap-2 z-10 bg-[#121D35] px-2">
                  <div className="w-10 h-10 rounded-full bg-[#4ADFFF]/20 border-2 border-[#4ADFFF] flex items-center justify-center text-[#4ADFFF] font-bold text-xs shadow-md shadow-cyan-950/40 animate-pulse">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#4ADFFF]">Build</span>
                </div>

                {/* Step 3: Ship (Locked) */}
                <div className="flex flex-col items-center gap-2 z-10 bg-[#121D35] px-2">
                  <div className="w-10 h-10 rounded-full bg-[#192640] border-2 border-white/10 flex items-center justify-center text-[#929DB3] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#929DB3]">Ship</span>
                </div>
              </div>

              {/* Active Project Card: Interactive Habit Tracker with Live Code Preview */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#090E1D] border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-semibold text-[#4ADFFF] uppercase tracking-wider block mb-1">
                      Project In Progress
                    </span>
                    <h3 className="font-display text-base font-bold text-[#F5F7FC]">
                      Habit Tracker: State & Data Binding
                    </h3>
                    <p className="text-xs text-[#929DB3] mt-0.5">
                      A habit tracker that helps users build consistent habits with streaks, reminders, and progress analytics.
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate('debug-studio')}
                    className="px-4 py-2 rounded-lg bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Open in Debug Studio
                  </button>
                </div>

                {/* Split Interactive Code & Live Mobile Preview Sandbox */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  {/* Code Snippet */}
                  <div className="md:col-span-7 bg-[#0c1428] rounded-xl p-3.5 font-mono text-xs border border-white/5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2 text-[#929DB3] border-b border-white/5 pb-2">
                      <span>HabitTracker.py</span>
                      <span className="text-[10px] text-emerald-400">● Live Preview</span>
                    </div>
                    <pre className="text-slate-300 overflow-x-auto text-[11px] leading-5">
{`habits = [
  {"name": "Drink Water", "streak": 7},
  {"name": "Morning Run", "streak": 4},
  {"name": "Read Book", "streak": 3}
]

def complete_habit(habit_id):
  # Clean update pattern:
  habit["streak"] += 1
  return habit`}
                    </pre>
                    <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-[#929DB3]">
                      NORA tip: Keep mutable list operations pure by returning updated objects.
                    </div>
                  </div>

                  {/* Interactive Live App Mock (Matching screenshot visual) */}
                  <div className="md:col-span-5 bg-white text-slate-900 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-slate-900">My Habits</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Flame className="w-3.5 h-3.5 fill-current" />
                          <span>12</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3">Keep going! You've got this.</p>

                      <div className="space-y-2">
                        {habits.map((h) => (
                          <div 
                            key={h.id}
                            onClick={() => toggleHabit(h.id)}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                                h.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                              }`}>
                                {h.done && '✓'}
                              </span>
                              <span className={`text-xs font-medium ${h.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                {h.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {h.streak} days
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleHabit(1)}
                      className="mt-3 w-full py-2 rounded-xl bg-lime-300 hover:bg-lime-400 text-slate-900 font-bold text-xs transition-colors"
                    >
                      + Add Habit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Weak Topics & Personalized Review Prompt */}
            <div className="p-6 rounded-2xl bg-[#121D35] border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h3 className="font-display text-base font-bold text-[#F5F7FC]">
                    Focus Areas Identified by NORA
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('mistake-replay')}
                  className="text-xs font-semibold text-[#4ADFFF] hover:underline flex items-center gap-1"
                >
                  View Mistake Replay <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.weakTopics.map((topic, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#090E1D] border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#F5F7FC]">{topic.topic}</span>
                        <span className="text-xs font-mono text-amber-400 tabular-nums">{topic.accuracy}% accuracy</span>
                      </div>
                      <p className="text-xs text-[#929DB3] mb-3">
                        {topic.reviewRecommendation}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('debug-studio')}
                      className="w-full py-1.5 rounded-lg bg-[#192640] hover:bg-[#203152] border border-white/5 hover:border-[#4ADFFF]/30 text-xs font-semibold text-[#4ADFFF] transition-colors flex items-center justify-center gap-1"
                    >
                      Practice in Debug Studio
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Section: NORA's Persistent Companion Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Animated Companion & Direct Conversation Box */}
            <div className="p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-[#F5F7FC]">NORA Active Companion</span>
                </div>
                <span className="text-[10px] text-[#4ADFFF] bg-[#4ADFFF]/10 px-2 py-0.5 rounded border border-[#4ADFFF]/20">
                  Ready to assist
                </span>
              </div>

              <NoraCharacter
                size="md"
                emotion={currentCompanionEmotion}
                showSpeechBubble={false}
                interactive={true}
              />

              {/* Conversation Log */}
              <div className="w-full mt-4 bg-[#090E1D] rounded-xl p-3 border border-white/5 max-h-56 overflow-y-auto space-y-3 text-xs">
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] font-semibold text-[#929DB3] mb-0.5">
                      {msg.sender === 'user' ? 'You' : 'NORA'}
                    </span>
                    <div 
                      className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-[#4ADFFF] text-[#090E1D] font-medium' 
                          : 'bg-[#192640] text-[#F5F7FC] border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="w-full mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask NORA anything about code..."
                  className="flex-1 bg-[#090E1D] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#F5F7FC] placeholder-[#929DB3] focus:outline-none focus:border-[#4ADFFF]"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] transition-colors shrink-0"
                  aria-label="Send message to NORA"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Daily Goal & Activity Card */}
            <div className="p-5 rounded-2xl bg-[#121D35] border border-white/5 text-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-sm text-[#F5F7FC]">Daily Goal</span>
                <span className="font-mono text-[#4ADFFF] font-semibold">45 / 60 min</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#090E1D] overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-[#4ADFFF] to-[#A99BFF] rounded-full w-[75%]" />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[#929DB3]">
                  <span>Lessons Completed</span>
                  <span className="font-semibold text-[#F5F7FC]">7 / 18</span>
                </div>
                <div className="flex items-center justify-between text-[#929DB3]">
                  <span>Projects Built</span>
                  <span className="font-semibold text-[#F5F7FC]">2</span>
                </div>
                <div className="flex items-center justify-between text-[#929DB3]">
                  <span>Accuracy Rate</span>
                  <span className="font-semibold text-[#4ADFFF]">88%</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
