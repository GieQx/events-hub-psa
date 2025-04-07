
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Coffee, Map, Info } from "lucide-react";

interface AttendeeGuideProps {
  venue: {
    name: string;
    address: string;
    description: string;
    mapUrl: string;
  };
  hotels: Array<{
    id: string;
    name: string;
    distance: string;
    priceRange: string;
    website?: string;
  }>;
  restaurants: Array<{
    id: string;
    name: string;
    cuisine: string;
    distance: string;
    priceRange: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}

export function AttendeeGuide({
  venue,
  hotels,
  restaurants,
  faqs,
  className = "",
}: AttendeeGuideProps) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Attendee Guide</h2>
      
      <Tabs defaultValue="venue" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="venue" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Venue</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">Dining</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">FAQs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="venue" className="animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 text-xl font-bold">{venue.name}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{venue.address}</p>
              <p className="mb-4">{venue.description}</p>

              <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg shadow-md">
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotels" className="animate-fade-in">
          <div className="grid gap-4 md:grid-cols-2">
            {hotels.map((hotel) => (
              <Card key={hotel.id}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">{hotel.name}</h3>
                  <p className="mb-1 text-sm">
                    <span className="font-medium">Distance:</span> {hotel.distance}
                  </p>
                  <p className="mb-2 text-sm">
                    <span className="font-medium">Price Range:</span> {hotel.priceRange}
                  </p>
                  {hotel.website && (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-rvs-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="restaurants" className="animate-fade-in">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">{restaurant.name}</h3>
                  <p className="mb-1 text-sm">
                    <span className="font-medium">Cuisine:</span> {restaurant.cuisine}
                  </p>
                  <p className="mb-1 text-sm">
                    <span className="font-medium">Distance:</span> {restaurant.distance}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Price Range:</span> {restaurant.priceRange}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="animate-fade-in">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
