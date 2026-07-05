import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Smile, 
  Ear, 
  Utensils, 
  Coffee, 
  BookOpen, 
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PromisesStepProps {
  onContinue: () => void;
}

interface PromiseItem {
  id: number;
  title: string;
  frontIcon: any;
  frontColor: string;
  backText: string;
  backBg: string;
  staggerClass: string;
}

const PROMISES: PromiseItem[] = [
  {
    id: 1,
    title: "Joy",
    frontIcon: Smile,
    frontColor: "text-brand-primary",
    backText: "❤️ I'll always make you smile.",
    backBg: "bg-brand-primary-light/10",
    staggerClass: "lg:col-span-1"
  },
  {
    id: 2,
    title: "Presence",
    frontIcon: Ear,
    frontColor: "text-brand-secondary",
    backText: "🌸 I'll listen carefully.",
    backBg: "bg-brand-secondary/10",
    staggerClass: "lg:col-span-1 md:translate-y-10 lg:translate-y-12"
  },
  {
    id: 3,
    title: "Sharing",
    frontIcon: Utensils,
    frontColor: "text-brand-tertiary",
    backText: "🍕 You can steal my fries.",
    backBg: "bg-brand-tertiary/10",
    staggerClass: "lg:col-span-1"
  },
  {
    id: 4,
    title: "Warmth",
    frontIcon: Coffee,
    frontColor: "text-brand-primary",
    backText: "☕ Coffee is on me.",
    backBg: "bg-brand-primary-light/10",
    staggerClass: "lg:col-span-1 lg:-translate-y-12 md:mt-12 lg:mt-0"
  },
  {
    id: 5,
    title: "Attention",
    frontIcon: BookOpen,
    frontColor: "text-brand-secondary",
    backText: "🌹 I'll remember little moments.",
    backBg: "bg-brand-secondary/10",
    staggerClass: "lg:col-span-1"
  },
  {
    id: 6,
    title: "Respect",
    frontIcon: Heart,
    frontColor: "text-brand-tertiary",
    backText: "😊 I'll always respect you.",
    backBg: "bg-brand-tertiary/10",
    staggerClass: "lg:col-span-1 md:translate-y-10 lg:translate-y-0"
  }
];

export default function PromisesStep({ onContinue }: PromisesStepProps) {
  // Store flipped state for mobile taps (index based)
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 z-10 pb-44">
      {/* Title section */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary drop-shadow-sm">
          My Promises to You
        </h2>
        <p className="font-sans text-lg sm:text-xl text-on-surface-variant max-w-lg mx-auto font-medium">
          Small commitments, everlasting love. Hover or tap to see what I hold dear.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 pb-12">
        {PROMISES.map((promise) => {
          const Icon = promise.frontIcon;
          const isFlipped = !!flippedCards[promise.id];

          return (
            <div 
              key={`promise-${promise.id}`}
              onClick={() => toggleCardFlip(promise.id)}
              className={`h-64 cursor-pointer select-none perspective group ${promise.staggerClass}`}
            >
              {/* Inner card container that handles 3D flip transform */}
              <div 
                className="relative w-full h-full transition-transform duration-500 transform-style-3d shadow-md hover:shadow-lg rounded-3xl"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : undefined,
                }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 backface-hidden glass-card rounded-3xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:bg-brand-primary-light/5"
                >
                  <div className={`p-4 rounded-full bg-surface-container mb-4 ${promise.frontColor}`}>
                    <Icon className="w-12 h-12 fill-current opacity-90" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-on-surface">{promise.title}</h3>
                </div>

                {/* Back Side */}
                <div 
                  className={`absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center p-8 text-center rotate-y-180 border border-brand-primary/10 ${promise.backBg}`}
                >
                  <p className="font-serif text-xl sm:text-2xl font-bold text-brand-primary leading-snug">
                    {promise.backText}
                  </p>
                  <Sparkles className="mt-4 w-6 h-6 text-brand-primary-light animate-pulse" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continuation Action button */}
      <div className="flex justify-center pt-16 relative z-30">
        <button
          onClick={onContinue}
          className="glow-button px-12 py-4.5 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3.5 cursor-pointer shadow-lg"
        >
          <span>Summary Card</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Walking Puppy Sticker element walking across the bottom screen */}
      <div className="fixed bottom-24 left-0 w-full pointer-events-none z-10 overflow-hidden h-28">
        <div className="animate-walk-across absolute w-28 h-28 bottom-0">
          <img
            alt="Cheerful animated puppy walking stickers"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0DBlmiWpvBybcTl8Sqobmj8yGmMUBMwqqFVfMonQTf4cyNbMHooaw9DuOxwnafLle4qyohxDOhqKdRwNStzbBN2VctUTebZ5zqfUfSRtKOfeZ3aYDzHtHrIHmZVXlFViZeVGhu_Smq5xianiPsV62Rds4PfY1lzdaFacid5cJDZljuOOEsta5p39tWrcgYC088YGdQ9PvRwXv9bYp0ypWQMnSGMIuMpoROTuMFX7UtoBUxXciYgAU"
          />
        </div>
      </div>

      {/* Peeking Kitten Sticker peaking up bottom right */}
      <div className="fixed bottom-0 right-6 pointer-events-none z-10 w-24 h-24 overflow-hidden">
        <div className="animate-peek-up absolute bottom-0 right-0 w-full h-full">
          <img
            alt="Adorable peeking grey kitten sticker"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbY_E7WKLXVAhWwo0Ww2DJmswDfp8yvkCJb34qfDE4voOYoBZUqUo9V1jP_MG67r0ogIL2Kl6B-BIB6uNimtYvDoISuFbYijxJlB1EHoK6enWvQSbSjeHhaRMnh48lRvrCvG_9e5_-EAfvRKGQfyRErIQnAANG_Lcs7qMUJEg181Aj0slmKs1nmCpqM4S9I8YxiNYnKWfv4W8Y0PQud5Xu3d4FwSuqnqe0hREKx-ke1HWfQyTO9Hok"
          />
        </div>
      </div>
    </div>
  );
}
