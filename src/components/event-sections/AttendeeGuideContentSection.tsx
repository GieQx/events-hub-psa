
import { AttendeeGuide } from "@/components/AttendeeGuide";
import { ScrollSection } from "@/components/ScrollSection";

interface AttendeeGuideContentSectionProps {
  venue: any;
  hotels: any[];
  restaurants: any[];
  faqs: any[];
}

export function AttendeeGuideContentSection({ 
  venue, 
  hotels, 
  restaurants, 
  faqs 
}: AttendeeGuideContentSectionProps) {
  return (
    <section id="guide" className="scroll-mt-20 py-16 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <AttendeeGuide 
            venue={venue}
            hotels={hotels}
            restaurants={restaurants}
            faqs={faqs}
          />
        </ScrollSection>
      </div>
    </section>
  );
}
