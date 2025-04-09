
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Info } from "lucide-react";
import cmsService from "@/services/cmsService";

export function AttendeeGuideManagement() {
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("nccrvs");
  const [venueDescription, setVenueDescription] = useState<string>("");
  const [hotelInfo, setHotelInfo] = useState<string>("");
  const [diningInfo, setDiningInfo] = useState<string>("");
  const [travelInfo, setTravelInfo] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuideContent(selectedEventId);
    setLoading(false);
  }, []);

  const loadGuideContent = (eventId: string) => {
    const storageKey = `cms_attendee_guide_${eventId}`;
    const storedContent = localStorage.getItem(storageKey);
    
    if (storedContent) {
      try {
        const parsedContent = JSON.parse(storedContent);
        setVenueDescription(parsedContent.venueDescription || "");
        setHotelInfo(parsedContent.hotelInfo || "");
        setDiningInfo(parsedContent.diningInfo || "");
        setTravelInfo(parsedContent.travelInfo || "");
      } catch (error) {
        console.error("Error parsing guide content:", error);
        resetFields();
      }
    } else {
      resetFields();
    }
  };

  const resetFields = () => {
    setVenueDescription("");
    setHotelInfo("");
    setDiningInfo("");
    setTravelInfo("");
  };

  const handleEventChange = (eventId: string) => {
    setSelectedEventId(eventId);
    loadGuideContent(eventId);
  };

  const handleSave = () => {
    try {
      const guideContent = {
        venueDescription,
        hotelInfo,
        diningInfo,
        travelInfo
      };
      
      localStorage.setItem(
        `cms_attendee_guide_${selectedEventId}`, 
        JSON.stringify(guideContent)
      );
      
      toast.success("Attendee guide content saved successfully!");
    } catch (error) {
      toast.error(`Error saving content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendee Guide Management</h2>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Customize Attendee Guide Content
          </CardTitle>
          <CardDescription>
            Provide detailed information for event attendees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="event-select">Select Event</Label>
            <Select
              value={selectedEventId}
              onValueChange={handleEventChange}
            >
              <SelectTrigger id="event-select">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.shortName} - {event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="venue" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="dining">Dining</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
            </TabsList>

            <TabsContent value="venue">
              <div className="space-y-4">
                <Label htmlFor="venue-description">Venue Description (HTML supported)</Label>
                <textarea
                  id="venue-description"
                  value={venueDescription}
                  onChange={(e) => setVenueDescription(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="<p>The Convention Center is a premier facility featuring state-of-the-art meeting rooms and large exhibit halls...</p>"
                />
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="space-y-4">
                <Label htmlFor="hotel-info">Hotel Information (HTML supported)</Label>
                <textarea
                  id="hotel-info"
                  value={hotelInfo}
                  onChange={(e) => setHotelInfo(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="<h3>Recommended Hotels</h3><ul><li><strong>Marriott Downtown</strong> - 0.2 miles from venue, $199-$299/night</li>..."
                />
              </div>
            </TabsContent>

            <TabsContent value="dining">
              <div className="space-y-4">
                <Label htmlFor="dining-info">Dining Information (HTML supported)</Label>
                <textarea
                  id="dining-info"
                  value={diningInfo}
                  onChange={(e) => setDiningInfo(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="<h3>Restaurants Near Venue</h3><div class='grid grid-cols-2 gap-4'><div class='p-4 border rounded'><h4>Urban Bistro</h4>..."
                />
              </div>
            </TabsContent>

            <TabsContent value="travel">
              <div className="space-y-4">
                <Label htmlFor="travel-info">Travel Information (HTML supported)</Label>
                <textarea
                  id="travel-info"
                  value={travelInfo}
                  onChange={(e) => setTravelInfo(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="<h3>Getting to the Venue</h3><p>The venue is located 15 miles from International Airport.</p>..."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">Save Attendee Guide Content</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
