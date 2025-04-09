
import { ParticleBackground } from "@/components/ParticleBackground";
import { CMSEvent } from "@/types/cms";
import { getParticleColor } from "@/utils/eventHelpers";

interface AgendaHeroProps {
  eventId: string;
  event: CMSEvent;
}

export function AgendaHero({ eventId, event }: AgendaHeroProps) {
  return (
    <div className="relative bg-gray-900 py-32 text-white">
      <ParticleBackground 
        color={getParticleColor(eventId)} 
        particleCount={100}
        className="absolute inset-0 opacity-30" 
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Event Agenda</h1>
        <p className="mx-auto max-w-3xl text-lg">
          Explore the schedule of sessions, workshops, and keynotes for {event.title}.
        </p>
      </div>
    </div>
  );
}
