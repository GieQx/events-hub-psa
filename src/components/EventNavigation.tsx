
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface EventNavigationProps {
  eventId: string;
  className?: string;
  color: string;
}

export function EventNavigation({ eventId, className, color }: EventNavigationProps) {
  const navigationLinks = useMemo(() => [
    { label: "Home", href: `#hero`, icon: "home" },
    { label: "About", href: `#about`, icon: "info" },
    { label: "Speakers", href: `#speakers`, icon: "users" },
    { label: "Agenda", href: `#agenda`, icon: "calendar" },
    { label: "Topics", href: `#topics`, icon: "book" },
    { label: "Attendee Guide", href: `#guide`, icon: "map" },
    { label: "Challenge", href: `#challenge`, icon: "award" },
    { label: "Resources", href: `#resources`, icon: "file-text" },
    { label: "FAQs", href: `#faqs`, icon: "help-circle" },
  ], []);

  const getActiveClass = (href: string) => {
    return `hover:text-${color} focus:text-${color}`;
  };

  return (
    <NavigationMenu className={cn("hidden lg:flex", className)}>
      <NavigationMenuList>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            <a 
              href={link.href}
              className={cn(
                navigationMenuTriggerStyle(),
                getActiveClass(link.href),
                "transition-colors duration-200"
              )}
            >
              {link.label}
            </a>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
