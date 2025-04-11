
import { ScrollSection } from "@/components/ScrollSection";
import { EventsGrid } from "@/components/homepage/EventsGrid";

interface EventsSectionProps {
  events: any[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
  return (
    <section id="events" className="py-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Upcoming Conventions
          </h2>
        </ScrollSection>
        
        <EventsGrid events={events} />
      </div>
    </section>
  );
};
