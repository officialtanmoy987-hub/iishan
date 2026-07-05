export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OutingDetails {
  date: string; // Format e.g., "Saturday, Sep 14"
  timeHour: string; // e.g. "07"
  timeMinute: string; // e.g. "30"
  timePeriod: 'AM' | 'PM';
  mood: string; // e.g. "Cute" | "Funny" | "Romantic" | "Adventure" | "Chill"
  activity: string; // Selected activity
}
