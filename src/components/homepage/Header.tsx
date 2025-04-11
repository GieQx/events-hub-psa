
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="py-6 relative z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Philippine_Statistics_Authority.svg/1059px-Philippine_Statistics_Authority.svg.png" alt="Logo" className="h-8 w-auto mr-2" />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
