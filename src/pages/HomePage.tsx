
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackToTopButton } from "@/components/BackToTopButton";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ContactUsSection } from "@/components/ContactUsSection";
import { MapPin } from "lucide-react";
import cmsService from "@/services/cmsService";
import { seedDatabaseIfEmpty } from "@/utils/seedData";
import { FeaturedEventsSection } from "@/components/home/FeaturedEventsSection";
import { EventStatsSection } from "@/components/home/EventStatsSection";
import { ValuePropositionSection } from "@/components/home/ValuePropositionSection";
import { UpcomingEventsTimeline } from "@/components/home/UpcomingEventsTimeline";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

const HomePage = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedDatabaseIfEmpty();
    
    try {
      const content = cmsService.homeContent.get();
      setHomeContent(content);
      
      const publishedEvents = cmsService.events.getPublished();
      setEvents(publishedEvents);
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setLoading(false);
  }, []);

  const featuredEvents = homeContent?.featuredEvents && events.length > 0
    ? events.filter(event => homeContent.featuredEvents.includes(event.id))
    : events.slice(0, 3);

  const today = new Date();
  const upcomingEvents = events.filter(event => {
    if (!event || !event.eventStartDate) return false;
    const eventDate = new Date(event.eventStartDate);
    return eventDate >= today;
  });

  upcomingEvents.sort((a, b) => {
    if (!a.eventStartDate || !b.eventStartDate) return 0;
    const dateA = new Date(a.eventStartDate);
    const dateB = new Date(b.eventStartDate);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="flex min-h-screen flex-col relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <ParticleBackground 
          color="#3b82f6" 
          particleCount={100}
          className="opacity-30" 
        />
      </div>
      
      <main className="flex-1 relative z-10">
        <HeroSection 
          title={homeContent?.heroTitle || "Welcome to the Convention Hub"}
          description={homeContent?.heroSubtitle || "Discover and connect with professional communities through our world-class conventions and events."}
          buttonText="Explore Events"
          buttonLink="/events"
          backgroundStyle={homeContent?.heroBackgroundStyle || "bg-gradient-to-r from-blue-500 to-purple-600"}
        />

        <FeaturedEventsSection featuredEvents={featuredEvents} />

        <EventStatsSection />
        
        <ValuePropositionSection />
        
        <UpcomingEventsTimeline 
          upcomingEvents={upcomingEvents} 
          upcomingEventsTitle={homeContent?.upcomingEventsTitle}
          upcomingEventsSubtitle={homeContent?.upcomingEventsSubtitle}
        />
        
        {homeContent?.testimonials && homeContent.testimonials.length > 0 && (
          <TestimonialsSection testimonials={homeContent.testimonials} />
        )}

        <ContactUsSection />

        <CallToActionSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
