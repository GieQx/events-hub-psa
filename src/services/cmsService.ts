
import { 
  CMSEvent, 
  CMSSpeaker, 
  CMSAgendaDay, 
  CMSTopic, 
  CMSPartner, 
  CMSFAQ, 
  CMSResource 
} from "@/types/cms";

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

// Initialize storage with data
const initializeStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }

  // Combine all speakers into one array
  const allSpeakers = [...rvsSpeakers, ...bmsSpeakers, ...smSpeakers, ...csSpeakers];
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
};

// Initialize on import
initializeStorage();

// Generic CRUD functions
const getAll = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const getById = <T extends { id: string }>(key: string, id: string): T | null => {
  const items = getAll<T>(key);
  return items.find(item => item.id === id) || null;
};

const getByEventId = <T extends { eventId: string }>(key: string, eventId: string): T[] => {
  const items = getAll<T>(key);
  return items.filter(item => item.eventId === eventId);
};

const create = <T>(key: string, item: T): T => {
  const items = getAll<T>(key);
  const newItems = [...items, item];
  localStorage.setItem(key, JSON.stringify(newItems));
  return item;
};

const update = <T extends { id: string }>(key: string, id: string, updatedItem: T): T | null => {
  const items = getAll<T>(key);
  const index = items.findIndex(item => (item as any).id === id);
  
  if (index === -1) return null;
  
  items[index] = { ...items[index], ...updatedItem };
  localStorage.setItem(key, JSON.stringify(items));
  return items[index];
};

const remove = <T extends { id: string }>(key: string, id: string): boolean => {
  const items = getAll<T>(key);
  const filteredItems = items.filter(item => (item as any).id !== id);
  
  if (filteredItems.length === items.length) return false;
  
  localStorage.setItem(key, JSON.stringify(filteredItems));
  return true;
};

// Event-specific functions
export const eventService = {
  getAll: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS),
  getById: (id: string) => getById<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  create: (event: CMSEvent) => create<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, event),
  update: (id: string, event: CMSEvent) => update<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id, event),
  delete: (id: string) => remove<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  getPublished: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS).filter(event => event.published),
  getFeatured: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS).filter(event => event.featured && event.published),
};

// Speaker-specific functions
export const speakerService = {
  getAll: () => getAll<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS),
  getById: (id: string) => getById<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getByEventId: (eventId: string) => getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId),
  create: (speaker: CMSSpeaker) => create<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, speaker),
  update: (id: string, speaker: CMSSpeaker) => update<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id, speaker),
  delete: (id: string) => remove<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getFeatured: (eventId: string) => getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId).filter(speaker => speaker.featured),
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

// Export a combined object for easier imports
const cmsService = {
  events: eventService,
  speakers: speakerService,
  agenda: agendaService,
  topics: topicService,
  partners: partnerService,
  faqs: faqService,
  resources: resourceService,
};

export default cmsService;
