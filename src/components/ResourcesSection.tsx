
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { toast } from "sonner";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'brochure' | 'schedule' | 'paper' | 'presentation';
  fileSize: string;
  downloadUrl: string;
}

interface ResourcesSectionProps {
  resources: Resource[];
  className?: string;
}

export function ResourcesSection({ resources, className = "" }: ResourcesSectionProps) {
  const handleDownload = (resource: Resource) => {
    // In a real app, you would trigger the actual download
    console.log("Downloading:", resource);
    
    toast.success("Download started", {
      description: `${resource.title} is being downloaded.`,
    });
  };

  const addToCalendar = () => {
    // In a real app, you would generate a calendar file or link
    console.log("Adding to calendar");
    
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

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Resources</h2>
      
      <div className="mb-6 text-center">
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={addToCalendar}
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
  );
}
