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
        location: "San Francisco, CA",
        color: "bg-rvs-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        featured: true,
        published: true
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
        location: "Chicago, IL",
        color: "bg-bms-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        featured: true,
        published: true
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
        location: "Boston, MA",
        color: "bg-sm-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        featured: false,
        published: true
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
        location: "New York, NY",
        color: "bg-cs-primary",
        imageUrl: "/placeholder.svg",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        featured: false,
        published: true
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
        name: "VeriCorp",
        logoUrl: "/placeholder.svg",
        category: "platinum"
      },
      {
        id: "par2",
        eventId: "cbms",
        name: "EngageNow",
        logoUrl: "/placeholder.svg",
        category: "gold"
      },
      {
        id: "par3",
        eventId: "nsm",
        name: "MathIsFun",
        logoUrl: "/placeholder.svg",
        category: "silver"
      },
      {
        id: "par4",
        eventId: "ncs",
        name: "GlobalImpact",
        logoUrl: "/placeholder.svg",
        category: "bronze"
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
