import React, { useState } from 'react';
import { NoraCharacter } from './NoraCharacter';
import { NoraLogo } from './NoraLogo';
import { NoraEmotion, PageView } from '../types';
import { playNoraChirp, playPop, playSuccessChime } from '../utils/soundEffects';
import { X, Sparkles, Volume2, Heart, Award, ArrowRight, Lightbulb, MessageSquare } from 'lucide-react';

interface MeetNoraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: () => void;
}

export const MeetNoraModal: React.FC<MeetNoraModalProps> = ({
  isOpen,
  onClose,
  onStartLearning
}) => {
  if (!isOpen) return null;

  const [activeEmotion, setActiveEmotion] = useState<NoraEmotion>('waving');
  const [modalSpeech, setModalSpeech] = useState<string>("Hi! I'm NORA. I believe anyone can learn to program when they are given the right mental models!");

  const emotionalModes: { emotion: NoraEmotion; label: string; speech: string }[] = [
    { emotion: 'waving', label: 'Wave & Greet', speech: "Hello there! I'm NORA, your personal code companion!" },
    { emotion: 'happy', label: 'Encouraging', speech: "You're making real progress. Keep experimenting without fear!" },
    { emotion: 'thinking', label: 'Analyzing Code', speech: "Let me trace the variable stack and check list memory allocations..." },
    { emotion: 'concerned', label: 'Spotted a Bug', speech: "Careful! That index might step out of list boundaries." },
    { emotion: 'celebrating', label: 'Celebrate!', speech: "Eureka! Your test cases passed with zero errors!" },
    { emotion: 'confused', label: 'Analogy Mode', speech: "Let's put the code aside for a moment and look at an everyday analogy." }
  ];

  const handleSelectEmotion = (item: typeof emotionalModes[0]) => {
    playNoraChirp();
    setActiveEmotion(item.emotion);
    setModalSpeech(item.speech);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#090E1D] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#F5F7FC]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="meet-nora-title"
      >
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4ADFFF]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#121D35] hover:bg-[#192640] text-[#929DB3] hover:text-[#F5F7FC] transition-colors"
          aria-label="Close Meet NORA"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Character Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <NoraCharacter
              size="lg"
              emotion={activeEmotion}
              speechText={modalSpeech}
              showSpeechBubble={true}
              interactive={true}
            />
          </div>

          {/* Details & Interactive Mode Switcher */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#4ADFFF] uppercase tracking-wider mb-2">
                <NoraLogo size="sm" showText={false} animated={true} />
                <span>Meet Your Mentor</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A99BFF]">v2.4 Cognitive Engine</span>
              </div>
              <h2 id="meet-nora-title" className="font-display text-2xl font-bold text-[#F5F7FC]">
                I'm NORA.
              </h2>
              <p className="text-xs text-[#929DB3] mt-1 leading-relaxed">
                I was designed with one mission: to make programming intuitive, warm, and deeply rewarding. I never judge, never rush, and always explain <em>why</em> things work.
              </p>
            </div>

            {/* Test NORA's Emotional States */}
            <div>
              <span className="text-[11px] font-semibold text-[#F5F7FC] block mb-2">
                Click to preview my emotional expressions:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {emotionalModes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectEmotion(item)}
                    className={`p-2 rounded-lg text-[11px] font-medium text-center transition-all border ${
                      activeEmotion === item.emotion
                        ? 'bg-[#192640] border-[#4ADFFF] text-[#4ADFFF]'
                        : 'bg-[#121D35] border-white/5 text-[#929DB3] hover:text-[#F5F7FC]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teaching Philosophy Pillars */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-[#929DB3]">
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Zero judgment: wrong answers are just clues to understanding.</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-[#4ADFFF] shrink-0" />
                <span>Analogy-first: if code feels abstract, we use real-world objects.</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartLearning();
                }}
                className="w-full py-3 rounded-xl bg-[#4ADFFF] hover:bg-[#3ec4e0] text-[#090E1D] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(74,223,255,0.3)]"
              >
                <span>Jump into Debug Studio with NORA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
