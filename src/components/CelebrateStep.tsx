import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CelebrateStepProps {
  onContinue: () => void;
}

const FUNNY_MESSAGES = [
  "I already knew you had good taste.",
  "You've unlocked Premium Happiness.",
  "Our friendship just got upgraded.",
  "I promise I won't judge your food order.",
  "I'll try not to embarrass myself."
];

export default function CelebrateStep({ onContinue }: CelebrateStepProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-8">
      {/* Absolute floating atmospheric elements */}
      <div className="absolute top-2 left-6 text-brand-primary/40 animate-pulse-slow">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute top-12 right-6 text-brand-secondary/40 animate-pulse-slow delay-150">
        <Sparkles className="w-6 h-6" />
      </div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        {/* Celebration header */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-tight font-bold drop-shadow-sm">
          🥹❤️ Yay!! You Actually Said Yes!
        </h2>

        {/* Hero visual: Teddy bear with dancing puppy overlay */}
        <div className="relative inline-block mt-4 group">
          {/* Subtle neon bloom bg glow */}
          <div className="absolute inset-0 bg-brand-primary-light/20 rounded-full blur-3xl group-hover:bg-brand-primary-light/35 transition-colors duration-700"></div>

          {/* Teddy Bear */}
          <img
            alt="Romantic Teddy Bear holding a heart"
            className="relative z-10 w-56 sm:w-64 md:w-72 h-auto drop-shadow-2xl animate-float-gentle"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtvvitFRujBu7Sfsdruvc9wlgXaXRoyh8q6ksBA9DUn61CbVZc_dUjQdIyba3SAmiILal91eOjpea1pK-jraThCvYfcIqlH-cvEpqghzId9gMLPuEJutT2ieoqnZQDHbF-VX0YEpI6Siivaqb9ihPkZQFnpSqCWUaroNRTnmLjLLDn-7PYAsyNOHGH_hHSdolMeNk2JryfMcBa13vat8ChdkztKBu7BjCK4QoeMRshraBVa-w5uZJMQyiFphxj6iVe7g"
          />

          {/* Dancing Puppy Overlay sticker */}
          <div className="absolute bottom-[-10px] right-[-20px] sm:bottom-[-20px] sm:right-[-30px] z-20 w-28 sm:w-36 animate-bounce-slow">
            <img
              alt="Cute cartoon puppy dancing joyfully"
              className="w-full h-auto drop-shadow-lg"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEMdg25L9dNVgVN_natNlAv169IE8va9Jo1Fv7NY7MouPoHoGSZDhXymG87-zc6GSGPcc8-gMEHf1yk4P5QW0KLIOnbStQafiy_8EJhdmwXJH4pB-tBnjK4ojjWqW7TKz2L7O8R1so8dHm-ERPpib3Dg0TJRoJPctbq6XX7Ktv9DMDemEt4i0fWMgO9dgI1jasWNBXA_i9Pp3gBgfq-f-PnlZqr5rfslI2FRAM4CCmId-QKUBEmN8q"
            />
          </div>
        </div>

        {/* Rotating text cards */}
        <div className="mt-8 w-full max-w-md mx-auto space-y-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 min-h-[110px] shadow-md border border-white/40 flex items-center justify-center transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-xl sm:text-2xl text-brand-primary text-center font-semibold italic"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                {FUNNY_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2.5">
            {FUNNY_MESSAGES.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === msgIndex ? 'w-6 bg-brand-primary' : 'w-2.5 bg-brand-primary/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <button
            onClick={onContinue}
            className="glow-button px-10 py-4.5 rounded-full text-white font-serif text-xl shadow-lg flex items-center justify-center gap-3 mx-auto cursor-pointer transition-transform duration-150"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
