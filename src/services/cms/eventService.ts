
import { CMSEvent } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, create, update, remove } from "./cmsBase";
import { isValidDate } from "@/services/cmsUtils";

// Initialize with data from the src/data folder
import { events } from "@/data/events";

// Initialize storage with data
export const initializeEventStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }
};

// Event-specific functions with validation
export const eventService = {
  getAll: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS),
  getById: (id: string) => getById<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  create: (event: CMSEvent) => {
    // Validate required fields
    if (!event.title || !event.description) {
      throw new Error("Event requires title and description");
    }
    
    // Validate dates
    if (!isValidDate(event.eventStartDate) || !isValidDate(event.eventEndDate)) {
      throw new Error("Event requires valid start and end dates");
    }
    
    return create<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, event);
  },
  update: (id: string, event: CMSEvent) => update<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id, event),
  delete: (id: string) => remove<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS, id),
  getPublished: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS).filter(event => event.published),
  getFeatured: () => getAll<CMSEvent>(LOCAL_STORAGE_KEYS.EVENTS).filter(event => event.featured && event.published),
};

export default eventService;
