
import { KeySpeakers } from "@/components/KeySpeakers";
import { ScrollSection } from "@/components/ScrollSection";
import { Speaker } from "@/components/types";

interface KeySpeakersContentSectionProps {
  speakers: Speaker[];
  eventId: string;
}

export function KeySpeakersContentSection({ speakers, eventId }: KeySpeakersContentSectionProps) {
  if (!speakers || speakers.length === 0) {
    return null;
  }
  
  return (
    <section id="key-speakers" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <KeySpeakers speakers={speakers} eventId={eventId} />
        </ScrollSection>
      </div>
    </section>
  );
}
