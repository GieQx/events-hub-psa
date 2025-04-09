
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { addToGoogleCalendar } from "@/utils/calendarUtils";
import { getEventColor, getEventHoverColor } from "@/utils/eventHelpers";

interface GoogleCalendarButtonProps {
  eventDetails: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  eventId?: string;
  variant?: "default" | "outline";
}

export function GoogleCalendarButton({ 
  eventDetails, 
  eventId = "nccrvs",
  variant = "outline"
}: GoogleCalendarButtonProps) {
  const handleAddToCalendar = () => {
    addToGoogleCalendar(eventDetails);
  };

  // Get color classes based on the variant
  const getColorClasses = () => {
    if (variant === "outline") {
      return `border-white text-white hover:bg-white/10`;
    } else {
      return `${getEventColor(eventId)} ${getEventHoverColor(eventId)} text-white`;
    }
  };

  return (
    <Button 
      size="lg" 
      variant={variant}
      className={getColorClasses()}
      onClick={handleAddToCalendar}
    >
      <Calendar className="mr-2 h-5 w-5" />
      Add to Calendar
    </Button>
  );
}
