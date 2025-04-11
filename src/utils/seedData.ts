import { CMSEvent, CMSSpeaker, CMSAgendaDay, CMSAgendaSession, CMSTopic, CMSPartner, CMSFAQ, CMSResource } from "@/types/cms";
import { Challenge } from "@/types/challenge";
import cmsService from "@/services/cmsService";

export const seedDatabaseIfEmpty = () => {
  try {
    const events = cmsService.events.getAll();
    if (events.length === 0) {
      seedEvents();
      seedSpeakers();
      seedAgenda();
      seedTopics();
      seedPartners();
      seedFaqs();
      seedResources();
      seedChallenges();
      seedMarqueeItems();
      seedPressReleases();
      console.log("Seeded database with initial data");
    }
  } catch (error) {
    console.error("Error checking or seeding database:", error);
  }
};

export const seedEvents = (): CMSEvent[] => {
  try {
    const events: CMSEvent[] = [
      {
        id: "nccrvs",
        title: "National Convention on Civil Registration and Vital Statistics",
        shortName: "NCCRVS",
        description: "Explore cutting-edge techniques and best practices in registration and verification systems.",
        longDescription: "Join industry leaders and experts at the National Convention on Civil Registration and Vital Statistics (NCCRVS) for three days of immersive learning, networking, and collaboration. Discover the latest advancements in identity verification, fraud prevention, and seamless registration experiences. This premier event brings together professionals from technology, security, and user experience to shape the future of verification systems.",
        date: "June 15-17, 2026",
        eventStartDate: "2026-06-15",
        eventEndDate: "2026-06-17",
        location: "Manila, Philippines",
        venueName: "Philippine International Convention Center",
        venueAddress: "CCP Complex, Roxas Boulevard, Pasay City, 1307 Metro Manila",
        venueDescription: "The Philippine International Convention Center is the premier international convention center in the Philippines. Located in the Cultural Center of the Philippines Complex in Pasay City, it is a multipurpose venue for conferences, exhibitions, and events.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.722301421481!2d120.97986761535254!3d14.556786382557544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cbf0a1752b5d%3A0xad81f0fb7c8e3a27!2sPhilippine%20International%20Convention%20Center!5e0!3m2!1sen!2sus!4v1648825964877!5m2!1sen!2sus",
        color: "bg-rvs-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        featured: true,
        published: true,
        capacity: 1200,
        registrationUrl: "https://nccrvs-registration.example.com",
        contactEmail: "info@nccrvs.example.com",
        contactPhone: "+63 2 8123 4567",
        socialLinks: {
          facebook: "https://facebook.com/nccrvs",
          twitter: "https://twitter.com/nccrvs",
          instagram: "https://instagram.com/nccrvs"
        }
      },
      {
        id: "cbms",
        title: "National Convention on Community-Based Monitoring System",
        shortName: "CBMS",
        description: "Strengthening community connections through innovative engagement strategies and tools.",
        longDescription: "The National Convention on Community-Based Monitoring System (CBMS) is dedicated to building stronger, more resilient communities through innovative engagement approaches. Learn from community leaders, government officials, and engagement experts about effective strategies for fostering inclusive participation, leveraging technology for outreach, and measuring the impact of community initiatives.",
        date: "September 8-10, 2026",
        eventStartDate: "2026-09-08",
        eventEndDate: "2026-09-10",
        location: "Cebu City, Philippines",
        venueName: "Waterfront Cebu City Hotel",
        venueAddress: "Salinas Dr, Cebu City, 6000 Cebu",
        venueDescription: "The Waterfront Cebu City Hotel is one of the premier venues in Cebu for conferences and conventions, offering state-of-the-art facilities and amenities for all types of events.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3505749648885!2d123.91449431528404!3d10.32135109019345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999d88c0d5e71%3A0x56e256f262b42c08!2sWaterfront%20Cebu%20City%20Hotel%20%26%20Casino!5e0!3m2!1sen!2sus!4v1648825999899!5m2!1sen!2sus",
        color: "bg-bms-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        featured: true,
        published: true,
        capacity: 800,
        registrationUrl: "https://cbms-registration.example.com",
        contactEmail: "info@cbms.example.com",
        contactPhone: "+63 32 8765 4321",
        socialLinks: {
          facebook: "https://facebook.com/cbms",
          twitter: "https://twitter.com/cbms",
          instagram: "https://instagram.com/cbms"
        }
      },
      {
        id: "nsm",
        title: "National Statistics Month",
        shortName: "NSM",
        description: "Celebrating excellence in mathematics education and statistical representation.",
        longDescription: "The National Statistics Month (NSM) brings together educators, media professionals, and mathematicians to celebrate and promote excellence in mathematics education and its representation in media. This unique event features award ceremonies recognizing outstanding contributions, workshops on effective teaching methods, and discussions on improving mathematical literacy through various media channels.",
        date: "November 20-22, 2026",
        eventStartDate: "2026-11-20",
        eventEndDate: "2026-11-22",
        location: "Davao City, Philippines",
        venueName: "SMX Convention Center Davao",
        venueAddress: "SM Lanang Premier, JP Laurel Ave, Davao City, 8000 Davao del Sur",
        venueDescription: "SMX Convention Center Davao is a premier venue for events and conventions in Davao City, offering modern facilities and amenities for conferences, exhibitions, and other large gatherings.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0407872562633!2d125.62879441524602!3d7.098345694873706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f91335368697c9%3A0x15a1d5a6c5c86a0c!2sSMX%20Convention%20Center%20Davao!5e0!3m2!1sen!2sus!4v1648826032177!5m2!1sen!2sus",
        color: "bg-sm-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        featured: false,
        published: true,
        capacity: 600,
        registrationUrl: "https://nsm-registration.example.com",
        contactEmail: "info@nsm.example.com",
        contactPhone: "+63 82 9876 5432",
        socialLinks: {
          facebook: "https://facebook.com/nsm",
          twitter: "https://twitter.com/nsm",
          instagram: "https://instagram.com/nsm"
        }
      },
      {
        id: "ncs",
        title: "National Convention on Statistics",
        shortName: "NCS",
        description: "Driving global impact and social responsibility through collaborative action.",
        longDescription: "The National Convention on Statistics (NCS) is a platform for leaders, innovators, and change-makers committed to advancing the United Nations' Sustainable Development Goals. Through interactive sessions, case studies, and networking opportunities, participants will gain insights into successful sustainability initiatives, form partnerships for collaborative projects, and develop actionable strategies for making a positive impact on our planet and communities.",
        date: "March 5-7, 2027",
        eventStartDate: "2027-03-05",
        eventEndDate: "2027-03-07",
        location: "Baguio City, Philippines",
        venueName: "Baguio Convention Center",
        venueAddress: "Governor Pack Rd, Baguio, 2600 Benguet",
        venueDescription: "The Baguio Convention Center is a renowned venue for events and conferences in the Philippines, offering a comfortable environment for learning and networking in the cool mountain climate of Baguio City.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.737024517642!2d120.59232831530132!3d16.40752403869068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a15ce3c1ec8b%3A0x5642f30f7fda7af8!2sBaguio%20Convention%20Center!5e0!3m2!1sen!2sus!4v1648826073399!5m2!1sen!2sus",
        color: "bg-cs-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        featured: false,
        published: true,
        capacity: 500,
        registrationUrl: "https://ncs-registration.example.com",
        contactEmail: "info@ncs.example.com",
        contactPhone: "+63 74 6543 210",
        socialLinks: {
          facebook: "https://facebook.com/ncs",
          twitter: "https://twitter.com/ncs",
          instagram: "https://instagram.com/ncs"
        }
      },
    ];
    
    localStorage.setItem("cms_events", JSON.stringify(events));
    return events;
  } catch (error) {
    console.error("Error seeding events:", error);
    return [];
  }
};

export const seedSpeakers = (): CMSSpeaker[] => {
  try {
    const speakers: CMSSpeaker[] = [
      {
        id: "spk1",
        eventId: "nccrvs",
        name: "Dr. Jane Smith",
        role: "Chief Data Scientist",
        company: "VeriCorp",
        bio: "Dr. Smith is a leading expert in data verification and identity solutions.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: true,
        socialLinks: {
          twitter: "https://twitter.com/janesmith",
          linkedin: "https://linkedin.com/in/janesmith"
        }
      },
      {
        id: "spk2",
        eventId: "nccrvs",
        name: "John Doe",
        role: "Security Analyst",
        company: "SecureID",
        bio: "John specializes in fraud prevention and security protocols.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: false,
        socialLinks: {
          linkedin: "https://linkedin.com/in/johndoe"
        }
      },
      {
        id: "spk3",
        eventId: "cbms",
        name: "Alice Johnson",
        role: "Community Engagement Officer",
        company: "EngageNow",
        bio: "Alice is passionate about building strong community relationships.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: true,
        socialLinks: {
          twitter: "https://twitter.com/alicejohnson",
          linkedin: "https://linkedin.com/in/alicejohnson"
        }
      },
      {
        id: "spk4",
        eventId: "cbms",
        name: "Bob Williams",
        role: "Data Analyst",
        company: "City Analytics",
        bio: "Bob uses data to drive community improvements.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: false,
        socialLinks: {
          linkedin: "https://linkedin.com/in/bobwilliams"
        }
      },
      {
        id: "spk5",
        eventId: "nsm",
        name: "Dr. Emily White",
        role: "Mathematics Educator",
        company: "MathIsFun",
        bio: "Emily is dedicated to making math accessible and enjoyable for all.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: true,
        socialLinks: {
          twitter: "https://twitter.com/emilywhite",
          linkedin: "https://linkedin.com/in/emilywhite"
        }
      },
      {
        id: "spk6",
        eventId: "nsm",
        name: "Chris Brown",
        role: "Media Consultant",
        company: "MediaMath",
        bio: "Chris helps media outlets represent math accurately and engagingly.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: false,
        socialLinks: {
          linkedin: "https://linkedin.com/in/chrisbrown"
        }
      },
      {
        id: "spk7",
        eventId: "ncs",
        name: "Dr. Susan Green",
        role: "Sustainability Officer",
        company: "GlobalImpact",
        bio: "Susan leads sustainability initiatives for global organizations.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: true,
        socialLinks: {
          twitter: "https://twitter.com/susangreen",
          linkedin: "https://linkedin.com/in/susangreen"
        }
      },
      {
        id: "spk8",
        eventId: "ncs",
        name: "David Black",
        role: "Policy Advisor",
        company: "EcoPolicy",
        bio: "David advises governments on sustainable development policies.",
        imageUrl: "/placeholder.svg",
        photoUrl: "/placeholder.svg",
        featured: false,
        socialLinks: {
          linkedin: "https://linkedin.com/in/davidblack"
        }
      },
    ];
    
    localStorage.setItem("cms_speakers", JSON.stringify(speakers));
    return speakers;
  } catch (error) {
    console.error("Error seeding speakers:", error);
    return [];
  }
};

export const seedAgenda = (): CMSAgendaDay[] => {
  try {
    const agenda: CMSAgendaDay[] = [
      {
        id: "day1",
        eventId: "nccrvs",
        date: "2026-06-15",
        dayNumber: 1,
        sessions: [
          {
            id: "sess1",
            eventId: "nccrvs",
            dayId: "day1",
            title: "Keynote: The Future of Verification",
            startTime: "09:00",
            endTime: "10:00",
            location: "Main Hall",
            speakerId: "spk1",
            type: "talk"
          },
          {
            id: "sess2",
            eventId: "nccrvs",
            dayId: "day1",
            title: "Workshop: Fraud Prevention Techniques",
            startTime: "10:30",
            endTime: "12:00",
            location: "Room 101",
            speakerId: "spk2",
            type: "workshop"
          }
        ]
      },
      {
        id: "day2",
        eventId: "cbms",
        date: "2026-09-08",
        dayNumber: 1,
        sessions: [
          {
            id: "sess3",
            eventId: "cbms",
            dayId: "day2",
            title: "Keynote: Building Stronger Communities",
            startTime: "09:00",
            endTime: "10:00",
            location: "Main Hall",
            speakerId: "spk3",
            type: "talk"
          },
          {
            id: "sess4",
            eventId: "cbms",
            dayId: "day2",
            title: "Workshop: Data-Driven Community Improvement",
            startTime: "10:30",
            endTime: "12:00",
            location: "Room 201",
            speakerId: "spk4",
            type: "workshop"
          }
        ]
      },
      {
        id: "day3",
        eventId: "nsm",
        date: "2026-11-20",
        dayNumber: 1,
        sessions: [
          {
            id: "sess5",
            eventId: "nsm",
            dayId: "day3",
            title: "Keynote: Making Math Fun",
            startTime: "09:00",
            endTime: "10:00",
            location: "Main Hall",
            speakerId: "spk5",
            type: "talk"
          },
          {
            id: "sess6",
            eventId: "nsm",
            dayId: "day3",
            title: "Workshop: Representing Math in Media",
            startTime: "10:30",
            endTime: "12:00",
            location: "Room 301",
            speakerId: "spk6",
            type: "workshop"
          }
        ]
      },
      {
        id: "day4",
        eventId: "ncs",
        date: "2027-03-05",
        dayNumber: 1,
        sessions: [
          {
            id: "sess7",
            eventId: "ncs",
            dayId: "day4",
            title: "Keynote: Global Sustainability Initiatives",
            startTime: "09:00",
            endTime: "10:00",
            location: "Main Hall",
            speakerId: "spk7",
            type: "talk"
          },
          {
            id: "sess8",
            eventId: "ncs",
            dayId: "day4",
            title: "Workshop: Sustainable Development Policies",
            startTime: "10:30",
            endTime: "12:00",
            location: "Room 401",
            speakerId: "spk8",
            type: "workshop"
          }
        ]
      }
    ];
    
    localStorage.setItem("cms_agenda", JSON.stringify(agenda));
    return agenda;
  } catch (error) {
    console.error("Error seeding agenda:", error);
    return [];
  }
};

export const seedTopics = (): CMSTopic[] => {
  try {
    const topics: CMSTopic[] = [
      {
        id: "top1",
        eventId: "nccrvs",
        title: "Advanced Identity Verification",
        description: "Explore the latest techniques in identity verification.",
        category: "Technology"
      },
      {
        id: "top2",
        eventId: "cbms",
        title: "Community Engagement Strategies",
        description: "Learn effective strategies for engaging with communities.",
        category: "Engagement"
      },
      {
        id: "top3",
        eventId: "nsm",
        title: "Mathematics Education",
        description: "Discuss innovative approaches to mathematics education.",
        category: "Education"
      },
      {
        id: "top4",
        eventId: "ncs",
        title: "Sustainable Development Goals",
        description: "Address the UN's Sustainable Development Goals.",
        category: "Sustainability"
      }
    ];
    
    localStorage.setItem("cms_topics", JSON.stringify(topics));
    return topics;
  } catch (error) {
    console.error("Error seeding topics:", error);
    return [];
  }
};

export const seedPartners = (): CMSPartner[] => {
  try {
    const partners: CMSPartner[] = [
      {
        id: "par1",
        eventId: "nccrvs",
        name: "Philippine Statistics Authority",
        logoUrl: "/placeholder.svg",
        category: "platinum",
        website: "https://psa.gov.ph",
        description: "The Philippine Statistics Authority is the central statistical authority of the Philippine government."
      },
      {
        id: "par2",
        eventId: "nccrvs",
        name: "Department of Information and Communications Technology",
        logoUrl: "/placeholder.svg",
        category: "gold",
        website: "https://dict.gov.ph",
        description: "The Department of Information and Communications Technology is the executive department of the Philippine government responsible for the planning, development, and promotion of the country's ICT agenda."
      },
      {
        id: "par3",
        eventId: "cbms",
        name: "Department of the Interior and Local Government",
        logoUrl: "/placeholder.svg",
        category: "platinum",
        website: "https://dilg.gov.ph",
        description: "The Department of the Interior and Local Government is the executive department of the Philippine government responsible for promoting peace and order, ensuring public safety, and strengthening local government capability."
      },
      {
        id: "par4",
        eventId: "cbms",
        name: "Local Government Academy",
        logoUrl: "/placeholder.svg",
        category: "gold",
        website: "https://lga.gov.ph",
        description: "The Local Government Academy is the premier institution for local governance capacity development in the Philippines."
      },
      {
        id: "par5",
        eventId: "nsm",
        name: "Department of Education",
        logoUrl: "/placeholder.svg",
        category: "platinum",
        website: "https://deped.gov.ph",
        description: "The Department of Education is the executive department of the Philippine government responsible for ensuring access to, promoting equity in, and improving the quality of basic education."
      },
      {
        id: "par6",
        eventId: "nsm",
        name: "Mathematical Society of the Philippines",
        logoUrl: "/placeholder.svg",
        category: "gold",
        website: "https://mathsociety.ph",
        description: "The Mathematical Society of the Philippines is a non-profit organization dedicated to promoting mathematics education and research in the Philippines."
      },
      {
        id: "par7",
        eventId: "ncs",
        name: "National Economic and Development Authority",
        logoUrl: "/placeholder.svg",
        category: "platinum",
        website: "https://neda.gov.ph",
        description: "The National Economic and Development Authority is the Philippine government's premier socioeconomic planning body."
      },
      {
        id: "par8",
        eventId: "ncs",
        name: "United Nations Development Programme",
        logoUrl: "/placeholder.svg",
        category: "gold",
        website: "https://undp.org",
        description: "The United Nations Development Programme is the United Nations' global development network, advocating for change and connecting countries to knowledge, experience, and resources to help people build a better life."
      }
    ];
    
    localStorage.setItem("cms_partners", JSON.stringify(partners));
    return partners;
  } catch (error) {
    console.error("Error seeding partners:", error);
    return [];
  }
};

export const seedFaqs = (): CMSFAQ[] => {
  try {
    const faqs: CMSFAQ[] = [
      {
        id: "faq1",
        eventId: "nccrvs",
        question: "What is identity verification?",
        answer: "Identity verification is the process of confirming an individual's identity."
      },
      {
        id: "faq2",
        eventId: "cbms",
        question: "How can I engage with my community?",
        answer: "There are many ways to engage with your community, such as volunteering and attending local events."
      },
      {
        id: "faq3",
        eventId: "nsm",
        question: "Why is mathematics education important?",
        answer: "Mathematics education is crucial for developing problem-solving skills."
      },
      {
        id: "faq4",
        eventId: "ncs",
        question: "What are the Sustainable Development Goals?",
        answer: "The Sustainable Development Goals are a set of global goals adopted by the United Nations."
      }
    ];
    
    localStorage.setItem("cms_faqs", JSON.stringify(faqs));
    return faqs;
  } catch (error) {
    console.error("Error seeding FAQs:", error);
    return [];
  }
};

export const seedResources = (): CMSResource[] => {
  try {
    const resources: CMSResource[] = [
      {
        id: "res1",
        eventId: "nccrvs",
        title: "Identity Verification Guide",
        type: "pdf",
        url: "/placeholder.pdf"
      },
      {
        id: "res2",
        eventId: "cbms",
        title: "Community Engagement Handbook",
        type: "pdf",
        url: "/placeholder.pdf"
      },
       {
        id: "res3",
        eventId: "nsm",
        title: "Mathematics Education Resources",
        type: "pdf",
        url: "/placeholder.pdf"
      },
      {
        id: "res4",
        eventId: "ncs",
        title: "Sustainable Development Report",
        type: "pdf",
        url: "/placeholder.pdf"
      }
    ];
    
    localStorage.setItem("cms_resources", JSON.stringify(resources));
    return resources;
  } catch (error) {
    console.error("Error seeding resources:", error);
    return [];
  }
};

export const seedChallenges = () => {
  try {
    const challenges: Challenge[] = [
      {
        id: "challenge1",
        eventId: "nccrvs",
        title: "Complete Your Profile",
        description: "Add your photo and bio to your profile.",
        steps: [
          {
            id: "step1",
            description: "Add a profile photo",
            points: 50
          },
          {
            id: "step2",
            description: "Write a bio",
            points: 50
          }
        ],
        reward: "Profile Badge",
        active: true
      },
      {
        id: "challenge2",
        eventId: "cbms",
        title: "Attend a Workshop",
        description: "Attend a workshop and provide feedback.",
        steps: [
          {
            id: "step3",
            description: "Attend a workshop",
            points: 75
          },
          {
            id: "step4",
            description: "Provide feedback",
            points: 25
          }
        ],
        reward: "Workshop Badge",
        active: true
      },
    ];
    
    localStorage.setItem("cms_challenges", JSON.stringify(challenges));
    
    return challenges;
  } catch (error) {
    console.error("Error seeding challenges:", error);
    return null;
  }
};

export const seedMarqueeItems = () => {
  try {
    const marqueeItems = [
      {
        id: "marquee1",
        eventId: "nccrvs",
        text: "Early bird registration ends May 1st!",
        link: "/register"
      },
      {
        id: "marquee2",
        eventId: "cbms",
        text: "Keynote speaker announced: Dr. Jane Smith!",
        link: "/speakers"
      }
    ];

    localStorage.setItem("cms_marquee_items", JSON.stringify(marqueeItems));
    return marqueeItems;
  } catch (error) {
    console.error("Error seeding marquee items:", error);
    return null;
  }
};

export const seedPressReleases = () => {
  try {
    const pressReleases = [
      {
        id: "press1",
        eventId: "nccrvs",
        title: "NCCRVS Announces Keynote Speaker",
        publishDate: "2024-04-01",
        summary: "The National Convention on Civil Registration and Vital Statistics is pleased to announce Dr. Jane Smith as a keynote speaker.",
        content: "The National Convention on Civil Registration and Vital Statistics is pleased to announce Dr. Jane Smith as a keynote speaker.",
        author: "Press Team",
        published: true
      },
      {
        id: "press2",
        eventId: "cbms",
        title: "CBMS Announces Early Bird Registration",
        publishDate: "2024-04-15",
        summary: "The National Convention on Community-Based Monitoring System announces early bird registration is now open.",
        content: "The National Convention on Community-Based Monitoring System announces early bird registration is now open.",
        author: "Events Team",
        published: true
      }
    ];

    localStorage.setItem("cms_press_releases", JSON.stringify(pressReleases));
    return pressReleases;
  } catch (error) {
    console.error("Error seeding press releases:", error);
    return null;
  }
};
