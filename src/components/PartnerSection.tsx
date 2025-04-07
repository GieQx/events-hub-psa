
import { Card } from "@/components/ui/card";

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'sponsor' | 'partner' | 'organizer';
}

interface PartnerSectionProps {
  partners: Partner[];
  className?: string;
}

export function PartnerSection({ partners, className = "" }: PartnerSectionProps) {
  // Group partners by type
  const grouped = partners.reduce((acc, partner) => {
    if (!acc[partner.type]) {
      acc[partner.type] = [];
    }
    acc[partner.type].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Our Partners</h2>

      {grouped.organizer && (
        <div className="mb-8">
          <h3 className="mb-4 text-center text-xl font-semibold">Organizers</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {grouped.organizer.map((partner) => (
              <Card key={partner.id} className="flex h-24 w-48 items-center justify-center p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-full object-contain"
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      {grouped.sponsor && (
        <div className="mb-8">
          <h3 className="mb-4 text-center text-xl font-semibold">Sponsors</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {grouped.sponsor.map((partner) => (
              <Card key={partner.id} className="flex h-20 w-40 items-center justify-center p-3">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </Card>
            ))}
          </div>
        </div>
      )}

      {grouped.partner && (
        <div>
          <h3 className="mb-4 text-center text-xl font-semibold">Partners</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {grouped.partner.map((partner) => (
              <Card key={partner.id} className="flex h-16 w-32 items-center justify-center p-2">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
