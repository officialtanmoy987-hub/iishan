import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles, CheckCircle, Heart, Flame } from 'lucide-react';
import { OutingDetails } from '../types';

interface OutingStepProps {
  details: OutingDetails;
  onEdit: () => void;
  onConfirm: () => void;
}

export default function OutingStep({ details, onEdit, onConfirm }: OutingStepProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-6 z-10">
      {/* Decorative background sparkles */}
      <div className="absolute top-10 right-6 opacity-20 pointer-events-none animate-bounce-slow">
        <Sparkles className="w-16 h-16 text-brand-primary fill-brand-primary-light" />
      </div>
      <div className="absolute bottom-20 left-4 opacity-20 pointer-events-none animate-float-gentle delay-1000">
        <Heart className="w-20 h-20 text-brand-secondary fill-brand-secondary/30" />
      </div>

      {/* Invitation Wrapper Card */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass-card rounded-[2.5rem] p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl border border-white/50"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Shiny background shimmer strip */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] animate-[shimmer_4s_infinite_linear] pointer-events-none" />

        {/* Beautiful Couple Illustration Container */}
        <div className="w-full h-56 sm:h-64 mb-8 relative overflow-hidden rounded-2xl shadow-inner group">
          <div className="absolute inset-0 bg-brand-primary-light/15 group-hover:bg-brand-primary-light/5 transition-colors duration-500 z-10" />
          <img
            alt="couple silhouette cherry blossom background"
            className="w-full h-full object-cover rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-700"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJFtx63AWVUn84pika5Caz9Ee35IvW3o2A-hd7CF4a5WGKzWAvwXTsLq2EcCYPXOvX0RQR-JXjjc1CHtgR6PNGSCnPJOr4aHTpc_DYI-SKAgU5AJDmLVyRNE_Esnt3bPE3w_W916-X8HPbA1IVA-rZniFR2Z6Iw0JK0jdPOHrpgI1dd1zwHeK_vNQaVK0WTeMW-j7oswPwQ6JhVxwyp34UPDjhpUvPHfoL9JLe1O3KyP82eq70cI_f"
          />

          {/* Glowing accent sparkles inside illustration */}
          <div className="absolute top-2 right-2 text-white/80 animate-pulse z-20">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Header content */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-brand-primary mb-3">
          Our Perfect Outing
        </h1>
        <p className="font-sans text-base sm:text-lg text-on-surface-variant italic mb-8 max-w-md mx-auto leading-relaxed">
          "Some moments become beautiful because of the people we spend them with."
        </p>

        {/* Bento Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* Selected Date Card */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-white/60 flex flex-col items-center justify-center shadow-sm">
            <Calendar className="w-6 h-6 text-brand-primary mb-2" />
            <span className="font-label text-[10px] tracking-wider text-outline uppercase font-bold mb-1">
              Date
            </span>
            <span className="font-sans font-bold text-sm text-on-surface text-center">
              {details.date}
            </span>
          </div>

          {/* Selected Time Card */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-white/60 flex flex-col items-center justify-center shadow-sm">
            <Clock className="w-6 h-6 text-brand-primary mb-2" />
            <span className="font-label text-[10px] tracking-wider text-outline uppercase font-bold mb-1">
              Time
            </span>
            <span className="font-sans font-bold text-sm text-on-surface text-center">
              {details.timeHour}:{details.timeMinute} {details.timePeriod}
            </span>
          </div>

          {/* Selected Activity Card */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-white/60 flex flex-col items-center justify-center shadow-sm">
            <Flame className="w-6 h-6 text-brand-primary mb-2" />
            <span className="font-label text-[10px] tracking-wider text-outline uppercase font-bold mb-1">
              Activity
            </span>
            <span className="font-sans font-bold text-sm text-on-surface text-center">
              {details.activity} ({details.mood})
            </span>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEdit}
            className="w-full sm:w-auto px-10 py-4 rounded-full border-2 border-brand-secondary/30 text-brand-secondary font-bold hover:bg-brand-secondary/10 transition-colors cursor-pointer text-base active:scale-95"
          >
            Edit
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-10 py-4 rounded-full glow-button text-white font-bold flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <span>Confirm</span>
            <CheckCircle className="w-5 h-5 fill-white/10" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
