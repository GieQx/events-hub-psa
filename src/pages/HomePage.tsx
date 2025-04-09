
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
import { ChevronRight, Calendar, MapPin, Users } from "lucide-react";

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
          title={homeContent?.heroTitle || "Statistical Education Events"}
          description={homeContent?.heroSubtitle || "Join our engaging statistical events designed to enhance stakeholder knowledge and improve accessibility of statistical information."}
          buttonText="Explore Events"
          buttonLink="/events"
          backgroundStyle="bg-gradient-to-r from-blue-600 to-purple-600"
          darkOverlay={true}
        />

        {/* Featured Events Section with enhanced styling */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover our flagship statistical education events designed for stakeholder engagement
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.length > 0 ? (
                featuredEvents.map((event) => (
                  <div key={event.id} className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl">
                    <Card className="h-full overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
                      <div className={`h-48 ${getEventColor(event.id)} relative overflow-hidden`}>
                        {event.imageUrl ? (
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <ParticleBackground 
                            color="#ffffff" 
                            particleCount={30}
                            className="h-full w-full opacity-20" 
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${getEventColor(event.id)}`}>
                            {event.shortName}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="mb-2 text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {event.title}
                        </h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{event.date || "Upcoming"}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{event.location || "To be announced"}</span>
                          </div>
                        </div>
                        <Link to={`/events/${event.id}`}>
                          <Button className={`w-full ${getEventColor(event.id)} hover:opacity-90 text-white group-hover:gap-3 transition-all`}>
                            <span>View Details</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        </section>
        
        {/* Upcoming Events Section with enhanced styling */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {homeContent?.upcomingEventsTitle || "Upcoming Events"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {homeContent?.upcomingEventsSubtitle || "Mark your calendar for these exciting opportunities to enhance your statistical knowledge"}
              </p>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden border-t-4 hover:shadow-lg transition-all">
                    <div className={`border-t-4 ${getEventColor(event.id)} -mt-[4px]`}></div>
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
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="mr-3">{event.date}</span>
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-4 bg-gray-50 dark:bg-gray-700/30">
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm" className="w-full hover:bg-white dark:hover:bg-gray-700">
                          <span>Learn More</span>
                          <ChevronRight className="ml-2 h-4 w-4" />
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
        </section>
        
        {homeContent?.testimonials && homeContent.testimonials.length > 0 && (
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Hear from participants who have attended our statistical education events
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {homeContent.testimonials.map((testimonial: any) => (
                  <Card key={testimonial.id} className="relative border-none shadow-lg">
                    <div className="absolute left-6 top-6 text-5xl text-gray-200 dark:text-gray-700">"</div>
                    <CardContent className="p-8 pt-12">
                      <p className="mb-6 text-gray-600 dark:text-gray-300 relative z-10">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-300">
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
          </section>
        )}

        <ContactUsSection />

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Join an Event?</h2>
            <p className="mb-8">
              Explore our upcoming events and be part of engaging statistical education experiences. Connect with experts, expand your knowledge, and improve your understanding of statistical information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/events">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Users className="mr-2 h-5 w-5" />
                  Browse Events
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Manage Content
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
