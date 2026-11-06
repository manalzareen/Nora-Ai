import React from 'react';
import { StudentProfile, PageView } from '../types';
import { 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  Code2, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProgressViewProps {
  profile: StudentProfile;
  onNavigate: (view: PageView) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ profile, onNavigate }) => {
  // 14-day activity simulation for the heatmap
  const days = [
    { day: 'M', active: true, minutes: 45 },
    { day: 'T', active: true, minutes: 60 },
    { day: 'W', active: true, minutes: 30 },
    { day: 'T', active: true, minutes: 50 },
    { day: 'F', active: true, minutes: 75 },
    { day: 'S', active: true, minutes: 90 },
    { day: 'S', active: true, minutes: 40 },
    { day: 'M', active: true, minutes: 60 },
    { day: 'T', active: true, minutes: 45 },
    { day: 'W', active: true, minutes: 80 },
    { day: 'T', active: true, minutes: 60 },
    { day: 'F', active: true, minutes: 55 },
    { day: 'S', active: false, minutes: 0 },
    { day: 'S', active: false, minutes: 0 }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      {/* Banner */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
            <span>Student Analytics</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A99BFF]">NORA Progress Engine</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
            Learning Growth & Mastery
          </h1>
          <p className="text-xs sm:text-sm text-[#929DB3] mt-1 max-w-2xl">
            Real skills measured by code written, mental models unlocked, and debugging speed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Top 4 KPI Cards (Matching screenshot!) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#121D35] border border-white/5">
            <div className="flex items-center gap-2 text-[#929DB3] text-xs mb-2">
              <BookOpen className="w-4 h-4 text-[#4ADFFF]" />
              <span>Lessons Completed</span>
            </div>
            <div className="font-display text-3xl font-bold text-[#F5F7FC] tabular-nums">
              {profile.completedLessons}
            </div>
            <span className="text-[11px] text-[#929DB3] mt-1 block">out of {profile.totalLessons} modules</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121D35] border border-white/5">
            <div className="flex items-center gap-2 text-[#929DB3] text-xs mb-2">
              <Code2 className="w-4 h-4 text-[#A99BFF]" />
              <span>Apps Built</span>
            </div>
            <div className="font-display text-3xl font-bold text-[#F5F7FC] tabular-nums">
              {profile.appsBuilt}
            </div>
            <span className="text-[11px] text-[#929DB3] mt-1 block">Production projects</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121D35] border border-white/5">
            <div className="flex items-center gap-2 text-[#929DB3] text-xs mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Streak</span>
            </div>
            <div className="font-display text-3xl font-bold text-[#F5F7FC] tabular-nums">
              {profile.currentStreak} days
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Active today</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#121D35] border border-white/5">
            <div className="flex items-center gap-2 text-[#929DB3] text-xs mb-2">
              <Clock className="w-4 h-4 text-[#4ADFFF]" />
              <span>Total Time</span>
            </div>
            <div className="font-display text-3xl font-bold text-[#F5F7FC] tabular-nums">
              {profile.hoursSpent} hrs
            </div>
            <span className="text-[11px] text-[#929DB3] mt-1 block">Focused coding time</span>
          </div>
        </div>

        {/* Middle Section: Score Breakdown (Matching screenshot circular / arc score 720/1000) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Circular Score Gauge Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121D35] border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-[#F5F7FC]">
                NORA Mastery Score
              </h3>
              <span className="text-xs text-[#4ADFFF] font-semibold">Tier 1 Programmer</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-4">
              {/* Radial Arc Graphic */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#192640"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#4ADFFF"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - profile.overallScore / 1000)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display text-3xl font-extrabold text-[#F5F7FC] tabular-nums">
                    {profile.overallScore}
                  </span>
                  <span className="text-[11px] text-[#929DB3]">/ 1000</span>
                </div>
              </div>

              {/* Legend & Breakdown */}
              <div className="space-y-3 text-xs w-full sm:w-auto">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="flex items-center gap-1.5 text-[#929DB3]">
                      <span className="w-2 h-2 rounded-full bg-[#4ADFFF]" />
                      Learning
                    </span>
                    <span className="font-mono text-[#F5F7FC] font-semibold tabular-nums">
                      {profile.scoreBreakdown.learning} / {profile.scoreBreakdown.maxLearning}
                    </span>
                  </div>
                  <div className="w-36 h-1.5 rounded-full bg-[#192640]">
                    <div 
                      className="h-full bg-[#4ADFFF] rounded-full" 
                      style={{ width: `${(profile.scoreBreakdown.learning / profile.scoreBreakdown.maxLearning) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="flex items-center gap-1.5 text-[#929DB3]">
                      <span className="w-2 h-2 rounded-full bg-[#A99BFF]" />
                      Building
                    </span>
                    <span className="font-mono text-[#F5F7FC] font-semibold tabular-nums">
                      {profile.scoreBreakdown.building} / {profile.scoreBreakdown.maxBuilding}
                    </span>
                  </div>
                  <div className="w-36 h-1.5 rounded-full bg-[#192640]">
                    <div 
                      className="h-full bg-[#A99BFF] rounded-full" 
                      style={{ width: `${(profile.scoreBreakdown.building / profile.scoreBreakdown.maxBuilding) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="flex items-center gap-1.5 text-[#929DB3]">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Consistency
                    </span>
                    <span className="font-mono text-[#F5F7FC] font-semibold tabular-nums">
                      {profile.scoreBreakdown.consistency} / {profile.scoreBreakdown.maxConsistency}
                    </span>
                  </div>
                  <div className="w-36 h-1.5 rounded-full bg-[#192640]">
                    <div 
                      className="h-full bg-amber-400 rounded-full" 
                      style={{ width: `${(profile.scoreBreakdown.consistency / profile.scoreBreakdown.maxConsistency) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-[#929DB3]">
              Calculated using code syntax accuracy, debug attempts, and daily streak consistency.
            </div>
          </div>

          {/* 14-Day Activity Heatmap & Recent Milestones */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#121D35] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-bold text-[#F5F7FC]">
                  Consistency Heatmap
                </h3>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> 12 consecutive days
                </span>
              </div>

              {/* Day bars */}
              <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 mb-6">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div 
                      className={`w-full h-12 rounded-lg flex items-center justify-center text-[10px] font-mono transition-transform hover:scale-105 ${
                        d.active 
                          ? 'bg-[#4ADFFF]/20 border border-[#4ADFFF]/40 text-[#4ADFFF]' 
                          : 'bg-[#192640] border border-white/5 text-slate-600'
                      }`}
                      title={`${d.minutes} mins`}
                    >
                      {d.active ? `${d.minutes}m` : '-'}
                    </div>
                    <span className="text-[10px] text-[#929DB3]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Badges */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs font-semibold text-[#F5F7FC] block mb-3">
                Earned Milestones
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#090E1D] border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F5F7FC] block">Python Basics</span>
                    <span className="text-[10px] text-[#929DB3]">Certified by NORA</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#090E1D] border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#4ADFFF]/10 text-[#4ADFFF]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F5F7FC] block">Bug Hunter</span>
                    <span className="text-[10px] text-[#929DB3]">5 Debug Studios</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#090E1D] border border-white/5 flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#A99BFF]/10 text-[#A99BFF]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F5F7FC] block">10-Day Hero</span>
                    <span className="text-[10px] text-[#929DB3]">Perfect Streak</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
