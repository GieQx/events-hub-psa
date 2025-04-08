
import { CMSTopic } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";

// Initialize with data from the src/data folder
import { rvsTopics } from "@/data/rvs-event-data";

// Initialize storage with data
export const initializeTopicStorage = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.TOPICS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOPICS, JSON.stringify(rvsTopics));
  }
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

export default topicService;
