
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-4 md:py-6 relative z-20">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white md:text-3xl flex items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Philippine_Statistics_Authority.svg/1059px-Philippine_Statistics_Authority.svg.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
            {!isMobile && <span>PSA Events</span>}
          </h1>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="relative z-50"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            
            {mobileMenuOpen && (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-6 animate-fade-in">
                <Link 
                  to="/" 
                  className="text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/events" 
                  className="text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  to="/admin" 
                  className="text-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-4"
                >
                  ✕
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link to="/events" className="hover:text-primary">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-primary">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
};
