
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getEventColor, getEventTextColor } from "@/utils/eventHelpers";
import { MapPin, Calendar, Clock, User, Users, Info, Download, Phone, AtSign } from "lucide-react";

export interface AttendeeGuideProps {
  eventId: string;
  venue?: any;
  hotels?: any[];
  restaurants?: any[];
  faqs?: any[];
  className?: string;
}

export function AttendeeGuide({ 
  eventId, 
  venue, 
  hotels = [], 
  restaurants = [], 
  faqs = [], 
  className = "" 
}: AttendeeGuideProps) {
  const eventColorClass = getEventColor(eventId);
  const eventTextColorClass = getEventTextColor(eventId);
  
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <h2 className="mb-6 text-center text-3xl font-bold">Attendee Guide</h2>
      
      <Tabs defaultValue="before" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="before" className={`data-[state=active]:${eventTextColorClass}`}>
            Before Event
          </TabsTrigger>
          <TabsTrigger value="during" className={`data-[state=active]:${eventTextColorClass}`}>
            During Event
          </TabsTrigger>
          <TabsTrigger value="after" className={`data-[state=active]:${eventTextColorClass}`}>
            After Event
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="before" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={eventTextColorClass}>Registration & Preparation</CardTitle>
              <CardDescription>
                Essential steps to complete before attending the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <User className="h-5 w-5" /> Registration
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Complete your registration through the official event platform</li>
                  <li>Watch for a confirmation email with your unique QR code</li>
                  <li>Update your profile with professional details for networking</li>
                </ul>
                
                <div className="mt-4">
                  <Button className={eventColorClass}>
                    Complete Registration
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Calendar & Schedule
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Review the full event agenda and select your sessions</li>
                  <li>Add sessions to your personal calendar</li>
                  <li>Set reminders for key sessions and networking events</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Download className="h-5 w-5" /> Downloads & Resources
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Download the event mobile app for real-time updates</li>
                  <li>Access pre-reading materials and presentation downloads</li>
                  <li>Review the attendee handbook for important information</li>
                </ul>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" className={`border-2 hover:bg-transparent hover:${eventTextColorClass}`}>
                    <Download className="mr-2 h-4 w-4" /> Event App
                  </Button>
                  <Button variant="outline" className={`border-2 hover:bg-transparent hover:${eventTextColorClass}`}>
                    <Download className="mr-2 h-4 w-4" /> Handbook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="during" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={eventTextColorClass}>During The Event</CardTitle>
              <CardDescription>
                Make the most of your time at the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Venue Navigation
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Use interactive maps in the mobile app to navigate between sessions</li>
                  <li>Information desks are available at each floor entrance</li>
                  <li>Digital signage will guide you to breakout rooms and facilities</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5" /> Networking Opportunities
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Designated networking zones available during breaks</li>
                  <li>Use the app's attendee directory to connect with peers</li>
                  <li>Join topic-specific roundtables for focused discussions</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Info className="h-5 w-5" /> Support & Assistance
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Technical support is available at all session rooms</li>
                  <li>Medical assistance is located on the ground floor</li>
                  <li>Event staff can be identified by their branded lanyards</li>
                </ul>
                
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Event Support Contact</h4>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AtSign className="h-4 w-4" />
                    <span>support@statisticsevents.gov</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="after" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className={eventTextColorClass}>After The Event</CardTitle>
              <CardDescription>
                Continue the experience after the event concludes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Download className="h-5 w-5" /> Session Materials
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Access recordings and slides from all sessions</li>
                  <li>Download certificates of attendance</li>
                  <li>Review supplementary materials from speakers</li>
                </ul>
                
                <div className="mt-4">
                  <Button className={eventColorClass}>
                    Access Materials Portal
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5" /> Stay Connected
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Continue discussions in the online community forum</li>
                  <li>Connect with speakers and attendees through the platform</li>
                  <li>Join relevant special interest groups for ongoing collaboration</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-5 w-5" /> Future Events
                </h3>
                <ul className="ml-9 space-y-1 list-disc text-muted-foreground">
                  <li>Mark your calendar for follow-up webinars</li>
                  <li>Get early access to next year's event registration</li>
                  <li>Subscribe to the events newsletter for updates</li>
                </ul>
                
                <div className="mt-4">
                  <Button variant="outline" className={`border-2 hover:bg-transparent hover:${eventTextColorClass}`}>
                    Subscribe to Updates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
