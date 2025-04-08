
import { CMSResource } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";

// Initialize with data from the src/data folder
import { rvsResources } from "@/data/rvs-event-data";

// Initialize storage with data
export const initializeResourceStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES, JSON.stringify(rvsResources));
  }
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

export default resourceService;
