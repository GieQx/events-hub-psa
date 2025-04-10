
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
import { ParticleBackground } from "@/components/ParticleBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const foundEvent = cmsService.events.get(eventId || "");
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

  const speakers = cmsService.speakers.getByEvent(eventId || "");
  const featuredSpeakers = speakers.filter(speaker => speaker.featured);
  const agenda = cmsService.agenda.getByEvent(eventId || "");
  const partners = cmsService.partners.getByEvent(eventId || "");
  const topics = cmsService.topics.getByEvent(eventId || "");
  const resources = cmsService.resources.getByEvent(eventId || "");
  const faqs = cmsService.faqs.getByEvent(eventId || "");
  const pressReleases = cmsService.pressReleases.getByEvent(eventId || "");
  const photos = cmsService.resources.getByEvent(eventId || "").filter(
    resource => resource.type === 'image'
  );
  
  let eventChallenge;
  try {
    const challenges = cmsService.challenges.getActive(eventId || "");
    eventChallenge = challenges.length > 0 ? challenges[0] : null;
  } catch (error) {
    console.log("Challenge service not initialized yet");
    eventChallenge = null;
  }

  // Format agenda data
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

  // Format partners data
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

  // Venue information
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

  // Format topics data
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
    eventStartDate: event.eventStartDate || "",
    eventEndDate: event.eventEndDate || ""
  };

  const eventBgColor = getEventColor(eventId || "");
  const particleColor = getParticleColor(eventId || "");

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10">
        <ParticleBackground 
          color={particleColor} 
          particleCount={100}
          interactive={true}
          className="opacity-30" 
        />
      </div>
      
      <EventHeader eventId={eventId || ""} />
      
      <EventHero 
        eventId={eventId} 
        event={heroEvent} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="press">Press Releases</TabsTrigger>
            <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
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
          </TabsContent>
          
          <TabsContent value="press" className="pt-4">
            <PressReleasesPage eventId={eventId || ""} pressReleases={pressReleases} />
          </TabsContent>
          
          <TabsContent value="gallery" className="pt-4">
            <PhotoGallery eventId={eventId || ""} photos={photos} />
          </TabsContent>
          
          <TabsContent value="schedule" className="pt-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Event Schedule</h2>
              <AgendaSection days={displayAgenda} eventId={eventId || ""} />
            </div>
          </TabsContent>
          
          <TabsContent value="speakers" className="pt-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Event Speakers</h2>
              <SpeakersSection speakers={speakers} eventId={eventId || ""} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <EventFooter event={event} eventId={eventId || ""} />
      
      <ChatbotDialog eventName={event?.title || ""} options={rvsChatbotOptions} eventId={eventId} />
      
      <BackToTopButton eventId={eventId} />
    </div>
  );
};

export default EventPage;

