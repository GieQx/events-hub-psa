
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { NetworkBackground } from "@/components/NetworkBackground";
import { ScrollSection } from "@/components/ScrollSection";
import { motion } from "framer-motion";

const getRemainigDays = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const IndexPage = () => {
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
          <NetworkBackground className="absolute inset-0 -z-10" />
          
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

        <section id="events" className="scroll-mt-16">
          <ScrollSection>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Upcoming Conventions
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

      <footer className="bg-gray-900 py-8 text-center text-white">
        <div className="container mx-auto px-4">
          <p className="mb-2">© 2025 Convention Events. All rights reserved.</p>
          <p className="text-sm text-gray-400">Connecting professionals through premier industry conventions</p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
