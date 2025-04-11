
import { FaqsSection } from "@/components/FaqsSection";
import { ScrollSection } from "@/components/ScrollSection";

interface FaqsContentSectionProps {
  faqs: any[];
  eventId: string;
}

export function FaqsContentSection({ faqs, eventId }: FaqsContentSectionProps) {
  return (
    <section id="faqs" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <FaqsSection faqs={faqs} eventId={eventId} />
        </ScrollSection>
      </div>
    </section>
  );
}
