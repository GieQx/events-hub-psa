import { CMSResource } from "@/types/cms";
import { Resource } from "@/components/types";

// Format agenda data for display
export function formatAgenda(agenda: any[]) {
  const formattedAgenda = agenda.map(day => ({
    date: day.id,
    title: `Day ${day.dayNumber} - ${new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
    events: day.sessions.map(session => ({
      time: `${session.startTime} - ${session.endTime}`,
      title: session.title,
      description: session.description || "",
      speaker: session.speakerId ? 
        session.speakerName || "Speaker TBD" : undefined,
      location: session.location || "",
      type: session.type
    }))
  }));

  return formattedAgenda.length > 0 ? formattedAgenda : [];
}

// Format partners data for display
export function formatPartners(partners: any[]) {
  return partners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logoUrl,
    type: mapPartnerCategory(partner.category)
  }));
}

// Map partner category to display type
export function mapPartnerCategory(category: string): 'sponsor' | 'partner' | 'organizer' {
  switch(category) {
    case 'platinum':
    case 'gold':
      return 'sponsor';
    case 'silver':
    case 'bronze':
      return 'sponsor';
    case 'media':
    case 'community':
      return 'partner';
    default:
      return 'partner';
  }
}

// Format event topics for display
export function formatTopics(topics: any[]) {
  return topics.map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    presenter: topic.description.includes(':') ? topic.description.split(':')[0] : "TBD",
    capacity: 100,
    enrolled: Math.floor(Math.random() * 100),
    type: 'workshop' as const,
    time: "June 15, 10:15 AM",
    location: topic.category || "Main Hall",
  }));
}

// Create venue information object
export function getVenueInfo(event: any) {
  return {
    name: event?.venueName || "Convention Center",
    address: event?.venueAddress || "123 Main St",
    description: event?.venueDescription || "A premier convention facility with state-of-the-art amenities.",
    mapUrl: event?.mapUrl || "",
  };
}

// Create event calendar details object
export function getEventCalendarDetails(event: any) {
  return {
    title: event?.title || "",
    description: event?.description || "",
    location: event?.location || "",
    startDate: event?.eventStartDate || "",
    endDate: event?.eventEndDate || "",
  };
}

// Create hotel information array
export function getHotelInfo() {
  return [
    {
      id: "h1",
      name: "Marriott Marquis",
      distance: "0.2 miles from venue",
      priceRange: "$299-$399/night",
      website: "https://www.example.com",
    },
    {
      id: "h2",
      name: "Hilton San Francisco",
      distance: "0.3 miles from venue",
      priceRange: "$279-$379/night",
      website: "https://www.example.com",
    },
  ];
}

// Create restaurant information array
export function getRestaurantInfo() {
  return [
    {
      id: "r1",
      name: "Urban Bistro",
      cuisine: "American",
      distance: "0.1 miles from venue",
      priceRange: "$$",
    },
    {
      id: "r2",
      name: "Sakura Japanese Restaurant",
      cuisine: "Japanese",
      distance: "0.2 miles from venue",
      priceRange: "$$",
    },
  ];
}

// Format event hero data
export function getHeroEventData(event: any) {
  return {
    id: event.id,
    title: event.title,
    date: event.date || "",
    location: event.location || "",
    longDescription: event.longDescription || "",
    videoUrl: event.videoUrl || "",
    eventStartDate: event.eventStartDate || "",
    eventEndDate: event.eventEndDate || ""
  };
}
