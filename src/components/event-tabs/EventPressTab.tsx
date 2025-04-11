
import { PressReleasesPage } from "@/components/PressReleasesPage";

interface EventPressTabProps {
  eventId: string;
  pressReleases: any[];
}

export function EventPressTab({ eventId, pressReleases }: EventPressTabProps) {
  return (
    <div className="container mx-auto px-4">
      <PressReleasesPage eventId={eventId} pressReleases={pressReleases} />
    </div>
  );
}
