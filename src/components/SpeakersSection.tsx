
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CMSSpeaker } from "@/types/cms";
import { SpeakerProfileModal } from "@/components/SpeakerProfileModal";

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  photoUrl: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

interface SpeakersSectionProps {
  speakers: CMSSpeaker[] | Speaker[];
  className?: string;
  eventId?: string;
}

export function SpeakersSection({ speakers, className = "", eventId = "rvs" }: SpeakersSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [selectedSpeaker, setSelectedSpeaker] = useState<CMSSpeaker | Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isSmallScreen) {
      setCardsPerView(1);
    } else if (isMediumScreen) {
      setCardsPerView(2);
    } else {
      setCardsPerView(3);
    }
  }, [isSmallScreen, isMediumScreen]);

  const totalSpeakers = speakers.length;
  
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [currentIndex, cardsPerView, totalSpeakers]);

  const nextSlide = () => {
    setCurrentIndex(prev => {
      // For looping behavior
      if (prev + 1 > totalSpeakers - cardsPerView) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      // For looping behavior
      if (prev - 1 < 0) {
        return totalSpeakers - cardsPerView;
      }
      return prev - 1;
    });
  };

  const openSpeakerModal = (speaker: CMSSpeaker | Speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
    // Pause autoplay when modal is open
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const closeSpeakerModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
    // Resume autoplay when modal is closed
    startAutoplay();
  };

  // Get the correct event color
  const getEventColor = () => {
    switch(eventId) {
      case "rvs": return "rvs-primary";
      case "bms": return "bms-primary";
      case "sm": return "sm-primary";
      case "cs": return "cs-primary";
      default: return "rvs-primary";
    }
  };

  if (totalSpeakers === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Featured Speakers</h2>
      
      <div className="relative">
        <Button 
          onClick={prevSlide} 
          className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-${getEventColor()} hover:bg-${getEventColor()}/80 md:-left-6`}
          size="icon"
          aria-label="Previous speakers"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div ref={containerRef} className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {speakers.map((speaker) => (
              <div 
                key={speaker.id} 
                className="w-full shrink-0 px-2"
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
              >
                <Card 
                  className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  onClick={() => openSpeakerModal(speaker)}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-4 flex justify-center">
                      <Avatar className={`h-24 w-24 border-2 border-${getEventColor()}/20`}>
                        <AvatarImage src={speaker.photoUrl || speaker.imageUrl} alt={speaker.name} />
                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-center">{speaker.name}</CardTitle>
                    <CardDescription className="text-center">
                      {speaker.role} at {speaker.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{speaker.bio}</p>
                  </CardContent>
                  {(speaker.social || speaker.socialLinks) && (
                    <CardFooter className="flex justify-center gap-2">
                      <TooltipProvider>
                        {((speaker.social?.linkedin) || (speaker.socialLinks?.linkedin)) && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-9 w-9 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(speaker.social?.linkedin || speaker.socialLinks?.linkedin, '_blank');
                                }}
                              >
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>LinkedIn Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {((speaker.social?.twitter) || (speaker.socialLinks?.twitter)) && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-9 w-9 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(speaker.social?.twitter || speaker.socialLinks?.twitter, '_blank');
                                }}
                              >
                                <Twitter className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Twitter Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TooltipProvider>
                    </CardFooter>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={nextSlide} 
          className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-${getEventColor()} hover:bg-${getEventColor()}/80 md:-right-6`}
          size="icon"
          aria-label="Next speakers"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.min(totalSpeakers, Math.ceil(totalSpeakers / cardsPerView)) }).map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`mx-1 h-2 w-2 rounded-full p-0 ${currentIndex === index ? `bg-${getEventColor()}` : 'bg-gray-300 dark:bg-gray-700'}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <SpeakerProfileModal 
        speaker={selectedSpeaker} 
        isOpen={isModalOpen} 
        onClose={closeSpeakerModal}
        eventId={eventId}
      />
    </div>
  );
}
