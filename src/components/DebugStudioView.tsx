import React, { useState, useEffect } from 'react';
import { NoraCharacter } from './NoraCharacter';
import { DEBUG_EXERCISES } from '../data/curriculumData';
import { DebugExercise, NoraEmotion, SupportedLanguage } from '../types';
import { executeCode, CodeExecutionResult } from '../utils/codeRunner';
import { playSuccessChime, playErrorChime, playNoraChirp, playPop, playLevelUpFanfare } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ChevronRight, 
  HelpCircle,
  Terminal,
  Code2,
  BrainCircuit,
  Filter,
  Check,
  Award
} from 'lucide-react';

interface DebugStudioViewProps {
  onAwardXp: (amount: number) => void;
}

export const DebugStudioView: React.FC<DebugStudioViewProps> = ({ onAwardXp }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filtered exercises
  const filteredExercises = DEBUG_EXERCISES.filter(ex => {
    const matchLang = selectedLanguage === 'all' || ex.language === selectedLanguage;
    const matchDiff = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;
    return matchLang && matchDiff;
  });

  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(DEBUG_EXERCISES[0].id);
  const exercise = DEBUG_EXERCISES.find(e => e.id === selectedExerciseId) || filteredExercises[0] || DEBUG_EXERCISES[0];

  const [code, setCode] = useState<string>(exercise.buggyCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [noraEmotion, setNoraEmotion] = useState<NoraEmotion>('concerned');
  const [noraMessage, setNoraMessage] = useState<string>(exercise.noraInitialThought);
  const [useAnalogyMode, setUseAnalogyMode] = useState<boolean>(false);
  
  // Step-by-step guidance progress: 1 -> 2 -> 3
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Follow-up question state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Sync state on exercise change
  useEffect(() => {
    setCode(exercise.buggyCode);
    setExecutionResult(null);
    setRevealedHintIndex(0);
    setShowSolution(false);
    setUseAnalogyMode(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setCurrentStep(1);
    setCompletedSteps([1]);
    setNoraEmotion('concerned');
    setNoraMessage(exercise.noraInitialThought);
  }, [selectedExerciseId]);

  const handleRunCode = () => {
    playPop();
    setIsRunning(true);
    setNoraEmotion('thinking');
    setNoraMessage("Tracing memory stack and analyzing syntax execution...");

    setTimeout(() => {
      const result = executeCode(code, exercise.language);
      setExecutionResult(result);
      setIsRunning(false);

      if (result.success) {
        playSuccessChime();
        setNoraEmotion('celebrating');
        
        // Advance to step 2 or 3 with explicit praise!
        const nextStep = 2;
        setCurrentStep(nextStep);
        setCompletedSteps(prev => Array.from(new Set([...prev, 2])));
        
        setNoraMessage("🎉 Wow great work! You reached the next step! Your code executed cleanly with zero crashes!");
        
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        onAwardXp(60);
      } else {
        playErrorChime();
        setNoraEmotion('concerned');
        const errType = result.error?.type || 'Execution Error';
        setNoraMessage(`Spotted a ${errType} on line ${result.error?.line || exercise.targetLine}. Look at how the variables flow into this operation!`);
      }
    }, 600);
  };

  const handleResetCode = () => {
    playPop();
    setCode(exercise.buggyCode);
    setExecutionResult(null);
    setShowSolution(false);
    setRevealedHintIndex(0);
    setCurrentStep(1);
    setNoraEmotion('idle');
    setNoraMessage("Reset code to starter baseline. Let's conquer it step by step!");
  };

  const handleUnlockHint = () => {
    if (revealedHintIndex < exercise.hints.length) {
      playNoraChirp();
      const nextIndex = revealedHintIndex + 1;
      setRevealedHintIndex(nextIndex);
      setNoraEmotion('explaining');
      setNoraMessage(`Hint ${nextIndex}: ${exercise.hints[nextIndex - 1]}`);
    }
  };

  const handleToggleAnalogy = () => {
    playPop();
    const nextState = !useAnalogyMode;
    setUseAnalogyMode(nextState);
    if (nextState) {
      setNoraEmotion('explaining');
      setNoraMessage("Let's step back from code syntax: here is an intuitive real-world analogy!");
    } else {
      setNoraEmotion('idle');
      setNoraMessage(exercise.plainEnglishExplanation);
    }
  };

  const handleApplySolution = () => {
    playSuccessChime();
    setCode(exercise.solutionCode);
    setShowSolution(true);
    setNoraEmotion('happy');
    setNoraMessage("Here is the idiomatic, production-grade pattern! Run it to see how the computer executes it.");
  };

  const handleQuizAnswer = (idx: number) => {
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);
    if (idx === exercise.followUpQuestion.correctIndex) {
      playLevelUpFanfare();
      setNoraEmotion('celebrating');
      setCurrentStep(3);
      setCompletedSteps(prev => Array.from(new Set([...prev, 3])));
      setNoraMessage("🌟 Wow great work! You reached the final step and mastered the core mental model!");
      onAwardXp(40);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch {}
    } else {
      playErrorChime();
      setNoraEmotion('concerned');
      setNoraMessage("Close, but take another look: " + exercise.followUpQuestion.explanation);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090E1D] text-[#F5F7FC] pb-16">
      
      {/* Top Filter & Exercise Selector Bar */}
      <div className="border-b border-white/5 bg-[#121D35]/50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#4ADFFF] font-semibold uppercase tracking-wider mb-1">
                <span>Interactive Debug Studio</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A99BFF]">{exercise.language.toUpperCase()} · {exercise.difficulty}</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-[#F5F7FC]">
                {exercise.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#929DB3] mt-1 max-w-2xl">
                {exercise.description}
              </p>
            </div>

            {/* Language & Level Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#090E1D] rounded-xl border border-white/10 text-xs">
                {['all', 'python', 'javascript', 'sql'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      playPop();
                      setSelectedLanguage(lang);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors uppercase ${
                      selectedLanguage === lang
                        ? 'bg-[#4ADFFF] text-[#090E1D] font-bold shadow-sm'
                        : 'text-[#929DB3] hover:text-[#F5F7FC]'
                    }`}
                  >
                    {lang === 'all' ? 'All Langs' : lang}
                  </button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#090E1D] rounded-xl border border-white/10 text-xs">
                {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      playPop();
                      setSelectedDifficulty(diff);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-[#A99BFF] text-[#090E1D] font-bold shadow-sm'
                        : 'text-[#929DB3] hover:text-[#F5F7FC]'
                    }`}
                  >
                    {diff === 'all' ? 'All Levels' : diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filteredExercises.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  playPop();
                  setSelectedExerciseId(ex.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 border flex items-center gap-2 ${
                  selectedExerciseId === ex.id
                    ? 'bg-[#192640] border-[#4ADFFF] text-[#4ADFFF] shadow-md shadow-cyan-950/40'
                    : 'bg-[#121D35] border-white/5 text-[#929DB3] hover:text-[#F5F7FC]'
                }`}
              >
                <span className="font-mono text-[10px] text-[#A99BFF] uppercase">{ex.language}</span>
                <span>{ex.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  ex.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-500/10' :
                  ex.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-500/10' :
                  'text-purple-400 bg-purple-500/10'
                }`}>
                  {ex.difficulty}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Step-by-Step Guided Stepper Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="p-3.5 rounded-2xl bg-[#121D35] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4ADFFF]" />
            <span className="text-xs font-bold text-[#F5F7FC]">
              NORA's Guided Steps:
            </span>
          </div>

          {/* Step Track */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            {exercise.steps.map((step) => {
              const isDone = completedSteps.includes(step.stepNumber);
              const isActive = currentStep === step.stepNumber;

              return (
                <div 
                  key={step.stepNumber}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                    isDone 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold'
                      : isActive
                      ? 'bg-[#192640] border-[#4ADFFF] text-[#4ADFFF] font-bold shadow-[0_0_10px_rgba(74,223,255,0.2)]'
                      : 'bg-[#090E1D] border-white/5 text-[#929DB3]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isDone ? 'bg-emerald-400 text-slate-900' : isActive ? 'bg-[#4ADFFF] text-slate-900' : 'bg-[#192640] text-slate-400'
                  }`}>
                    {isDone ? '✓' : step.stepNumber}
                  </span>
                  <span className="whitespace-nowrap">{step.title}</span>
                </div>
              );
            })}
          </div>

          <div className="text-xs text-[#A99BFF] font-medium hidden md:block">
            Step {currentStep} of {exercise.steps.length}
          </div>
        </div>
      </div>

      {/* Main 3-Column / Responsive IDE Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: NORA Companion & Explanations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Interactive NORA Companion Card */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5 flex flex-col items-center text-center shadow-xl">
              <NoraCharacter
                size="md"
                emotion={noraEmotion}
                speechText={noraMessage}
                showSpeechBubble={true}
                interactive={true}
              />

              <div className="w-full mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleToggleAnalogy}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 border ${
                    useAnalogyMode 
                      ? 'bg-[#4ADFFF]/15 border-[#4ADFFF] text-[#4ADFFF]' 
                      : 'bg-[#192640] border-white/5 text-[#F5F7FC] hover:border-[#4ADFFF]/40'
                  }`}
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-[#4ADFFF]" />
                  {useAnalogyMode ? 'Show Technical View' : "I'm Confused: Give Analogy"}
                </button>
              </div>
            </div>

            {/* Current Step Instruction Card */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5 text-xs">
              <div className="flex items-center gap-2 mb-2 text-[#4ADFFF] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Current Step Guidance</span>
              </div>
              <p className="text-[#F5F7FC] font-medium mb-2 leading-relaxed">
                {exercise.steps[Math.min(currentStep - 1, exercise.steps.length - 1)]?.instruction}
              </p>
              <div className="p-2.5 rounded-lg bg-[#090E1D] border border-white/5 text-[11px] text-[#929DB3]">
                💡 {exercise.steps[Math.min(currentStep - 1, exercise.steps.length - 1)]?.noraGuidance}
              </div>
            </div>

            {/* Why This Error Happens */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5 text-xs">
              <div className="flex items-center gap-2 mb-2 text-[#A99BFF] font-semibold">
                <span>{useAnalogyMode ? 'Real-World Metaphor' : 'Why This Error Happens'}</span>
              </div>
              <p className="text-[#929DB3] leading-relaxed">
                {useAnalogyMode ? exercise.realWorldAnalogy : exercise.plainEnglishExplanation}
              </p>
            </div>

            {/* Target Expected Output */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5 text-xs">
              <span className="text-[11px] font-semibold text-[#929DB3] block mb-1 uppercase tracking-wider">
                Target Output:
              </span>
              <pre className="font-mono text-emerald-400 bg-[#090E1D] p-2.5 rounded-lg border border-white/5 overflow-x-auto whitespace-pre">
                {exercise.expectedOutput}
              </pre>
            </div>

          </div>

          {/* Center Column: Interactive Multi-Language Code Editor (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Editor Container */}
            <div className="rounded-2xl bg-[#121D35] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              
              {/* Editor Header Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#090E1D]/90 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-[#929DB3] ml-2">
                    {exercise.language === 'python' ? 'main.py' :
                     exercise.language === 'javascript' ? 'index.js' :
                     exercise.language === 'sql' ? 'query.sql' : 'main.cpp'}
                  </span>
                </div>

                {/* Editor Action Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCode}
                    className="p-1.5 rounded-md hover:bg-[#192640] text-[#929DB3] hover:text-[#F5F7FC] transition-colors"
                    title="Reset Code"
                    aria-label="Reset Code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-4 py-1.5 rounded-lg bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(74,223,255,0.3)] flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {isRunning ? 'Executing...' : 'Run & Check Code'}
                  </button>
                </div>
              </div>

              {/* Code Surface with line numbers */}
              <div className="relative font-mono text-xs sm:text-sm flex bg-[#090E1D] min-h-[300px]">
                {/* Line Numbers Gutter */}
                <div className="select-none py-4 px-3 bg-[#0c1428] text-[#929DB3]/40 text-right font-mono border-r border-white/5">
                  {lines.map((_, i) => {
                    const lineNum = i + 1;
                    const isErrorLine = executionResult?.error?.line === lineNum;
                    return (
                      <div 
                        key={i} 
                        className={`leading-6 ${isErrorLine ? 'text-red-400 font-bold bg-red-500/10 -mx-3 px-3 rounded' : ''}`}
                      >
                        {lineNum}
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Code Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full p-4 bg-transparent text-[#F5F7FC] resize-none focus:outline-none font-mono leading-6 selection:bg-[#4ADFFF]/30"
                  rows={Math.max(lines.length + 2, 12)}
                />
              </div>

              {/* Output Terminal Console */}
              <div className="border-t border-white/5 bg-[#090E1D] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#929DB3]">
                    <Terminal className="w-3.5 h-3.5 text-[#4ADFFF]" />
                    <span>Terminal Console Output ({exercise.language.toUpperCase()})</span>
                  </div>
                  {executionResult && (
                    <span className={`text-[11px] font-medium ${executionResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {executionResult.success ? '● Passed 100%' : '▲ Execution Exception'}
                    </span>
                  )}
                </div>

                <div className="min-h-[90px] max-h-48 overflow-y-auto rounded-lg bg-[#050914] p-3 font-mono text-xs text-[#929DB3] border border-white/5">
                  {!executionResult && (
                    <span className="text-slate-600 italic">
                      Click "Run & Check Code" to test execution and advance to the next step...
                    </span>
                  )}

                  {executionResult && executionResult.success && (
                    <div className="text-emerald-400 font-mono whitespace-pre">
                      {executionResult.stdout}
                    </div>
                  )}

                  {executionResult && !executionResult.success && executionResult.error && (
                    <div className="text-rose-400 font-mono whitespace-pre-wrap leading-relaxed">
                      {executionResult.error.rawTraceback}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Progressive Hints & Follow-Up Quiz (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Progressive Hints Accordion */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4ADFFF]">
                  <Lightbulb className="w-4 h-4" />
                  <span>Progressive Hints</span>
                </div>
                <span className="text-[11px] text-[#929DB3]">
                  {revealedHintIndex} of {exercise.hints.length} unlocked
                </span>
              </div>

              <div className="space-y-2 mb-3">
                {exercise.hints.map((hintText, idx) => {
                  const isUnlocked = idx < revealedHintIndex;
                  return (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-xl text-xs transition-colors border ${
                        isUnlocked
                          ? 'bg-[#192640] border-[#4ADFFF]/30 text-[#F5F7FC]'
                          : 'bg-[#090E1D]/50 border-white/5 text-[#929DB3]/40'
                      }`}
                    >
                      <div className="font-semibold text-[10px] text-[#A99BFF] mb-0.5 uppercase tracking-wider">
                        Hint {idx + 1}
                      </div>
                      <p className="leading-relaxed">
                        {isUnlocked ? hintText : 'Locked. Nudge NORA when ready.'}
                      </p>
                    </div>
                  );
                })}
              </div>

              {revealedHintIndex < exercise.hints.length ? (
                <button
                  type="button"
                  onClick={handleUnlockHint}
                  className="w-full py-2 rounded-xl bg-[#192640] hover:bg-[#203152] border border-white/10 hover:border-[#4ADFFF]/30 text-xs font-semibold text-[#4ADFFF] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Unlock Next Hint ({revealedHintIndex + 1}/{exercise.hints.length})
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplySolution}
                  className="w-full py-2 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-[#A99BFF]/40 text-xs font-semibold text-[#A99BFF] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Reveal Idiomatic Solution
                </button>
              )}
            </div>

            {/* Follow-up Conceptual Quiz */}
            <div className="p-4 rounded-2xl bg-[#121D35] border border-white/5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F7FC] mb-2">
                <HelpCircle className="w-4 h-4 text-[#A99BFF]" />
                <span>Check Your Understanding</span>
              </div>

              <p className="text-xs text-[#929DB3] mb-3 leading-relaxed">
                {exercise.followUpQuestion.question}
              </p>

              <div className="space-y-1.5">
                {exercise.followUpQuestion.options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = idx === exercise.followUpQuestion.correctIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors border ${
                        quizSubmitted && isCorrect
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300'
                          : quizSubmitted && isSelected && !isCorrect
                          ? 'bg-rose-950/50 border-rose-500 text-rose-300'
                          : isSelected
                          ? 'bg-[#192640] border-[#4ADFFF] text-[#F5F7FC]'
                          : 'bg-[#090E1D]/60 border-white/5 text-[#929DB3] hover:text-[#F5F7FC] hover:border-white/20'
                      }`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="mt-3 p-2.5 rounded-lg bg-[#192640] border border-white/5 text-xs text-[#929DB3] leading-relaxed animate-in fade-in">
                  <span className="text-[#4ADFFF] font-semibold block mb-0.5">
                    {selectedQuizOption === exercise.followUpQuestion.correctIndex ? 'Correct!' : 'Notice why:'}
                  </span>
                  {exercise.followUpQuestion.explanation}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
