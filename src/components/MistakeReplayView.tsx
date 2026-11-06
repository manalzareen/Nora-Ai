import React, { useState } from 'react';
import { MISTAKE_REPLAYS } from '../data/curriculumData';
import { MistakeLog, PageView } from '../types';
import { NoraCharacter } from './NoraCharacter';
import { History, CheckCircle2, AlertOctagon, RotateCcw, Sparkles, BrainCircuit, ArrowRight } from 'lucide-react';

interface MistakeReplayViewProps {
  onNavigate: (view: PageView) => void;
  onAwardXp: (amount: number) => void;
}

export const MistakeReplayView: React.FC<MistakeReplayViewProps> = ({ onNavigate, onAwardXp }) => {
  const [mistakes, setMistakes] = useState<MistakeLog[]>(MISTAKE_REPLAYS);
  const [activeMistakeId, setActiveMistakeId] = useState<string>(MISTAKE_REPLAYS[0].id);
  const [retentionConfirmed, setRetentionConfirmed] = useState<boolean>(false);

  const activeMistake = mistakes.find(m => m.id === activeMistakeId) || mistakes[0];

  const handleMarkMastered = (id: string) => {
    setMistakes(prev => prev.map(m => m.id === id ? { ...m, mastered: true, reviewCount: m.reviewCount + 1 } : m));
    setRetentionConfirmed(true);
    onAwardXp(30);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      {/* Header Banner */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
            <span>Adaptive Memory Engine</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A99BFF]">Mistake Replay</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
            Your Brain's Debug Log
          </h1>
          <p className="text-xs sm:text-sm text-[#929DB3] mt-1 max-w-2xl">
            NORA tracks every bug you hit, diagnoses the underlying cognitive trap, and schedules active recall sessions so you never repeat the same error twice.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of past logged mistakes (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#929DB3] mb-2">
              <span className="font-semibold uppercase tracking-wider">Recorded Mistake Traps</span>
              <span className="tabular-nums">{mistakes.filter(m => m.mastered).length} of {mistakes.length} Mastered</span>
            </div>

            {mistakes.map((log) => {
              const isSelected = activeMistake.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => {
                    setActiveMistakeId(log.id);
                    setRetentionConfirmed(false);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#192640] border-[#4ADFFF] shadow-md shadow-cyan-950/30'
                      : 'bg-[#121D35] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {log.errorType}
                    </span>
                    <span className="text-[11px] text-[#929DB3]">
                      {log.date}
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-[#F5F7FC] mb-1">
                    {log.topic}
                  </h3>

                  <p className="text-xs text-[#929DB3] line-clamp-2">
                    {log.mentalTrap}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-[#929DB3]">Reviewed {log.reviewCount} times</span>
                    {log.mastered ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mastered
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <RotateCcw className="w-3.5 h-3.5" />
                        Needs Review
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Analysis of Selected Mistake (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                  {activeMistake.errorType} Diagnostic
                </span>
                <h2 className="font-display text-xl font-bold text-[#F5F7FC]">
                  {activeMistake.topic}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#929DB3]">Recorded: {activeMistake.date}</span>
              </div>
            </div>

            {/* The Buggy Code from Student's Session */}
            <div>
              <span className="text-xs font-semibold text-[#929DB3] block mb-2 uppercase tracking-wider">
                What you wrote that caused the crash:
              </span>
              <pre className="font-mono text-xs text-rose-300 bg-[#090E1D] p-4 rounded-xl border border-rose-500/20 overflow-x-auto leading-relaxed">
                {activeMistake.codeSnippet}
              </pre>
            </div>

            {/* The Underlying Mental Model Trap */}
            <div className="p-4 rounded-xl bg-[#192640] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
                <AlertOctagon className="w-4 h-4" />
                <span>The Cognitive Trap</span>
              </div>
              <p className="text-xs text-[#F5F7FC] leading-relaxed">
                {activeMistake.mentalTrap}
              </p>
            </div>

            {/* NORA's Permanent Fix & Insight */}
            <div className="p-4 rounded-xl bg-[#090E1D] border border-[#4ADFFF]/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>NORA's Mental Model Anchor</span>
              </div>
              <p className="text-xs text-[#929DB3] leading-relaxed">
                {activeMistake.noraCorrection}
              </p>
            </div>

            {/* Active Retention Button */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {retentionConfirmed ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Concept reinforced! Added +30 XP.
                  </span>
                ) : (
                  <span className="text-xs text-[#929DB3]">
                    Does this mental model make clear sense now?
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkMastered(activeMistake.id)}
                  className="px-4 py-2 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  I Understand This Now (+30 XP)
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('debug-studio')}
                  className="px-4 py-2 rounded-xl bg-[#192640] hover:bg-[#203152] border border-white/5 text-[#F5F7FC] font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  Practice in Debug Studio
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
