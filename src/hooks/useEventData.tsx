
import { useState, useEffect } from "react";
import cmsService from "@/services/cmsService";

export function useEventData(eventId: string | undefined) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    speakers: any[];
    featuredSpeakers: any[];
    agenda: any[];
    partners: any[];
    topics: any[];
    resources: any[];
    faqs: any[];
    pressReleases: any[];
    photos: any[];
    eventChallenge: any;
  }>({
    speakers: [],
    featuredSpeakers: [],
    agenda: [],
    partners: [],
    topics: [],
    resources: [],
    faqs: [],
    pressReleases: [],
    photos: [],
    eventChallenge: null,
  });

  useEffect(() => {
    if (!eventId) return;

    const foundEvent = cmsService.events.get(eventId);
    setEvent(foundEvent);

    if (foundEvent) {
      const speakers = cmsService.speakers.getByEvent(eventId);
      const featuredSpeakers = speakers.filter(speaker => speaker.featured);
      const agenda = cmsService.agenda.getByEvent(eventId);
      const partners = cmsService.partners.getByEvent(eventId);
      const topics = cmsService.topics.getByEvent(eventId);
      const resources = cmsService.resources.getByEvent(eventId);
      const faqs = cmsService.faqs.getByEvent(eventId);
      const pressReleases = cmsService.pressReleases.getByEvent(eventId);
      const photos = cmsService.resources.getByEvent(eventId).filter(
        resource => resource.type === 'image'
      );
      
      let eventChallenge = null;
      try {
        const challenges = cmsService.challenges.getActive(eventId);
        eventChallenge = challenges.length > 0 ? challenges[0] : null;
      } catch (error) {
        console.log("Challenge service not initialized yet");
      }

      setData({
        speakers,
        featuredSpeakers,
        agenda,
        partners,
        topics,
        resources,
        faqs,
        pressReleases,
        photos,
        eventChallenge,
      });
    }

    setLoading(false);
  }, [eventId]);

  return { event, loading, ...data };
}
