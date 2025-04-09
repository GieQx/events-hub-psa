
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin, Twitter } from "lucide-react";
import { CMSSpeaker } from "@/types/cms";
import { getEventColor } from "@/utils/eventHelpers";

interface SpeakersGridProps {
  speakers: CMSSpeaker[];
  className?: string;
  eventId?: string;
}

export function SpeakersGrid({ speakers, className = "", eventId = "rvs" }: SpeakersGridProps) {
  return (
    <div className={className}>
      <h2 className="mb-10 text-center text-3xl font-bold">Event Speakers</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="mb-4 flex justify-center">
                <Avatar className={`h-24 w-24 border-2 border-${getEventColor(eventId)}/20`}>
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
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">{speaker.bio}</p>
            </CardContent>
            {(speaker.social || speaker.socialLinks) && (
              <CardFooter className="flex justify-center gap-2">
                <TooltipProvider>
                  {((speaker.social?.linkedin) || (speaker.socialLinks?.linkedin)) && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-full">
                          <a href={speaker.social?.linkedin || speaker.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
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
                        <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-full">
                          <a href={speaker.social?.twitter || speaker.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">
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
        ))}
      </div>
    </div>
  );
}
