
export const getEventColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "bg-rvs-primary";
    case "cbms": return "bg-bms-primary";
    case "nsm": return "bg-sm-primary";
    case "ncs": return "bg-cs-primary";
    default: return "bg-blue-600";
  }
};

export const getEventTextColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "text-rvs-primary";
    case "cbms": return "text-bms-primary";
    case "nsm": return "text-sm-primary";
    case "ncs": return "text-cs-primary";
    default: return "text-blue-600";
  }
};

export const getEventHoverColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "hover:bg-rvs-primary/90";
    case "cbms": return "hover:bg-bms-primary/90";
    case "nsm": return "hover:bg-sm-primary/90";
    case "ncs": return "hover:bg-cs-primary/90";
    default: return "hover:bg-blue-600/90";
  }
};

export const getParticleColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "#FF6479";
    case "cbms": return "#2A9D8F";
    case "nsm": return "#E63946";
    case "ncs": return "#3F7E44";
    default: return "#9b87f5";
  }
};

// Helper to determine if event should be disabled based on countdown days
export const shouldDisableEvent = (dateString: string, maxDays: number = 600): boolean => {
  if (!dateString) return true;
  
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > maxDays;
};

// Get event border color for admin cards
export const getEventBorderColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "border-rvs-primary";
    case "cbms": return "border-bms-primary";
    case "nsm": return "border-sm-primary";
    case "ncs": return "border-cs-primary";
    default: return "border-blue-600";
  }
};
