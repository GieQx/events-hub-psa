
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "@/components/home/FadeInSection";

export const CallToActionSection = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950 py-16">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <FadeInSection>
          <h2 className="mb-4 text-3xl font-bold">Ready to Join an Event?</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Explore our upcoming events and be part of something extraordinary. Connect with industry leaders, 
            expand your knowledge, and grow your network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 w-full sm:w-auto">
                Browse Events
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Admin Panel
              </Button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};
