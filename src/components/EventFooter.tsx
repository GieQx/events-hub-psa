
import { ParticleBackground } from "@/components/ParticleBackground";

interface EventFooterProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
  };
  eventId: string;
}

export function EventFooter({ event, eventId }: EventFooterProps) {
  const getEventColor = () => {
    switch(eventId) {
      case "rvs": return "rvs-primary";
      case "bms": return "bms-primary";
      case "sm": return "sm-primary";
      case "cs": return "cs-primary";
      default: return "rvs-primary";
    }
  };

  return (
    <footer className="bg-gray-900 py-12 text-white relative">
      <ParticleBackground 
        color="#ffffff" 
        particleCount={50}
        className="opacity-10" 
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">{event?.title}</h3>
            <p className="mb-2">{event?.date}</p>
            <p>{event?.location}</p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className={`hover:text-${getEventColor()}`}>Home</a></li>
              <li><a href="#about" className={`hover:text-${getEventColor()}`}>About</a></li>
              <li><a href="#speakers" className={`hover:text-${getEventColor()}`}>Speakers</a></li>
              <li><a href="#agenda" className={`hover:text-${getEventColor()}`}>Agenda</a></li>
              <li><a href="#topics" className={`hover:text-${getEventColor()}`}>Topics</a></li>
              <li><a href="#guide" className={`hover:text-${getEventColor()}`}>Attendee Guide</a></li>
              <li><a href="#challenge" className={`hover:text-${getEventColor()}`}>Convention Challenge</a></li>
              <li><a href="#resources" className={`hover:text-${getEventColor()}`}>Resources</a></li>
              <li><a href="#faqs" className={`hover:text-${getEventColor()}`}>FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Contact</h3>
            <p className="mb-2">Email: info@{event?.id}summit.example.com</p>
            <p className="mb-4">Phone: +1 (555) 123-4567</p>
            <div className="flex space-x-4">
              <a href="#" className={`text-white hover:text-${getEventColor()}`}>
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={`text-white hover:text-${getEventColor()}`}>
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p>© 2025 {event?.title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
