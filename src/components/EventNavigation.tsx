
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EventNavigationProps {
  eventId: string;
  color?: string;
  className?: string;
}

export function EventNavigation({ 
  eventId, 
  color = "rvs-primary",
  className = "" 
}: EventNavigationProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const basePath = `/events/${eventId}`;
  
  const navItems = [
    { path: basePath, label: "Overview" },
    { path: `${basePath}/speakers`, label: "Speakers" },
    { path: `${basePath}/agenda`, label: "Agenda" },
    { path: `${basePath}/topics`, label: "Topics" },
    { path: `${basePath}/resources`, label: "Resources" },
    { path: `${basePath}/guide`, label: "Attendee Guide" },
    { path: `${basePath}/faqs`, label: "FAQs" },
  ];
  
  return (
    <nav className={`flex items-center space-x-1 overflow-x-auto pb-2 ${className}`}>
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Button 
            variant={isActive(item.path) ? "default" : "ghost"} 
            size="sm"
            className={`whitespace-nowrap ${isActive(item.path) ? `bg-${color} hover:bg-${color}/90` : ''}`}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
