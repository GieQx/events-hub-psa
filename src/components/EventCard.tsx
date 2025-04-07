
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  shortName: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  color: string;
  disabled?: boolean;
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
  disabled = false
}: EventCardProps) {
  const Card = () => (
    <div className={`event-card h-full ${color} text-white`}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 text-sm font-medium">{shortName}</div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-sm text-white/80">{description}</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (disabled) {
    return (
      <div className="cursor-not-allowed opacity-70">
        <Card />
      </div>
    );
  }

  return (
    <Link to={`/events/${id}`}>
      <Card />
    </Link>
  );
}
