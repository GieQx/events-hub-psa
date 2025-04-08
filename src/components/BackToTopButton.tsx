
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface BackToTopButtonProps {
  eventId?: string;
}

export function BackToTopButton({ eventId = "rvs" }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-${getEventColor()} shadow-lg hover:bg-${getEventColor()}/90 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
