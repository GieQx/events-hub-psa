
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
    case "cbms": return "#2A9D8F";
    case "nsm": return "#E63946";
    case "ncs": return "#3F7E44";
    default: return "#9b87f5";
  }
};
