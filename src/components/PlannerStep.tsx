import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coffee, 
  Pizza, 
  IceCream, 
  Film, 
  Sunset, 
  TreePine, 
  Target, 
  Gamepad2, 
  Utensils, 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles,
  Heart
} from 'lucide-react';
import { OutingDetails } from '../types';

interface PlannerStepProps {
  onLock: (details: OutingDetails) => void;
  initialDetails?: OutingDetails;
}

const MOODS = ["Cute", "Funny", "Romantic", "Adventure", "Chill"];

const ACTIVITIES = [
  { id: 'Coffee', label: 'Coffee', icon: Coffee },
  { id: 'Pizza', label: 'Pizza', icon: Pizza },
  { id: 'Ice Cream', label: 'Ice Cream', icon: IceCream },
  { id: 'Movie', label: 'Movie', icon: Film },
  { id: 'Sunset Walk', label: 'Sunset Walk', icon: Sunset },
  { id: 'Park', label: 'Park', icon: TreePine },
  { id: 'Bowling', label: 'Bowling', icon: Target },
  { id: 'Arcade', label: 'Arcade', icon: Gamepad2 },
  { id: 'Food', label: 'Food', icon: Utensils },
  { id: 'Surprise Me', label: 'Surprise Me', icon: Gift, special: true },
];

export default function PlannerStep({ onLock, initialDetails }: PlannerStepProps) {
  // Calendar select state (July 2026)
  const [selectedDay, setSelectedDay] = useState<number>(initialDetails ? parseInt(initialDetails.date.match(/\d+/)?.[0] || '11') : 11);
  const [selectedMonth, setSelectedMonth] = useState<string>("July 2026");

  // Time state
  const [hour, setHour] = useState<string>(initialDetails?.timeHour || "07");
  const [minute, setMinute] = useState<string>(initialDetails?.timeMinute || "30");
  const [period, setPeriod] = useState<'AM' | 'PM'>(initialDetails?.timePeriod || "PM");

  // Mood state
  const [selectedMood, setSelectedMood] = useState<string>(initialDetails?.mood || "Cute");

  // Activity state
  const [selectedActivity, setSelectedActivity] = useState<string>(initialDetails?.activity || "Pizza");

  // Calendar setup for July 2026: July starts on a Wednesday (3)
  // July 2026 has 31 days
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const placeholderDays = [28, 29, 30]; // End of June (June has 30 days)

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleSurpriseMe = () => {
    // Select a random activity from standard ones
    const pool = ACTIVITIES.filter(a => !a.special);
    const randomChoice = pool[Math.floor(Math.random() * pool.length)];
    setSelectedActivity(randomChoice.id);
  };

  const handleLockIn = () => {
    const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayIndex = (selectedDay + 2) % 7; // July 1, 2026 is a Wednesday (3)
    const weekdayName = WEEKDAYS[weekdayIndex];
    const details: OutingDetails = {
      date: `${weekdayName}, Jul ${selectedDay}`,
      timeHour: hour,
      timeMinute: minute,
      timePeriod: period,
      mood: selectedMood,
      activity: selectedActivity,
    };
    onLock(details);
  };

  const handleIncrementHour = () => {
    setHour(prev => {
      const h = parseInt(prev);
      const next = h === 12 ? 1 : h + 1;
      return next.toString().padStart(2, '0');
    });
  };

  const handleDecrementHour = () => {
    setHour(prev => {
      const h = parseInt(prev);
      const next = h === 1 ? 12 : h - 1;
      return next.toString().padStart(2, '0');
    });
  };

  const handleIncrementMinute = () => {
    setMinute(prev => (prev === "30" ? "00" : "30"));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 z-10">
      {/* Title block */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-primary mb-2">
          When should our adventure begin?
        </h1>
        <p className="text-on-surface-variant font-sans text-lg sm:text-xl font-medium">
          Let's craft the perfect moment together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Date & Time pickers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Date Picker glass-card */}
          <section className="glass-card rounded-2xl p-6 shadow-md border border-white/40">
            <h2 className="font-label text-xs tracking-widest font-bold text-brand-secondary uppercase mb-4">
              Select Date
            </h2>
            <div className="calendar-container">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans font-bold text-lg text-on-surface">{selectedMonth}</span>
                <div className="flex gap-1.5">
                  <button className="p-1.5 hover:bg-brand-primary-light/20 rounded-full transition-colors cursor-pointer">
                    <ChevronLeft className="w-4 h-4 text-brand-primary" />
                  </button>
                  <button className="p-1.5 hover:bg-brand-primary-light/20 rounded-full transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4 text-brand-primary" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-label font-bold text-outline uppercase tracking-wider mb-2">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* June placeholders */}
                {placeholderDays.map((d) => (
                  <div key={`placeholder-${d}`} className="aspect-square flex items-center justify-center text-outline-variant/60 text-sm select-none font-medium">
                    {d}
                  </div>
                ))}
                {/* July days */}
                {calendarDays.map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => handleDaySelect(day)}
                      className={`aspect-square flex items-center justify-center rounded-full text-sm font-semibold transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-primary text-white shadow-md scale-105' 
                          : 'hover:bg-brand-primary-light/20 text-on-surface'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Time Picker glass-card */}
          <section className="glass-card rounded-2xl p-6 shadow-md border border-white/40">
            <h2 className="font-label text-xs tracking-widest font-bold text-brand-secondary uppercase mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Select Time
            </h2>
            <div className="flex items-center justify-center gap-4">
              {/* Hour input container */}
              <div className="flex flex-col items-center">
                <button onClick={handleIncrementHour} className="text-brand-primary hover:text-brand-primary-light p-1 transition-transform active:scale-90 select-none cursor-pointer">▲</button>
                <div className="bg-surface-container rounded-xl p-3 text-center w-18 shadow-sm">
                  <span className="block font-serif text-3xl font-bold text-brand-primary">{hour}</span>
                </div>
                <button onClick={handleDecrementHour} className="text-brand-primary hover:text-brand-primary-light p-1 transition-transform active:scale-90 select-none cursor-pointer">▼</button>
                <span className="text-[10px] text-outline font-bold mt-1">HOUR</span>
              </div>

              <span className="text-3xl text-brand-primary/40 font-bold select-none">:</span>

              {/* Minute input container */}
              <div className="flex flex-col items-center">
                <button onClick={handleIncrementMinute} className="text-brand-primary hover:text-brand-primary-light p-1 transition-transform active:scale-90 select-none cursor-pointer">▲</button>
                <div className="bg-surface-container rounded-xl p-3 text-center w-18 shadow-sm">
                  <span className="block font-serif text-3xl font-bold text-brand-primary">{minute}</span>
                </div>
                <button onClick={handleIncrementMinute} className="text-brand-primary hover:text-brand-primary-light p-1 transition-transform active:scale-90 select-none cursor-pointer">▼</button>
                <span className="text-[10px] text-outline font-bold mt-1">MIN</span>
              </div>

              {/* AM/PM toggle */}
              <div className="flex flex-col gap-1.5 ml-3">
                <button
                  onClick={() => setPeriod('PM')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    period === 'PM' 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'bg-surface-container text-outline hover:bg-surface-container-high'
                  }`}
                >
                  PM
                </button>
                <button
                  onClick={() => setPeriod('AM')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    period === 'AM' 
                      ? 'bg-brand-primary text-white shadow-sm' 
                      : 'bg-surface-container text-outline hover:bg-surface-container-high'
                  }`}
                >
                  AM
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Mood and Activities */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mood selection box */}
          <section className="glass-card rounded-2xl p-6 shadow-md border border-white/40">
            <h2 className="font-label text-xs tracking-widest font-bold text-brand-secondary uppercase mb-4">
              Choose the Mood
            </h2>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood;
                return (
                  <button
                    key={`mood-${mood}`}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-primary text-brand-primary bg-brand-primary-light/15 shadow-sm scale-102 font-bold'
                        : 'border-outline-variant text-on-surface-variant hover:border-brand-primary hover:text-brand-primary'
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Activities grid */}
          <section className="glass-card rounded-2xl p-6 shadow-md border border-white/40">
            <h2 className="font-label text-xs tracking-widest font-bold text-brand-secondary uppercase mb-4">
              What are we doing?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ACTIVITIES.map((act) => {
                const Icon = act.icon;
                const isSelected = selectedActivity === act.id;
                
                if (act.special) {
                  return (
                    <button
                      key={`act-${act.id}`}
                      onClick={handleSurpriseMe}
                      className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-brand-primary-light/40 bg-brand-primary-light/10 hover:bg-brand-primary-light/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                    >
                      <div className="absolute top-1.5 right-1.5 text-brand-primary animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <Icon className="w-8 h-8 text-brand-primary mb-2.5 group-hover:rotate-12 transition-transform" />
                      <span className="text-xs font-bold text-brand-primary text-center">
                        {act.label}
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={`act-${act.id}`}
                    onClick={() => setSelectedActivity(act.id)}
                    className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary-light/10 shadow-md scale-102'
                        : 'border-white/40 hover:bg-white/60 hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-2.5 group-hover:scale-110 transition-transform ${
                      isSelected ? 'text-brand-primary' : 'text-on-surface-variant/80'
                    }`} />
                    <span className={`text-xs font-semibold text-center ${
                      isSelected ? 'text-brand-primary font-bold' : 'text-on-surface-variant'
                    }`}>
                      {act.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Final locked action */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleLockIn}
              className="glow-button px-12 py-4.5 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3.5 cursor-pointer"
            >
              <span>Lock it in!</span>
              <Heart className="w-5 h-5 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
