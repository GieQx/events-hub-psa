
// Component Type Definitions

export interface Day {
  date: string;
  title: string;
  events: {
    time: string;
    title: string;
    description?: string;
    type: 'talk' | 'workshop' | 'panel' | 'break' | 'keynote' | 'networking' | 'other';
    location: string;
    speaker?: string;
  }[];
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
