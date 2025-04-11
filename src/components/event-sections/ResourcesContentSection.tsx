
import { ResourcesSection } from "@/components/ResourcesSection";
import { ScrollSection } from "@/components/ScrollSection";

interface ResourcesContentSectionProps {
  resources: any[];
  eventDetails: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  eventId: string;
}

export function ResourcesContentSection({ 
  resources, 
  eventDetails, 
  eventId 
}: ResourcesContentSectionProps) {
  return (
    <section id="resources" className="scroll-mt-20 py-16 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <ResourcesSection 
            resources={resources} 
            eventDetails={eventDetails}
            eventId={eventId}
          />
        </ScrollSection>
      </div>
    </section>
  );
}
