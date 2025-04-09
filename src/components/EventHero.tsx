
import { CountdownTimer } from "@/components/CountdownTimer";
import { RegistrationButton } from "@/components/RegistrationButton";
import { GoogleCalendarButton } from "@/components/GoogleCalendarButton";
import { ScrollSection } from "@/components/ScrollSection";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getEventColor } from "@/utils/eventHelpers";

interface EventHeroProps {
  eventId?: string;
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    longDescription: string;
    videoUrl: string;
    eventStartDate: string;
    eventEndDate: string;
  };
}

export function EventHero({ eventId = "", event }: EventHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById("bgVideo") as HTMLVideoElement;
    if (videoElement) {
      videoElement.onloadeddata = () => {
        setVideoLoaded(true);
      };
    }
  }, []);

  const eventCalendarDetails = {
    title: event?.title || "",
    description: event?.longDescription || "",
    location: event?.location || "",
    startDate: event?.eventStartDate || "",
    endDate: event?.eventEndDate || "",
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 z-0 bg-gray-900">
        <video
          id="bgVideo"
          autoPlay
          muted
          loop
          playsInline
          className={`h-full w-full object-cover opacity-40 transition-opacity duration-1000 ${videoLoaded ? 'opacity-40' : 'opacity-0'}`}
        >
          <source src={event?.videoUrl} type="video/mp4" />
        </video>
        
        {/* Removed ParticleBackground as requested */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center text-white">
        <ScrollSection>
          <div className={`mb-4 inline-block rounded-full ${getEventColor(eventId)} px-4 py-1 text-sm font-medium`}>
            {event?.date} • {event?.location}
          </div>
        </ScrollSection>
        
        <ScrollSection delay={0.3}>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            {event?.title}
          </h1>
        </ScrollSection>
        
        <ScrollSection delay={0.5}>
          <p className="mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl">
            {event?.longDescription}
          </p>
        </ScrollSection>
        
        <ScrollSection delay={0.7}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <RegistrationButton eventId={eventId} />
            <GoogleCalendarButton 
              eventDetails={eventCalendarDetails} 
              eventId={eventId} 
              variant="outline"
            />
          </div>
        </ScrollSection>
        
        <ScrollSection delay={0.9}>
          <div className="w-full max-w-3xl">
            <h2 className="mb-4 text-xl font-semibold">Event Starts In</h2>
            <CountdownTimer targetDate={event?.eventStartDate} />
          </div>
        </ScrollSection>
      </div>
    </section>
  );
}
