
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  FileImage, 
  Video, 
  Link as LinkIcon, 
  ExternalLink,
  BookOpen
} from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";

interface Resource {
  id: string;
  title: string;
  description?: string;
  type: string;
  url: string;
}

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

export function ResourcesSection({ 
  resources, 
  className = "",
  eventId = "nccrvs",
  eventDetails
}: ResourcesSectionProps) {
  const getResourceIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-6 w-6" />;
      case 'image':
        return <FileImage className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'link':
        return <LinkIcon className="h-6 w-6" />;
      case 'ebook':
        return <BookOpen className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getFileExtension = (url: string) => {
    if (!url) return '';
    
    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension) return '';
    
    return extension;
  };

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Resources & Downloads</h2>
      
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="flex items-start gap-4 p-6">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getEventColor(eventId)}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold">{resource.title}</h3>
                    {resource.description && (
                      <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="uppercase">{resource.type}</span>
                      {getFileExtension(resource.url) && (
                        <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 dark:bg-gray-700">
                          {getFileExtension(resource.url)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t p-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${getEventColor(eventId)} text-white hover:bg-opacity-90`}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {resource.type.toLowerCase() === 'link' ? 'Visit Link' : 'Download'}
                      {resource.type.toLowerCase() === 'link' && <ExternalLink className="ml-2 h-3 w-3" />}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No resources are available for this event yet.
        </p>
      )}
    </div>
  );
}
