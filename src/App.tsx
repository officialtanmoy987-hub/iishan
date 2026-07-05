import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowLeft, HeartHandshake } from 'lucide-react';
import { Step, OutingDetails } from './types';
import BackgroundShader from './components/BackgroundShader';
import HomeStep from './components/HomeStep';
import CelebrateStep from './components/CelebrateStep';
import PlannerStep from './components/PlannerStep';
import LoveMeterStep from './components/LoveMeterStep';
import PromisesStep from './components/PromisesStep';
import OutingStep from './components/OutingStep';
import FinalStep from './components/FinalStep';

const SECTION_LABELS = [
  "Invitation",
  "Celebration",
  "Adventure Planner",
  "Compatibility Check",
  "My Promises",
  "Outing Summary",
  "See You There!"
];

export default function App() {
  const [step, setStep] = useState<Step>(0);
  const [outingDetails, setOutingDetails] = useState<OutingDetails>({
    date: "Saturday, Jul 11",
    timeHour: "07",
    timeMinute: "30",
    timePeriod: "PM",
    mood: "Cute",
    activity: "Pizza"
  });

  const handleNext = () => {
    if (step < 6) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  return (
    <div className="min-h-screen text-on-surface font-sans flex flex-col relative antialiased selection:bg-brand-primary-light/30 selection:text-brand-primary">
      {/* High-fidelity WebGL Background Canvas */}
      <BackgroundShader />

      {/* Persistent Elegant Top Navigation Header */}
      <header className="w-full py-5 px-6 sm:px-12 flex justify-between items-center bg-white/20 backdrop-blur-sm border-b border-white/10 z-30">
        <div className="flex items-center gap-2 select-none">
          <Heart className="w-6 h-6 text-brand-primary fill-brand-primary animate-pulse-slow" />
          <span className="font-display font-bold text-xl text-brand-primary tracking-tight">
            friendly date.
          </span>
        </div>

        {/* Section progression pill indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-label text-[10px] tracking-widest font-bold text-brand-secondary uppercase">
            {SECTION_LABELS[step]}
          </span>
          <div className="px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/10 text-brand-primary font-label text-xs font-extrabold tracking-wide">
            {step + 1} / 7
          </div>
        </div>
      </header>

      {/* Main container with slide-up screen viewport */}
      <main className="flex-grow flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full flex flex-col justify-center"
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <HomeStep onYes={() => setStep(1)} />}
            {step === 1 && <CelebrateStep onContinue={() => setStep(2)} />}
            {step === 2 && (
              <PlannerStep
                initialDetails={outingDetails}
                onLock={(details) => {
                  setOutingDetails(details);
                  setStep(3);
                }}
              />
            )}
            {step === 3 && <LoveMeterStep onSuccess={() => setStep(4)} />}
            {step === 4 && <PromisesStep onContinue={() => setStep(5)} />}
            {step === 5 && (
              <OutingStep
                details={outingDetails}
                onConfirm={() => setStep(6)}
                onEdit={() => setStep(2)}
              />
            )}
            {step === 6 && <FinalStep details={outingDetails} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Supportive Bottom Navigation and Stepper Bar */}
      {step > 0 && step < 6 && (
        <footer className="w-full py-4 px-6 sm:px-12 flex justify-between items-center z-30 bg-white/10 backdrop-blur-sm border-t border-white/5">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-brand-secondary font-bold text-sm hover:text-brand-primary transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Staggered progress dot indicators */}
          <div className="hidden md:flex items-center gap-1.5">
            {SECTION_LABELS.map((_, idx) => (
              <button
                key={idx}
                disabled={idx > step} // Prevent skipping ahead but allow going back to previous steps
                onClick={() => setStep(idx as Step)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === step 
                    ? 'w-6 bg-brand-primary' 
                    : idx < step 
                      ? 'w-2 bg-brand-primary-light/60 hover:bg-brand-primary cursor-pointer' 
                      : 'w-2 bg-brand-primary/10'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-brand-secondary/60">
            <HeartHandshake className="w-4 h-4" />
            <span className="font-label text-[10px] tracking-wider font-bold">DATE ASSISTANT</span>
          </div>
        </footer>
      )}
    </div>
  );
}
