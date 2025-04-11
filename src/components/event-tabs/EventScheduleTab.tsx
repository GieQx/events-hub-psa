
import { AgendaSection } from "@/components/AgendaSection";

interface EventScheduleTabProps {
  eventId: string;
  displayAgenda: any[];
}

export function EventScheduleTab({ eventId, displayAgenda }: EventScheduleTabProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Event Schedule</h2>
        <AgendaSection days={displayAgenda} eventId={eventId} />
      </div>
    </div>
  );
}
