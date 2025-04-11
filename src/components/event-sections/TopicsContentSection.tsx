
import { TopicsSection } from "@/components/TopicsSection";
import { ScrollSection } from "@/components/ScrollSection";

interface TopicsContentSectionProps {
  topics: any[];
}

export function TopicsContentSection({ topics }: TopicsContentSectionProps) {
  return (
    <section id="topics" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <TopicsSection topics={topics} />
        </ScrollSection>
      </div>
    </section>
  );
}
