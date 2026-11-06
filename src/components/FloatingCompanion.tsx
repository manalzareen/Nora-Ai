import React, { useState } from 'react';
import { NoraCharacter } from './NoraCharacter';
import { MessageSquare, X, Sparkles, Send, Lightbulb } from 'lucide-react';

interface FloatingCompanionProps {
  onOpenStudio: () => void;
}

export const FloatingCompanion: React.FC<FloatingCompanionProps> = ({ onOpenStudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'nora'; text: string }[]>([
    {
      sender: 'nora',
      text: "I'm floating right here! Ask me if you ever get stuck or want a quick analogy."
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    setTimeout(() => {
      let reply = "Remember: think about what types your data variables are holding. If it's a string, arithmetic will raise a TypeError!";
      const lower = userText.toLowerCase();
      if (lower.includes('why') || lower.includes('how')) {
        reply = "Computer programs are just sequences of deterministic instructions. When something breaks, follow the data step by step from the top!";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hello friend! Ready to write some elegant code together?";
      }
      setMessages(prev => [...prev, { sender: 'nora', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#121D35]/95 hover:bg-[#192640] border border-[#4ADFFF]/40 shadow-xl shadow-cyan-950/40 text-xs font-semibold text-[#F5F7FC] transition-all hover:scale-105 active:scale-95"
          aria-label="Open NORA Companion Chat"
        >
          <div className="relative w-7 h-7">
            <img 
              src="/assets/aistudio/Screenshot_2026-11-06_193710_92bf6ec4.png" 
              alt="NORA Avatar"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#4ADFFF] animate-ping" />
          </div>
          <span className="hidden sm:inline">Ask NORA</span>
          <Sparkles className="w-3.5 h-3.5 text-[#4ADFFF]" />
        </button>
      ) : (
        <div className="relative w-80 sm:w-96 rounded-2xl bg-[#090E1D] border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 text-xs text-[#F5F7FC]">
          {/* Header */}
          <div className="px-4 py-3 bg-[#121D35] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#4ADFFF]/40">
                <img 
                  src="/assets/aistudio/Screenshot_2026-11-06_193710_92bf6ec4.png" 
                  alt="NORA Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-bold text-xs text-[#F5F7FC] block">NORA Companion</span>
                <span className="text-[10px] text-[#4ADFFF]">Always ready to help</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[#929DB3] hover:text-[#F5F7FC] hover:bg-[#192640]"
              aria-label="Close companion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 max-h-64 overflow-y-auto space-y-2.5 bg-[#090E1D]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#4ADFFF] text-[#090E1D] font-medium'
                      : 'bg-[#121D35] text-[#F5F7FC] border border-white/5'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-[#121D35] border-t border-white/5 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask NORA..."
              className="flex-1 bg-[#090E1D] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-[#F5F7FC] placeholder-[#929DB3] focus:outline-none focus:border-[#4ADFFF]"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#4ADFFF] text-[#090E1D] hover:bg-[#3ec4e0] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
