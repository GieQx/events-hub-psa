
import { sanitizeInput, generateId } from "@/services/cmsUtils";

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  EVENTS: 'cms_events',
  SPEAKERS: 'cms_speakers',
  AGENDA: 'cms_agenda',
  TOPICS: 'cms_topics',
  PARTNERS: 'cms_partners',
  FAQS: 'cms_faqs',
  RESOURCES: 'cms_resources',
};

// Enhanced CRUD functions with security
export const getAll = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error retrieving data from ${key}:`, error);
    return [];
  }
};

export const getById = <T extends { id: string }>(key: string, id: string): T | null => {
  if (!id) return null;
  
  try {
    const items = getAll<T>(key);
    return items.find(item => item.id === id) || null;
  } catch (error) {
    console.error(`Error retrieving item ${id} from ${key}:`, error);
    return null;
  }
};

export const getByEventId = <T extends { eventId: string }>(key: string, eventId: string): T[] => {
  if (!eventId) return [];
  
  try {
    const items = getAll<T>(key);
    return items.filter(item => item.eventId === eventId);
  } catch (error) {
    console.error(`Error retrieving items for event ${eventId} from ${key}:`, error);
    return [];
  }
};

export const create = <T extends { id?: string }>(key: string, item: T): T => {
  try {
    const items = getAll<T>(key);
    
    // Generate an ID if not provided
    const newItem = {
      ...item,
      id: item.id || generateId(),
    };
    
    // Sanitize text inputs
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

export const update = <T extends { id: string }>(key: string, id: string, updatedItem: T): T | null => {
  if (!id) return null;
  
  try {
    const items = getAll<T>(key);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    // Sanitize text inputs
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

export const remove = <T extends { id: string }>(key: string, id: string): boolean => {
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
