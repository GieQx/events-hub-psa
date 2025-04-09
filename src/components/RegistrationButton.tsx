
import { Button } from "@/components/ui/button";

interface RegistrationButtonProps {
  eventId?: string;
}

export function RegistrationButton({ eventId = "nccrvs" }: RegistrationButtonProps) {
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

  return (
    <Button size="lg" className={getEventColorClass()}>
      Register Now
    </Button>
  );
}
