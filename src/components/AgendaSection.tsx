
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

type Event = {
  time: string;
  title: string;
  speaker?: string;
  description?: string;
  location?: string;
  type?: 'keynote' | 'workshop' | 'panel' | 'break';
};

type Day = {
  date: string;
  title: string;
  events: Event[];
};

interface AgendaSectionProps {
  days: Day[];
  className?: string;
}

export function AgendaSection({ days, className = "" }: AgendaSectionProps) {
  const [activeDay, setActiveDay] = useState(days[0]?.date || "");

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Event Agenda</h2>
      <Tabs defaultValue={days[0]?.date} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          {days.map((day) => (
            <TabsTrigger key={day.date} value={day.date} onClick={() => setActiveDay(day.date)}>
              {day.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className="animate-fade-in">
            <div className="space-y-4">
              {day.events.map((event, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col border-l-4 border-rvs-primary p-4 md:flex-row md:items-start">
                      <div className="mb-2 min-w-[120px] font-medium text-rvs-primary md:mb-0">
                        {event.time}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        {event.speaker && (
                          <p className="text-sm font-medium">{event.speaker}</p>
                        )}
                        {event.description && (
                          <p className="mt-1 text-gray-600 dark:text-gray-300">{event.description}</p>
                        )}
                        {event.location && (
                          <p className="mt-2 text-xs text-gray-500">Location: {event.location}</p>
                        )}
                      </div>
                      {event.type && (
                        <div className="mt-2 md:mt-0">
                          <span 
                            className={`rounded-full px-3 py-1 text-xs font-medium
                              ${event.type === 'keynote' ? 'bg-rvs-primary/20 text-rvs-primary' : ''}
                              ${event.type === 'workshop' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                              ${event.type === 'panel' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : ''}
                              ${event.type === 'break' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : ''}
                            `}
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
