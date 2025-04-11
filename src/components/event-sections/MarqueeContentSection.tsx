
import { MarqueeSection } from "@/components/MarqueeSection";
import { getEventColor } from "@/utils/eventHelpers";

interface MarqueeContentSectionProps {
  eventId: string;
  newsUpdates: any[];
}

export function MarqueeContentSection({ eventId, newsUpdates }: MarqueeContentSectionProps) {
  // Get the actual color based on the event ID
  const actualEventColor = eventId === "nccrvs" ? "#FF6479" : 
                         eventId === "cbms" ? "#2A9D8F" :
                         eventId === "nsm" ? "#E63946" : "#3F7E44";

  return (
    <section className={`${getEventColor(eventId)} py-3 w-full`}>
      <MarqueeSection 
        items={newsUpdates} 
        primaryColor={actualEventColor}
        eventId={eventId}
      />
    </section>
  );
}
