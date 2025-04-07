
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  eventName: string;
  description: string;
  longDescription: string;
  highlights: string[];
  className?: string;
}

export function AboutSection({ eventName, description, longDescription, highlights, className = "" }: AboutSectionProps) {
  return (
    <div className={`${className} grid gap-8 lg:grid-cols-2`}>
      <div className="animate-fade-in">
        <h2 className="mb-4 text-3xl font-bold">About {eventName}</h2>
        <p className="mb-4 text-lg">{description}</p>
        <p className="mb-6">{longDescription}</p>
        <Button className="mb-4">Learn More</Button>
      </div>
      
      <div className="rounded-xl bg-gray-100 p-6 shadow-md dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-semibold">Event Highlights</h3>
        <ul className="space-y-3">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/20 text-primary">
                <span>{index + 1}</span>
              </div>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
