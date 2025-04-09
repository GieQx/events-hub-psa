
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Link as LinkIcon, Image } from "lucide-react";
import { Resource } from "@/components/types";
import { CMSResource } from "@/types/cms";
import { getEventColor } from "@/utils/eventHelpers";

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

export function ResourcesSection({ resources, eventDetails, eventId = "nccrvs", className = "" }: ResourcesSectionProps) {
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

  // Get text color for the current event
  const getTextColorClass = () => {
    switch(eventId) {
      case "nccrvs": return "text-rvs-primary";
      case "cbms": return "text-bms-primary";
      case "nsm": return "text-sm-primary";
      case "ncs": return "text-cs-primary";
      default: return "text-rvs-primary";
    }
  };

  // Get background color class for the current event
  const getBgColorClass = () => {
    switch(eventId) {
      case "nccrvs": return "bg-rvs-primary/10";
      case "cbms": return "bg-bms-primary/10";
      case "nsm": return "bg-sm-primary/10";
      case "ncs": return "bg-cs-primary/10";
      default: return "bg-rvs-primary/10";
    }
  };

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Event Resources</h2>
      
      {resources && resources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <div className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${getBgColorClass()}`}>
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
                    className={`inline-flex items-center text-sm font-medium ${getTextColorClass()} hover:underline`}
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
