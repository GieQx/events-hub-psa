
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { ScrollSection } from "@/components/ScrollSection";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { shouldDisableEvent } from "@/utils/eventHelpers";
import cmsService from "@/services/cmsService";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <header className="container mx-auto flex items-center justify-between p-6 relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Convention Events
        </h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 pb-20 pt-6 relative">
        <section className="mb-20 text-center relative">
          <div className="absolute inset-0 -z-10">
            <ParticleBackground 
              color="#9b87f5"
              particleCount={150}
              interactive={true}
            />
          </div>
          
          <ScrollSection>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Discover Major Conventions
            </h2>
          </ScrollSection>
          
          <ScrollSection delay={0.4}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Join us at these premier events featuring industry leaders, cutting-edge insights, and networking opportunities.
            </p>
          </ScrollSection>
          
          <ScrollSection delay={0.6}>
            <div className="mb-8 flex justify-center">
              <Link to="#events">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Explore Events
                  </Button>
                </motion.div>
              </Link>
            </div>
          </ScrollSection>
          
          <ScrollSection delay={0.8}>
            <motion.div 
              className="relative mx-auto mb-16 max-w-5xl overflow-hidden rounded-xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                alt="Convention hall" 
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ height: "350px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-left text-white">
                <h3 className="text-2xl font-bold">Major Conventions for 2025</h3>
                <p className="max-w-lg">From cutting-edge technology to community engagement, our conventions bring together the best minds and innovators.</p>
              </div>
            </motion.div>
          </ScrollSection>
        </section>

        <section id="events" className="scroll-mt-16">
          <ScrollSection>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Upcoming Conventions
            </h2>
          </ScrollSection>
          
          {validEvents.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {validEvents.map((event, index) => {
                // Check if event should be disabled based on countdown
                const isDisabled = shouldDisableEvent(event.eventStartDate, 600);
                
                return (
                  <ScrollSection key={event.id} delay={0.2 + index * 0.1}>
                    <div className={`${isDisabled ? 'opacity-60' : ''} transition-opacity duration-300`}>
                      <EventCard 
                        id={event.id}
                        title={event.title}
                        shortName={event.shortName}
                        description={event.description}
                        date={event.date}
                        location={event.location}
                        imageUrl={event.imageUrl !== "/placeholder.svg" ? event.imageUrl : 
                                  event.id === "nccrvs" ? "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&auto=format&fit=crop&q=80" :
                                  event.id === "cbms" ? "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&auto=format&fit=crop&q=80" :
                                  event.id === "nsm" ? "https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&h=400&auto=format&fit=crop&q=80" :
                                  "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&auto=format&fit=crop&q=80"}
                        color={event.color}
                        disabled={isDisabled}
                      />
                      {isDisabled && (
                        <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                          Coming in {Math.ceil((new Date(event.eventStartDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      )}
                    </div>
                  </ScrollSection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming events found</p>
              <p className="text-gray-600 dark:text-gray-300">Check back later for new events or visit the admin page to add events.</p>
              <div className="mt-6">
                <Link to="/admin">
                  <Button variant="outline">Go to Admin</Button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-white relative">
        <ParticleBackground 
          color="#ffffff" 
          particleCount={30}
          className="opacity-20" 
        />
        <div className="container mx-auto px-4 relative z-10">
          <p className="mb-2">© 2025 Convention Events. All rights reserved.</p>
          <p className="text-sm text-gray-400">Connecting professionals through premier industry conventions</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
