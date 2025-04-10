
/**
 * A simple client-side CMS service that manages content in localStorage
 * Note: In a production app, this would connect to a real backend
 */

const LOCAL_STORAGE_KEYS = {
  EVENTS: "cms_events",
  HOME_CONTENT: "cms_home_content",
  SPEAKERS: "cms_speakers",
  SESSIONS: "cms_sessions",
  RESOURCES: "cms_resources",
  MARQUEE_ITEMS: "cms_marquee_items",
  PRESS_RELEASES: "cms_press_releases",
  AGENDA: "cms_agenda",
  CHALLENGES: "cms_challenges",
  PARTNERS: "cms_partners",
  TOPICS: "cms_topics",
  FAQS: "cms_faqs"
};

// Initialize service
const initService = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  // Events service
  const eventsService = {
    getAll: () => {
      try {
        const eventsJson = localStorage.getItem(LOCAL_STORAGE_KEYS.EVENTS);
        return eventsJson ? JSON.parse(eventsJson) : [];
      } catch (error) {
        console.error("Error loading events:", error);
        return [];
      }
    },
    
    getPublished: () => {
      try {
        const events = eventsService.getAll();
        return events.filter((event: any) => event.published);
      } catch (error) {
        console.error("Error loading published events:", error);
        return [];
      }
    },
    
    get: (id: string) => {
      try {
        const events = eventsService.getAll();
        return events.find((event: any) => event.id === id);
      } catch (error) {
        console.error(`Error loading event ${id}:`, error);
        return null;
      }
    },
    
    getById: (id: string) => {
      return eventsService.get(id);
    },
    
    create: (eventData: any) => {
      try {
        const events = eventsService.getAll();
        events.push(eventData);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
        return eventData;
      } catch (error) {
        console.error("Error creating event:", error);
        return null;
      }
    },
    
    update: (id: string, eventData: any) => {
      try {
        let events = eventsService.getAll();
        const index = events.findIndex((event: any) => event.id === id);
        
        if (index !== -1) {
          events[index] = { ...eventData };
          localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
          return events[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating event ${id}:`, error);
        return null;
      }
    },
    
    delete: (id: string) => {
      try {
        let events = eventsService.getAll();
        events = events.filter((event: any) => event.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.EVENTS, JSON.stringify(events));
        return true;
      } catch (error) {
        console.error(`Error deleting event ${id}:`, error);
        return false;
      }
    }
  };

  // Home content service
  const homeContentService = {
    get: () => {
      try {
        const contentJson = localStorage.getItem(LOCAL_STORAGE_KEYS.HOME_CONTENT);
        if (contentJson) {
          return JSON.parse(contentJson);
        }
        
        // Default structure if nothing exists
        return {
          heroTitle: "Discover Premier Conventions for Professionals",
          heroSubtitle: "Join us at these industry-leading events featuring experts, cutting-edge insights, and valuable networking opportunities.",
          heroBackgroundStyle: "bg-gradient-to-r from-blue-500 to-purple-600",
          upcomingEventsTitle: "Mark Your Calendar",
          upcomingEventsSubtitle: "Don't miss these opportunities to connect with industry leaders and enhance your professional skills",
          featuredEvents: [],
          testimonials: []
        };
      } catch (error) {
        console.error("Error loading home content:", error);
        return null;
      }
    },
    
    update: (contentData: any) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.HOME_CONTENT, JSON.stringify(contentData));
        return contentData;
      } catch (error) {
        console.error("Error updating home content:", error);
        return null;
      }
    }
  };

  // Base service factory function to create standardized services
  const createBaseService = (storageKey: string, serviceName: string) => {
    return {
      items: [],
      
      getAll: function() {
        try {
          const itemsJson = localStorage.getItem(storageKey);
          return itemsJson ? JSON.parse(itemsJson) : this.items;
        } catch (error) {
          console.error(`Error loading ${serviceName}:`, error);
          return this.items;
        }
      },
      
      getByEvent: function(eventId: string) {
        try {
          const items = this.getAll();
          return items.filter((item: any) => item.eventId === eventId);
        } catch (error) {
          console.error(`Error loading ${serviceName} for event ${eventId}:`, error);
          return [];
        }
      },
      
      getByEventId: function(eventId: string) {
        return this.getByEvent(eventId);
      },
      
      get: function(id: string) {
        try {
          const items = this.getAll();
          return items.find((item: any) => item.id === id);
        } catch (error) {
          console.error(`Error loading ${serviceName} ${id}:`, error);
          return null;
        }
      },
      
      create: function(data: any) {
        try {
          const items = this.getAll();
          items.push(data);
          localStorage.setItem(storageKey, JSON.stringify(items));
          this.items = items;
          return data;
        } catch (error) {
          console.error(`Error creating ${serviceName}:`, error);
          return null;
        }
      },
      
      update: function(id: string, data: any) {
        try {
          let items = this.getAll();
          const index = items.findIndex((item: any) => item.id === id);
          
          if (index !== -1) {
            items[index] = { ...data };
            localStorage.setItem(storageKey, JSON.stringify(items));
            this.items = items;
            return items[index];
          }
          
          return null;
        } catch (error) {
          console.error(`Error updating ${serviceName} ${id}:`, error);
          return null;
        }
      },
      
      delete: function(id: string) {
        try {
          let items = this.getAll();
          items = items.filter((item: any) => item.id !== id);
          localStorage.setItem(storageKey, JSON.stringify(items));
          this.items = items;
          return true;
        } catch (error) {
          console.error(`Error deleting ${serviceName} ${id}:`, error);
          return false;
        }
      }
    };
  };

  // Speakers service
  const speakersService = {
    ...createBaseService(LOCAL_STORAGE_KEYS.SPEAKERS, "speakers"),
    
    getFeatured: function(eventId: string) {
      try {
        const speakers = this.getByEvent(eventId);
        return speakers.filter((speaker: any) => speaker.featured);
      } catch (error) {
        console.error(`Error loading featured speakers for event ${eventId}:`, error);
        return [];
      }
    }
  };

  // Sessions service
  const sessionsService = createBaseService(LOCAL_STORAGE_KEYS.SESSIONS, "sessions");

  // Resources service
  const resourcesService = createBaseService(LOCAL_STORAGE_KEYS.RESOURCES, "resources");

  // Marquee items service
  const marqueeItemsService = createBaseService(LOCAL_STORAGE_KEYS.MARQUEE_ITEMS, "marquee items");

  // Press releases service
  const pressReleasesService = {
    ...createBaseService(LOCAL_STORAGE_KEYS.PRESS_RELEASES, "press releases"),
  };
  
  // Agenda service
  const agendaService = createBaseService(LOCAL_STORAGE_KEYS.AGENDA, "agenda");
  
  // Challenges service
  const challengesService = {
    ...createBaseService(LOCAL_STORAGE_KEYS.CHALLENGES, "challenges"),
    
    getActive: function(eventId: string) {
      try {
        const challenges = this.getByEvent(eventId);
        return challenges.filter((challenge: any) => challenge.active);
      } catch (error) {
        console.error(`Error loading active challenges for event ${eventId}:`, error);
        return [];
      }
    }
  };
  
  // Partners service
  const partnersService = createBaseService(LOCAL_STORAGE_KEYS.PARTNERS, "partners");
  
  // Topics service
  const topicsService = createBaseService(LOCAL_STORAGE_KEYS.TOPICS, "topics");
  
  // FAQs service
  const faqsService = createBaseService(LOCAL_STORAGE_KEYS.FAQS, "faqs");

  return {
    events: eventsService,
    homeContent: homeContentService,
    speakers: speakersService,
    sessions: sessionsService,
    resources: resourcesService,
    marqueeItems: marqueeItemsService,
    pressReleases: pressReleasesService,
    agenda: agendaService,
    challenges: challengesService,
    partners: partnersService,
    topics: topicsService,
    faqs: faqsService
  };
};

const cmsService = initService();

export default cmsService;
