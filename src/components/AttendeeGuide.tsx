
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Hotel, Utensils, HelpCircle } from "lucide-react";

export interface AttendeeGuideProps {
  venue?: {
    name: string;
    address: string;
    description: string;
    mapUrl: string;
  };
  hotels?: any[];
  restaurants?: any[];
  faqs?: any[];
  eventId?: string;
}

export function AttendeeGuide({ 
  venue = { name: "", address: "", description: "", mapUrl: "" },
  hotels = [],
  restaurants = [],
  faqs = [],
  eventId = "nccrvs"
}: AttendeeGuideProps) {
  const [activeTab, setActiveTab] = useState("venue");

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold">Attendee Guide</h2>
      
      <Tabs defaultValue="venue" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="venue" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Venue</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-1">
            <Hotel className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Dining</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-1">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">FAQs</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="venue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{venue?.name || "Venue Information"}</CardTitle>
            </CardHeader>
            <CardContent>
              {venue?.name ? (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Address:</strong> {venue.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{venue.description}</p>
                  
                  {venue.mapUrl && (
                    <div className="mt-4 rounded-lg overflow-hidden h-64 w-full">
                      <iframe
                        src={venue.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Venue Map"
                      ></iframe>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                  Venue information will be available soon.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Address:</strong> {hotel.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Distance from venue:</strong> {hotel.distance}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Rate:</strong> {hotel.rate}
                    </p>
                    {hotel.website && (
                      <a 
                        href={hotel.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Book Now
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardContent className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Hotel recommendations will be available soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="restaurants" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Cuisine:</strong> {restaurant.cuisine}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Distance:</strong> {restaurant.distance}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Price Range:</strong> {restaurant.priceRange}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-3">
                <CardContent className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Restaurant recommendations will be available soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="faqs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {faqs.length > 0 ? (
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                  FAQs will be available soon.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
