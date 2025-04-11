
import { useEffect, useState } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/homepage/HeroSection";
import { EventsSection } from "@/components/homepage/EventsSection";
import { AboutSection } from "@/components/homepage/AboutSection";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import cmsService from "@/services/cmsService";

const IndexPage = () => {
  const [validEvents, setValidEvents] = useState<any[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get CMS content (including featured events settings)
    const homeContent = cmsService.homeContent.get();
    
    // Get published events from CMS
    const publishedEvents = cmsService.events.getPublished();
    
    // Filter valid events - check for required properties
    const filteredEvents = publishedEvents.filter(event => 
      event && event.id && event.title && event.eventStartDate
    );
    
    setValidEvents(filteredEvents);
    
    // If homeContent specifies featured events, filter those
    if (homeContent?.featuredEvents && homeContent.featuredEvents.length > 0) {
      const featured = filteredEvents.filter(event => 
        homeContent.featuredEvents.includes(event.id)
      );
      setFeaturedEvents(featured);
    } else {
      // Default to showing all events as featured if none specified
      setFeaturedEvents(filteredEvents);
    }
    
    setLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
     <ParticleBackground 
        color="#3b82f6" 
        particleCount={100}
        className="absolute inset-0 -z-10 opacity-70" 
      />
      
      <Header />

      <main className="relative z-10">
        <HeroSection />
        <EventsSection events={validEvents} />
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
};

export default IndexPage;
