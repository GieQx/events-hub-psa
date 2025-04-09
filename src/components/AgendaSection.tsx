
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event, Day } from "@/components/types";

interface AgendaSectionProps {
  days: Day[];
  className?: string;
  eventId?: string;
}

export function AgendaSection({ days, className = "", eventId = "nccrvs" }: AgendaSectionProps) {
  console.log("AgendaSection received days:", days);
  
  // Handle empty days array gracefully
  if (!days || days.length === 0) {
    return (
      <div className={className}>
        <h2 className="mb-6 text-center text-3xl font-bold">Event Agenda</h2>
        <p className="text-center text-gray-500">Agenda details coming soon...</p>
      </div>
    );
  }

  // Filter out days with invalid dates
  const validDays = days.filter(day => day.date && day.date !== "Invalid Date");
  
  // If no valid days remain after filtering
  if (validDays.length === 0) {
    return (
      <div className={className}>
        <h2 className="mb-6 text-center text-3xl font-bold">Event Agenda</h2>
        <p className="text-center text-gray-500">Agenda details coming soon...</p>
      </div>
    );
  }

  const [activeDay, setActiveDay] = useState(validDays[0]?.date || "");

  // Get the correct event color
  const getEventColor = () => {
    switch(eventId) {
      case "nccrvs": return "rvs-primary";
      case "cbms": return "bms-primary";
      case "nsm": return "sm-primary";
      case "ncs": return "cs-primary";
      default: return "rvs-primary";
    }
  };

  useEffect(() => {
    console.log("Active day set to:", activeDay);
  }, [activeDay]);

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Event Agenda</h2>
      <Tabs value={validDays[0]?.date} className="w-full">
        <TabsList className="mb-6 grid w-full" style={{ 
          gridTemplateColumns: `repeat(${Math.min(validDays.length, 3)}, minmax(0, 1fr))` 
        }}>
          {validDays.map((day) => (
            <TabsTrigger 
              key={day.date} 
              value={day.date} 
              onClick={() => setActiveDay(day.date)}
              style={{
                "--tab-accent-color": `var(--${getEventColor()})`,
              } as React.CSSProperties}
            >
              {day.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {validDays.map((day) => (
          <TabsContent key={day.date} value={day.date} className="animate-fade-in">
            <div className="space-y-6">
              {day.events && day.events.length > 0 ? (
                day.events.map((event, index) => (
                  <Card key={index} className="overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col border-l-4 p-5 md:flex-row md:items-start"
                        style={{ borderLeftColor: `var(--${getEventColor()})` }}>
                        <div className="mb-4 flex min-w-[120px] flex-shrink-0 items-center rounded-md px-3 py-2 font-medium md:mb-0 md:mr-6"
                          style={{ 
                            backgroundColor: `hsl(var(--${getEventColor()}) / 0.1)`,
                            color: `hsl(var(--${getEventColor()}))` 
                          }}>
                          {event.time}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            {event.type && (
                              <Badge 
                                className={`
                                  ${event.type === 'keynote' ? `bg-${getEventColor()} text-white` : ''}
                                  ${event.type === 'workshop' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                                  ${event.type === 'panel' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : ''}
                                  ${event.type === 'break' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : ''}
                                  ${event.type === 'talk' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                                  ${event.type === 'networking' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : ''}
                                  ${event.type === 'other' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : ''}
                                `}
                              >
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                            )}
                          </div>
                          
                          {event.speaker && (
                            <p className="font-medium text-gray-700 dark:text-gray-300">
                              <span className="mr-2 text-gray-500 dark:text-gray-400">Speaker:</span>
                              {event.speaker}
                            </p>
                          )}
                          
                          {event.description && (
                            <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                          )}
                          
                          {event.location && (
                            <p className="flex items-center text-sm text-gray-500">
                              <span className="mr-1">📍</span> {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">No events scheduled for this day yet.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
