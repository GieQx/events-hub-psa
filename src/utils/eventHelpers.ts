
/**
 * Event helper utilities for handling event-specific colors and other functionality
 */

// Get event color class based on event ID
export const getEventColor = (eventId?: string) => {
  if (!eventId) return "bg-blue-600";
  
  switch(eventId) {
    case "nccrvs": return "bg-rvs-primary";
    case "cbms": return "bg-bms-primary";
    case "nsm": return "bg-sm-primary";
    case "ncs": return "bg-cs-primary";
    case "dgrs": return "bg-rvs-primary"; // Use RVS color
    case "sdgf": return "bg-bms-primary"; // Use BMS color
    case "hsic": return "bg-sm-primary";  // Use SM color
    case "aesr": return "bg-cs-primary";  // Use CS color
    case "mwds": return "bg-rvs-primary"; // Use RVS color
    case "edsc": return "bg-bms-primary"; // Use BMS color
    default: return "bg-blue-600";
  }
};

// Get event hover color class based on event ID
export const getEventHoverColor = (eventId?: string) => {
  if (!eventId) return "hover:bg-blue-700";
  
  switch(eventId) {
    case "nccrvs": return "hover:bg-rose-600";
    case "cbms": return "hover:bg-teal-800";
    case "nsm": return "hover:bg-red-700";
    case "ncs": return "hover:bg-green-800";
    case "dgrs": return "hover:bg-rose-600"; // Use RVS hover
    case "sdgf": return "hover:bg-teal-800"; // Use BMS hover
    case "hsic": return "hover:bg-red-700";  // Use SM hover
    case "aesr": return "hover:bg-green-800"; // Use CS hover
    case "mwds": return "hover:bg-rose-600"; // Use RVS hover
    case "edsc": return "hover:bg-teal-800"; // Use BMS hover
    default: return "hover:bg-blue-700";
  }
};

// Get particle color based on event ID
export const getParticleColor = (eventId?: string) => {
  if (!eventId) return "#9b87f5";
  
  switch(eventId) {
    case "nccrvs": return "#FF6479";
    case "cbms": return "#2A9D8F";
    case "nsm": return "#E63946";
    case "ncs": return "#3F7E44";
    case "dgrs": return "#FF6479"; // Use RVS color
    case "sdgf": return "#2A9D8F"; // Use BMS color
    case "hsic": return "#E63946"; // Use SM color
    case "aesr": return "#3F7E44"; // Use CS color
    case "mwds": return "#FF6479"; // Use RVS color
    case "edsc": return "#2A9D8F"; // Use BMS color
    default: return "#9b87f5";
  }
};

// Check if event should be disabled based on start date
export const shouldDisableEvent = (eventStartDate?: string, daysBeforeEnable: number = 30) => {
  if (!eventStartDate) return false;
  
  const startDate = new Date(eventStartDate);
  const now = new Date();
  
  // Calculate difference in days
  const diffTime = startDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > daysBeforeEnable;
};

// Format event date for display
export const formatEventDate = (startDate?: string, endDate?: string) => {
  if (!startDate) return "TBD";
  
  const start = new Date(startDate);
  
  if (!endDate) {
    return start.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  const end = new Date(endDate);
  
  // If same day
  if (start.toDateString() === end.toDateString()) {
    return `${start.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`;
  }
  
  // If same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
  }
  
  // Different months
  return `${start.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  })} - ${end.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  })}`;
};
