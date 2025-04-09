
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EventHeader } from "@/components/EventHeader";
import { FaqsHero } from "@/components/FaqsHero";
import { FaqsSection } from "@/components/FaqsSection";
import { EventFooter } from "@/components/EventFooter";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import cmsService from "@/services/cmsService";
import { 
  rvsChatbotOptions
} from "@/data/rvs-event-data";
import {
  rvsFaqs,
  bmsFaqs,
  smFaqs,
  csFaqs
} from "@/data/faqs-data";

const FaqsPage = () => {
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

  const getFaqs = () => {
    switch(eventId) {
      case "rvs": return rvsFaqs;
      case "bms": return bmsFaqs;
      case "sm": return smFaqs;
      case "cs": return csFaqs;
      default: return rvsFaqs;
    }
  };

  return (
    <div className="min-h-screen">
      <EventHeader eventId={eventId || ""} />
      
      <FaqsHero 
        eventId={eventId || ""}
        event={event}
      />
      
      <FaqsSection
        faqs={getFaqs()}
        eventId={eventId || ""}
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

export default FaqsPage;
