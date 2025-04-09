
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, ExternalLink } from "lucide-react";
import { PressRelease } from "@/components/types";
import { useState } from "react";
import { getEventColor, getEventTextColor } from "@/utils/eventHelpers";

interface PressReleaseSectionProps {
  pressReleases: PressRelease[];
  eventId: string;
  className?: string;
}

export function PressReleaseSection({ 
  pressReleases, 
  eventId, 
  className = "" 
}: PressReleaseSectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Sort by date (newest first)
  const sortedReleases = [...pressReleases].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Get featured press releases
  const featuredReleases = sortedReleases.filter(release => release.featured);
  
  // Get regular press releases
  const regularReleases = sortedReleases.filter(release => !release.featured);

  const toggleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (pressReleases.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h2 className="mb-6 text-center text-3xl font-bold">Press Releases</h2>
        <p className="text-gray-500 dark:text-gray-400">No press releases available at this time.</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <ParticleBackground 
        color={eventId === "cbms" ? "#2A9D8F" : 
               eventId === "nsm" ? "#E63946" : 
               eventId === "ncs" ? "#3F7E44" : "#FF6479"}
        particleCount={40}
        className="opacity-10" 
      />
      
      <div className="relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold">Press Releases</h2>

        {featuredReleases.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-xl font-semibold text-center">Featured Announcements</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredReleases.map((release) => (
                <Card key={release.id} className={`overflow-hidden border-t-4 ${getEventColor(eventId)} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-row items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(release.date)}
                    </span>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h4 className={`text-lg font-semibold mb-3 ${getEventTextColor(eventId)}`}>{release.title}</h4>
                    <div className={expanded === release.id ? "" : "line-clamp-3"}>
                      <div dangerouslySetInnerHTML={{ __html: release.content }} className="prose dark:prose-invert prose-sm max-w-none" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleExpand(release.id)}
                        className="text-sm"
                      >
                        {expanded === release.id ? "Show Less" : "Read More"}
                      </Button>
                      {release.url && (
                        <a 
                          href={release.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Source <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {regularReleases.length > 0 && (
          <div>
            {featuredReleases.length > 0 && (
              <h3 className="mb-6 text-xl font-semibold text-center">All Press Releases</h3>
            )}
            <div className="space-y-4">
              {regularReleases.map((release) => (
                <Card key={release.id} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3 p-4 flex flex-col justify-center bg-gray-50 dark:bg-gray-800">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{release.source || "Official Release"}</p>
                        <p className="text-sm font-medium">{formatDate(release.date)}</p>
                      </div>
                    </div>
                    <div className="md:col-span-9 p-4">
                      <h4 className="text-lg font-semibold mb-2">{release.title}</h4>
                      <div className={expanded === release.id ? "" : "line-clamp-2"}>
                        <div dangerouslySetInnerHTML={{ __html: release.content }} className="prose dark:prose-invert prose-sm max-w-none" />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleExpand(release.id)}
                          className={`text-sm ${getEventTextColor(eventId)}`}
                        >
                          {expanded === release.id ? "Show Less" : "Read More"}
                        </Button>
                        {release.url && (
                          <a 
                            href={release.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Source <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
