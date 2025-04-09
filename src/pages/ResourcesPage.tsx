
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EventHeader } from "@/components/EventHeader";
import { ResourcesHero } from "@/components/ResourcesHero";
import { ResourcesSection } from "@/components/ResourcesSection";
import { EventFooter } from "@/components/EventFooter";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import cmsService from "@/services/cmsService";
import { rvsChatbotOptions, rvsResources } from "@/data/rvs-event-data";

const ResourcesPage = () => {
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
      
      <ResourcesHero 
        eventId={eventId || ""}
        event={event}
      />
      
      <ResourcesSection
        resources={rvsResources}
        eventId={eventId || ""}
        eventDetails={eventCalendarDetails}
        className="container mx-auto px-4 py-16"
      />
      
      <EventFooter event={event} eventId={eventId || ""} />
      
      <ChatbotDialog 
        eventName={event?.title || ""} 
        options={rvsChatbotOptions} 
        eventId={eventId} 
      />
      
      <BackToTopButton eventId={eventId} />
    </div>
  );
};

export default ResourcesPage;
