import { 
  CMSEvent, 
  CMSSpeaker, 
  CMSAgendaDay, 
  CMSTopic, 
  CMSPartner, 
  CMSFAQ, 
  CMSResource 
} from "@/types/cms";

import { Challenge } from "@/types/challenge";

import { 
  sanitizeInput, 
  validateInput, 
  generateId, 
  deepClone,
  encryptData,
  decryptData,
  isValidDate,
  isValidUrl
} from "@/services/cmsUtils";

// Simulating local storage for demo purposes
// In a real application, this would be replaced with API calls to a backend

const LOCAL_STORAGE_KEYS = {
  EVENTS: 'cms_events',
  SPEAKERS: 'cms_speakers',
  AGENDA: 'cms_agenda',
  TOPICS: 'cms_topics',
  PARTNERS: 'cms_partners',
  FAQS: 'cms_faqs',
  RESOURCES: 'cms_resources',
  CHALLENGES: 'cms_challenges',
  HOME_CONTENT: 'cms_home_content',
  PRESS_RELEASES: 'cms_press_releases',
};

// Initialize with data from the src/data folder
import { events } from "@/data/events";
import { 
  rvsSpeakers, bmsSpeakers, smSpeakers, csSpeakers 
} from "@/data/speakers-data";
import { 
  rvsAgenda 
} from "@/data/rvs-event-data";
import { 
  rvsTopics 
} from "@/data/rvs-event-data";
import { 
  rvsPartners 
} from "@/data/rvs-event-data";
import { 
  rvsFaqs as rvsInfoFaqs 
} from "@/data/rvs-event-data";
import { 
  rvsResources 
} from "@/data/rvs-event-data";

// Sample challenges for initialization
const sampleChallenges: Challenge[] = [
  {
    id: "challenge-1",
    eventId: "rvs",
    title: "Convention Challenge",
    description: "Participate in our hackathon",
    steps: [
      {
        id: "step-1",
        description: "Register for the hackathon",
        points: 10
      },
      {
        id: "step-2",
        description: "Form a team or join one",
        points: 20
      },
      {
        id: "step-3",
        description: "Submit your project idea",
        points: 30
      },
      {
        id: "step-4",
        description: "Complete your project",
        points: 40
      }
    ],
    reward: "First Prize: $5,000",
    active: true
  },
  {
    id: "challenge-2",
    eventId: "bms",
    title: "BMS Challenge",
    description: "Complete these tasks to earn rewards",
    steps: [
      {
        id: "step-1",
        description: "Attend 3 sessions",
        points: 15
      },
      {
        id: "step-2",
        description: "Collect 5 partner badges",
        points: 25
      },
      {
        id: "step-3",
        description: "Post on social media with #BMS2025",
        points: 20
      }
    ],
    reward: "BMS Premium Membership",
    active: true
  }
];

// Sample home content for initialization
const sampleHomeContent = {
  heroTitle: "Discover the Best Industry Events",
  heroSubtitle: "Connect with professionals, learn from experts, and grow your network",
  featuredEvents: ["rvs", "bms", "sm"],
  upcomingEventsTitle: "Upcoming Events",
  upcomingEventsSubtitle: "Mark your calendar for these exciting opportunities",
  testimonials: [
    {
      id: "t1",
      text: "The conference was incredibly valuable. I made connections that led to three new clients!",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechGrowth Inc"
    },
    {
      id: "t2",
      text: "Best industry event I've attended in years. The speakers were top-notch.",
      author: "Michael Chen",
      position: "CTO",
      company: "Innovate Systems"
    }
  ]
};

// Initialize storage with data
const initializeStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }

  // Combine all speakers into one array
  const allSpeakers = [...rvsSpeakers, ...bmsSpeakers, ...smSpeakers, ...csSpeakers].map(speaker => ({
    ...speaker,
    photoUrl: speaker.photoUrl || speaker.photoUrl, // Ensure photoUrl is available - fixed reference
    eventId: speaker.id.split('-')[0], // Extract event ID from speaker ID
    socialLinks: {
      twitter: speaker.social?.twitter,
      linkedin: speaker.social?.linkedin,
      website: null
    }
  }));
  
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.SPEAKERS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SPEAKERS, JSON.stringify(allSpeakers));
  }

  // For demo purposes, we're just using the RVS data for all events
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.AGENDA)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AGENDA, JSON.stringify(rvsAgenda));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.TOPICS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOPICS, JSON.stringify(rvsTopics));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.PARTNERS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PARTNERS, JSON.stringify(rvsPartners));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.FAQS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAQS, JSON.stringify(rvsInfoFaqs));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES, JSON.stringify(rvsResources));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.CHALLENGES)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CHALLENGES, JSON.stringify(sampleChallenges));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_CONTENT)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HOME_CONTENT, JSON.stringify(sampleHomeContent));
  }
};

// Initialize on import
initializeStorage();

// Enhanced CRUD functions with security
const getAll = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error retrieving data from ${key}:`, error);
    return [];
  }
};

const getById = <T extends { id: string }>(key: string, id: string): T | null => {
  if (!id) return null;
  
  try {
    const items = getAll<T>(key);
    return items.find(item => item.id === id) || null;
  } catch (error) {
    console.error(`Error retrieving item ${id} from ${key}:`, error);
    return null;
  }
};

const getByEventId = <T extends { eventId: string }>(key: string, eventId: string): T[] => {
  if (!eventId) return [];
  
  try {
    const items = getAll<T>(key);
    return items.filter(item => item.eventId === eventId);
  } catch (error) {
    console.error(`Error retrieving items for event ${eventId} from ${key}:`, error);
    return [];
  }
};

const create = <T extends { id?: string }>(key: string, item: T): T => {
  try {
    const items = getAll<T>(key);
    
    // Generate an ID if not provided
    const newItem = {
      ...item,
      id: item.id || generateId(),
    };
    
    // Sanitize text inputs (simplified example)
    Object.keys(newItem).forEach(prop => {
      if (typeof (newItem as any)[prop] === 'string') {
        (newItem as any)[prop] = sanitizeInput((newItem as any)[prop]);
      }
    });
    
    const newItems = [...items, newItem];
    localStorage.setItem(key, JSON.stringify(newItems));
    return newItem;
  } catch (error) {
    console.error(`Error creating item in ${key}:`, error);
    throw new Error(`Failed to create item: ${error}`);
  }
};

const update = <T extends { id: string }>(key: string, id: string, updatedItem: T): T | null => {
  if (!id) return null;
  
  try {
    const items = getAll<T>(key);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    // Sanitize text inputs (simplified example)
    const sanitizedItem = { ...updatedItem };
    Object.keys(sanitizedItem).forEach(prop => {
      if (typeof (sanitizedItem as any)[prop] === 'string') {
        (sanitizedItem as any)[prop] = sanitizeInput((sanitizedItem as any)[prop]);
      }
    });
    
    items[index] = { ...items[index], ...sanitizedItem };
    localStorage.setItem(key, JSON.stringify(items));
    return items[index];
  } catch (error) {
    console.error(`Error updating item ${id} in ${key}:`, error);
    return null;
  }
};

const remove = <T extends { id: string }>(key: string, id: string): boolean => {
  if (!id) return false;
  
  try {
    const items = getAll<T>(key);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    localStorage.setItem(key, JSON.stringify(filteredItems));
    return true;
  } catch (error) {
    console.error(`Error removing item ${id} from ${key}:`, error);
    return false;
  }
};

// Event-specific functions with validation
export const eventService = {
  getAll: () => {
    const events = getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS);
    return events || [];
  },
  getById: (id: string) => getById<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  create: (event: CMSEvent) => {
    // Validate required fields
    if (!event.title || !event.description) {
      throw new Error("Event requires title and description");
    }
    
    // Validate dates - don't require end date for backward compatibility
    if (!event.eventStartDate) {
      throw new Error("Event requires valid start date");
    }
    
    return create<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, event);
  },
  update: (id: string, event: CMSEvent) => update<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id, event),
  delete: (id: string) => remove<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  getPublished: () => {
    const events = getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS);
    return events ? events.filter(event => event && event.published) : [];
  },
  getFeatured: () => {
    const events = getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS);
    return events ? events.filter(event => event && event.featured && event.published) : [];
  },
};

// Speaker-specific functions
export const speakerService = {
  getAll: () => getAll<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS),
  getById: (id: string) => getById<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getByEventId: (eventId: string) => {
    const speakers = getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId);
    return speakers.map(speaker => ({
      ...speaker,
      photoUrl: speaker.photoUrl || speaker.photoUrl, // Fixed: Use photoUrl consistently
      social: {
        twitter: speaker.socialLinks?.twitter,
        linkedin: speaker.socialLinks?.linkedin
      }
    }));
  },
  create: (speaker: CMSSpeaker) => {
    // Validate required fields
    if (!speaker.name || !speaker.role || !speaker.company) {
      throw new Error("Speaker requires name, role, and company");
    }
    
    // Validate image URL if provided
    if (speaker.photoUrl && !isValidUrl(speaker.photoUrl)) {
      throw new Error("Invalid image URL format");
    }
    
    return create<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, {
      ...speaker,
      photoUrl: speaker.photoUrl || speaker.photoUrl, // Ensure photoUrl is set
    });
  },
  update: (id: string, speaker: CMSSpeaker) => {
    // Ensure photoUrl is set correctly
    const updatedSpeaker = {
      ...speaker,
      photoUrl: speaker.photoUrl || speaker.photoUrl, // Fixed: Use photoUrl consistently
    };
    
    return update<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id, updatedSpeaker);
  },
  delete: (id: string) => remove<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getFeatured: (eventId: string) => {
    const speakers = getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId).filter(speaker => speaker.featured);
    return speakers.map(speaker => ({
      ...speaker,
      photoUrl: speaker.photoUrl || speaker.photoUrl, // Fixed: Use photoUrl consistently
      social: {
        twitter: speaker.socialLinks?.twitter,
        linkedin: speaker.socialLinks?.linkedin
      }
    }));
  },
};

// Agenda-specific functions
export const agendaService = {
  getAll: () => getAll<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA),
  getById: (id: string) => getById<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA, id),
  getByEventId: (eventId: string) => getByEventId<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA, eventId),
  create: (day: CMSAgendaDay) => create<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA, day),
  update: (id: string, day: CMSAgendaDay) => update<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA, id, day),
  delete: (id: string) => remove<CMSAgendaDay>(LOCAL_STORAGE_KEYS.AGENDA, id),
};

// Topic-specific functions
export const topicService = {
  getAll: () => getAll<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS),
  getById: (id: string) => getById<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS, id),
  getByEventId: (eventId: string) => getByEventId<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS, eventId),
  create: (topic: CMSTopic) => create<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS, topic),
  update: (id: string, topic: CMSTopic) => update<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS, id, topic),
  delete: (id: string) => remove<CMSTopic>(LOCAL_STORAGE_KEYS.TOPICS, id),
};

// Partner-specific functions
export const partnerService = {
  getAll: () => getAll<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS),
  getById: (id: string) => getById<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, id),
  getByEventId: (eventId: string) => getByEventId<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, eventId),
  create: (partner: CMSPartner) => create<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, partner),
  update: (id: string, partner: CMSPartner) => update<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, id, partner),
  delete: (id: string) => remove<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, id),
  getByCategory: (eventId: string, category: string) => {
    return getByEventId<CMSPartner>(LOCAL_STORAGE_KEYS.PARTNERS, eventId)
      .filter(partner => partner.category === category);
  },
};

// FAQ-specific functions
export const faqService = {
  getAll: () => getAll<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS),
  getById: (id: string) => getById<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, id),
  getByEventId: (eventId: string) => getByEventId<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, eventId),
  create: (faq: CMSFAQ) => create<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, faq),
  update: (id: string, faq: CMSFAQ) => update<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, id, faq),
  delete: (id: string) => remove<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, id),
  getByCategory: (eventId: string, category: string) => {
    return getByEventId<CMSFAQ>(LOCAL_STORAGE_KEYS.FAQS, eventId)
      .filter(faq => faq.category === category);
  },
};

// Resource-specific functions
export const resourceService = {
  getAll: () => getAll<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES),
  getById: (id: string) => getById<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, id),
  getByEventId: (eventId: string) => getByEventId<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, eventId),
  create: (resource: CMSResource) => create<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, resource),
  update: (id: string, resource: CMSResource) => update<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, id, resource),
  delete: (id: string) => remove<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, id),
  getByCategory: (eventId: string, category: string) => {
    return getByEventId<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, eventId)
      .filter(resource => resource.category === category);
  },
  getByType: (eventId: string, type: string) => {
    return getByEventId<CMSResource>(LOCAL_STORAGE_KEYS.RESOURCES, eventId)
      .filter(resource => resource.type === type);
  },
};

// Challenge-specific functions
export const challengeService = {
  getAll: () => getAll<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES),
  getById: (id: string) => getById<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, id),
  getByEventId: (eventId: string) => getByEventId<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, eventId),
  getActive: (eventId: string) => getByEventId<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, eventId).filter(c => c.active),
  create: (challenge: Challenge) => create<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, challenge),
  update: (id: string, challenge: Challenge) => update<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, id, challenge),
  delete: (id: string) => remove<Challenge>(LOCAL_STORAGE_KEYS.CHALLENGES, id),
};

// Home content management functions
export const homeContentService = {
  get: () => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_CONTENT);
      return data ? JSON.parse(data) : sampleHomeContent;
    } catch (error) {
      console.error('Error retrieving home content:', error);
      return sampleHomeContent;
    }
  },
  update: (content: any) => {
    try {
      // Sanitize text inputs
      const sanitizedContent = { ...content };
      Object.keys(sanitizedContent).forEach(prop => {
        if (typeof sanitizedContent[prop] === 'string') {
          sanitizedContent[prop] = sanitizeInput(sanitizedContent[prop]);
        }
      });
      
      localStorage.setItem(LOCAL_STORAGE_KEYS.HOME_CONTENT, JSON.stringify(sanitizedContent));
      return sanitizedContent;
    } catch (error) {
      console.error('Error updating home content:', error);
      return null;
    }
  },
};

// Press releases service
const pressReleasesService = (() => {
  const storageKey = "cms_press_releases";

  const getAll = () => {
    const releases = localStorage.getItem(storageKey);
    return releases ? JSON.parse(releases) : [];
  };

  const getByEventId = (eventId: string) => {
    const releases = getAll();
    return releases.filter((release: any) => release.eventId === eventId);
  };
  
  const getFeatured = (eventId: string) => {
    const releases = getByEventId(eventId);
    return releases.filter((release: any) => release.featured);
  };

  const add = (release: any) => {
    const releases = getAll();
    releases.push(release);
    localStorage.setItem(storageKey, JSON.stringify(releases));
    return release;
  };

  const update = (release: any) => {
    const releases = getAll();
    const index = releases.findIndex((r: any) => r.id === release.id);
    if (index !== -1) {
      releases[index] = release;
      localStorage.setItem(storageKey, JSON.stringify(releases));
    }
    return release;
  };

  const remove = (id: string) => {
    const releases = getAll();
    const filteredReleases = releases.filter((r: any) => r.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(filteredReleases));
  };

  return {
    getAll,
    getByEventId,
    getFeatured,
    add,
    update,
    remove,
  };
})();

// Export a combined object for easier imports
const cmsService = {
  events: eventService,
  speakers: speakerService,
  agenda: agendaService,
  topics: topicService,
  partners: partnerService,
  faqs: faqService,
  resources: resourceService,
  challenges: challengeService,
  homeContent: homeContentService,
  pressReleases: pressReleasesService,
};

export default cmsService;
