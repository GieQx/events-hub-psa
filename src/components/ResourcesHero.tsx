
import { ParticleBackground } from "@/components/ParticleBackground";
import { CMSEvent } from "@/types/cms";
import { getParticleColor } from "@/utils/eventHelpers";

interface ResourcesHeroProps {
  eventId: string;
  event: CMSEvent;
}

export function ResourcesHero({ eventId, event }: ResourcesHeroProps) {
  return (
    <div className="relative bg-gray-900 py-32 text-white">
      <ParticleBackground 
        color={getParticleColor(eventId)} 
        particleCount={100}
        className="absolute inset-0 opacity-30" 
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Resources</h1>
        <p className="mx-auto max-w-3xl text-lg">
          Access presentations, papers, and other materials from {event.title}.
        </p>
      </div>
    </div>
  );
}
