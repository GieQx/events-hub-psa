
// CMS Schema Types
export interface CMSEvent {
  id: string;
  title: string;
  shortName: string;
  description: string;
  longDescription: string;
  date: string;
  eventStartDate: string;
  eventEndDate: string;
  location: string;
  color: string;
  videoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published: boolean;
}

export interface CMSSpeaker {
  id: string;
  eventId: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  imageUrl: string;
  photoUrl: string; // Added to match Speaker interface
  featured?: boolean;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  social?: { // Added to match Speaker interface
    twitter?: string;
    linkedin?: string;
  };
  presentationTitle?: string;
  presentationTime?: string;
  order?: number;
}

export interface CMSAgendaDay {
  id: string;
  eventId: string;
  date: string;
  dayNumber: number;
  sessions: CMSAgendaSession[];
}

export interface CMSAgendaSession {
  id: string;
  eventId: string;
  dayId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  speakerId?: string;
  track?: string;
  type: 'talk' | 'workshop' | 'panel' | 'break' | 'networking' | 'other';
}

export interface CMSTopic {
  id: string;
  eventId: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  order?: number;
  tags?: string[];
}

export interface CMSPartner {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  logoUrl: string;
  website?: string;
  category: 'platinum' | 'gold' | 'silver' | 'bronze' | 'media' | 'community';
  order?: number;
}

export interface CMSFAQ {
  id: string;
  eventId: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface CMSResource {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  type: 'pdf' | 'video' | 'link' | 'image' | 'other';
  url: string;
  fileSize?: string;
  thumbnailUrl?: string;
  category?: string;
  order?: number;
}
