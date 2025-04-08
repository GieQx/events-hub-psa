
export const rvsNewsUpdates = [
  "Early bird registration now open for RVS 2026! Save 20% until December 31.",
  "Just announced: Keynote speaker Dr. Emma Chen, CTO of VerifyNow, will present on next-gen biometric verification.",
  "New workshop added: 'Privacy-Preserving Verification Methods' - Limited seats available!",
  "Call for speakers extended to November 15. Submit your proposal today!",
  "Hotel block at the Hilton San Francisco now available at special rates for RVS attendees.",
  "Join us for the pre-conference networking mixer on June 14, 2026.",
  "Exhibitor spaces selling quickly - secure your booth today!",
];

export const rvsAgenda = [
  {
    date: "day1",
    title: "Day 1 - June 15",
    events: [
      {
        time: "8:00 AM - 9:00 AM",
        title: "Registration & Welcome Breakfast",
        location: "Main Lobby",
        type: "break" as const,
      },
      {
        time: "9:00 AM - 10:00 AM",
        title: "Opening Keynote: The Future of Verification",
        speaker: "Dr. Emma Chen, CTO of VerifyNow",
        description: "Exploring emerging trends and technologies shaping the future of identity verification.",
        location: "Grand Ballroom",
        type: "keynote" as const,
      },
      {
        time: "10:15 AM - 11:45 AM",
        title: "Panel: Balancing Security and User Experience",
        speaker: "Industry Leaders Panel",
        description: "Distinguished experts discuss the delicate balance between robust security measures and frictionless user experiences.",
        location: "Summit Hall A",
        type: "panel" as const,
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Networking Lunch",
        location: "Garden Terrace",
        type: "break" as const,
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Workshop: Implementing OAuth 2.0 and OpenID Connect",
        speaker: "Marcus Johnson, Auth0",
        description: "Hands-on session covering implementation strategies and best practices for modern authentication protocols.",
        location: "Workshop Room 1",
        type: "workshop" as const,
      },
      {
        time: "3:15 PM - 4:45 PM",
        title: "Concurrent Sessions",
        description: "Choose from specialized tracks on Biometric Verification, Multi-factor Authentication, or Regulatory Compliance.",
        location: "Various Rooms",
        type: "workshop" as const,
      },
      {
        time: "5:00 PM - 7:00 PM",
        title: "Welcome Reception & Networking",
        description: "Join fellow attendees for drinks, hors d'oeuvres, and meaningful connections.",
        location: "Skyline Lounge",
        type: "break" as const,
      },
    ],
  },
  {
    date: "day2",
    title: "Day 2 - June 16",
    events: [
      {
        time: "8:30 AM - 9:00 AM",
        title: "Morning Coffee & Networking",
        location: "Exhibition Hall",
        type: "break" as const,
      },
      {
        time: "9:00 AM - 10:00 AM",
        title: "Keynote: Zero Trust Architecture for Modern Registration Systems",
        speaker: "Sophia Williams, CISO at SecureID",
        description: "How zero trust principles are revolutionizing registration security frameworks.",
        location: "Grand Ballroom",
        type: "keynote" as const,
      },
      {
        time: "10:15 AM - 11:45 AM",
        title: "Workshop: Privacy-Preserving Verification Methods",
        speaker: "Dr. Alex Rivera, Privacy Engineer",
        description: "Practical techniques for implementing verification while respecting user privacy and regulatory requirements.",
        location: "Workshop Room 2",
        type: "workshop" as const,
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Lunch & Poster Sessions",
        description: "Explore innovative research and upcoming solutions while enjoying lunch.",
        location: "Exhibition Hall",
        type: "break" as const,
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Case Studies: Success Stories and Lessons Learned",
        speaker: "Various Industry Practitioners",
        description: "Real-world implementation stories highlighting successes, challenges, and key takeaways.",
        location: "Summit Hall B",
        type: "panel" as const,
      },
      {
        time: "3:15 PM - 4:45 PM",
        title: "Hackathon Kickoff: Solving Verification Challenges",
        description: "Form teams and begin working on innovative solutions to predefined verification challenges.",
        location: "Innovation Lab",
        type: "workshop" as const,
      },
      {
        time: "6:00 PM - 9:00 PM",
        title: "Gala Dinner & Industry Awards",
        description: "Celebrating excellence and innovation in the registration and verification industry.",
        location: "Grand Ballroom",
        type: "break" as const,
      },
    ],
  },
  {
    date: "day3",
    title: "Day 3 - June 17",
    events: [
      {
        time: "8:30 AM - 9:00 AM",
        title: "Breakfast & Final Networking",
        location: "Exhibition Hall",
        type: "break" as const,
      },
      {
        time: "9:00 AM - 10:00 AM",
        title: "Emerging Technologies Showcase",
        description: "Live demonstrations of cutting-edge verification technologies from selected vendors and startups.",
        location: "Innovation Pavilion",
        type: "workshop" as const,
      },
      {
        time: "10:15 AM - 11:45 AM",
        title: "Panel: The Future of Digital Identity",
        speaker: "Cross-Industry Expert Panel",
        description: "Discussing the evolution of digital identity standards, self-sovereign identity, and decentralized verification.",
        location: "Summit Hall A",
        type: "panel" as const,
      },
      {
        time: "12:00 PM - 1:30 PM",
        title: "Lunch & Hackathon Presentations",
        description: "Teams present their solutions to the verification challenges introduced on Day 2.",
        location: "Grand Ballroom",
        type: "break" as const,
      },
      {
        time: "1:30 PM - 3:00 PM",
        title: "Workshop: Building Accessible Registration Systems",
        speaker: "Jamie Garcia, Accessibility Specialist",
        description: "Best practices for ensuring registration and verification systems are accessible to all users.",
        location: "Workshop Room 1",
        type: "workshop" as const,
      },
      {
        time: "3:15 PM - 4:30 PM",
        title: "Closing Keynote: The Road Ahead",
        speaker: "Dr. Michael Foster, Identity Standards Advocate",
        description: "A forward-looking perspective on the future of registration and verification, with insights for preparing your organization.",
        location: "Grand Ballroom",
        type: "keynote" as const,
      },
      {
        time: "4:30 PM - 5:00 PM",
        title: "Closing Remarks & Conference Highlights",
        description: "Recap of key takeaways and announcement of RVS 2027.",
        location: "Grand Ballroom",
        type: "break" as const,
      },
    ],
  },
];

export const rvsPartners = [
  {
    id: "org1",
    name: "Verification Institute",
    logo: "/placeholder.svg",
    type: "organizer" as const,
  },
  {
    id: "org2",
    name: "Global Identity Foundation",
    logo: "/placeholder.svg",
    type: "organizer" as const,
  },
  {
    id: "sp1",
    name: "SecureID Solutions",
    logo: "/placeholder.svg",
    type: "sponsor" as const,
  },
  {
    id: "sp2",
    name: "VerifyNow",
    logo: "/placeholder.svg",
    type: "sponsor" as const,
  },
  {
    id: "sp3",
    name: "AuthTech Inc.",
    logo: "/placeholder.svg",
    type: "sponsor" as const,
  },
  {
    id: "sp4",
    name: "TrustCheck Systems",
    logo: "/placeholder.svg",
    type: "sponsor" as const,
  },
  {
    id: "p1",
    name: "Digital Identity Alliance",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
  {
    id: "p2",
    name: "Privacy First Foundation",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
  {
    id: "p3",
    name: "Auth Standards Group",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
  {
    id: "p4",
    name: "Biometrics Association",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
  {
    id: "p5",
    name: "Tech Security Council",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
  {
    id: "p6",
    name: "User Experience Guild",
    logo: "/placeholder.svg",
    type: "partner" as const,
  },
];

export const rvsTopics = [
  {
    id: "t1",
    title: "Next-Gen Biometric Authentication",
    description: "Explore the latest advancements in biometric verification, from facial recognition to behavioral biometrics.",
    presenter: "Dr. Maya Patel",
    capacity: 120,
    enrolled: 75,
    type: "plenary" as const,
    time: "June 15, 10:15 AM",
    location: "Summit Hall A",
  },
  {
    id: "t2",
    title: "Zero Knowledge Proofs for Identity Verification",
    description: "Discover how zero knowledge proofs can enable privacy-preserving verification without revealing sensitive data.",
    presenter: "Prof. David Cohen",
    capacity: 80,
    enrolled: 65,
    type: "breakout" as const,
    time: "June 15, 1:30 PM",
    location: "Workshop Room 3",
  },
  {
    id: "t3",
    title: "Building Scalable Registration Systems",
    description: "Best practices for designing registration systems that can handle millions of users while maintaining performance and security.",
    presenter: "Sarah Johnson",
    capacity: 60,
    enrolled: 45,
    type: "workshop" as const,
    time: "June 16, 10:15 AM",
    location: "Tech Lab 1",
  },
  {
    id: "t4",
    title: "Combating Account Takeover Fraud",
    description: "Strategies and tools for preventing and detecting account takeover attempts in real-time.",
    presenter: "Michael Rodriguez",
    capacity: 100,
    enrolled: 100,
    type: "breakout" as const,
    time: "June 16, 3:15 PM",
    location: "Summit Hall B",
  },
  {
    id: "t5",
    title: "Self-Sovereign Identity: Implementation Guide",
    description: "A hands-on guide to implementing SSI solutions using decentralized identifiers and verifiable credentials.",
    presenter: "Emma Wilson",
    capacity: 50,
    enrolled: 42,
    type: "workshop" as const,
    time: "June 17, 9:00 AM",
    location: "Workshop Room 2",
  },
  {
    id: "t6",
    title: "Regulatory Compliance in Identity Verification",
    description: "Navigating the complex landscape of KYC, AML, GDPR, and other regulatory requirements for verification systems.",
    presenter: "Thomas Gardner, Esq.",
    capacity: 80,
    enrolled: 35,
    type: "breakout" as const,
    time: "June 17, 1:30 PM",
    location: "Summit Hall A",
  },
  {
    id: "t7",
    title: "Multi-Factor Authentication Best Practices",
    description: "Design considerations and implementation strategies for effective multi-factor authentication experiences.",
    presenter: "Lisa Chen",
    capacity: 70,
    enrolled: 55,
    type: "workshop" as const,
    time: "June 15, 3:15 PM",
    location: "Tech Lab 2",
  },
  {
    id: "t8",
    title: "Innovations in Document Verification",
    description: "Latest technologies for authenticating identity documents, detecting forgeries, and streamlining verification.",
    presenter: "Dr. James Monroe",
    capacity: 65,
    enrolled: 30,
    type: "poster" as const,
    time: "June 16, 12:00 PM",
    location: "Exhibition Hall",
  },
  {
    id: "t9",
    title: "Accessible Authentication Design",
    description: "Creating verification systems that are usable by people with disabilities while maintaining security.",
    presenter: "Jamie Garcia",
    capacity: 60,
    enrolled: 25,
    type: "poster" as const,
    time: "June 16, 12:00 PM",
    location: "Exhibition Hall",
  },
];

export const rvsVenueInfo = {
  name: "Moscone Center",
  address: "747 Howard St, San Francisco, CA 94103",
  description: "The Moscone Center is San Francisco's premier convention and exhibition complex. Located in the heart of the city, this world-class facility offers state-of-the-art amenities and is within walking distance of hotels, shopping, dining, and cultural attractions.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1597406921474!2d-122.40277032357242!3d37.78393571231892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e97646f7%3A0x72c5cb98814ace6!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1712524217753!5m2!1sen!2sus",
};

export const rvsHotels = [
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
  {
    id: "h3",
    name: "InterContinental",
    distance: "0.4 miles from venue",
    priceRange: "$319-$429/night",
    website: "https://www.example.com",
  },
  {
    id: "h4",
    name: "Hotel Zetta",
    distance: "0.5 miles from venue",
    priceRange: "$259-$349/night",
    website: "https://www.example.com",
  },
];

export const rvsRestaurants = [
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
    distance: "0.3 miles from venue",
    priceRange: "$$$",
  },
  {
    id: "r3",
    name: "Bella Italia",
    cuisine: "Italian",
    distance: "0.4 miles from venue",
    priceRange: "$$$",
  },
  {
    id: "r4",
    name: "Spice Route",
    cuisine: "Indian",
    distance: "0.5 miles from venue",
    priceRange: "$$",
  },
  {
    id: "r5",
    name: "Green Garden",
    cuisine: "Vegetarian",
    distance: "0.3 miles from venue",
    priceRange: "$$",
  },
  {
    id: "r6",
    name: "Taco Corner",
    cuisine: "Mexican",
    distance: "0.2 miles from venue",
    priceRange: "$",
  },
];

export const rvsFaqs = [
  {
    question: "What's included in the registration fee?",
    answer: "The registration fee includes access to all keynotes, sessions, workshops, exhibition area, networking events, lunches, and refreshment breaks. The gala dinner on Day 2 is also included for full conference registrants.",
  },
  {
    question: "Is there a dress code for the event?",
    answer: "Business casual attire is recommended for the conference sessions. For the Gala Dinner on Day 2, business formal attire is suggested.",
  },
  {
    question: "Will sessions be recorded?",
    answer: "Yes, most sessions will be recorded and made available to registered attendees for 60 days after the event. Some workshops may not be recorded due to their interactive nature.",
  },
  {
    question: "Is Wi-Fi available at the venue?",
    answer: "Yes, complimentary high-speed Wi-Fi will be available throughout the conference venue for all attendees.",
  },
  {
    question: "What's the cancellation policy?",
    answer: "Cancellations received 60 days or more before the event are eligible for a full refund minus a $50 processing fee. Cancellations within 30-59 days will receive a 50% refund. No refunds are available for cancellations less than 30 days before the event, but substitutions are allowed.",
  },
  {
    question: "Are there vegetarian/vegan food options?",
    answer: "Yes, vegetarian, vegan, and other dietary options will be available. Please indicate your dietary requirements during registration.",
  },
];

export const rvsChallenge = {
  id: "rvsChallenge2026",
  title: "RVS Identity Explorer Challenge",
  description: "Complete verification-related tasks throughout the conference to earn points and win exclusive prizes!",
  steps: [
    {
      id: "step1",
      description: "Attend the Opening Keynote",
      points: 10,
    },
    {
      id: "step2",
      description: "Visit at least 5 exhibitor booths",
      points: 15,
    },
    {
      id: "step3",
      description: "Participate in a workshop session",
      points: 20,
    },
    {
      id: "step4",
      description: "Connect with 3 new professionals on LinkedIn",
      points: 15,
    },
    {
      id: "step5",
      description: "Share a takeaway on social media with #RVS2026",
      points: 10,
    },
    {
      id: "step6",
      description: "Complete the biometric demonstration at the Innovation Pavilion",
      points: 25,
    },
  ],
  reward: "Exclusive access to post-conference virtual workshops and certification opportunity",
};

export const rvsResources = [
  {
    id: "res1",
    title: "Event Program",
    description: "Complete conference schedule and session details",
    type: "brochure" as const,
    fileSize: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "res2",
    title: "Speaker Profiles",
    description: "Backgrounds and expertise of all presenters",
    type: "brochure" as const,
    fileSize: "3.7 MB",
    downloadUrl: "#",
  },
  {
    id: "res3",
    title: "Verification Standards Guide",
    description: "Overview of current identity verification standards",
    type: "paper" as const,
    fileSize: "1.2 MB",
    downloadUrl: "#",
  },
  {
    id: "res4",
    title: "Venue Map",
    description: "Detailed floor plans of the conference venue",
    type: "schedule" as const,
    fileSize: "1.8 MB",
    downloadUrl: "#",
  },
  {
    id: "res5",
    title: "Authentication Methods Comparison",
    description: "Analysis of various authentication approaches",
    type: "paper" as const,
    fileSize: "950 KB",
    downloadUrl: "#",
  },
  {
    id: "res6",
    title: "Keynote Presentation Slides",
    description: "Slides from the opening keynote session",
    type: "presentation" as const,
    fileSize: "5.2 MB",
    downloadUrl: "#",
  },
];

export const rvsChatbotOptions = [
  {
    id: "co1",
    text: "What sessions are available?",
    responses: ["You can find information about all sessions in the Agenda section. We have keynotes, panel discussions, workshops, and more spread across the three days."],
    followUp: [
      {
        id: "co1-1",
        text: "When is the opening keynote?",
        responses: ["The opening keynote by Dr. Emma Chen is scheduled for Day 1 (June 15) from 9:00 AM to 10:00 AM in the Grand Ballroom."],
      },
      {
        id: "co1-2",
        text: "How do I enroll in workshops?",
        responses: ["You can enroll in workshops through the Topics section on the event page. Simply browse the available sessions and click the 'Enroll' button to register for the ones you're interested in."],
      },
      {
        id: "co1-3",
        text: "Back to main menu",
        responses: ["What else would you like to know about the RVS event?"],
      },
    ],
  },
  {
    id: "co2",
    text: "Where is the event located?",
    responses: ["The Registration & Verification Summit (RVS) will be held at the Moscone Center, located at 747 Howard St, San Francisco, CA 94103. You can find more details including maps in the Attendee Guide section."],
    followUp: [
      {
        id: "co2-1",
        text: "What hotels are nearby?",
        responses: ["Several hotels are within walking distance of the venue, including the Marriott Marquis (0.2 miles), Hilton San Francisco (0.3 miles), InterContinental (0.4 miles), and Hotel Zetta (0.5 miles). Special rates are available for attendees."],
      },
      {
        id: "co2-2",
        text: "Is parking available?",
        responses: ["Yes, the Moscone Center has several parking garages nearby. The closest is the Moscone Center Garage at 255 3rd Street. Daily rates are approximately $30-40. We recommend ride-sharing or public transit as alternatives."],
      },
      {
        id: "co2-3",
        text: "Back to main menu",
        responses: ["What else would you like to know about the RVS event?"],
      },
    ],
  },
  {
    id: "co3",
    text: "How do I register for the event?",
    responses: ["You can register for the event by clicking the 'Register Now' button at the top of the page. Early bird registration is available until December 31, offering a 20% discount on all ticket types."],
    followUp: [
      {
        id: "co3-1",
        text: "What's included in registration?",
        responses: ["Registration includes access to all keynotes, sessions, workshops, exhibition area, networking events, lunches, and refreshment breaks. The gala dinner on Day 2 is also included for full conference registrants."],
      },
      {
        id: "co3-2",
        text: "What's the cancellation policy?",
        responses: ["Cancellations received 60 days or more before the event are eligible for a full refund minus a $50 processing fee. Cancellations within 30-59 days will receive a 50% refund. No refunds are available for cancellations less than 30 days before the event, but substitutions are allowed."],
      },
      {
        id: "co3-3",
        text: "Back to main menu",
        responses: ["What else would you like to know about the RVS event?"],
      },
    ],
  },
  {
    id: "co4",
    text: "Tell me about the convention challenge",
    responses: ["The RVS Identity Explorer Challenge is a fun way to engage with the conference! Complete various tasks like attending keynotes, visiting exhibitor booths, and participating in workshops to earn points. Complete all steps to receive exclusive access to post-conference virtual workshops and certification opportunities."],
    followUp: [
      {
        id: "co4-1",
        text: "How do I track my progress?",
        responses: ["You can track your progress on the Convention Challenge section of the event page. Simply check off the tasks as you complete them to see your points accumulate."],
      },
      {
        id: "co4-2",
        text: "What's the prize for completing the challenge?",
        responses: ["Completing the challenge grants you exclusive access to post-conference virtual workshops and a special certification opportunity that's only available to challenge winners."],
      },
      {
        id: "co4-3",
        text: "Back to main menu",
        responses: ["What else would you like to know about the RVS event?"],
      },
    ],
  },
];
