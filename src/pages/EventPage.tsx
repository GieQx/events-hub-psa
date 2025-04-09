
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import cmsService from "@/services/cmsService";
import { EventHeader } from "@/components/EventHeader";
import { EventHero } from "@/components/EventHero";
import { EventMainContent } from "@/components/EventMainContent";
import { EventFooter } from "@/components/EventFooter";
import { getEventColor, getParticleColor } from "@/utils/eventHelpers";
import { SpeakersSection } from "@/components/SpeakersSection";

import { 
  rvsNewsUpdates, 
  rvsAgenda, 
  rvsPartners, 
  rvsTopics,
  rvsVenueInfo,
  rvsHotels,
  rvsRestaurants,
  rvsFaqs as rvsInfoFaqs,
  rvsChallenge,
  rvsResources,
  rvsChatbotOptions
} from "@/data/rvs-event-data";

import {
  rvsFaqs,
  bmsFaqs,
  smFaqs,
  csFaqs
} from "@/data/faqs-data";

import {
  rvsHighlights,
  bmsHighlights,
  smHighlights,
  csHighlights
} from "@/data/about-data";

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = cmsService.events.getById(eventId || "");

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Event Not Found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Events Hub</Button>
        </Link>
      </div>
    );
  }

  const speakers = cmsService.speakers.getByEventId(eventId || "");

  const getFaqs = () => {
    switch(eventId) {
      case "rvs": return rvsFaqs;
      case "bms": return bmsFaqs;
      case "sm": return smFaqs;
      case "cs": return csFaqs;
      default: return rvsFaqs;
    }
  };

  const getHighlights = () => {
    switch(eventId) {
      case "rvs": return rvsHighlights;
      case "bms": return bmsHighlights;
      case "sm": return smHighlights;
      case "cs": return csHighlights;
      default: return rvsHighlights;
    }
  };

  const eventCalendarDetails = {
    title: event?.title || "",
    description: event?.description || "",
    location: event?.location || "",
    startDate: event?.eventStartDate || "",
    endDate: event?.eventEndDate || "",
  };

  return (
    <div className="min-h-screen">
      <EventHeader eventId={eventId || ""} />
      
      <EventHero 
        eventId={eventId} 
        event={event} 
      />
      
      <EventMainContent 
        eventId={eventId || ""}
        event={event}
        speakers={speakers}
        rvsNewsUpdates={rvsNewsUpdates}
        rvsAgenda={rvsAgenda}
        rvsPartners={rvsPartners}
        rvsTopics={rvsTopics}
        rvsVenueInfo={rvsVenueInfo}
        rvsHotels={rvsHotels}
        rvsRestaurants={rvsRestaurants}
        rvsInfoFaqs={rvsInfoFaqs}
        rvsChallenge={rvsChallenge}
        rvsResources={rvsResources}
        getFaqs={getFaqs}
        getHighlights={getHighlights}
        getEventColor={() => getEventColor(eventId || "")}
        getParticleColor={() => getParticleColor(eventId || "")}
        eventCalendarDetails={eventCalendarDetails}
      />

      <EventFooter event={event} eventId={eventId || ""} />

      <ChatbotDialog eventName={event?.title || ""} options={rvsChatbotOptions} eventId={eventId} />
      
      <BackToTopButton eventId={eventId} />

      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Speakers</h2>
        <SpeakersSection 
          speakers={speakers.filter(speaker => speaker.featured)}
          eventId={eventId}
          className="mb-8"
        />
      </div>
    </div>
  );
};

export default EventPage;
