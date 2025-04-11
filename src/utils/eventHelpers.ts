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
export const getParticleColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "#6d28d9"; // Purple
    case "cbms": return "#0369a1";   // Blue
    case "nsm": return "#047857";     // Green
    case "ncs": return "#b91c1c";     // Red
    default: return "#3b82f6";       // Default blue
  }
};

// Get event border color class based on event ID
export const getEventBorderColor = (eventId?: string) => {
  if (!eventId) return "border-blue-600";
  
  switch(eventId) {
    case "nccrvs": return "border-rvs-primary";
    case "cbms": return "border-bms-primary";
    case "nsm": return "border-sm-primary";
    case "ncs": return "border-cs-primary";
    case "dgrs": return "border-rvs-primary"; // Use RVS border
    case "sdgf": return "border-bms-primary"; // Use BMS border
    case "hsic": return "border-sm-primary";  // Use SM border
    case "aesr": return "border-cs-primary";  // Use CS border
    case "mwds": return "border-rvs-primary"; // Use RVS border
    case "edsc": return "border-bms-primary"; // Use BMS border
    default: return "border-blue-600";
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
