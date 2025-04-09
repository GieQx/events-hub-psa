
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter } from "lucide-react";

interface SpeakerProfileModalProps {
  speaker: any;
  isOpen: boolean;
  onClose: () => void;
  eventId?: string;
}

export function SpeakerProfileModal({ speaker, isOpen, onClose, eventId = "rvs" }: SpeakerProfileModalProps) {
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

  if (!speaker) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center mb-4">
            <Avatar className={`h-32 w-32 mb-4 border-2 border-${getEventColor()}`}>
              <AvatarImage src={speaker.photoUrl || speaker.imageUrl} alt={speaker.name} />
              <AvatarFallback>{speaker.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <DialogTitle className="text-2xl font-bold">{speaker.name}</DialogTitle>
            <DialogDescription className="text-lg">
              {speaker.role} at {speaker.company}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{speaker.bio}</p>
          </div>
          
          {speaker.presentationTitle && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Presentation</h3>
              <p className="text-gray-700 dark:text-gray-300">{speaker.presentationTitle}</p>
              {speaker.presentationTime && (
                <p className="text-sm text-gray-500 mt-1">{speaker.presentationTime}</p>
              )}
            </div>
          )}
          
          <div className="flex justify-center gap-3 pt-4">
            {((speaker.social?.linkedin) || (speaker.socialLinks?.linkedin)) && (
              <Button variant="outline" size="icon" asChild className="rounded-full">
                <a href={speaker.social?.linkedin || speaker.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            
            {((speaker.social?.twitter) || (speaker.socialLinks?.twitter)) && (
              <Button variant="outline" size="icon" asChild className="rounded-full">
                <a href={speaker.social?.twitter || speaker.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
