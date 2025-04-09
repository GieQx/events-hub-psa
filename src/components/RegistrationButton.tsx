
import { Button } from "@/components/ui/button";
import { getEventColor, getEventHoverColor } from "@/utils/eventHelpers";

interface RegistrationButtonProps {
  eventId?: string;
}

export function RegistrationButton({ eventId = "nccrvs" }: RegistrationButtonProps) {
  // Get the correct event color classes
  const buttonClassName = `${getEventColor(eventId)} ${getEventHoverColor(eventId)}`;

  return (
    <Button size="lg" className={buttonClassName}>
      Register Now
    </Button>
  );
}
