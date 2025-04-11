
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";
import { FadeInSection } from "@/components/home/FadeInSection";

interface UpcomingEventsTimelineProps {
  upcomingEvents: any[];
  upcomingEventsTitle?: string;
  upcomingEventsSubtitle?: string;
}

export const UpcomingEventsTimeline = ({ 
  upcomingEvents,
  upcomingEventsTitle = "Upcoming Events",
  upcomingEventsSubtitle = "Mark your calendar for these exciting opportunities to connect and learn"
}: UpcomingEventsTimelineProps) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="mb-2 text-3xl font-bold text-center">
            {upcomingEventsTitle}
          </h2>
          <p className="mb-10 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {upcomingEventsSubtitle}
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
  );
};
