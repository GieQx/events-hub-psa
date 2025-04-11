import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToTopButton } from "@/components/BackToTopButton";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ContactUsSection } from "@/components/ContactUsSection";
import { motion, useAnimation } from "framer-motion";
import cmsService from "@/services/cmsService";
import { getEventColor } from "@/utils/eventHelpers";
import { Calendar, MapPin, Users, BarChart2, ArrowRight, ChevronRight, Sparkles, CornerRightDown } from "lucide-react";
import { seedDatabaseIfEmpty } from "@/utils/seedData";

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    rootMargin: '0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const EventStats = () => {
  const counterRef = useRef(null);
  const stats = [
    { id: 1, icon: <Users className="h-6 w-6" />, value: 1000, label: "Attendees", suffix: "+" },
    { id: 2, icon: <Calendar className="h-6 w-6" />, value: 10, label: "Events", suffix: "" },
    { id: 3, icon: <MapPin className="h-6 w-6" />, value: 4, label: "Locations", suffix: "" },
    { id: 4, icon: <BarChart2 className="h-6 w-6" />, value: 98, label: "Satisfaction Rate", suffix: "%" }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Events at a Glance</h2>
        </FadeInSection>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeInSection key={stat.id} delay={index * 0.1}>
              <Card className="text-center border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 text-blue-600 dark:text-blue-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center justify-center" ref={counterRef}>
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className="text-3xl font-bold">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

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

  const { ref, inView } = useInView({
    triggerOnce: true, 
    rootMargin: '0px',
  });

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

        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                    Explore our signature events crafted to deliver exceptional experiences 
                    and valuable insights for professionals across industries.
                  </p>
                </div>
                <Link to="/events" className="mt-4 md:mt-0 group flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  <span>View all events</span>
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"/>
                </Link>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.length > 0 ? (
                featuredEvents.map((event, index) => (
                  <FadeInSection key={event.id} delay={index * 0.1}>
                    <Link to={`/events/${event.id}`} className="block group">
                      <div className="rounded-xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
                          {event.imageUrl ? (
                            <img 
                              src={event.imageUrl} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${getEventColor(event.id)}`}>
                              <span className="text-white text-2xl font-bold">{event.shortName || event.title.charAt(0)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium px-4 py-2 rounded-full border border-white">View Event</span>
                          </div>
                        </div>
                        <div className={`p-6 ${getEventColor(event.id)} text-white`}>
                          <div className="mb-3 flex justify-between">
                            <span className="text-sm font-medium opacity-90">{event.date}</span>
                            <span className="text-sm font-bold opacity-90">{event.shortName}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-sm text-white/80 line-clamp-2 mb-4">{event.description}</p>
                          <div className="flex items-center text-sm opacity-90">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeInSection>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-500">No featured events available. Check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <EventStats />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="text-3xl font-bold text-center mb-4">Why Attend Our Conventions?</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
                Our events are carefully crafted to provide valuable experiences that enhance your professional development
                and expand your network with like-minded individuals.
              </p>
            </FadeInSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "Expert Insights",
                  description: "Learn from industry leaders and gain valuable knowledge about the latest trends and innovations."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Networking Opportunities",
                  description: "Connect with professionals, potential partners, and influencers in your field."
                },
                {
                  icon: <CornerRightDown className="h-6 w-6" />,
                  title: "Interactive Workshops",
                  description: "Participate in hands-on sessions designed to enhance your skills and practical knowledge."
                }
              ].map((item, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <h2 className="mb-2 text-3xl font-bold text-center">
                {homeContent?.upcomingEventsTitle || "Upcoming Events"}
              </h2>
              <p className="mb-10 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {homeContent?.upcomingEventsSubtitle || "Mark your calendar for these exciting opportunities to connect and learn"}
              </p>
            </FadeInSection>
            
            {upcomingEvents.length > 0 ? (
              <div className="max-w-4xl mx-auto relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900 z-0"></div>
                
                {upcomingEvents.slice(0, 5).map((event, index) => (
                  <FadeInSection key={event.id} delay={index * 0.1}>
                    <div className={`relative z-10 flex items-center mb-10 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full ${getEventColor(event.id)} z-20 shadow-md`}></div>
                      
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-10' : 'pl-10'}`}>
                        <Link to={`/events/${event.id}`}>
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-0">
                              {event.imageUrl && (
                                <div className="h-32 overflow-hidden">
                                  <img 
                                    src={event.imageUrl} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-xs px-2 py-1 rounded-full ${getEventColor(event.id)} text-white`}>
                                    {event.shortName}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {event.date}
                                  </span>
                                </div>
                                <h3 className="font-bold mb-2">{event.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </div>
                  </FadeInSection>
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
          <section className="py-20">
            <div className="container mx-auto px-4">
              <FadeInSection>
                <h2 className="mb-10 text-3xl font-bold text-center">What People Are Saying</h2>
              </FadeInSection>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {homeContent.testimonials.map((testimonial: any, index: number) => (
                  <FadeInSection key={testimonial.id} delay={index * 0.1}>
                    <Card className="relative border-none shadow-lg h-full">
                      <div className="absolute left-6 top-6 text-5xl text-gray-200 dark:text-gray-700">"</div>
                      <CardContent className="p-8 pt-12 h-full flex flex-col">
                        <p className="mb-6 text-gray-600 dark:text-gray-300 relative z-10 flex-grow">
                          {testimonial.text}
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
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
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactUsSection />

        <div className="bg-blue-50 dark:bg-blue-950 py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <FadeInSection>
              <h2 className="mb-4 text-3xl font-bold">Ready to Join an Event?</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                Explore our upcoming events and be part of something extraordinary. Connect with industry leaders, 
                expand your knowledge, and grow your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/events">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto">
                    Browse Events
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Admin Panel
                  </Button>
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
