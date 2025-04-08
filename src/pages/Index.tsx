
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { Link } from "react-router-dom";
import { ScrollSection } from "@/components/ScrollSection";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import cmsService from "@/services/cmsService";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";

const getRemainigDays = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const IndexPage = () => {
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(new Date());
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    // Get all events
    const allEvents = cmsService.events.getAll();
    setEvents(allEvents);

    // Filter events for the selected date
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const eventsOnDate = allEvents.filter(event => {
        const startDate = new Date(event.eventStartDate);
        const endDate = new Date(event.eventEndDate);
        const selected = new Date(dateStr);
        return selected >= startDate && selected <= endDate;
      });
      setEventsOnSelectedDate(eventsOnDate);
    }

    // Get upcoming events (next 30 days)
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    const upcoming = allEvents.filter(event => {
      const startDate = new Date(event.eventStartDate);
      return startDate >= today && startDate <= thirtyDaysLater;
    });
    
    setUpcomingEvents(upcoming);
  }, [selectedDate, selectedMonth]);

  // Function to highlight dates with events
  const getDayClassName = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const hasEvent = events.some(event => {
      const startDate = new Date(event.eventStartDate);
      const endDate = new Date(event.eventEndDate);
      const selected = new Date(dateStr);
      return selected >= startDate && selected <= endDate;
    });
    
    return hasEvent ? "bg-blue-200 dark:bg-blue-900 rounded-full" : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ParticleBackground 
          color="#9b87f5"
          particleCount={200}
          interactive={true}
        />
      </div>
      
      <header className="container mx-auto flex items-center justify-between p-6 relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Convention Events
        </h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 pb-20 pt-6 relative">
        <section className="mb-20 text-center relative">          
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
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
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
                <h3 className="text-2xl font-bold">Major Conventions for 2026-2027</h3>
                <p className="max-w-lg">From cutting-edge technology to community engagement, our conventions bring together the best minds and innovators.</p>
              </div>
            </motion.div>
          </ScrollSection>
        </section>

        <section className="mb-20">
          <ScrollSection>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Event Calendar
            </h2>
          </ScrollSection>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <ScrollSection delay={0.2}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Browse Events by Date</CardTitle>
                  <CardDescription>Select a date to see scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    onMonthChange={setSelectedMonth}
                    className="mx-auto"
                    modifiersClassNames={{
                      selected: "bg-blue-600 text-white",
                    }}
                    modifiers={{
                      // Add custom classes to dates with events
                      eventDay: (date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        return events.some(event => {
                          const startDate = new Date(event.eventStartDate);
                          const endDate = new Date(event.eventEndDate);
                          const selected = new Date(dateStr);
                          return selected >= startDate && selected <= endDate;
                        });
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </ScrollSection>
            
            <ScrollSection delay={0.4}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? (
                      <>Events on {selectedDate.toLocaleDateString()}</>
                    ) : (
                      <>Select a date to see events</>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {eventsOnSelectedDate.length > 0 
                      ? `${eventsOnSelectedDate.length} event(s) scheduled` 
                      : "No events scheduled on this date"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-80 overflow-y-auto">
                  {eventsOnSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {eventsOnSelectedDate.map((event) => (
                        <Card key={event.id} className="border-l-4 border-blue-500">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            <CardDescription>{event.location}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                View Details
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center">
                      <CalendarIcon className="mb-2 h-10 w-10 text-gray-400" />
                      <p className="text-center text-gray-500">
                        No events scheduled for this date. Select another date or browse all events below.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollSection>
          </div>
        </section>
        
        <section className="mb-20">
          <ScrollSection>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Event Timeline
            </h2>
          </ScrollSection>
          
          <ScrollSection delay={0.2}>
            <Tabs defaultValue="upcoming" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="all">All Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-4">
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden shadow-md">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-center items-center">
                            <div className="text-center">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(event.eventStartDate).toLocaleDateString('en-US', { month: 'short' })}
                              </p>
                              <p className="text-3xl font-bold">
                                {new Date(event.eventStartDate).getDate()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(event.eventStartDate).getFullYear()}
                              </p>
                              <Badge className="mt-2">{event.shortName}</Badge>
                            </div>
                          </div>
                          <div className="w-full md:w-3/4 p-4">
                            <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {event.location}
                            </p>
                            <p className="text-sm mb-4">{event.description}</p>
                            <Link to={`/events/${event.id}`}>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                View Details <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CalendarIcon className="mb-2 h-12 w-12 text-gray-400" />
                    <h3 className="mb-1 text-lg font-medium">No upcoming events</h3>
                    <p className="text-gray-500">Check back soon for new event announcements!</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden shadow-md">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-center items-center">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.eventStartDate).toLocaleDateString('en-US', { month: 'short' })}
                            </p>
                            <p className="text-3xl font-bold">
                              {new Date(event.eventStartDate).getDate()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.eventStartDate).getFullYear()}
                            </p>
                            <Badge className="mt-2">{event.shortName}</Badge>
                          </div>
                        </div>
                        <div className="w-full md:w-3/4 p-4">
                          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {event.location}
                          </p>
                          <p className="text-sm mb-4">{event.description}</p>
                          <Link to={`/events/${event.id}`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              View Details <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </ScrollSection>
        </section>

        <section id="events" className="scroll-mt-16">
          <ScrollSection>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Featured Conventions
            </h2>
          </ScrollSection>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, index) => {
              const remainingDays = getRemainigDays(event.eventStartDate);
              const isDisabled = remainingDays > 600;
              
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
                      imageUrl={event.id === "rvs" ? "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&auto=format&fit=crop&q=80" :
                                event.id === "bms" ? "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&auto=format&fit=crop&q=80" :
                                event.id === "sm" ? "https://images.unsplash.com/photo-1596496181871-9681eacf9764?w=600&h=400&auto=format&fit=crop&q=80" :
                                "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&auto=format&fit=crop&q=80"}
                      color={event.color}
                      disabled={isDisabled}
                    />
                    {isDisabled && (
                      <div className="mt-2 text-center text-sm text-gray-500">
                        Coming in {remainingDays} days
                      </div>
                    )}
                  </div>
                </ScrollSection>
              );
            })}
          </div>
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
