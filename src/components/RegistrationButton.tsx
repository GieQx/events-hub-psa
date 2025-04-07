
import { Button } from "@/components/ui/button";

interface RegistrationButtonProps {
  eventId?: string;
}

export function RegistrationButton({ eventId = "rvs" }: RegistrationButtonProps) {
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
    <Button size="lg" className={`bg-${getEventColor()} hover:bg-${getEventColor()}/90`}>
      Register Now
    </Button>
  );
}
