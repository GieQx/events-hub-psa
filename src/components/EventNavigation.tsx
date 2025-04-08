
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
  const navigationCategories = useMemo(() => [
    {
      category: "Overview",
      items: [
        { label: "Home", href: `#hero`, icon: "home" },
        { label: "About", href: `#about`, icon: "info" },
      ]
    },
    {
      category: "Program",
      items: [
        { label: "Speakers", href: `#speakers`, icon: "users" },
        { label: "Agenda", href: `#agenda`, icon: "calendar" },
        { label: "Topics", href: `#topics`, icon: "book" },
        { label: "Challenge", href: `#challenge`, icon: "award" },
      ]
    },
    {
      category: "Resources",
      items: [
        { label: "Attendee Guide", href: `#guide`, icon: "map" },
        { label: "Resources", href: `#resources`, icon: "file-text" },
        { label: "FAQs", href: `#faqs`, icon: "help-circle" },
      ]
    },
  ], []);

  const getActiveClass = (href: string) => {
    return `hover:text-${color} focus:text-${color}`;
  };

  return (
    <NavigationMenu className={cn("hidden lg:flex", className)}>
      <NavigationMenuList className="flex gap-6">
        {navigationCategories.map((category) => (
          <NavigationMenuItem key={category.category}>
            <NavigationMenuTrigger className="text-sm font-medium">
              {category.category}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-4">
                <li className="nav-category px-2">{category.category}</li>
                {category.items.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      className={cn(
                        "block select-none rounded-md p-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        getActiveClass(item.href)
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
