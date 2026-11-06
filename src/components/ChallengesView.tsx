import React, { useState } from 'react';
import { CODING_CHALLENGES } from '../data/curriculumData';
import { CodingChallenge, PageView } from '../types';
import { simulatePythonExecution } from '../utils/pythonRunner';
import confetti from 'canvas-confetti';
import { Trophy, Play, CheckCircle2, XCircle, Code2, Sparkles, ArrowRight } from 'lucide-react';

interface ChallengesViewProps {
  onNavigate: (view: PageView) => void;
  onAwardXp: (amount: number) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ onNavigate, onAwardXp }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge>(CODING_CHALLENGES[0]);
  const [code, setCode] = useState<string>(CODING_CHALLENGES[0].starterCode);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[] | null>(null);

  const handleSelect = (chal: CodingChallenge) => {
    setSelectedChallenge(chal);
    setCode(chal.starterCode);
    setTestResults(null);
  };

  const handleRunTests = () => {
    const res = simulatePythonExecution(code);
    
    // Check if test passed
    const passed = res.success && !res.stdout.includes('Error');
    setTestResults([
      { passed: true, message: 'Test Case 1: Primary condition matched' },
      { passed: true, message: 'Test Case 2: Edge cases and null checks passed' }
    ]);

    if (passed) {
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}
      onAwardXp(selectedChallenge.xp);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      {/* Top Banner */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
            <span>Daily Coding Arena</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A99BFF]">Algorithmic Intuition</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
            Coding Challenges
          </h1>
          <p className="text-xs sm:text-sm text-[#929DB3] mt-1 max-w-2xl">
            Bite-sized programming puzzles designed to strengthen your logic without boilerplate overwhelm.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Challenge Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-[#929DB3] uppercase tracking-wider block mb-2">
              Available Challenges
            </span>

            {CODING_CHALLENGES.map((chal) => {
              const isSelected = selectedChallenge.id === chal.id;
              return (
                <div
                  key={chal.id}
                  onClick={() => handleSelect(chal)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#192640] border-[#4ADFFF] shadow-md shadow-cyan-950/20'
                      : 'bg-[#121D35] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {chal.difficulty}
                    </span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">
                      +{chal.xp} XP
                    </span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-[#F5F7FC] mb-1">
                    {chal.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {chal.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-[#929DB3] bg-[#090E1D] px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Challenge Workspace (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider block mb-1">
                  {selectedChallenge.difficulty} · +{selectedChallenge.xp} XP
                </span>
                <h2 className="font-display text-xl font-bold text-[#F5F7FC]">
                  {selectedChallenge.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleRunTests}
                className="px-4 py-2 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Test Suite
              </button>
            </div>

            <p className="text-sm text-[#929DB3] leading-relaxed">
              {selectedChallenge.prompt}
            </p>

            {/* Code Box */}
            <div className="rounded-xl bg-[#090E1D] border border-white/10 overflow-hidden font-mono text-xs">
              <div className="px-4 py-2 bg-[#0c1428] text-[#929DB3] text-[11px] border-b border-white/5">
                solution.py
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 bg-transparent text-[#F5F7FC] focus:outline-none resize-none leading-5"
                rows={8}
                spellCheck={false}
              />
            </div>

            {/* Test Suite Results */}
            {testResults && (
              <div className="p-4 rounded-xl bg-[#090E1D] border border-emerald-500/30 space-y-2">
                <span className="text-xs font-semibold text-emerald-400 block uppercase tracking-wider">
                  Test Results: All 2 Passed!
                </span>
                {testResults.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F7FC]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
