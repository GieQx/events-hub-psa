
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Video, Link as LinkIcon, Image } from "lucide-react";
import { Resource } from "@/components/types";
import { CMSResource } from "@/types/cms";

interface ResourcesSectionProps {
  resources: CMSResource[] | Resource[];
  eventDetails: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  eventId?: string;
  className?: string;
}

export function ResourcesSection({ resources, eventDetails, eventId = "rvs", className = "" }: ResourcesSectionProps) {
  // Get the correct event color
  const getEventColor = () => {
    switch(eventId) {
      case "rvs": return "rvs-primary";
      case "bms": return "bms-primary";
      case "sm": return "sm-primary";
      case "cs": return "cs-primary";
      default: return "rvs-primary";
    }
  };
  
  const handleAddToCalendar = () => {
    // Format dates for Google Calendar
    const from = new Date(eventDetails.startDate);
    const to = new Date(eventDetails.endDate);
    
    // Create Google Calendar URL
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.append('text', eventDetails.title);
    googleCalendarUrl.searchParams.append('details', eventDetails.description);
    googleCalendarUrl.searchParams.append('location', eventDetails.location);
    googleCalendarUrl.searchParams.append('dates', `${from.toISOString().replace(/-|:|\.\d+/g, '')}/${to.toISOString().replace(/-|:|\.\d+/g, '')}`);
    
    // Open in new tab
    window.open(googleCalendarUrl.toString(), '_blank');
  };

  // Determine the appropriate icon for the resource type
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'link': return <LinkIcon className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Event Resources</h2>
      
      <div className="mb-10 flex flex-col items-center justify-center">
        <Button 
          onClick={handleAddToCalendar}
          className={`flex items-center gap-2 bg-${getEventColor()} hover:bg-${getEventColor()}/90`}
        >
          <Calendar className="h-5 w-5" />
          Add to Google Calendar
        </Button>
        <p className="mt-2 text-sm text-gray-500">Add this event to your calendar to receive updates and reminders</p>
      </div>
      
      {resources && resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-${getEventColor()}/10 mr-3`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <p className="text-xs text-gray-500">
                      {resource.fileSize ? resource.fileSize : resource.type.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                {resource.description && (
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {resource.description}
                  </p>
                )}
                
                <div className="mt-2">
                  <a
                    href={resource.url || resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-sm font-medium text-${getEventColor()} hover:underline`}
                  >
                    {resource.type === 'pdf' ? 'Download PDF' :
                     resource.type === 'video' ? 'Watch Video' :
                     resource.type === 'link' ? 'Visit Link' :
                     resource.type === 'image' ? 'View Image' : 'Access Resource'}
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No resources available yet. Check back soon!</p>
      )}
    </div>
  );
}
