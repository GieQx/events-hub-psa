
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "@/data/events";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CountdownTimer } from "@/components/CountdownTimer";
import { MarqueeSection } from "@/components/MarqueeSection";
import { AgendaSection } from "@/components/AgendaSection";
import { PartnerSection } from "@/components/PartnerSection";
import { TopicsSection } from "@/components/TopicsSection";
import { AttendeeGuide } from "@/components/AttendeeGuide";
import { ConventionChallenge } from "@/components/ConventionChallenge";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import { RegistrationButton } from "@/components/RegistrationButton";
import { EventNavigation } from "@/components/EventNavigation";
import { SpeakersSection } from "@/components/SpeakersSection";
import { AboutSection } from "@/components/AboutSection";
import { FaqsSection } from "@/components/FaqsSection";
import { BackToTopButton } from "@/components/BackToTopButton";

// Import data
import { 
  rvsNewsUpdates, 
  rvsAgenda, 
  rvsPartners, 
  rvsTopics,
  rvsVenueInfo,
  rvsHotels,
  rvsRestaurants,
  rvsFaqs as rvsInfoFaqs,
  rvsChallenge,
  rvsResources,
  rvsChatbotOptions
} from "@/data/rvs-event-data";

// Import speakers and additional data
import { 
  rvsSpeakers, 
  bmsSpeakers, 
  smSpeakers, 
  csSpeakers 
} from "@/data/speakers-data";

import {
  rvsFaqs,
  bmsFaqs,
  smFaqs,
  csFaqs
} from "@/data/faqs-data";

import {
  rvsHighlights,
  bmsHighlights,
  smHighlights,
  csHighlights
} from "@/data/about-data";

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = getEventById(eventId || "");
  const [videoLoaded, setVideoLoaded] = useState(false);

  // If event not found, display error message
  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Event Not Found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Events Hub</Button>
        </Link>
      </div>
    );
  }

  // Choose data based on event ID
  const getSpeakers = () => {
    switch(eventId) {
      case "rvs": return rvsSpeakers;
      case "bms": return bmsSpeakers;
      case "sm": return smSpeakers;
      case "cs": return csSpeakers;
      default: return rvsSpeakers;
    }
  };

  const getFaqs = () => {
    switch(eventId) {
      case "rvs": return rvsFaqs;
      case "bms": return bmsFaqs;
      case "sm": return smFaqs;
      case "cs": return csFaqs;
      default: return rvsFaqs;
    }
  };

  const getHighlights = () => {
    switch(eventId) {
      case "rvs": return rvsHighlights;
      case "bms": return bmsHighlights;
      case "sm": return smHighlights;
      case "cs": return csHighlights;
      default: return rvsHighlights;
    }
  };

  // Currently only implementing RVS data - we would need to add equivalent data for other events
  const newsUpdates = rvsNewsUpdates;
  const agenda = rvsAgenda;
  const partners = rvsPartners as any; // Type assertion to fix TypeScript error
  const topics = rvsTopics as any; // Type assertion to fix TypeScript error
  const venueInfo = rvsVenueInfo;
  const hotels = rvsHotels;
  const restaurants = rvsRestaurants;
  const faqs = rvsInfoFaqs;
  const challenge = rvsChallenge;
  const resources = rvsResources as any; // Type assertion to fix TypeScript error
  const chatbotOptions = rvsChatbotOptions;
  const speakers = getSpeakers();
  const eventFaqs = getFaqs();
  const highlights = getHighlights();

  // Define the primary and secondary colors for the event
  const getEventColor = () => {
    switch(eventId) {
      case "rvs": return "rvs-primary";
      case "bms": return "bms-primary";
      case "sm": return "sm-primary";
      case "cs": return "cs-primary";
      default: return "rvs-primary";
    }
  };

  // Handle video loading
  useEffect(() => {
    const videoElement = document.getElementById("bgVideo") as HTMLVideoElement;
    if (videoElement) {
      videoElement.onloadeddata = () => {
        setVideoLoaded(true);
      };
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white/80 px-6 backdrop-blur-md dark:bg-gray-900/80">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Events Hub</span>
            </Button>
          </Link>
          <EventNavigation 
            eventId={eventId || ""}
            color={getEventColor()}
            className="ml-6"
          />
        </div>
        <div className="flex items-center gap-4">
          <RegistrationButton eventId={eventId} />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section id="hero" className="relative min-h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 bg-gray-900">
          <video
            id="bgVideo"
            autoPlay
            muted
            loop
            playsInline
            className={`h-full w-full object-cover opacity-40 transition-opacity duration-1000 ${videoLoaded ? 'opacity-40' : 'opacity-0'}`}
          >
            <source src={event.videoUrl} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-16 text-center text-white">
          <div className={`mb-4 inline-block rounded-full bg-${getEventColor()} px-4 py-1 text-sm font-medium animate-fade-in`}>
            {event.date} • {event.location}
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl animate-fade-in" style={{animationDelay: "0.2s"}}>
            {event.title}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl animate-fade-in" style={{animationDelay: "0.4s"}}>
            {event.longDescription}
          </p>
          
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{animationDelay: "0.6s"}}>
            <RegistrationButton eventId={eventId} />
            <Button variant="outline" className="text-white hover:bg-white/10">
              View Program
            </Button>
          </div>
          
          <div className="w-full max-w-3xl animate-fade-in" style={{animationDelay: "0.8s"}}>
            <h2 className="mb-4 text-xl font-semibold">Event Starts In</h2>
            <CountdownTimer targetDate={event.eventStartDate} />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={`bg-${getEventColor()} py-3 text-white`}>
        <MarqueeSection 
          items={newsUpdates} 
          primaryColor={event.id === "rvs" ? "#FF6479" : 
                         event.id === "bms" ? "#2A9D8F" :
                         event.id === "sm" ? "#E63946" : "#3F7E44"}
        />
      </section>

      {/* Main Content */}
      <main className="bg-gray-50 pb-20 dark:bg-gray-900">
        {/* About Section */}
        <section id="about" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <AboutSection 
              eventName={event.title}
              description={event.description}
              longDescription={event.longDescription}
              highlights={highlights}
            />
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <SpeakersSection speakers={speakers} eventId={eventId} />
          </div>
        </section>

        {/* Agenda Section */}
        <section id="agenda" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <AgendaSection days={agenda} eventId={eventId} />
          </div>
        </section>

        {/* Partners Section */}
        <section id="partners" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <PartnerSection partners={partners} />
          </div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <TopicsSection topics={topics} />
          </div>
        </section>

        {/* Attendee Guide Section */}
        <section id="guide" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <AttendeeGuide 
              venue={venueInfo}
              hotels={hotels}
              restaurants={restaurants}
              faqs={faqs}
            />
          </div>
        </section>

        {/* Convention Challenge Section */}
        <section id="challenge" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto max-w-3xl px-4">
            <ConventionChallenge challenge={challenge} />
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="scroll-mt-20 py-16">
          <div className="container mx-auto px-4">
            <ResourcesSection resources={resources} />
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="scroll-mt-20 bg-white py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <FaqsSection faqs={eventFaqs} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">{event.title}</h3>
              <p className="mb-2">{event.date}</p>
              <p>{event.location}</p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#hero" className={`hover:text-${getEventColor()}`}>Home</a></li>
                <li><a href="#about" className={`hover:text-${getEventColor()}`}>About</a></li>
                <li><a href="#speakers" className={`hover:text-${getEventColor()}`}>Speakers</a></li>
                <li><a href="#agenda" className={`hover:text-${getEventColor()}`}>Agenda</a></li>
                <li><a href="#topics" className={`hover:text-${getEventColor()}`}>Topics</a></li>
                <li><a href="#guide" className={`hover:text-${getEventColor()}`}>Attendee Guide</a></li>
                <li><a href="#challenge" className={`hover:text-${getEventColor()}`}>Convention Challenge</a></li>
                <li><a href="#resources" className={`hover:text-${getEventColor()}`}>Resources</a></li>
                <li><a href="#faqs" className={`hover:text-${getEventColor()}`}>FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Contact</h3>
              <p className="mb-2">Email: info@{event.id}summit.example.com</p>
              <p className="mb-4">Phone: +1 (555) 123-4567</p>
              <div className="flex space-x-4">
                <a href="#" className={`text-white hover:text-${getEventColor()}`}>
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className={`text-white hover:text-${getEventColor()}`}>
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>© 2025 {event.title}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatbotDialog eventName={event.title} options={chatbotOptions} eventId={eventId} />
      
      {/* Back to Top Button - only visible on mobile */}
      <BackToTopButton eventId={eventId} />
    </div>
  );
};

export default EventPage;
