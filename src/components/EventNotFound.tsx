
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function EventNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Event Not Found</h1>
      <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
      <Link to="/">
        <Button>Return to Events Hub</Button>
      </Link>
    </div>
  );
}
