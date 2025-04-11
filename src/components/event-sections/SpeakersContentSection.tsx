
import { SpeakersSection } from "@/components/SpeakersSection";
import { ScrollSection } from "@/components/ScrollSection";
import { Speaker } from "@/components/types";

interface SpeakersContentSectionProps {
  speakers: Speaker[];
  eventId: string;
}

export function SpeakersContentSection({ speakers, eventId }: SpeakersContentSectionProps) {
  return (
    <section id="speakers" className="relative scroll-mt-20 py-16 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <SpeakersSection speakers={speakers} eventId={eventId} />
        </ScrollSection>
      </div>
    </section>
  );
}
