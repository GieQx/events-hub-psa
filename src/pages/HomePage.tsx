
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToTopButton } from "@/components/BackToTopButton";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ContactUsSection } from "@/components/ContactUsSection";
import cmsService from "@/services/cmsService";
import { getEventColor } from "@/utils/eventHelpers";

const HomePage = () => {
  const [homeContent, setHomeContent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear existing data from localStorage to reset the application
    localStorage.clear();
    
    // Load the home content and events
    try {
      const content = cmsService.homeContent.get();
      setHomeContent(content);
      
      // Get all published events
      const publishedEvents = cmsService.events.getPublished();
      setEvents(publishedEvents);
    } catch (error) {
      console.error("Error loading content:", error);
    }
    setLoading(false);
  }, []);

  // Filter featured events if we have homeContent
  const featuredEvents = homeContent?.featuredEvents && events.length > 0
    ? events.filter(event => homeContent.featuredEvents.includes(event.id))
    : [];

  // Filter upcoming events (those with a future start date)
  const today = new Date();
  const upcomingEvents = events.filter(event => {
    if (!event || !event.eventStartDate) return false;
    const eventDate = new Date(event.eventStartDate);
    return eventDate >= today;
  });

  // Sort events by date
  upcomingEvents.sort((a, b) => {
    if (!a.eventStartDate || !b.eventStartDate) return 0;
    const dateA = new Date(a.eventStartDate);
    const dateB = new Date(b.eventStartDate);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection 
          title={homeContent?.heroTitle || "Welcome to the Convention Hub"}
          description={homeContent?.heroSubtitle || "Discover and connect with professional communities around the world."}
          buttonText="Explore Events"
          buttonLink="/events"
          backgroundStyle={homeContent?.heroBackgroundStyle || "bg-gradient-to-r from-blue-500 to-purple-600"}
        />

        <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-center">Featured Events</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.length > 0 ? (
              featuredEvents.map((event) => (
                <div key={event.id} className="group relative overflow-hidden rounded-lg">
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className={`h-40 ${getEventColor(event.id)}`}>
                      {event.imageUrl ? (
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ParticleBackground 
                          color="#ffffff" 
                          particleCount={30}
                          className="h-full w-full opacity-20" 
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {event.date}
                        </span>
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {event.shortName}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                      <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        {event.location}
                      </p>
                      <Link to={`/events/${event.id}`}>
                        <Button className={`w-full ${getEventColor(event.id)} hover:opacity-90 text-white`}>
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No featured events available. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mx-auto my-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-3xl font-bold text-center">
            {homeContent?.upcomingEventsTitle || "Upcoming Events"}
          </h2>
          <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
            {homeContent?.upcomingEventsSubtitle || "Mark your calendar for these exciting opportunities"}
          </p>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="flex items-center gap-4 p-6">
                    <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full ${getEventColor(event.id)}`}>
                      {event.imageUrl ? (
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {event.shortName?.charAt(0) || event.title.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {event.date} • {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="border-t px-6 py-4">
                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No upcoming events scheduled at this time. Check back soon!
            </p>
          )}
        </div>
        
        {homeContent?.testimonials && homeContent.testimonials.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-10 text-3xl font-bold text-center">What People Are Saying</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {homeContent.testimonials.map((testimonial: any) => (
                  <Card key={testimonial.id} className="relative border-none shadow-lg">
                    <div className="absolute left-6 top-6 text-5xl text-gray-200 dark:text-gray-700">"</div>
                    <CardContent className="p-8 pt-12">
                      <p className="mb-6 text-gray-600 dark:text-gray-300 relative z-10">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        <ContactUsSection />

        <div className="bg-blue-50 dark:bg-blue-950 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold">Ready to Join an Event?</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Explore our upcoming events and be part of something extraordinary. Connect with industry leaders, expand your knowledge, and grow your network.
            </p>
            <Link to="/admin">
              <Button size="lg" className="bg-rvs-primary hover:bg-rvs-primary/90">
                Manage Content
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
