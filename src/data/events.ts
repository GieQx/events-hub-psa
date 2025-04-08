
export interface Event {
  id: string;
  title: string;
  shortName: string;
  description: string;
  longDescription: string;
  date: string;
  location: string;
  venueName: string;
  venueAddress: string;
  venueDescription: string;
  mapUrl: string;
  imageUrl: string;
  videoUrl: string;
  color: string;
  gradientClass: string;
  eventStartDate: string;
}

export const events = [
  {
    id: "rvs",
    title: "National Convention on Civil Registration & Vital Statistics",
    shortName: "NCCRVS",
    description: "Explore cutting-edge techniques and best practices in registration and verification systems.",
    longDescription: "Join industry leaders and experts at the National Convention on Civil Registration & Vital Statistics (NCCRVS) for three days of immersive learning, networking, and collaboration. Discover the latest advancements in identity verification, fraud prevention, and seamless registration experiences. This premier event brings together professionals from technology, security, and user experience to shape the future of verification systems.",
    date: "July 28-30, 2025",
    location: "Conference Room",
    venueName: "Convention Center",
    venueAddress: "Events City",
    venueDescription: "The Moscone Center is San Francisco's premier convention and exhibition complex. Located in the heart of the city, this world-class facility offers state-of-the-art amenities and is within walking distance of hotels, shopping, dining, and cultural attractions.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1597406921474!2d-122.40277032357242!3d37.78393571231892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e97646f7%3A0x72c5cb98814ace6!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1712524217753!5m2!1sen!2sus",
    imageUrl: "/placeholder.svg",
    videoUrl: "https://videos.pexels.com/video-files/27946984/12269380_2320_1080_30fps.mp4",
    color: "bg-rvs-primary",
    gradientClass: "hero-gradient-rvs",
    eventStartDate: "2026-06-15T09:00:00",
  },
  {
    id: "bms",
    title: "Community Engagement Conference",
    shortName: "BMS",
    description: "Strengthening community connections through innovative engagement strategies and tools.",
    longDescription: "The Community Engagement Conference (BMS) is dedicated to building stronger, more resilient communities through innovative engagement approaches. Learn from community leaders, government officials, and engagement experts about effective strategies for fostering inclusive participation, leveraging technology for outreach, and measuring the impact of community initiatives.",
    date: "September 8-10, 2026",
    location: "Chicago, IL",
    venueName: "McCormick Place",
    venueAddress: "2301 S King Dr, Chicago, IL 60616",
    venueDescription: "McCormick Place is North America's largest convention center, offering breathtaking views of Lake Michigan and Chicago's skyline. With state-of-the-art facilities and excellent accessibility, it's the perfect venue for this collaborative event.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2972.1474088349696!2d-87.61901192348775!3d41.85121097124183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2b6308ed849f%3A0xb8c3d3991df3878!2sMcCormick%20Place!5e0!3m2!1sen!2sus!4v1712524333487!5m2!1sen!2sus",
    imageUrl: "/placeholder.svg",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    color: "bg-bms-primary",
    gradientClass: "hero-gradient-bms",
    eventStartDate: "2026-09-08T09:00:00",
  },
  {
    id: "sm",
    title: "Media Awards & Mathematics Convention",
    shortName: "SM",
    description: "Celebrating excellence in mathematics education and media representation.",
    longDescription: "The Media Awards & Mathematics Convention (SM) brings together educators, media professionals, and mathematicians to celebrate and promote excellence in mathematics education and its representation in media. This unique event features award ceremonies recognizing outstanding contributions, workshops on effective teaching methods, and discussions on improving mathematical literacy through various media channels.",
    date: "November 20-22, 2026",
    location: "Boston, MA",
    venueName: "Boston Convention and Exhibition Center",
    venueAddress: "415 Summer St, Boston, MA 02210",
    venueDescription: "The Boston Convention and Exhibition Center is an architectural landmark offering breathtaking views of Boston Harbor. This modern facility provides a sophisticated environment for learning and networking, with excellent technical capabilities and amenities.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.856618695702!2d-71.04539792346848!3d42.34655547119171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a828ab98a73%3A0x1ff67a39da02a6c4!2sBoston%20Convention%20and%20Exhibition%20Center!5e0!3m2!1sen!2sus!4v1712524384147!5m2!1sen!2sus",
    imageUrl: "/placeholder.svg",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    color: "bg-sm-primary",
    gradientClass: "hero-gradient-sm",
    eventStartDate: "2026-11-20T09:00:00",
  },
  {
    id: "cs",
    title: "Sustainable Development Goals Forum",
    shortName: "CS",
    description: "Driving global impact and social responsibility through collaborative action.",
    longDescription: "The Sustainable Development Goals Forum (CS) is a platform for leaders, innovators, and change-makers committed to advancing the United Nations' Sustainable Development Goals. Through interactive sessions, case studies, and networking opportunities, participants will gain insights into successful sustainability initiatives, form partnerships for collaborative projects, and develop actionable strategies for making a positive impact on our planet and communities.",
    date: "March 5-7, 2027",
    location: "New York, NY",
    venueName: "Javits Center",
    venueAddress: "429 11th Ave, New York, NY 10001",
    venueDescription: "The Jacob K. Javits Convention Center is a LEED Silver-certified facility committed to sustainability. Located in Manhattan's West Side, the venue features innovative green technology, including a 7-acre green roof that serves as a wildlife habitat and energy-efficient systems that align perfectly with the forum's focus on sustainability.",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2223977949997!2d-74.00398822352826!3d40.75744207127307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259b419563e45%3A0x7e2abf5a7e5ed160!2sJavits%20Center!5e0!3m2!1sen!2sus!4v1712524423794!5m2!1sen!2sus",
    imageUrl: "/placeholder.svg",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    color: "bg-cs-primary",
    gradientClass: "hero-gradient-cs",
    eventStartDate: "2027-03-05T09:00:00",
  },
];

export const getEventById = (id: string) => {
  return events.find((event) => event.id === id);
};
