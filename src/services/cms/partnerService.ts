
import { CMSPartner } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";

// Initialize with data from the src/data folder
import { rvsPartners } from "@/data/rvs-event-data";

// Initialize storage with data
export const initializePartnerStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.PARTNERS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PARTNERS, JSON.stringify(rvsPartners));
  }
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

export default partnerService;
