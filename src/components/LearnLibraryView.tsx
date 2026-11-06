import React, { useState } from 'react';
import { LESSON_MODULES } from '../data/curriculumData';
import { LessonModule, PageView } from '../types';
import { simulatePythonExecution } from '../utils/pythonRunner';
import { BookOpen, CheckCircle2, Clock, Play, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

interface LearnLibraryViewProps {
  onNavigate: (view: PageView) => void;
  onAwardXp: (amount: number) => void;
}

export const LearnLibraryView: React.FC<LearnLibraryViewProps> = ({ onNavigate, onAwardXp }) => {
  const [selectedModule, setSelectedModule] = useState<LessonModule>(LESSON_MODULES[0]);
  const [snippetCode, setSnippetCode] = useState<string>(LESSON_MODULES[0].interactiveSnippet);
  const [snippetOutput, setSnippetOutput] = useState<string | null>(null);

  const handleSelectModule = (mod: LessonModule) => {
    setSelectedModule(mod);
    setSnippetCode(mod.interactiveSnippet);
    setSnippetOutput(null);
  };

  const handleRunSnippet = () => {
    const res = simulatePythonExecution(snippetCode);
    setSnippetOutput(res.stdout);
    onAwardXp(15);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      {/* Top Banner */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
            <span>Structured Curriculum</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A99BFF]">Mental Models First</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F7FC]">
            Learning Library
          </h1>
          <p className="text-xs sm:text-sm text-[#929DB3] mt-1 max-w-2xl">
            Each lesson breaks down complex programming abstractions into intuitive real-world concepts with interactive micro-sandboxes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-[#929DB3] uppercase tracking-wider block mb-2">
              Course Modules
            </span>

            {LESSON_MODULES.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#192640] border-[#4ADFFF] shadow-md shadow-cyan-950/20'
                      : 'bg-[#121D35] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-[#4ADFFF] uppercase tracking-wider">
                      {mod.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-[#929DB3]">
                      <Clock className="w-3 h-3" />
                      <span>{mod.estimatedMinutes}m</span>
                    </div>
                  </div>

                  <h3 className="font-display text-sm font-bold text-[#F5F7FC] mb-1">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-[#929DB3] line-clamp-2 mb-2">
                    {mod.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className={mod.completed ? 'text-emerald-400 flex items-center gap-1' : 'text-[#929DB3]'}>
                      {mod.completed && <CheckCircle2 className="w-3 h-3" />}
                      {mod.completed ? 'Completed' : 'Ready to start'}
                    </span>
                    <span className="text-[#4ADFFF] font-semibold flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Module Detail & Interactive Micro-Sandbox (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-[#121D35] border border-white/5 shadow-xl space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-1">
                <span>{selectedModule.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedModule.estimatedMinutes} mins study</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#F5F7FC]">
                {selectedModule.title}
              </h2>
              <p className="text-sm text-[#929DB3] mt-2 leading-relaxed">
                {selectedModule.summary}
              </p>
            </div>

            {/* Key Mental Model Takeaways */}
            <div className="p-4 rounded-xl bg-[#090E1D] border border-white/5">
              <span className="text-xs font-semibold text-[#A99BFF] block mb-2 uppercase tracking-wider">
                Core Mental Models:
              </span>
              <ul className="space-y-2 text-xs text-[#F5F7FC]">
                {selectedModule.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADFFF]" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Micro Sandbox */}
            <div className="rounded-xl bg-[#090E1D] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c1428] border-b border-white/5">
                <span className="text-xs font-mono text-[#929DB3]">interactive_concept.py</span>
                <button
                  type="button"
                  onClick={handleRunSnippet}
                  className="px-3 py-1 rounded-md bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Run Snippet
                </button>
              </div>

              <textarea
                value={snippetCode}
                onChange={(e) => setSnippetCode(e.target.value)}
                className="w-full p-4 font-mono text-xs text-[#F5F7FC] bg-transparent focus:outline-none resize-none leading-5"
                rows={6}
                spellCheck={false}
              />

              {snippetOutput !== null && (
                <div className="p-3 bg-[#050914] border-t border-white/5 font-mono text-xs text-emerald-400">
                  <span className="text-[10px] text-[#929DB3] block mb-1">Output:</span>
                  <pre className="whitespace-pre">{snippetOutput}</pre>
                </div>
              )}
            </div>

            {/* Next Step CTA */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#929DB3]">
                Ready to put this knowledge into practice?
              </div>
              <button
                type="button"
                onClick={() => onNavigate('debug-studio')}
                className="px-5 py-2.5 rounded-xl bg-[#192640] hover:bg-[#203152] border border-[#4ADFFF]/30 text-[#4ADFFF] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Practice in Debug Studio
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
