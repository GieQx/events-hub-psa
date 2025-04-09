
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { addToGoogleCalendar } from "@/utils/calendarUtils";

interface RegistrationButtonProps {
  eventId?: string;
  eventDetails?: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export function RegistrationButton({ 
  eventId = "nccrvs", 
  eventDetails 
}: RegistrationButtonProps) {
  // Get the correct event color class
  const getEventColorClass = () => {
    switch(eventId) {
      case "nccrvs": return "bg-rvs-primary hover:bg-rvs-primary/90";
      case "cbms": return "bg-bms-primary hover:bg-bms-primary/90";
      case "nsm": return "bg-sm-primary hover:bg-sm-primary/90";
      case "ncs": return "bg-cs-primary hover:bg-cs-primary/90";
      default: return "bg-rvs-primary hover:bg-rvs-primary/90";
    }
  };

  const handleAddToCalendar = () => {
    if (eventDetails) {
      addToGoogleCalendar(eventDetails);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="lg" className={getEventColorClass()}>
        Register Now
      </Button>
      
      {eventDetails && (
        <Button 
          variant="outline" 
          size="lg"
          onClick={handleAddToCalendar}
          className="flex items-center gap-2"
        >
          <Calendar className="h-5 w-5" />
          Add to Calendar
        </Button>
      )}
    </div>
  );
}
