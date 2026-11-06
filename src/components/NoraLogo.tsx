import React from 'react';
import { Sparkles } from 'lucide-react';

interface NoraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const NoraLogo: React.FC<NoraLogoProps> = ({
  size = 'md',
  showText = true,
  animated = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textStyles = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Robot Brand Icon */}
      <div 
        className={`relative ${iconDimensions[size]} rounded-xl bg-gradient-to-br from-[#192640] via-[#121D35] to-[#090E1D] border border-[#4ADFFF]/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(74,223,255,0.25)] group-hover:border-[#4ADFFF] group-hover:shadow-[0_0_20px_rgba(74,223,255,0.4)] transition-all`}
      >
        {/* Ambient glow behind logo */}
        <div className="absolute inset-0 rounded-xl bg-[#4ADFFF]/15 blur-sm -z-10" />

        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#4ADFFF]"
        >
          {/* Antennae */}
          <path d="M16 10L19 16M32 10L29 16" stroke="#A99BFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="15" cy="9" r="2.5" fill="#4ADFFF" className={animated ? "animate-pulse" : ""} />
          <circle cx="33" cy="9" r="2.5" fill="#4ADFFF" className={animated ? "animate-pulse" : ""} />

          {/* Robot Head Body */}
          <rect x="10" y="15" width="28" height="22" rx="9" fill="#F5F7FC" />
          
          {/* Dark Glass Visor */}
          <rect x="14" y="19" width="20" height="11" rx="5" fill="#090E1D" />

          {/* Cyan Smiling Eyes */}
          <circle cx="19" cy="24" r="2.2" fill="#4ADFFF" className={animated ? "animate-ping" : ""} />
          <circle cx="29" cy="24" r="2.2" fill="#4ADFFF" className={animated ? "animate-ping" : ""} />
          <circle cx="19" cy="24" r="2" fill="#4ADFFF" />
          <circle cx="29" cy="24" r="2" fill="#4ADFFF" />

          {/* Cheek Accents */}
          <circle cx="16" cy="27" r="1" fill="#A99BFF" opacity="0.8" />
          <circle cx="32" cy="27" r="1" fill="#A99BFF" opacity="0.8" />

          {/* Curved Happy Smile Line */}
          <path d="M22 26.5 Q24 28.5 26 26.5" stroke="#4ADFFF" strokeWidth="1.5" strokeLinecap="round" />

          {/* Ear Light Nodes */}
          <rect x="7.5" y="21" width="3" height="7" rx="1.5" fill="#A99BFF" />
          <rect x="37.5" y="21" width="3" height="7" rx="1.5" fill="#A99BFF" />

          {/* Chest Light Ring Base */}
          <path d="M17 37H31L29 41H19L17 37Z" fill="#192640" />
          <circle cx="24" cy="39" r="1.5" fill="#4ADFFF" />
        </svg>

        {/* Small floating spark */}
        {animated && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#4ADFFF] animate-ping pointer-events-none" />
        )}
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className={`font-display font-extrabold tracking-tight text-[#F5F7FC] ${textStyles[size]}`}>
              NORA
            </span>
            <span className={`font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4ADFFF] to-[#A99BFF] ${textStyles[size]}`}>
              AI
            </span>
          </div>
          {size === 'lg' && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#929DB3] -mt-1">
              Personal Code Mentor
            </span>
          )}
        </div>
      )}
    </div>
  );
};
