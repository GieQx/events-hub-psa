
import { PartnerSection } from "@/components/PartnerSection";
import { ScrollSection } from "@/components/ScrollSection";

interface PartnersContentSectionProps {
  partners: any[];
  eventId: string;
}

export function PartnersContentSection({ partners, eventId }: PartnersContentSectionProps) {
  return (
    <section id="partners" className="scroll-mt-20 py-16 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <PartnerSection partners={partners} eventId={eventId} />
        </ScrollSection>
      </div>
    </section>
  );
}
