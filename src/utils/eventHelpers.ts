
export const getEventColor = (eventId: string): string => {
  switch(eventId) {
    case "rvs": return "rvs-primary";
    case "bms": return "bms-primary";
    case "sm": return "sm-primary";
    case "cs": return "cs-primary";
    default: return "rvs-primary";
  }
};

export const getParticleColor = (eventId: string): string => {
  switch(eventId) {
    case "rvs": return "#FF6479";
    case "bms": return "#2A9D8F";
    case "sm": return "#E63946";
    case "cs": return "#3F7E44";
    default: return "#9b87f5";
  }
};
