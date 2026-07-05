import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Award } from 'lucide-react';

interface LoveMeterStepProps {
  onSuccess: () => void;
}

interface GameHeart {
  id: number;
  left: number; // Percentage 10 to 90
  delay: number; // ms
  duration: number; // ms
}

const GAME_MESSAGES = [
  "Finding courage...",
  "Preparing flowers...",
  "Checking weather...",
  "Choosing outfit...",
  "Loading butterflies...",
  "Ready for our date ❤️"
];

export default function LoveMeterStep({ onSuccess }: LoveMeterStepProps) {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hearts, setHearts] = useState<GameHeart[]>([]);
  const heartIdCounter = useRef(0);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Status message based on progress
  const getStatusMessage = () => {
    if (!isPlaying && score === 0) return "READY TO PLAY?";
    if (isCompleted) return "READY FOR OUR DATE ❤️";
    const msgIndex = Math.min(
      Math.floor((score / 10) * (GAME_MESSAGES.length - 1)),
      GAME_MESSAGES.length - 1
    );
    return GAME_MESSAGES[msgIndex];
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setHearts([]);
    heartIdCounter.current = 0;
  };

  // Handle heart spawn loop
  useEffect(() => {
    if (!isPlaying || isCompleted) {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      return;
    }

    const spawnHeart = () => {
      const id = heartIdCounter.current++;
      const left = Math.floor(Math.random() * 80) + 10; // Avoid screen edges
      const duration = 2000 + Math.random() * 1500; // 2s to 3.5s speed

      const newHeart: GameHeart = {
        id,
        left,
        delay: 0,
        duration,
      };

      setHearts((prev) => [...prev, newHeart]);

      // Automatically clean up uncaught hearts
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration);
    };

    // Initial batch
    spawnHeart();
    // Spawn heart every 800ms to keep it active
    gameIntervalRef.current = setInterval(spawnHeart, 800);

    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [isPlaying, isCompleted]);

  const catchHeart = (id: number) => {
    if (!isPlaying || isCompleted) return;

    setScore((prev) => {
      const nextScore = prev + 1;
      if (nextScore >= 10) {
        setIsCompleted(true);
        setIsPlaying(false);
        setHearts([]);
        if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      }
      return nextScore;
    });

    // Remove heart immediately on tap
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-6 z-10">
      {/* Title block */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary">
          The Love Meter
        </h1>
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
          Let's see if we're truly compatible. Complete the game to unlock your special reward!
        </p>
      </div>

      {/* Love Meter Card */}
      <div className="w-full glass-card rounded-[2rem] p-6 sm:p-10 shadow-xl border border-white/40 relative overflow-hidden">
        {/* Decorative corner sparkles */}
        <div className="absolute top-4 right-4 text-brand-primary-light/40">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Dynamic Game UI Grid */}
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="game-play"
              exit={{ opacity: 0, y: -15 }}
              initial={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Progress and status header */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-label text-xs tracking-widest text-brand-primary font-bold uppercase transition-all duration-300">
                    {getStatusMessage()}
                  </span>
                  <span className="font-serif text-3xl font-bold text-brand-secondary">
                    {score}/10
                  </span>
                </div>

                {/* Styled progress bar */}
                <div className="h-4.5 w-full bg-surface-container rounded-full overflow-hidden relative shadow-inner">
                  <div
                    style={{ width: `${(score / 10) * 100}%` }}
                    className="h-full bg-gradient-to-r from-brand-primary-light to-brand-primary transition-all duration-500 ease-out relative"
                  >
                    {/* Highlight shimmer shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite_linear]" />
                  </div>
                </div>
              </div>

              {/* Catching Game canvas container */}
              <div
                id="game-canvas"
                className="relative h-64 sm:h-72 w-full bg-white/30 rounded-2xl border border-white/50 flex items-center justify-center overflow-hidden shadow-inner cursor-crosshair select-none"
              >
                {!isPlaying ? (
                  <div className="text-center space-y-4 z-20 px-4">
                    <button
                      onClick={startGame}
                      className="glow-button text-white px-8 py-3 rounded-full font-label text-xs tracking-widest font-bold cursor-pointer transition-transform duration-150 shadow-md active:scale-95"
                    >
                      START GAME
                    </button>
                    <p className="text-on-surface-variant/75 text-xs font-semibold">
                      Catch 10 floating hearts to unlock!
                    </p>
                  </div>
                ) : (
                  /* Floating hearts arena */
                  <div className="absolute inset-0 w-full h-full">
                    {hearts.map((h) => (
                      <motion.button
                        key={h.id}
                        onClick={() => catchHeart(h.id)}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          catchHeart(h.id);
                        }}
                        style={{ left: `${h.left}%` }}
                        animate={{ y: '-320px', opacity: [0, 1, 1, 0] }}
                        className="absolute bottom-[-40px] text-brand-primary hover:text-brand-primary-light cursor-pointer select-none active:scale-75 z-20"
                        initial={{ y: 0, opacity: 0 }}
                        transition={{ duration: h.duration / 1000, ease: 'linear' }}
                      >
                        <Heart className="w-8 h-8 fill-brand-primary drop-shadow-md" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Success & VIP Pass Ticket layout */
            <motion.div
              key="game-success"
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-2 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {/* Giant bouncing checked heart */}
              <div className="w-20 h-20 bg-gradient-to-tr from-brand-primary to-brand-primary-light rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>

              <div className="space-y-1">
                <h2 className="font-display text-3xl font-bold text-brand-primary">
                  Love Meter Full!
                </h2>
                <p className="text-on-surface-variant font-medium text-sm sm:text-base">
                  You've unlocked the special reward! ❤️
                </p>
              </div>

              {/* Rotated decorative coupon ticket pass */}
              <motion.div
                animate={{ rotate: [0, 2] }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="glass-card p-6 rounded-2xl border-dashed border-2 border-brand-primary/40 inline-block shadow-md max-w-xs relative bg-white/80"
              >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#fef8f9] rounded-full border-r border-brand-primary/10" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#fef8f9] rounded-full border-l border-brand-primary/10" />
                
                <span className="font-label text-[10px] text-brand-primary tracking-widest font-bold block mb-1">
                  VALID FOR ONE ROMANTIC ADVENTURE
                </span>
                <p className="font-serif italic text-2xl font-extrabold text-brand-secondary tracking-wide uppercase px-4 py-2 bg-brand-primary/5 rounded-md">
                  VIP DATE PASS
                </p>
              </motion.div>

              {/* CTA Action Trigger */}
              <button
                onClick={onSuccess}
                className="glow-button px-10 py-4 rounded-full text-white font-serif text-lg flex items-center gap-2.5 cursor-pointer"
              >
                <span>Reveal Promises</span>
                <Award className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
