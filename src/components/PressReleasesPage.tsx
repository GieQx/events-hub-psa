
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";

interface PressReleasesPageProps {
  eventId: string;
  pressReleases: any[];
}

export function PressReleasesPage({ eventId, pressReleases }: PressReleasesPageProps) {
  const [selectedPress, setSelectedPress] = useState<any>(null);
  const eventColor = getEventColor(eventId);
  
  if (pressReleases.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center my-8">
        <h2 className="text-2xl font-bold mb-4">Press Releases</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">No press releases have been published for this event yet.</p>
        <p className="text-gray-600 dark:text-gray-300">Check back soon for updates!</p>
      </div>
    );
  }

  // Sort press releases by date (newest first)
  const sortedPressReleases = [...pressReleases].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Press Releases</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPressReleases.map((pressRelease) => (
          <Card key={pressRelease.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {pressRelease.imageUrl && (
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${pressRelease.imageUrl})` }}
              />
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{pressRelease.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(pressRelease.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                {pressRelease.summary}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className={`w-full ${eventColor} text-white hover:opacity-90`}
                onClick={() => setSelectedPress(pressRelease)}
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPress} onOpenChange={(open) => !open && setSelectedPress(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedPress?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{selectedPress && new Date(selectedPress.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              {selectedPress?.author && (
                <span className="ml-2">By {selectedPress.author}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPress?.imageUrl && (
            <div className="mt-4 mb-6">
              <img 
                src={selectedPress.imageUrl} 
                alt={selectedPress.title} 
                className="w-full max-h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">{selectedPress?.summary}</p>
          </div>
          
          {selectedPress?.content && (
            <div className="my-6">
              <h3 className="text-lg font-semibold mb-2">Full Press Release</h3>
              <div className="prose dark:prose-invert max-w-none">
                {selectedPress.content.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <Button className={`${eventColor} text-white hover:opacity-90`}>
              <ExternalLink className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
