import React, { useState, useEffect, useRef } from 'react';
import { NoraEmotion } from '../types';
import { getTransparentNoraImage } from '../utils/imageUtils';
import { playNoraChirp, playPop, playSuccessChime, playLevelUpFanfare } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, VolumeX, Lightbulb, Heart, Music, RotateCw, Hand } from 'lucide-react';

interface NoraCharacterProps {
  emotion?: NoraEmotion;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSpeechBubble?: boolean;
  interactive?: boolean;
  showTricks?: boolean;
  onPoke?: () => void;
  className?: string;
}

export const NoraCharacter: React.FC<NoraCharacterProps> = ({
  emotion = 'idle',
  speechText,
  size = 'md',
  showSpeechBubble = true,
  interactive = true,
  showTricks = false,
  onPoke,
  className = ''
}) => {
  const [currentEmotion, setCurrentEmotion] = useState<NoraEmotion>(emotion);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [displaySpeech, setDisplaySpeech] = useState(speechText || '');
  const [pokedCount, setPokedCount] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>('/assets/aistudio/Screenshot_2026-11-06_193710_92bf6ec4.png');

  // Dynamic Movement States
  const [isDancing, setIsDancing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHighFiving, setIsHighFiving] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  // Mouse tilt tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load transparent background processed character image
  useEffect(() => {
    getTransparentNoraImage((url) => {
      setImgSrc(url);
    });
  }, []);

  // Sync external emotion changes
  useEffect(() => {
    setCurrentEmotion(emotion);
  }, [emotion]);

  useEffect(() => {
    if (speechText) {
      setDisplaySpeech(speechText);
    }
  }, [speechText]);

  // Voice synthesis effect if sound enabled
  useEffect(() => {
    if (soundEnabled && displaySpeech && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(displaySpeech);
        utterance.rate = 1.05;
        utterance.pitch = 1.35;
        window.speechSynthesis.speak(utterance);
      } catch {
        // audio fallback
      }
    }
  }, [displaySpeech, soundEnabled]);

  // Mouse tracking tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Limit rotation to natural, subtle +/- 12 degrees
    setTilt({
      x: Math.max(-10, Math.min(10, deltaY * -10)),
      y: Math.max(-12, Math.min(12, deltaX * 12))
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Movement Trick Handlers
  const handleDance = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playPop();
    playNoraChirp();
    setIsDancing(true);
    setCurrentEmotion('celebrating');
    setDisplaySpeech("Woohoo! Look at my robot groove! Coding is pure joy!");
    setTimeout(() => {
      setIsDancing(false);
      setCurrentEmotion('happy');
    }, 3600);
  };

  const handleSpinFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playPop();
    setIsSpinning(true);
    setCurrentEmotion('happy');
    setDisplaySpeech("360 degree diagnostic flip complete! Systems 100% nominal!");
    setTimeout(() => {
      setIsSpinning(false);
    }, 900);
  };

  const handleHighFive = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSuccessChime();
    setIsHighFiving(true);
    setHeartBurst(true);
    setCurrentEmotion('celebrating');
    setDisplaySpeech("HIGH FIVE! You are officially an awesome coder!");

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    setTimeout(() => {
      setIsHighFiving(false);
      setHeartBurst(false);
      setCurrentEmotion('happy');
    }, 2000);
  };

  const handleCharacterClick = () => {
    if (!interactive) return;
    playNoraChirp();
    const newCount = pokedCount + 1;
    setPokedCount(newCount);

    const cuteReactions: { emotion: NoraEmotion; message: string; action?: () => void }[] = [
      { emotion: 'waving', message: "Hi friend! Ready to write code that actually makes sense?" },
      { emotion: 'celebrating', message: "You've got this! Every line of code is a step toward mastery!", action: () => handleSpinFlip() },
      { emotion: 'thinking', message: "Hmm... let me analyze the logic pathways for you." },
      { emotion: 'explaining', message: "Tip: Think of functions like a coffee machine—beans in, coffee out!" },
      { emotion: 'happy', message: "I'm always floating right beside you while you build." }
    ];

    const pick = cuteReactions[newCount % cuteReactions.length];
    setCurrentEmotion(pick.emotion);
    setDisplaySpeech(pick.message);
    if (pick.action) pick.action();

    if (onPoke) onPoke();
  };

  // Size mapping
  const sizeStyles = {
    sm: 'w-24 h-28',
    md: 'w-44 h-52',
    lg: 'w-60 h-72',
    xl: 'w-72 h-84',
    hero: 'w-72 h-80 sm:w-96 sm:h-[410px]'
  };

  const getEmotionLabel = () => {
    if (isDancing) return 'Dancing! 🎵';
    if (isSpinning) return '360 Flip! ⚡';
    if (isHighFiving) return 'High Five! ✋';
    switch (currentEmotion) {
      case 'thinking': return 'Analyzing logic...';
      case 'concerned': return 'Spotted an issue!';
      case 'celebrating': return 'Concept mastered! 🎉';
      case 'explaining': return 'Teaching concept';
      case 'confused': return 'Switching analogy...';
      case 'waving': return 'Saying hello!';
      default: return 'Observing your code';
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      {/* Speech Bubble */}
      {showSpeechBubble && displaySpeech && (
        <div className="relative mb-3 max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl bg-[#121D35]/95 backdrop-blur-md border border-[#4ADFFF]/30 shadow-xl shadow-cyan-950/30 text-[#F5F7FC] text-xs sm:text-sm font-medium leading-relaxed transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 z-20">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded-md bg-[#4ADFFF]/15 text-[#4ADFFF] shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-semibold text-[#4ADFFF] tracking-wider uppercase">NORA</span>
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setSoundEnabled(!soundEnabled);
                  }}
                  className="text-[#929DB3] hover:text-[#4ADFFF] transition-colors p-0.5"
                  title={soundEnabled ? 'Mute NORA voice' : 'Enable speech audio'}
                  aria-label="Toggle voice audio"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#4ADFFF]" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-slate-200">{displaySpeech}</p>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#121D35] border-r border-b border-[#4ADFFF]/30 rotate-45 transform" />
        </div>
      )}

      {/* Orbiting Code Particles around NORA */}
      {size === 'hero' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="absolute w-6 h-6 text-[#4ADFFF]/40 font-mono text-sm font-bold animate-orbit-1">
            {'{ }'}
          </div>
          <div className="absolute w-6 h-6 text-[#A99BFF]/50 font-mono text-xs font-bold animate-orbit-2">
            py
          </div>
          <div className="absolute w-6 h-6 text-[#4ADFFF]/40 font-mono text-sm font-bold animate-orbit-2" style={{ animationDelay: '-4s' }}>
            {'->'}
          </div>
        </div>
      )}

      {/* Main Character Body Container with 3D Mouse Tilt + Physics Movement */}
      <div 
        onClick={handleCharacterClick}
        style={{
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isSpinning ? 'none' : 'transform 0.15s ease-out'
        }}
        className={`relative ${sizeStyles[size]} cursor-pointer group select-none ${
          isDancing 
            ? 'animate-dance' 
            : isSpinning 
            ? 'animate-spin-flip' 
            : 'animate-float-slow'
        } hover:scale-105 active:scale-95`}
        title="Click NORA to chat or high-five!"
        role="button"
        tabIndex={0}
        aria-label="NORA Robot Companion"
      >
        {/* Soft Radial Ambient Aura */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#4ADFFF]/20 via-[#A99BFF]/15 to-transparent blur-2xl pointer-events-none animate-pulse-cyan" />

        {/* 3D Render Image of NORA */}
        <img
          src={imgSrc}
          alt="NORA AI - Personal Programming Robot Companion"
          className="w-full h-full object-contain filter drop-shadow-[0_14px_32px_rgba(74,223,255,0.25)]"
          referrerPolicy="no-referrer"
        />

        {/* Heart Burst Reaction on High Five */}
        {heartBurst && (
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 flex items-center gap-1 animate-bounce pointer-events-none z-30">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)]" />
          </div>
        )}

        {/* Interactive Emotion Badge */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#121D35]/95 backdrop-blur-md border border-[#4ADFFF]/30 text-[11px] font-semibold text-[#4ADFFF] flex items-center gap-1.5 shadow-lg shadow-cyan-950/40 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADFFF] animate-ping" />
          <span>{getEmotionLabel()}</span>
        </div>
      </div>

      {/* Playful Movement Buttons for NORA */}
      {showTricks && interactive && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 z-20">
          <button
            type="button"
            onClick={handleHighFive}
            className="px-2.5 py-1.5 rounded-lg bg-[#192640] hover:bg-[#121D35] border border-white/10 hover:border-emerald-400 text-xs font-medium text-[#F5F7FC] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm"
            title="Give NORA a high five!"
          >
            <Hand className="w-3.5 h-3.5 text-emerald-400" />
            High Five!
          </button>

          <button
            type="button"
            onClick={handleDance}
            className="px-2.5 py-1.5 rounded-lg bg-[#192640] hover:bg-[#121D35] border border-white/10 hover:border-[#4ADFFF] text-xs font-medium text-[#F5F7FC] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm"
            title="Watch NORA dance!"
          >
            <Music className="w-3.5 h-3.5 text-[#4ADFFF]" />
            Dance 🎵
          </button>

          <button
            type="button"
            onClick={handleSpinFlip}
            className="px-2.5 py-1.5 rounded-lg bg-[#192640] hover:bg-[#121D35] border border-white/10 hover:border-[#A99BFF] text-xs font-medium text-[#F5F7FC] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-sm"
            title="Spin flip!"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#A99BFF]" />
            Spin Flip
          </button>
        </div>
      )}
    </div>
  );
};
