
import { ParticleBackground } from "@/components/ParticleBackground";
import { AboutSection } from "@/components/AboutSection";
import { SpeakersSection } from "@/components/SpeakersSection";
import { AgendaSection } from "@/components/AgendaSection";
import { PartnerSection } from "@/components/PartnerSection";
import { TopicsSection } from "@/components/TopicsSection";
import { AttendeeGuide } from "@/components/AttendeeGuide";
import { ConventionChallenge } from "@/components/ConventionChallenge";
import { ResourcesSection } from "@/components/ResourcesSection";
import { FaqsSection } from "@/components/FaqsSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ScrollSection } from "@/components/ScrollSection";
import { Speaker } from "@/components/types";
import { KeySpeakers } from "@/components/KeySpeakers";

interface EventMainContentProps {
  eventId: string;
  event: any;
  speakers: Speaker[] | any[];
  featuredSpeakers?: Speaker[] | any[];
  rvsNewsUpdates: any[];
  rvsAgenda: any[];
  rvsPartners: any[];
  rvsTopics: any[];
  rvsVenueInfo: any;
  rvsHotels: any[];
  rvsRestaurants: any[];
  rvsInfoFaqs: any[];
  rvsChallenge: any;
  rvsResources: any[];
  getFaqs: () => any[];
  getHighlights: () => string[];
  getEventColor: () => string;
  getParticleColor: () => string;
  eventCalendarDetails: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export function EventMainContent({
  eventId,
  event,
  speakers,
  featuredSpeakers = [],
  rvsNewsUpdates,
  rvsAgenda,
  rvsPartners,
  rvsTopics,
  rvsVenueInfo,
  rvsHotels,
  rvsRestaurants,
  rvsInfoFaqs,
  rvsChallenge,
  rvsResources,
  getFaqs,
  getHighlights,
  getEventColor,
  getParticleColor,
  eventCalendarDetails
}: EventMainContentProps) {
  return (
    <>
      <section className={`bg-${getEventColor()} py-3 text-white`}>
        <MarqueeSection 
          items={rvsNewsUpdates} 
          primaryColor={event.id === "nccrvs" ? "#FF6479" : 
                         event.id === "cbms" ? "#2A9D8F" :
                         event.id === "nsm" ? "#E63946" : "#3F7E44"}
        />
      </section>

      <main className="bg-gray-50 pb-20 dark:bg-gray-900">
        <section id="about" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 relative">
          <ParticleBackground 
            color={getParticleColor()} 
            particleCount={50}
            className="opacity-10" 
          />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollSection>
              <AboutSection 
                eventName={event?.title || ""}
                description={event?.description || ""}
                longDescription={event?.longDescription || ""}
                highlights={getHighlights()}
              />
            </ScrollSection>
          </div>
        </section>

        {featuredSpeakers && featuredSpeakers.length > 0 && (
          <section id="key-speakers" className="scroll-mt-20 py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <ScrollSection>
                <KeySpeakers speakers={featuredSpeakers} eventId={eventId} />
              </ScrollSection>
            </div>
          </section>
        )}

        <section id="speakers" className="scroll-mt-20 py-16 relative">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollSection>
              <SpeakersSection speakers={speakers} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="agenda" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <AgendaSection days={rvsAgenda} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="partners" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <PartnerSection partners={rvsPartners} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="topics" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <TopicsSection topics={rvsTopics} />
            </ScrollSection>
          </div>
        </section>

        <section id="guide" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <AttendeeGuide 
                venue={rvsVenueInfo}
                hotels={rvsHotels}
                restaurants={rvsRestaurants}
                faqs={rvsInfoFaqs}
              />
            </ScrollSection>
          </div>
        </section>

        <section id="challenge" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto max-w-3xl px-4">
            <ScrollSection>
              <ConventionChallenge challenge={rvsChallenge} />
            </ScrollSection>
          </div>
        </section>

        <section id="resources" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <ResourcesSection 
                resources={rvsResources} 
                eventDetails={eventCalendarDetails}
                eventId={eventId}
              />
            </ScrollSection>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <FaqsSection faqs={getFaqs()} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>
      </main>
    </>
  );
}
