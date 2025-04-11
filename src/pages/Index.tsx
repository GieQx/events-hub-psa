
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
import { Calendar, MapPin, Users } from "lucide-react";

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
      <div className="absolute inset-0 -z-10">
        <ParticleBackground 
          color="#3b82f6" 
          particleCount={100}
          className="opacity-70" 
        />
      

      <header className="py-6 relative z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Convention Events
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Discover Premier Conventions
              </h2>
            </ScrollSection>
            
            <ScrollSection delay={0.4}>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                Join us at these government statistical agency events featuring experts, cutting-edge insights, and valuable networking opportunities.
              </p>
            </ScrollSection>
            
            <ScrollSection delay={0.6}>
              <div className="mb-8 flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="#events">Explore Events</Link>
                  </Button>
                </motion.div>
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
                  <h3 className="text-2xl font-bold">Major Statistical Conventions for 2025-2027</h3>
                  <p className="max-w-lg">From cutting-edge statistical analysis to community engagement, our conventions bring together the best minds and innovators.</p>
                </div>
              </motion.div>
            </ScrollSection>
          </div>
        </section>

        <section id="events" className="py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                Upcoming Conventions
              </h2>
            </ScrollSection>
            
            {validEvents.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {validEvents.map((event, index) => {
                  // Format date for display
                  const startDate = new Date(event.eventStartDate);
                  const endDate = new Date(event.eventEndDate);
                  const formattedDateRange = `${startDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })} - ${endDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}`;
                  
                  // Check if event should be disabled based on countdown
                  const isDisabled = shouldDisableEvent(event.eventStartDate, 600);
                  
                  return (
                    <ScrollSection key={event.id} delay={0.2 + index * 0.1}>
                      <motion.div 
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className={`${isDisabled ? 'opacity-60' : ''} transition-opacity duration-300`}
                      >
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                          <div className="relative h-48">
                            <img 
                              src={event.imageUrl !== "/placeholder.svg" ? event.imageUrl : 
                                    event.id === "nccrvs" ? "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&auto=format&fit=crop&q=80" :
                                    event.id === "cbms" ? "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&auto=format&fit=crop&q=80" :
                                    event.id === "nsm" ? "https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&h=400&auto=format&fit=crop&q=80" :
                                    "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&auto=format&fit=crop&q=80"}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-0 left-0 w-full h-1 ${event.color}`}></div>
                            <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-xs font-bold uppercase rounded px-2 py-1">
                              {event.shortName}
                            </div>
                          </div>
                          
                          <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                            
                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formattedDateRange}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>Statisticians, Researchers, Data Scientists</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="px-6 pb-6">
                            <Link to={`/events/${event.id}`}>
                              <Button 
                                className={`w-full ${event.color} text-white hover:opacity-90`}
                                disabled={isDisabled}
                              >
                                {isDisabled ? "Coming Soon" : "View Details"}
                              </Button>
                            </Link>
                            
                            {isDisabled && (
                              <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                                Coming in {Math.ceil((new Date(event.eventStartDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
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
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-blue-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <h2 className="mb-8 text-center text-3xl font-bold">About Our Conventions</h2>
            </ScrollSection>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollSection delay={0.3}>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Supporting Statistical Education</h3>
                  <p className="mb-4">Our conventions are designed to enhance stakeholder engagement while building a foundation for integrating statistical education into mainstream curricula.</p>
                  <p>Through interactive sessions, workshops, and networking opportunities, we aim to improve accessibility and understanding of statistical information.</p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Expert-led sessions on modern statistical methodologies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Interactive workshops for hands-on learning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Networking with industry leaders and peers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      <span>Access to the latest research and publications</span>
                    </li>
                  </ul>
                </div>
              </ScrollSection>
              
              <ScrollSection delay={0.5}>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80" 
                    alt="People at convention" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollSection>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-center text-white relative">
        <div className="absolute inset-0 -z-10">
          <ParticleBackground 
            color="#ffffff" 
            particleCount={30}
            className="opacity-20" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="mb-2">© 2025 Statistical Convention Events. All rights reserved.</p>
          <p className="text-sm text-gray-400">Connecting professionals through premier industry conventions</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
              Admin
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
        </div>
    </div>
  );
};

export default IndexPage;
