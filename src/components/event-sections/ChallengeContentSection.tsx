
import { ConventionChallenge } from "@/components/ConventionChallenge";
import { ScrollSection } from "@/components/ScrollSection";

interface ChallengeContentSectionProps {
  challenge: any;
}

export function ChallengeContentSection({ challenge }: ChallengeContentSectionProps) {
  if (!challenge) return null;
  
  return (
    <section id="challenge" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
      <div className="container mx-auto max-w-3xl px-4">
        <ScrollSection>
          <ConventionChallenge challenge={challenge} />
        </ScrollSection>
      </div>
    </section>
  );
}
