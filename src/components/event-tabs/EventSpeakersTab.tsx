
import { SpeakersSection } from "@/components/SpeakersSection";

interface EventSpeakersTabProps {
  eventId: string;
  speakers: any[];
}

export function EventSpeakersTab({ eventId, speakers }: EventSpeakersTabProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Event Speakers</h2>
        <SpeakersSection speakers={speakers} eventId={eventId} />
      </div>
    </div>
  );
}
