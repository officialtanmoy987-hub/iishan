import { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Send, Sparkles, Heart } from 'lucide-react';
import { OutingDetails } from '../types';

interface FinalStepProps {
  details: OutingDetails;
}

export default function FinalStep({ details }: FinalStepProps) {
  // Fire beautiful confetti immediately on load
  useEffect(() => {
    // Large explosion
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff8da1', '#9c3f53', '#68548d', '#fef8f9', '#ffd5db']
    });

    // Staggered cute little bursts
    const end = Date.now() + (3 * 1000); // 3 seconds of extra bursts
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff8da1', '#9c3f53']
      });
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff8da1', '#68548d']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerManualConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleSendWhatsApp = () => {
    const textMessage = `Hey! ❤️ I've accepted your lovely invitation! Here's our perfect plan:

📅 Date: ${details.date}
⏰ Time: ${details.timeHour}:${details.timeMinute} ${details.timePeriod}
🎡 Activity: ${details.activity}
✨ Mood: ${details.mood}

I'm so excited! See you there! 🥰`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    
    // Open in new window safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-8 z-10">
      {/* Sparkle indicators */}
      <div className="absolute top-10 left-10 text-brand-primary/50 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main greeting */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-primary">
            See you there! ❤️
          </h1>
          <p className="font-sans text-lg text-on-surface-variant font-medium">
            Your friendly date plan is locked and ready.
          </p>
        </div>

        {/* Adorable Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {/* Puppy Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={triggerManualConfetti}
            className="glass-card p-5 rounded-[2rem] border border-white/50 shadow-md flex flex-col items-center cursor-pointer group"
          >
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Puppy celebrate"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Anx7gexAjXwzzjYwpWBeKgHvVtxdEWgcCQZQUGc4DwRKc85kKyjEMCfmOX8-iicKymwZ5fO2A45sailQmM6KYzyIBXg6Leei-BrRJZHFMOTLQKxOsNhKEfiwend2ziBIexA_N_guG8yOC8ZoYs6AQLlcK7ss7gE1iHuC2TbbX-dIa-Q9bpvHQJr6wNJYgVmcWnT8VWZjwL6JCmNoBS47drDcyFDMduMZs9HZxsExmSGtTBT4Q0Wab5tiNcVaANo7iQ"
              />
            </div>
            <p className="font-serif italic text-lg font-bold text-brand-primary">
              "I'll count down the days!"
            </p>
            <span className="text-[10px] text-outline font-bold tracking-widest mt-1">TAP FOR SPARKLES</span>
          </motion.div>

          {/* Kitten Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={triggerManualConfetti}
            className="glass-card p-5 rounded-[2rem] border border-white/50 shadow-md flex flex-col items-center cursor-pointer group"
          >
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Kitten celebrate"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKKcHRHsIr6jsMqloHdiHtArDA9Umk92-JECpCx7r9ErsIjvZeq274MCqVKlW82-2e_wufUhuZnliawlcEVnzlXSg3Qi7EMPtwmv8T0KfJvhg-ME_4hkvkA90b7C8RZehcszKm6MQGJGUCLHYc7BR7UChb8dD9LnmJzjNeDdadTsc0k3_6zC9Tw8QhD-o7rjnO2xcUEHX_dxaNEG4Ki-U9nGcopbQIfL_ek9tj9K35jvgY7DdK4KQGsDken1tXrSfW6Q"
              />
            </div>
            <p className="font-serif italic text-lg font-bold text-brand-secondary">
              "Don't forget the french fries!"
            </p>
            <span className="text-[10px] text-outline font-bold tracking-widest mt-1">TAP FOR CONFETTI</span>
          </motion.div>
        </div>

        {/* Action Button: Send over WhatsApp */}
        <div className="pt-6">
          <button
            onClick={handleSendWhatsApp}
            className="glow-button px-12 py-5 rounded-full text-white font-serif text-xl flex items-center justify-center gap-3 mx-auto cursor-pointer shadow-lg hover:shadow-2xl transition-all"
          >
            <Send className="w-5 h-5 animate-pulse" />
            <span>Send over WhatsApp</span>
          </button>
          <p className="text-xs text-outline font-bold tracking-wide mt-4">
            Pre-fills a sweet invitation with your custom dates & activities!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
