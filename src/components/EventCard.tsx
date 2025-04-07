
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface EventCardProps {
  id: string;
  title: string;
  shortName: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  color: string;
}

export function EventCard({
  id,
  title,
  shortName,
  description,
  date,
  location,
  imageUrl,
  color,
}: EventCardProps) {
  return (
    <div className="event-card group h-full">
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className={`absolute inset-0 opacity-60 ${color}`} />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
            {shortName}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          {date} • {location}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-200">{description}</p>
        <Link to={`/events/${id}`}>
          <Button className={color}>View Event</Button>
        </Link>
      </div>
    </div>
  );
}
