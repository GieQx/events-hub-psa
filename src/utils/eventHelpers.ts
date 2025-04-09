
export const getEventColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "bg-rvs-primary";
    case "cbms": return "bg-bms-primary";
    case "nsm": return "bg-sm-primary";
    case "ncs": return "bg-cs-primary";
    default: return "bg-rvs-primary";
  }
};

export const getParticleColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "#FF6479";
    case "cbms": return "#2A9D8F"; // Fixed teal color for CBMS
    case "nsm": return "#E63946";
    case "ncs": return "#3F7E44";
    default: return "#FF6479";
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
