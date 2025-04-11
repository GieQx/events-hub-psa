
import { useParams } from "react-router-dom";
import { useEventData } from "@/hooks/useEventData";
import { getEventColor, getParticleColor } from "@/utils/eventHelpers";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventHeader } from "@/components/EventHeader";
import { EventHero } from "@/components/EventHero";
import { EventFooter } from "@/components/EventFooter";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import { BackToTopButton } from "@/components/BackToTopButton";
import { EventNotFound } from "@/components/EventNotFound";
import { EventOverviewTab } from "@/components/event-tabs/EventOverviewTab";
import { EventPressTab } from "@/components/event-tabs/EventPressTab";
import { EventGalleryTab } from "@/components/event-tabs/EventGalleryTab";
import { EventScheduleTab } from "@/components/event-tabs/EventScheduleTab";
import { EventSpeakersTab } from "@/components/event-tabs/EventSpeakersTab";

import { 
  formatAgenda, 
  formatPartners, 
  formatTopics, 
  getVenueInfo, 
  getHotelInfo, 
  getRestaurantInfo,
  getEventCalendarDetails,
  getHeroEventData
} from "@/utils/eventDataFormatters";

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
  const [activeTab, setActiveTab] = useState("overview");
  
  const { 
    event, 
    loading, 
    speakers,
    featuredSpeakers,
    agenda,
    partners,
    topics,
    resources,
    faqs,
    pressReleases,
    photos,
    eventChallenge
  } = useEventData(eventId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Loading event information...</p>
      </div>
    );
  }

  if (!event) {
    return <EventNotFound />;
  }

  // Format data for display
  const displayAgenda = formatAgenda(agenda);
  const formattedPartners = formatPartners(partners);
  const formattedTopics = formatTopics(topics);
  const venueInfo = getVenueInfo(event);
  const hotelInfo = getHotelInfo();
  const restaurantInfo = getRestaurantInfo();
  const eventCalendarDetails = getEventCalendarDetails(event);
  const heroEvent = getHeroEventData(event);

  // Get event-specific data
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

  const particleColor = getParticleColor(eventId || "");

  return (
    <div className="min-h-screen relative w-full">
      <EventHeader eventId={eventId || ""} />
      
      <EventHero 
        eventId={eventId} 
        event={heroEvent} 
      />
      
      <div className="w-full px-0 py-8">
        
          
          <TabsContent value="overview" className="pt-4 w-full">
            <EventOverviewTab 
              eventId={eventId || ""}
              event={event}
              speakers={speakers}
              featuredSpeakers={featuredSpeakers}
              rvsNewsUpdates={rvsNewsUpdates}
              displayAgenda={displayAgenda}
              formattedPartners={formattedPartners}
              formattedTopics={formattedTopics}
              venueInfo={venueInfo}
              hotelInfo={hotelInfo}
              restaurantInfo={restaurantInfo}
              faqs={[]}
              eventChallenge={eventChallenge}
              resources={resources}
              getFaqs={getFaqs}
              getHighlights={getHighlights}
              eventCalendarDetails={eventCalendarDetails}
              particleColor={particleColor}
            />
          </TabsContent>
          
          <TabsContent value="press" className="pt-4 w-full">
            <EventPressTab eventId={eventId || ""} pressReleases={pressReleases} />
          </TabsContent>
          
          <TabsContent value="gallery" className="pt-4 w-full">
            <EventGalleryTab eventId={eventId || ""} photos={photos} />
          </TabsContent>
          
          <TabsContent value="schedule" className="pt-4 w-full">
            <EventScheduleTab eventId={eventId || ""} displayAgenda={displayAgenda} />
          </TabsContent>
          
          <TabsContent value="speakers" className="pt-4 w-full">
            <EventSpeakersTab eventId={eventId || ""} speakers={speakers} />
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
