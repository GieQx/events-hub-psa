
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
import { useEffect, useState } from "react";

import { 
  rvsNewsUpdates, 
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
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the event from CMS
    const foundEvent = cmsService.events.getById(eventId || "");
    setEvent(foundEvent);
    setLoading(false);
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Loading event information...</p>
      </div>
    );
  }

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

  // Fetch data from CMS
  const speakers = cmsService.speakers.getByEventId(eventId || "");
  const featuredSpeakers = cmsService.speakers.getFeatured(eventId || "");
  
  // Fix for agenda display issue
  const agenda = cmsService.agenda.getByEventId(eventId || "");
  console.log("Retrieved agenda for eventId:", eventId, agenda);
  
  const partners = cmsService.partners.getByEventId(eventId || "");
  const topics = cmsService.topics.getByEventId(eventId || "");
  const resources = cmsService.resources.getByEventId(eventId || "");
  const faqs = cmsService.faqs.getByEventId(eventId || "");
  
  // Get the active challenge for this event
  let eventChallenge;
  try {
    const challenges = cmsService.challenges.getActive(eventId || "");
    eventChallenge = challenges.length > 0 ? challenges[0] : null;
  } catch (error) {
    console.log("Challenge service not initialized yet");
    eventChallenge = null;
  }

  const formattedAgenda = agenda.map(day => ({
    date: day.id,
    title: `Day ${day.dayNumber} - ${new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
    events: day.sessions.map(session => ({
      time: `${session.startTime} - ${session.endTime}`,
      title: session.title,
      description: session.description || "",
      speaker: session.speakerId ? speakers.find(s => s.id === session.speakerId)?.name : undefined,
      location: session.location || "",
      type: session.type
    }))
  }));

  const displayAgenda = formattedAgenda.length > 0 ? formattedAgenda : [];

  const formattedPartners = partners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logoUrl,
    type: mapPartnerCategory(partner.category)
  }));

  function mapPartnerCategory(category: string): 'sponsor' | 'partner' | 'organizer' {
    switch(category) {
      case 'platinum':
      case 'gold':
        return 'sponsor';
      case 'silver':
      case 'bronze':
        return 'sponsor';
      case 'media':
      case 'community':
        return 'partner';
      default:
        return 'partner';
    }
  }

  const venueInfo = {
    name: event.venueName || "Convention Center",
    address: event.venueAddress || "123 Main St",
    description: event.venueDescription || "A premier convention facility with state-of-the-art amenities.",
    mapUrl: event.mapUrl || "",
  };

  const hotelInfo = [
    {
      id: "h1",
      name: "Marriott Marquis",
      distance: "0.2 miles from venue",
      priceRange: "$299-$399/night",
      website: "https://www.example.com",
    },
    {
      id: "h2",
      name: "Hilton San Francisco",
      distance: "0.3 miles from venue",
      priceRange: "$279-$379/night",
      website: "https://www.example.com",
    },
  ];

  const restaurantInfo = [
    {
      id: "r1",
      name: "Urban Bistro",
      cuisine: "American",
      distance: "0.1 miles from venue",
      priceRange: "$$",
    },
    {
      id: "r2",
      name: "Sakura Japanese Restaurant",
      cuisine: "Japanese",
      distance: "0.2 miles from venue",
      priceRange: "$$",
    },
  ];

  const formattedTopics = topics.map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    presenter: topic.description.includes(':') ? topic.description.split(':')[0] : "TBD",
    capacity: 100,
    enrolled: Math.floor(Math.random() * 100),
    type: 'workshop' as const,
    time: "June 15, 10:15 AM",
    location: topic.category || "Main Hall",
  }));

  const getFaqs = () => {
    if (faqs && faqs.length > 0) {
      return faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }));
    }

    switch(eventId) {
      case "nccrvs": return rvsFaqs;
      case "cbms": return bmsFaqs;
      case "nsm": return smFaqs;
      case "ncs": return csFaqs;
      default: return rvsFaqs;
    }
  };

  const getHighlights = () => {
    switch(eventId) {
      case "nccrvs": return rvsHighlights;
      case "cbms": return bmsHighlights;
      case "nsm": return smHighlights;
      case "ncs": return csHighlights;
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

  const heroEvent = {
    id: event.id,
    title: event.title,
    date: event.date || "",
    location: event.location || "",
    longDescription: event.longDescription || "",
    videoUrl: event.videoUrl || "",
    eventStartDate: event.eventStartDate || ""
  };

  return (
    <div className="min-h-screen">
      <EventHeader eventId={eventId || ""} />
      
      <EventHero 
        eventId={eventId} 
        event={heroEvent}
        eventCalendarDetails={eventCalendarDetails}
      />
      
      <EventMainContent 
        eventId={eventId || ""}
        event={event}
        speakers={speakers}
        featuredSpeakers={featuredSpeakers}
        rvsNewsUpdates={rvsNewsUpdates}
        rvsAgenda={displayAgenda}
        rvsPartners={formattedPartners}
        rvsTopics={formattedTopics}
        rvsVenueInfo={venueInfo}
        rvsHotels={hotelInfo}
        rvsRestaurants={restaurantInfo}
        rvsInfoFaqs={[]}
        rvsChallenge={eventChallenge}
        rvsResources={resources}
        getFaqs={getFaqs}
        getHighlights={getHighlights}
        getEventColor={() => getEventColor(eventId || "")}
        getParticleColor={() => getParticleColor(eventId || "")}
        eventCalendarDetails={eventCalendarDetails}
      />

      <EventFooter event={event} eventId={eventId || ""} />

      <ChatbotDialog eventName={event?.title || ""} options={rvsChatbotOptions} eventId={eventId} />
      
      <BackToTopButton eventId={eventId} />
    </div>
  );
}

export default EventPage;
