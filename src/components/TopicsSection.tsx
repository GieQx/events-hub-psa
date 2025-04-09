
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationButton } from "@/components/RegistrationButton";
import { MapPin, Users, Clock } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";

interface Topic {
  id: string;
  title: string;
  description: string;
  presenter?: string;
  capacity?: number;
  enrolled?: number;
  type: 'workshop' | 'lecture' | 'panel';
  time?: string;
  location?: string;
}

interface TopicsSectionProps {
  topics: Topic[];
  className?: string;
  eventId?: string;
}

export function TopicsSection({ topics, className = "", eventId = "nccrvs" }: TopicsSectionProps) {
  // Filter topics by type
  const workshops = topics.filter(topic => topic.type === 'workshop');
  const lectures = topics.filter(topic => topic.type === 'lecture');
  const panels = topics.filter(topic => topic.type === 'panel');
  
  // If no type specified, assume all are workshops
  const hasSpecificTypes = workshops.length > 0 || lectures.length > 0 || panels.length > 0;
  const workshopTopics = hasSpecificTypes ? workshops : topics;
  
  if (topics.length === 0) {
    return (
      <div className={`text-center ${className}`}>
        <h2 className="mb-4 text-3xl font-bold">Topics & Workshops</h2>
        <p className="text-gray-600 dark:text-gray-300">
          No topics available for this event yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="mb-2 text-center text-3xl font-bold">Topics & Workshops</h2>
      <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
        Explore the educational opportunities at this event
      </p>
      
      {workshopTopics.length > 0 && (
        <div className="mb-12">
          {hasSpecificTypes && (
            <h3 className="mb-4 text-xl font-semibold">Workshops</h3>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshopTopics.map((topic) => (
              <Card key={topic.id} className="overflow-hidden">
                <div className={`h-2 ${getEventColor(eventId)}`}></div>
                <CardContent className="p-6">
                  <h4 className="mb-3 text-lg font-semibold">{topic.title}</h4>
                  
                  {topic.presenter && (
                    <p className="mb-3 font-medium text-gray-700 dark:text-gray-300">
                      Presenter: {topic.presenter}
                    </p>
                  )}
                  
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {topic.description}
                  </p>
                  
                  <div className="mb-4 space-y-2 text-sm">
                    {topic.time && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{topic.time}</span>
                      </div>
                    )}
                    
                    {topic.location && (
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{topic.location}</span>
                      </div>
                    )}
                    
                    {topic.capacity && (
                      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>
                            {topic.enrolled || 0} / {topic.capacity} enrolled
                          </span>
                        </div>
                        
                        {topic.capacity && topic.enrolled && (
                          <span className={`text-xs ${
                            topic.enrolled / topic.capacity > 0.8 
                              ? 'text-red-500 dark:text-red-400' 
                              : topic.enrolled / topic.capacity > 0.5 
                                ? 'text-amber-500 dark:text-amber-400' 
                                : 'text-green-500 dark:text-green-400'
                          }`}>
                            {topic.enrolled >= topic.capacity 
                              ? 'Full' 
                              : topic.enrolled / topic.capacity > 0.8 
                                ? 'Almost Full' 
                                : 'Open'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <RegistrationButton eventId={eventId}>
                    Register for this Workshop
                  </RegistrationButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {lectures.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Lectures</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {lectures.map((topic) => (
              <Card key={topic.id} className="flex overflow-hidden">
                <div className={`w-2 ${getEventColor(eventId)}`}></div>
                <CardContent className="flex-1 p-4">
                  <h4 className="mb-2 font-semibold">{topic.title}</h4>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {topic.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    {topic.presenter && <span>By: {topic.presenter}</span>}
                    {topic.time && <span>{topic.time}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {panels.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Panel Discussions</h3>
          <div className="space-y-4">
            {panels.map((topic) => (
              <Card key={topic.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div>
                      <h4 className="mb-2 text-lg font-semibold">{topic.title}</h4>
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {topic.description}
                      </p>
                    </div>
                    <Button className={`whitespace-nowrap ${getEventColor(eventId)}`}>
                      Add to Schedule
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {topic.time && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{topic.time}</span>
                      </div>
                    )}
                    {topic.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{topic.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
