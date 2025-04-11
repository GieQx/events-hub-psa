
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
import { getEventColor } from "@/utils/eventHelpers";

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
  getEventColor: getEventColorProp,
  getParticleColor: getParticleColorProp,
  eventCalendarDetails
}: EventMainContentProps) {
  // Get the actual color based on the event ID
  const actualEventColor = eventId === "nccrvs" ? "#FF6479" : 
                           eventId === "cbms" ? "#2A9D8F" :
                           eventId === "nsm" ? "#E63946" : "#3F7E44";

  return (
    <>
      <section className={`${getEventColor(eventId)} py-3 w-full`}>
        <MarqueeSection 
          items={rvsNewsUpdates} 
          primaryColor={actualEventColor}
          eventId={eventId}
        />
      </section>

      <main className="bg-gray-50 pb-20 dark:bg-gray-900 w-full">
        <section id="about" className="relative scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
          <div className="container mx-auto px-4">
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
          <section id="key-speakers" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
            <div className="container mx-auto px-4">
              <ScrollSection>
                <KeySpeakers speakers={featuredSpeakers} eventId={eventId} />
              </ScrollSection>
            </div>
          </section>
        )}

        <section id="speakers" className="relative scroll-mt-20 py-16 w-full">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <SpeakersSection speakers={speakers} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="agenda" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <AgendaSection days={rvsAgenda} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="partners" className="scroll-mt-20 py-16 w-full">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <PartnerSection partners={rvsPartners} eventId={eventId} />
            </ScrollSection>
          </div>
        </section>

        <section id="topics" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
          <div className="container mx-auto px-4">
            <ScrollSection>
              <TopicsSection topics={rvsTopics} />
            </ScrollSection>
          </div>
        </section>

        <section id="guide" className="scroll-mt-20 py-16 w-full">
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

        <section id="challenge" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
          <div className="container mx-auto max-w-3xl px-4">
            <ScrollSection>
              <ConventionChallenge challenge={rvsChallenge} />
            </ScrollSection>
          </div>
        </section>

        <section id="resources" className="scroll-mt-20 py-16 w-full">
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

        <section id="faqs" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800 w-full">
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
