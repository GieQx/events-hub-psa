
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { NetworkBackground } from "@/components/NetworkBackground";
import { CMSEvent } from "@/types/cms";

interface EventHeroProps {
  eventId?: string;
  event: CMSEvent;
}

export function EventHero({ eventId = "rvs", event }: EventHeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get the logo based on the event ID
  const getEventLogo = () => {
    switch(eventId) {
      case "rvs": return "/logos/rvs-logo.svg";
      case "bms": return "/logos/bms-logo.svg";
      case "sm": return "/logos/sm-logo.svg";
      case "cs": return "/logos/cs-logo.svg";
      default: return "/logos/rvs-logo.svg";
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full bg-gray-900 text-white">
      <NetworkBackground className="absolute inset-0 z-0" />
      <div 
        className={`
          absolute left-0 right-0 top-0 z-10
          pt-16 transition-all duration-500
          ${isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"}
        `}
      >
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src={getEventLogo()} 
              alt={`${event.title} Logo`} 
              className="h-24 md:h-32"
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold md:text-5xl">{event.title}</h1>
          <p className="mb-6 text-xl">{event.date} • {event.location}</p>
          <p className="mx-auto mb-8 max-w-3xl text-lg">{event.longDescription}</p>
          
          <div className="mb-10">
            <CountdownTimer 
              targetDate={event.eventStartDate} 
              eventId={eventId}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button className={`bg-${eventId}-primary hover:bg-${eventId}-primary/90`} size="lg">
              Register Now
            </Button>
            {event.videoUrl && (
              <Button variant="outline" size="lg">
                Watch Trailer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
