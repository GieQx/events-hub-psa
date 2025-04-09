
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface FloatingScrollDownButtonProps {
  eventId?: string;
  targetSection?: string;
}

export function FloatingScrollDownButton({ 
  eventId = "nccrvs", 
  targetSection = "#about" 
}: FloatingScrollDownButtonProps) {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide button after scrolling down 300px
      setShowButton(window.scrollY < 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getEventColorClass = () => {
    switch(eventId) {
      case "nccrvs": return "bg-rvs-primary hover:bg-rvs-primary/80";
      case "cbms": return "bg-bms-primary hover:bg-bms-primary/80";
      case "nsm": return "bg-sm-primary hover:bg-sm-primary/80";
      case "ncs": return "bg-cs-primary hover:bg-cs-primary/80";
      default: return "bg-rvs-primary hover:bg-rvs-primary/80";
    }
  };

  const scrollToSection = () => {
    const element = document.querySelector(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Only show on desktop
  const isDesktop = window.innerWidth >= 768;

  if (!isDesktop || !showButton) return null;

  return (
    <button
      onClick={scrollToSection}
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${getEventColorClass()} text-white ${showButton ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
      aria-label="Scroll Down"
    >
      <ChevronDown className="h-6 w-6 animate-bounce" />
    </button>
  );
}
