
import { CMSAgendaDay } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";

// Initialize with data from the src/data folder
import { rvsAgenda } from "@/data/rvs-event-data";

// Initialize storage with data
export const initializeAgendaStorage = () => {
  // For demo purposes, we're just using the RVS data for all events
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.AGENDA)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AGENDA, JSON.stringify(rvsAgenda));
  }
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

export default agendaService;
