
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  speakers: Speaker[];
  className?: string;
  eventId?: string;
}

export function SpeakersSection({ speakers, className = "", eventId = "rvs" }: SpeakersSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isSmallScreen) {
      setCardsPerView(1);
    } else if (isMediumScreen) {
      setCardsPerView(2);
    } else {
      setCardsPerView(3);
    }
  }, [isSmallScreen, isMediumScreen]);

  const maxIndex = Math.max(0, speakers.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
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

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Featured Speakers</h2>
      
      <div className="relative">
        {currentIndex > 0 && (
          <Button 
            onClick={prevSlide} 
            className={`absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-${getEventColor()} hover:bg-${getEventColor()}/80 md:-left-6`}
            size="icon"
            aria-label="Previous speakers"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        
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
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="mb-4 flex justify-center">
                      <Avatar className={`h-24 w-24 border-2 border-${getEventColor()}/20`}>
                        <AvatarImage src={speaker.photoUrl} alt={speaker.name} />
                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-center">{speaker.name}</CardTitle>
                    <CardDescription className="text-center">
                      {speaker.role} at {speaker.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{speaker.bio}</p>
                  </CardContent>
                  {speaker.social && (
                    <CardFooter className="flex justify-center gap-2">
                      <TooltipProvider>
                        {speaker.social.linkedin && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-full">
                                <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>LinkedIn Profile</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {speaker.social.twitter && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-full">
                                <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer">
                                  <Twitter className="h-4 w-4" />
                                </a>
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
        
        {currentIndex < maxIndex && (
          <Button 
            onClick={nextSlide} 
            className={`absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-${getEventColor()} hover:bg-${getEventColor()}/80 md:-right-6`}
            size="icon"
            aria-label="Next speakers"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.ceil(speakers.length / cardsPerView) }).map((_, index) => (
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
    </div>
  );
}
