
import { Card, CardContent } from "@/components/ui/card";
import { Speaker } from "@/components/types";
import { Twitter, Linkedin } from "lucide-react";

interface KeySpeakersProps {
  speakers: Speaker[];
  eventId?: string;
  className?: string;
}

export function KeySpeakers({ speakers, eventId = "rvs", className = "" }: KeySpeakersProps) {
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
      <h2 className="mb-8 text-center text-3xl font-bold">Key Speakers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className={`overflow-hidden border-b-4 border-${getEventColor()} transition-all duration-300 hover:shadow-lg`}>
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              {speaker.photoUrl ? (
                <img
                  src={speaker.photoUrl}
                  alt={speaker.name}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className={`flex h-full w-full items-center justify-center bg-${getEventColor()}/10`}>
                  <span className="text-2xl font-bold text-gray-400">
                    {speaker.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <h3 className="mb-1 text-xl font-bold">{speaker.name}</h3>
              <p className={`mb-3 text-sm font-medium text-${getEventColor()}`}>
                {speaker.role}, {speaker.company}
              </p>
              
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {speaker.bio}
              </p>
              
              {speaker.social && (
                <div className="mt-4 flex space-x-3">
                  {speaker.social.twitter && (
                    <a
                      href={speaker.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-blue-400"
                      aria-label={`${speaker.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.social.linkedin && (
                    <a
                      href={speaker.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-blue-700"
                      aria-label={`${speaker.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
