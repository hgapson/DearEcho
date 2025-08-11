export type AppPage = "welcome" | "mood" | "letter" | "journal" | "auth";
export type MoodType = 'happy' | 'sad' | 'angry' | 'anxious' | 'lonely';

export type RecipientType = 'younger' | 'future' | 'present';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  emotion: string;
  note?: string;
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  date: string;
  recipient: RecipientType;
  mood: MoodType;
  isPrivate: boolean
}
