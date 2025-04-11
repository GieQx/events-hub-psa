
import { EventMainContent } from "@/components/EventMainContent";

interface EventOverviewTabProps {
  eventId: string;
  event: any;  // Using 'any' here to accommodate the extended properties
  speakers: any[];
  featuredSpeakers: any[];
  rvsNewsUpdates: any[];
  displayAgenda: any[];
  formattedPartners: any[];
  formattedTopics: any[];
  venueInfo: any;
  hotelInfo: any[];
  restaurantInfo: any[];
  faqs: any[];
  eventChallenge: any;
  resources: any[];
  getFaqs: () => any[];
  getHighlights: () => string[];
  eventCalendarDetails: any;
  particleColor: string;
}

export function EventOverviewTab({
  eventId,
  event,
  speakers,
  featuredSpeakers,
  rvsNewsUpdates,
  displayAgenda,
  formattedPartners,
  formattedTopics,
  venueInfo,
  hotelInfo,
  restaurantInfo,
  faqs,
  eventChallenge,
  resources,
  getFaqs,
  getHighlights,
  eventCalendarDetails,
  particleColor
}: EventOverviewTabProps) {
  return (
    <EventMainContent 
      eventId={eventId}
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
      rvsInfoFaqs={faqs}
      rvsChallenge={eventChallenge}
      rvsResources={resources}
      getFaqs={getFaqs}
      getHighlights={getHighlights}
      getEventColor={() => getEventColor(eventId)}
      getParticleColor={() => particleColor}
      eventCalendarDetails={eventCalendarDetails}
    />
  );
}

// Helper function to get event color
function getEventColor(eventId: string) {
  switch(eventId) {
    case "nccrvs": return "bg-rvs-primary";
    case "cbms": return "bg-bms-primary";
    case "nsm": return "bg-sm-primary";
    case "ncs": return "bg-cs-primary";
    default: return "bg-blue-600";
  }
}
