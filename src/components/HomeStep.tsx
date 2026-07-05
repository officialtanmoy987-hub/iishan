import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeStepProps {
  onYes: () => void;
}

interface FloatMessage {
  id: number;
  text: string;
  x: number;
  y: number;
}

const NO_MESSAGES = [
  "Nope 😂", 
  "You almost got me!", 
  "Wrong answer 😜", 
  "Try again ❤️", 
  "Mission Failed 🤣", 
  "Not happening! 🎀",
  "Think again! 🌸",
  "Denied 🙈"
];

export default function HomeStep({ onYes }: HomeStepProps) {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [floatMessages, setFloatMessages] = useState<FloatMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const msgIdCounter = useRef(0);

  // Function to move the "NO" button to a random safe position within the container
  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || !noButtonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noButtonRef.current.getBoundingClientRect();

    // Calculate maximum coordinates to avoid overflow
    const maxX = containerRect.width - btnRect.width - 24;
    const maxY = containerRect.height - btnRect.height - 24;

    const randomX = Math.max(12, Math.random() * maxX);
    const randomY = Math.max(12, Math.random() * maxY);

    setNoPosition({ x: randomX, y: randomY });

    // Spawn a floating funny message
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = window.innerWidth / 2;
      clientY = window.innerHeight / 2;
    }

    const newMessage: FloatMessage = {
      id: msgIdCounter.current++,
      text: NO_MESSAGES[Math.floor(Math.random() * NO_MESSAGES.length)],
      x: clientX,
      y: clientY - 30,
    };

    setFloatMessages((prev) => [...prev, newMessage]);

    // Automatically remove floating messages after 2 seconds
    setTimeout(() => {
      setFloatMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
    }, 2000);
  };

  // Safe reset if window is resized
  useEffect(() => {
    const handleResize = () => {
      setNoPosition(null);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      {/* Side Images (Desktop: Left and Right absolute elements with beautiful depth) */}
      <div className="hidden lg:block absolute left-[-4%] top-1/2 -translate-y-1/2 w-64 xl:w-72 transition-all hover:scale-105 duration-500 z-10">
        <img
          alt="Cute golden retriever puppy with a red heart"
          className="w-full h-auto drop-shadow-2xl rounded-3xl object-cover border-4 border-white/80"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyZYR9-UIPd8z-4VtUUzy3Lg4zUargWg1sCtPHLIT4XWheJ6RTR-2SwxPIBx25jscz1P8XAuR4ix1e7hAzPM_IIN9EQuHTmjvYxt0pG_hTy3lwiHJlOte1YXkCP3F5DOIy7Mo4HX_EuP7fy5-2j_faVh-1eqE4h4FS_bM7wG_z6R-8bGBHAoLbhAoXVCuhDPSmiymc0Q73G1PKzOFJ2fleuODdjXDcw_bnrQyDTLHO5kvQxcZffa8N2c_3ck9Q6cBf2Q"
        />
      </div>

      <div className="hidden lg:block absolute right-[-4%] top-1/2 -translate-y-1/2 w-64 xl:w-72 transition-all hover:scale-105 duration-500 z-10">
        <img
          alt="Tiny Persian white kitten on soft pink background"
          className="w-full h-auto drop-shadow-2xl rounded-3xl object-cover border-4 border-white/80"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZk1SD4c5NBdXkZOYjV--Y_Z1ZFu6lnZLlpC_a6Bfg-5lLyLLILM9-E-rTM8IylAs8Kk4C1KM1wzy0aBNlN7RYCBEqJQO4v7lOr7g4UtfyR8Bp0pU6cxN0JJ4aUklvDTQRliZHZ3lwpcuZPSN5HMs1dQ8EzKtrAWDmPiN6KJ0iUPivT_hCzPtp9eww4cQw827cZ9gmTPT0p6HcZPzrlw9iACrnLYbd66u_cg5AHt3vlloWxlPH8r0hOu0qR-Wv16SYg"
        />
      </div>

      {/* Mobile view character row */}
      <div className="flex lg:hidden gap-4 mb-6 mt-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Anx7gexAjXwzzjYwpWBeKgHvVtxdEWgcCQZQUGc4DwRKc85kKyjEMCfmOX8-iicKymwZ5fO2A45sailQmM6KYzyIBXg6Leei-BrRJZHFMOTLQKxOsNhKEfiwend2ziBIexA_N_guG8yOC8ZoYs6AQLlcK7ss7gE1iHuC2TbbX-dIa-Q9bpvHQJr6wNJYgVmcWnT8VWZjwL6JCmNoBS47drDcyFDMduMZs9HZxsExmSGtTBT4Q0Wab5tiNcVaANo7iQ"
          />
        </div>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKKcHRHsIr6jsMqloHdiHtArDA9Umk92-JECpCx7r9ErsIjvZeq274MCqVKlW82-2e_wufUhuZnliawlcEVnzlXSg3Qi7EMPtwmv8T0KfJvhg-ME_4hkvkA90b7C8RZehcszKm6MQGJGUCLHYc7BR7UChb8dD9LnmJzjNeDdadTsc0k3_6zC9Tw8QhD-o7rjnO2xcUEHX_dxaNEG4Ki-U9nGcopbQIfL_ek9tj9K35jvgY7DdK4KQGsDken1tXrSfW6Q"
          />
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary leading-tight max-w-4xl mx-auto px-2">
          ❤️ Will You Go on a Friendly Date With Me?
        </h1>
        <p className="font-sans text-lg sm:text-xl text-on-surface-variant max-w-xl mx-auto mt-4 px-4 italic font-medium leading-relaxed">
          "I promise there will be laughter, food, and maybe I'll steal one french fry... only one! 🍟❤️"
        </p>
      </motion.div>

      {/* Button container panel */}
      <div
        ref={containerRef}
        className="glass-card mt-10 p-8 sm:p-12 rounded-[2rem] shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center min-w-[280px] sm:min-w-[450px] min-h-[160px] relative overflow-hidden"
      >
        <button
          onClick={onYes}
          className="glow-button px-10 py-4 sm:px-12 sm:py-5 rounded-full text-white font-bold text-xl uppercase tracking-widest cursor-pointer transition-transform duration-150 z-20"
        >
          YES ❤️
        </button>

        <button
          ref={noButtonRef}
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          onTouchStart={(e) => {
            e.preventDefault();
            handleNoInteraction(e);
          }}
          style={
            noPosition
              ? {
                  position: 'absolute',
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  margin: 0,
                }
              : undefined
          }
          className="no-btn bg-surface-container-low px-10 py-4 sm:px-12 sm:py-5 rounded-full text-brand-secondary font-bold text-xl border-2 border-brand-secondary/20 hover:bg-brand-secondary/10 transition-all cursor-pointer z-20"
        >
          NO 🙈
        </button>
      </div>

      {/* Micro-interaction continuous layout scrolling hint */}
      <div className="mt-12 flex flex-col items-center gap-1 opacity-60 z-10 animate-bounce-slow">
        <span className="font-label text-xs tracking-[0.2em] font-bold text-brand-secondary">CONTINUE</span>
        <span className="text-xl">▼</span>
      </div>

      {/* Floating text messages */}
      <AnimatePresence>
        {floatMessages.map((msg) => (
          <motion.div
            key={msg.id}
            animate={{ y: -100, opacity: 0, scale: 1.2 }}
            className="fixed text-brand-primary font-bold text-lg pointer-events-none z-50 drop-shadow-md bg-white/90 px-3 py-1.5 rounded-full border border-brand-primary-light/40 shadow-sm"
            exit={{ opacity: 0 }}
            initial={{ left: msg.x - 40, top: msg.y, opacity: 1, scale: 0.8 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
