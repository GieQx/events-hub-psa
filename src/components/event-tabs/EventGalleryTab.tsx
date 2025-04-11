
import { PhotoGallery } from "@/components/PhotoGallery";

interface EventGalleryTabProps {
  eventId: string;
  photos: any[];
}

export function EventGalleryTab({ eventId, photos }: EventGalleryTabProps) {
  return (
    <div className="container mx-auto px-4">
      <PhotoGallery eventId={eventId} photos={photos} />
    </div>
  );
}
