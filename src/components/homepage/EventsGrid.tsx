
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollSection } from "@/components/ScrollSection";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { shouldDisableEvent } from "@/utils/eventHelpers";

interface EventData {
  id: string;
  title: string;
  description: string;
  shortName: string;
  eventStartDate: string;
  eventEndDate: string;
  location: string;
  imageUrl: string;
  color: string;
}

interface EventsGridProps {
  events: EventData[];
}

export const EventsGrid = ({ events }: EventsGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming events found</p>
        <p className="text-gray-600 dark:text-gray-300">Check back later for new events or visit the admin page to add events.</p>
        <div className="mt-6">
          <Link to="/admin">
            <Button variant="outline">Go to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => {
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
  );
};
