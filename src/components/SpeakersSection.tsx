
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Linkedin, Twitter } from "lucide-react";

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
}

export function SpeakersSection({ speakers, className = "" }: SpeakersSectionProps) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Featured Speakers</h2>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <div className="mb-4 flex justify-center">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
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
        ))}
      </div>
    </div>
  );
}
