
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";

interface PhotoGalleryProps {
  eventId: string;
  photos: any[];
}

export function PhotoGallery({ eventId, photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const eventColor = getEventColor(eventId);
  
  const handlePhotoClick = (photo: any, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };
  
  const nextPhoto = () => {
    if (photos.length > 0) {
      const newIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[newIndex]);
      setCurrentIndex(newIndex);
    }
  };
  
  const prevPhoto = () => {
    if (photos.length > 0) {
      const newIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[newIndex]);
      setCurrentIndex(newIndex);
    }
  };
  
  if (photos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center my-8">
        <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">No photos have been uploaded for this event yet.</p>
        <p className="text-gray-600 dark:text-gray-300">Check back after the event for a gallery of highlights!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Photo Gallery</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <Card 
            key={photo.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handlePhotoClick(photo, index)}
          >
            <div 
              className="h-60 bg-cover bg-center" 
              style={{ backgroundImage: `url(${photo.url})` }}
            >
              <div className="w-full h-full bg-black/20 hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                <div className="text-white text-sm truncate">
                  {photo.title}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            {/* Large image view */}
            <div className="flex h-[70vh] bg-gray-900 items-center justify-center relative">
              {selectedPhoto && (
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="max-h-full max-w-full object-contain"
                />
              )}
              
              {/* Navigation buttons */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                onClick={prevPhoto}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                onClick={nextPhoto}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Image info and controls */}
            <div className="bg-white dark:bg-gray-800 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{selectedPhoto?.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedPhoto?.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button size="sm" className={`${eventColor} text-white hover:opacity-90`}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Full Size
                  </Button>
                </div>
              </div>
              
              <div className="mt-3 text-sm">
                <span className="text-gray-500">
                  Image {currentIndex + 1} of {photos.length}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
