
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { toast } from "sonner";
import { addToGoogleCalendar } from "@/utils/calendarUtils";
import { Resource } from "@/components/types";
import { ParticleBackground } from "./ParticleBackground";

interface ResourcesSectionProps {
  resources: Resource[];
  className?: string;
  eventId?: string;
  eventDetails?: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export function ResourcesSection({ resources, className = "", eventId = "rvs", eventDetails }: ResourcesSectionProps) {
  const handleDownload = (resource: Resource) => {
    // In a real app, you would trigger the actual download
    console.log("Downloading:", resource);
    
    toast.success("Download started", {
      description: `${resource.title} is being downloaded.`,
    });
  };

  const handleAddToCalendar = () => {
    // Check if event details are available
    if (!eventDetails) {
      toast.error("Calendar information unavailable", {
        description: "Event details are not available for calendar integration.",
      });
      return;
    }
    
    // Add event to Google Calendar
    addToGoogleCalendar({
      title: eventDetails.title,
      description: eventDetails.description,
      location: eventDetails.location,
      startDate: eventDetails.startDate,
      endDate: eventDetails.endDate
    });
    
    toast.success("Event added to calendar", {
      description: "The event has been added to your Google Calendar.",
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'brochure': return <FileText className="h-6 w-6 text-rvs-primary" />;
      case 'schedule': return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'paper': return <FileText className="h-6 w-6 text-purple-500" />;
      case 'presentation': return <FileText className="h-6 w-6 text-amber-500" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  // Get the correct particle color based on event ID
  const getParticleColor = () => {
    switch(eventId) {
      case "rvs": return "#FF6479";
      case "bms": return "#2A9D8F";
      case "sm": return "#E63946";
      case "cs": return "#3F7E44";
      default: return "#9b87f5";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <ParticleBackground 
        color={getParticleColor()} 
        particleCount={50} 
        className="absolute inset-0 opacity-20" 
      />
      <div className="relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold">Resources</h2>
        
        <div className="mb-6 text-center">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAddToCalendar}
          >
            <Calendar className="h-4 w-4" />
            Add Event to Calendar
          </Button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-2">{getIconForType(resource.type)}</div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-xs text-gray-500">File size: {resource.fileSize}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload(resource)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
