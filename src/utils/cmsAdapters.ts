
import { CMSAgendaDay, CMSPartner, CMSResource, CMSTopic } from "@/types/cms";
import { Day, Partner, Resource, Topic } from "@/components/types";

// Adapter to convert CMSAgendaDay[] to Day[]
export const adaptAgendaData = (cmsAgenda: CMSAgendaDay[]): Day[] => {
  return cmsAgenda.map(day => ({
    date: day.date,
    title: `Day ${day.dayNumber}`,
    events: day.sessions.map(session => ({
      time: `${session.startTime} - ${session.endTime}`,
      title: session.title,
      description: session.description || "",
      type: session.type as any, // Convert session type to expected type
      location: session.location || "Main Hall",
      speaker: session.speakerId || undefined
    }))
  }));
};

// Adapter to convert CMSPartner[] to Partner[]
export const adaptPartnerData = (cmsPartners: CMSPartner[]): Partner[] => {
  return cmsPartners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logoUrl,
    type: partner.category === 'platinum' || partner.category === 'gold' ? 'sponsor' :
          partner.category === 'media' || partner.category === 'community' ? 'partner' : 'organizer'
  }));
};

// Adapter to convert CMSTopic[] to Topic[]
export const adaptTopicData = (cmsTopics: CMSTopic[]): Topic[] => {
  return cmsTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    presenter: topic.category || "TBD", // Use category as presenter if available
    capacity: 50, // Default values since CMS model doesn't have these
    enrolled: 0,
    type: (topic.category as any) || "plenary", // Use category as type if available
    time: "TBD",
    location: "TBD"
  }));
};

// Adapter to convert CMSResource[] to Resource[]
export const adaptResourceData = (cmsResources: CMSResource[]): Resource[] => {
  return cmsResources.map(resource => ({
    id: resource.id,
    title: resource.title,
    description: resource.description || "",
    type: resource.type as any, // Convert resource type
    fileSize: resource.fileSize || "1 MB",
    downloadUrl: resource.url // Use url as downloadUrl
  }));
};
