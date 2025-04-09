
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
import { CMSAgendaDay, CMSPartner, CMSResource, CMSTopic } from "@/types/cms";

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
  const featuredSpeakers = cmsService.speakers.getFeatured(eventId || "");
  const agenda = cmsService.agenda.getByEventId(eventId || "");
  const partners = cmsService.partners.getByEventId(eventId || "");
  const topics = cmsService.topics.getByEventId(eventId || "");
  const resources = cmsService.resources.getByEventId(eventId || "");
  const faqs = cmsService.faqs.getByEventId(eventId || "");

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
    name: "Moscone Center",
    address: "747 Howard St, San Francisco, CA 94103",
    description: "The Moscone Center is San Francisco's premier convention and exhibition complex. Located in the heart of the city, this world-class facility offers state-of-the-art amenities and is within walking distance of hotels, shopping, dining, and cultural attractions.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1597406921474!2d-122.40277032357242!3d37.78393571231892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e97646f7%3A0x72c5cb98814ace6!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1712524217753!5m2!1sen!2sus",
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

  const heroEvent = {
    id: event.id,
    title: event.title,
    date: event.date || "",
    location: event.location || "",
    longDescription: event.longDescription || "",
    videoUrl: event.videoUrl || "",
    eventStartDate: event.eventStartDate || ""
  };

  // Properly structure the challenge object with required fields
  const eventChallenge = {
    id: "challenge-1",
    title: "Convention Challenge",
    description: "Participate in our hackathon",
    steps: [
      {
        id: "step-1",
        description: "Register for the hackathon",
        points: 10
      },
      {
        id: "step-2",
        description: "Form a team or join one",
        points: 20
      },
      {
        id: "step-3",
        description: "Submit your project idea",
        points: 30
      },
      {
        id: "step-4",
        description: "Complete your project",
        points: 40
      }
    ],
    reward: "First Prize: $5,000"
  };

  return (
    <div className="min-h-screen">
      <EventHeader eventId={eventId || ""} />
      
      <EventHero 
        eventId={eventId} 
        event={heroEvent} 
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
};

export default EventPage;
