
import { Button } from "@/components/ui/button";
import { getEventColor, getEventHoverColor } from "@/utils/eventHelpers";

interface RegistrationButtonProps {
  eventId?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function RegistrationButton({ 
  eventId = "nccrvs", 
  onClick,
  children = "Register Now"
}: RegistrationButtonProps) {
  // Get the correct event color classes
  const buttonClassName = `${getEventColor(eventId)} ${getEventHoverColor(eventId)} text-white`;

  return (
    <Button 
      size="lg" 
      className={buttonClassName}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
