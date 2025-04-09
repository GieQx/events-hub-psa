
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, Map, Utensils, HelpCircle, ExternalLink, MapPin, Phone, Globe 
} from "lucide-react";
import { getEventColor, getEventTextColor } from "@/utils/eventHelpers";

interface VenueInfo {
  name: string;
  address: string;
  description: string;
  mapUrl: string;
}

interface HotelInfo {
  id: string;
  name: string;
  distance: string;
  priceRange: string;
  website: string;
}

interface RestaurantInfo {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  priceRange: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface AttendeeGuideProps {
  venue: VenueInfo;
  hotels: HotelInfo[];
  restaurants: RestaurantInfo[];
  faqs: Faq[];
  className?: string;
  eventId?: string;
}

export function AttendeeGuide({ 
  venue, 
  hotels, 
  restaurants, 
  faqs,
  className = "",
  eventId = "nccrvs"
}: AttendeeGuideProps) {
  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Attendee Guide</h2>
      
      <Tabs defaultValue="venue" className="mx-auto max-w-4xl">
        <TabsList className="mb-6 w-full justify-center">
          <TabsTrigger value="venue" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Venue
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Accommodations
          </TabsTrigger>
          <TabsTrigger value="dining" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Dining
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="venue">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-2xl font-semibold">{venue.name}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{venue.address}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <p className="text-gray-700 dark:text-gray-300">{venue.description}</p>
              </div>
              
              <Button className={`w-full ${getEventColor(eventId)} text-white hover:opacity-90`}>
                <Map className="mr-2 h-4 w-4" />
                View on Map
              </Button>
            </div>
            
            <div className="h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
              {venue.mapUrl ? (
                <iframe 
                  src={venue.mapUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Map preview not available
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hotels">
          <h3 className="mb-6 text-center text-xl font-semibold">Recommended Accommodations</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {hotels.map((hotel) => (
              <Card key={hotel.id}>
                <CardContent className="p-6">
                  <h4 className={`mb-2 text-lg font-semibold ${getEventTextColor(eventId)}`}>{hotel.name}</h4>
                  
                  <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-start">
                      <MapPin className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{hotel.distance}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{hotel.priceRange}</span>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href={hotel.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={getEventTextColor(eventId)}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dining">
          <h3 className="mb-6 text-center text-xl font-semibold">Nearby Dining Options</h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id}>
                <CardContent className="p-4">
                  <h4 className={`mb-1 font-semibold ${getEventTextColor(eventId)}`}>{restaurant.name}</h4>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{restaurant.cuisine}</span>
                    <span className="text-gray-500 dark:text-gray-400">{restaurant.priceRange}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{restaurant.distance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="help">
          <h3 className="mb-6 text-center text-xl font-semibold">Need Assistance?</h3>
          
          {faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className={`mb-2 font-semibold ${getEventTextColor(eventId)}`}>{faq.question}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                For any questions or assistance during the event, please contact our support team.
              </p>
              
              <div className="mx-auto max-w-md space-y-4">
                <Button className={`w-full ${getEventColor(eventId)} text-white hover:opacity-90`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                
                <Button variant="outline" className="w-full">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  View FAQ
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
