
import eventService, { initializeEventStorage } from "./cms/eventService";
import speakerService, { initializeSpeakerStorage } from "./cms/speakerService";
import agendaService, { initializeAgendaStorage } from "./cms/agendaService";
import topicService, { initializeTopicStorage } from "./cms/topicService";
import partnerService, { initializePartnerStorage } from "./cms/partnerService";
import faqService, { initializeFaqStorage } from "./cms/faqService";
import resourceService, { initializeResourceStorage } from "./cms/resourceService";

// Initialize all storage
const initializeStorage = () => {
  initializeEventStorage();
  initializeSpeakerStorage();
  initializeAgendaStorage();
  initializeTopicStorage();
  initializePartnerStorage();
  initializeFaqStorage();
  initializeResourceStorage();
};

// Initialize on import
initializeStorage();

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
