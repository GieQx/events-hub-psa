
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EventNavigation } from "@/components/EventNavigation";
import { RegistrationButton } from "@/components/RegistrationButton";

interface EventHeaderProps {
  eventId: string;
}

export function EventHeader({ eventId }: EventHeaderProps) {
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
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-white/95 px-6 backdrop-blur-md shadow-sm dark:bg-gray-900/95">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Events Hub</span>
          </Button>
        </Link>
        <EventNavigation 
          eventId={eventId || ""}
          color={getEventColor()}
          className="ml-6"
        />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/admin">
          <Button variant="outline" size="sm">Admin</Button>
        </Link>
        <RegistrationButton eventId={eventId} />
        <ThemeToggle />
      </div>
    </header>
  );
}
