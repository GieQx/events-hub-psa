
import { AboutSection } from "@/components/AboutSection";
import { ScrollSection } from "@/components/ScrollSection";

interface AboutContentSectionProps {
  eventName: string;
  description: string;
  longDescription: string;
  highlights: string[];
}

export function AboutContentSection({ 
  eventName, 
  description, 
  longDescription, 
  highlights 
}: AboutContentSectionProps) {
  return (
    <section id="about" className="relative scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <AboutSection 
            eventName={eventName}
            description={description}
            longDescription={longDescription}
            highlights={highlights}
          />
        </ScrollSection>
      </div>
    </section>
  );
}
