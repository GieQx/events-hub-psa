
import { CMSFAQ } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";

// Initialize with data from the src/data folder
import { rvsFaqs as rvsInfoFaqs } from "@/data/rvs-event-data";

// Initialize storage with data
export const initializeFaqStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.FAQS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAQS, JSON.stringify(rvsInfoFaqs));
  }
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

export default faqService;
