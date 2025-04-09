
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";

interface BackToTopButtonProps {
  eventId?: string;
}

export function BackToTopButton({ eventId = "rvs" }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  const eventColor = getEventColor(eventId);

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`fixed bottom-24 right-6 h-14 w-14 rounded-full bg-${eventColor} shadow-lg hover:bg-${eventColor}/90 transition-opacity z-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
