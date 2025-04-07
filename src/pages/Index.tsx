
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { Link } from "react-router-dom";
import { events } from "@/data/events";

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Convention Events
        </h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 pb-20 pt-6">
        <section className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Discover Major Conventions
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Join us at these premier events featuring industry leaders, cutting-edge insights, and networking opportunities.
          </p>
          <div className="mb-8 flex justify-center">
            <Link to="#events">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Events
              </Button>
            </Link>
          </div>
          <div className="relative mx-auto mb-16 max-w-5xl overflow-hidden rounded-xl shadow-xl">
            <img 
              src="/placeholder.svg" 
              alt="Convention hall" 
              className="w-full object-cover"
              style={{ height: "350px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-left text-white">
              <h3 className="text-2xl font-bold">Major Conventions for 2026-2027</h3>
              <p className="max-w-lg">From cutting-edge technology to community engagement, our conventions bring together the best minds and innovators.</p>
            </div>
          </div>
        </section>

        <section id="events" className="scroll-mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Upcoming Conventions
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                shortName={event.shortName}
                description={event.description}
                date={event.date}
                location={event.location}
                imageUrl={event.imageUrl}
                color={event.color}
              />
            ))}
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
