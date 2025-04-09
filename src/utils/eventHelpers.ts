
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
    case "cbms": return "#2A9D8F"; // Teal color for CBMS
    case "nsm": return "#E63946";
    case "ncs": return "#3F7E44";
    default: return "#FF6479";
  }
};

// Helper to convert hex color to HSL variable for CSS custom properties
export const hexToHSL = (hex: string): string => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find max and min values to determine the lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = h * 60;
  }
  
  // Round values
  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `${h} ${s}% ${l}%`;
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

// New helper for getting text color based on event
export const getEventTextColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "text-rvs-primary";
    case "cbms": return "text-bms-primary";
    case "nsm": return "text-sm-primary";
    case "ncs": return "text-cs-primary";
    default: return "text-rvs-primary";
  }
};

// Get border color based on event ID
export const getEventBorderColor = (eventId: string): string => {
  switch(eventId) {
    case "nccrvs": return "border-rvs-primary";
    case "cbms": return "border-bms-primary";
    case "nsm": return "border-sm-primary";
    case "ncs": return "border-cs-primary";
    default: return "border-rvs-primary";
  }
};
