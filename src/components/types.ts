
// Define shared types for consistent use across components

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  photoUrl: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Event {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
  location?: string;
  type?: 'keynote' | 'workshop' | 'panel' | 'break' | 'talk' | 'networking' | 'other';
}

export interface Day {
  date: string;
  title: string;
  events: Event[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'sponsor' | 'partner' | 'organizer';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  presenter: string;
  capacity: number;
  enrolled: number;
  type: 'plenary' | 'breakout' | 'workshop' | 'poster';
  time: string;
  location: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'brochure' | 'schedule' | 'paper' | 'presentation';
  fileSize: string;
  downloadUrl: string;
}

export interface Faq {
  question: string;
  answer: string;
}
