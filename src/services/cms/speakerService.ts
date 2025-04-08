
import { CMSSpeaker } from "@/types/cms";
import { LOCAL_STORAGE_KEYS, getAll, getById, getByEventId, create, update, remove } from "./cmsBase";
import { isValidUrl } from "@/services/cmsUtils";

// Initialize with data from the src/data folder
import { rvsSpeakers, bmsSpeakers, smSpeakers, csSpeakers } from "@/data/speakers-data";

// Initialize storage with data
export const initializeSpeakerStorage = () => {
  // Combine all speakers into one array
  const allSpeakers = [...rvsSpeakers, ...bmsSpeakers, ...smSpeakers, ...csSpeakers].map(speaker => ({
    ...speaker,
    photoUrl: speaker.photoUrl, // Just use photoUrl directly
    eventId: speaker.id.split('-')[0], // Extract event ID from speaker ID
    socialLinks: {
      twitter: speaker.social?.twitter,
      linkedin: speaker.social?.linkedin,
      website: null
    }
  }));
  
  if (!localStorage.getItem(LOCAL_STORAGE_KEYS.SPEAKERS)) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SPEAKERS, JSON.stringify(allSpeakers));
  }
};

// Speaker-specific functions
export const speakerService = {
  getAll: () => getAll<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS),
  getById: (id: string) => getById<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getByEventId: (eventId: string) => {
    const speakers = getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId);
    return speakers.map(speaker => ({
      ...speaker,
      social: {
        twitter: speaker.socialLinks?.twitter,
        linkedin: speaker.socialLinks?.linkedin
      }
    }));
  },
  create: (speaker: CMSSpeaker) => {
    // Validate required fields
    if (!speaker.name || !speaker.role || !speaker.company) {
      throw new Error("Speaker requires name, role, and company");
    }
    
    // Validate image URL if provided
    if (speaker.photoUrl && !isValidUrl(speaker.photoUrl)) {
      throw new Error("Invalid image URL format");
    }
    
    return create<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, speaker);
  },
  update: (id: string, speaker: CMSSpeaker) => update<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id, speaker),
  delete: (id: string) => remove<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, id),
  getFeatured: (eventId: string) => {
    const speakers = getByEventId<CMSSpeaker>(LOCAL_STORAGE_KEYS.SPEAKERS, eventId).filter(speaker => speaker.featured);
    return speakers.map(speaker => ({
      ...speaker,
      social: {
        twitter: speaker.socialLinks?.twitter,
        linkedin: speaker.socialLinks?.linkedin
      }
    }));
  },
};

export default speakerService;
