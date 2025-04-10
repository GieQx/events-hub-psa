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
  PRESS_RELEASES: "cms_press_releases"
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

  // Speakers service
  const speakersService = {
    items: [],
    
    getAll: function() {
      try {
        const speakersJson = localStorage.getItem(LOCAL_STORAGE_KEYS.SPEAKERS);
        return speakersJson ? JSON.parse(speakersJson) : this.items;
      } catch (error) {
        console.error("Error loading speakers:", error);
        return this.items;
      }
    },
    
    getByEvent: function(eventId: string) {
      try {
        const speakers = this.getAll();
        return speakers.filter((speaker: any) => speaker.eventId === eventId);
      } catch (error) {
        console.error(`Error loading speakers for event ${eventId}:`, error);
        return [];
      }
    },
    
    get: function(id: string) {
      try {
        const speakers = this.getAll();
        return speakers.find((speaker: any) => speaker.id === id);
      } catch (error) {
        console.error(`Error loading speaker ${id}:`, error);
        return null;
      }
    },
    
    create: function(data: any) {
      try {
        const speakers = this.getAll();
        speakers.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SPEAKERS, JSON.stringify(speakers));
        this.items = speakers;
        return data;
      } catch (error) {
        console.error("Error creating speaker:", error);
        return null;
      }
    },
    
    update: function(id: string, data: any) {
      try {
        let speakers = this.getAll();
        const index = speakers.findIndex((speaker: any) => speaker.id === id);
        
        if (index !== -1) {
          speakers[index] = { ...data };
          localStorage.setItem(LOCAL_STORAGE_KEYS.SPEAKERS, JSON.stringify(speakers));
          this.items = speakers;
          return speakers[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating speaker ${id}:`, error);
        return null;
      }
    },
    
    delete: function(id: string) {
      try {
        let speakers = this.getAll();
        speakers = speakers.filter((speaker: any) => speaker.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SPEAKERS, JSON.stringify(speakers));
        this.items = speakers;
        return true;
      } catch (error) {
        console.error(`Error deleting speaker ${id}:`, error);
        return false;
      }
    }
  };

  // Sessions service
  const sessionsService = {
    items: [],
    
    getAll: function() {
      try {
        const sessionsJson = localStorage.getItem(LOCAL_STORAGE_KEYS.SESSIONS);
        return sessionsJson ? JSON.parse(sessionsJson) : this.items;
      } catch (error) {
        console.error("Error loading sessions:", error);
        return this.items;
      }
    },
    
    getByEvent: function(eventId: string) {
      try {
        const sessions = this.getAll();
        return sessions.filter((session: any) => session.eventId === eventId);
      } catch (error) {
        console.error(`Error loading sessions for event ${eventId}:`, error);
        return [];
      }
    },
    
    get: function(id: string) {
      try {
        const sessions = this.getAll();
        return sessions.find((session: any) => session.id === id);
      } catch (error) {
        console.error(`Error loading session ${id}:`, error);
        return null;
      }
    },
    
    create: function(data: any) {
      try {
        const sessions = this.getAll();
        sessions.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
        this.items = sessions;
        return data;
      } catch (error) {
        console.error("Error creating session:", error);
        return null;
      }
    },
    
    update: function(id: string, data: any) {
      try {
        let sessions = this.getAll();
        const index = sessions.findIndex((session: any) => session.id === id);
        
        if (index !== -1) {
          sessions[index] = { ...data };
          localStorage.setItem(LOCAL_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
          this.items = sessions;
          return sessions[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating session ${id}:`, error);
        return null;
      }
    },
    
    delete: function(id: string) {
      try {
        let sessions = this.getAll();
        sessions = sessions.filter((session: any) => session.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
        this.items = sessions;
        return true;
      } catch (error) {
        console.error(`Error deleting session ${id}:`, error);
        return false;
      }
    }
  };

  // Resources service
  const resourcesService = {
    items: [],
    
    getAll: function() {
      try {
        const resourcesJson = localStorage.getItem(LOCAL_STORAGE_KEYS.RESOURCES);
        return resourcesJson ? JSON.parse(resourcesJson) : this.items;
      } catch (error) {
        console.error("Error loading resources:", error);
        return this.items;
      }
    },
    
    getByEvent: function(eventId: string) {
      try {
        const resources = this.getAll();
        return resources.filter((resource: any) => resource.eventId === eventId);
      } catch (error) {
        console.error(`Error loading resources for event ${eventId}:`, error);
        return [];
      }
    },
    
    get: function(id: string) {
      try {
        const resources = this.getAll();
        return resources.find((resource: any) => resource.id === id);
      } catch (error) {
        console.error(`Error loading resource ${id}:`, error);
        return null;
      }
    },
    
    create: function(data: any) {
      try {
        const resources = this.getAll();
        resources.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
        this.items = resources;
        return data;
      } catch (error) {
        console.error("Error creating resource:", error);
        return null;
      }
    },
    
    update: function(id: string, data: any) {
      try {
        let resources = this.getAll();
        const index = resources.findIndex((resource: any) => resource.id === id);
        
        if (index !== -1) {
          resources[index] = { ...data };
          localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
          this.items = resources;
          return resources[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating resource ${id}:`, error);
        return null;
      }
    },
    
    delete: function(id: string) {
      try {
        let resources = this.getAll();
        resources = resources.filter((resource: any) => resource.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
        this.items = resources;
        return true;
      } catch (error) {
        console.error(`Error deleting resource ${id}:`, error);
        return false;
      }
    }
  };

  // Marquee items service
  const marqueeItemsService = {
    items: [],
    
    getAll: function() {
      try {
        const itemsJson = localStorage.getItem(LOCAL_STORAGE_KEYS.MARQUEE_ITEMS);
        return itemsJson ? JSON.parse(itemsJson) : this.items;
      } catch (error) {
        console.error("Error loading marquee items:", error);
        return this.items;
      }
    },
    
    getByEvent: function(eventId: string) {
      try {
        const items = this.getAll();
        return items.filter((item: any) => item.eventId === eventId);
      } catch (error) {
        console.error(`Error loading marquee items for event ${eventId}:`, error);
        return [];
      }
    },
    
    create: function(data: any) {
      try {
        const items = this.getAll();
        items.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.MARQUEE_ITEMS, JSON.stringify(items));
        this.items = items;
        return data;
      } catch (error) {
        console.error("Error creating marquee item:", error);
        return null;
      }
    },
    
    update: function(id: string, data: any) {
      try {
        let items = this.getAll();
        const index = items.findIndex((item: any) => item.id === id);
        
        if (index !== -1) {
          items[index] = { ...data };
          localStorage.setItem(LOCAL_STORAGE_KEYS.MARQUEE_ITEMS, JSON.stringify(items));
          this.items = items;
          return items[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating marquee item ${id}:`, error);
        return null;
      }
    },
    
    delete: function(id: string) {
      try {
        let items = this.getAll();
        items = items.filter((item: any) => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.MARQUEE_ITEMS, JSON.stringify(items));
        this.items = items;
        return true;
      } catch (error) {
        console.error(`Error deleting marquee item ${id}:`, error);
        return false;
      }
    }
  };

  // Press releases service
  const pressReleasesService = {
    items: [],
    
    getAll: function() {
      try {
        const releasesJson = localStorage.getItem(LOCAL_STORAGE_KEYS.PRESS_RELEASES);
        return releasesJson ? JSON.parse(releasesJson) : this.items;
      } catch (error) {
        console.error("Error loading press releases:", error);
        return this.items;
      }
    },
    
    getByEvent: function(eventId: string) {
      try {
        const releases = this.getAll();
        return releases.filter((release: any) => release.eventId === eventId);
      } catch (error) {
        console.error(`Error loading press releases for event ${eventId}:`, error);
        return [];
      }
    },
    
    get: function(id: string) {
      try {
        const releases = this.getAll();
        return releases.find((release: any) => release.id === id);
      } catch (error) {
        console.error(`Error loading press release ${id}:`, error);
        return null;
      }
    },
    
    create: function(data: any) {
      try {
        const releases = this.getAll();
        releases.push(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.PRESS_RELEASES, JSON.stringify(releases));
        this.items = releases;
        return data;
      } catch (error) {
        console.error("Error creating press release:", error);
        return null;
      }
    },
    
    update: function(id: string, data: any) {
      try {
        let releases = this.getAll();
        const index = releases.findIndex((release: any) => release.id === id);
        
        if (index !== -1) {
          releases[index] = { ...data };
          localStorage.setItem(LOCAL_STORAGE_KEYS.PRESS_RELEASES, JSON.stringify(releases));
          this.items = releases;
          return releases[index];
        }
        
        return null;
      } catch (error) {
        console.error(`Error updating press release ${id}:`, error);
        return null;
      }
    },
    
    delete: function(id: string) {
      try {
        let releases = this.getAll();
        releases = releases.filter((release: any) => release.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEYS.PRESS_RELEASES, JSON.stringify(releases));
        this.items = releases;
        return true;
      } catch (error) {
        console.error(`Error deleting press release ${id}:`, error);
        return false;
      }
    }
  };

  return {
    events: eventsService,
    homeContent: homeContentService,
    speakers: speakersService,
    sessions: sessionsService,
    resources: resourcesService,
    marqueeItems: marqueeItemsService,
    pressReleases: pressReleasesService
  };
};

const cmsService = initService();

export default cmsService;
