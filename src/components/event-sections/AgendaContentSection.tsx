
import { AgendaSection } from "@/components/AgendaSection";
import { ScrollSection } from "@/components/ScrollSection";

interface AgendaContentSectionProps {
  days: any[];
  eventId: string;
}

export function AgendaContentSection({ days, eventId }: AgendaContentSectionProps) {
  return (
    <section id="agenda" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <AgendaSection days={days} eventId={eventId} />
        </ScrollSection>
      </div>
    </section>
  );
}
