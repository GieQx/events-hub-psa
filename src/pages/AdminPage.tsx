import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollSection } from "@/components/ScrollSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { ChevronLeft, Plus, Edit, Trash, Save, LogOut } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import cmsService from "@/services/cmsService";
import { CMSEvent } from "@/types/cms";
import { isAdmin, useAdminAuth } from "@/utils/adminAuth";
import { getEventBorderColor } from "@/utils/eventHelpers";

// Import admin management components
import { EventsManagement } from "@/components/admin/EventsManagement";
import { SpeakersManagement } from "@/components/admin/SpeakersManagement";
import { AgendaManagement } from "@/components/admin/AgendaManagement";
import { HomeContentManagement } from "@/components/admin/HomeContentManagement";
import { ResourcesManagement } from "@/components/admin/ResourcesManagement";
import { MarqueeManagement } from "@/components/admin/MarqueeManagement";
import { PressReleaseManagement } from "@/components/admin/PressReleaseManagement";
import { PartnersManagement } from "@/components/admin/PartnersManagement";
import { TopicsManagement } from "@/components/admin/TopicsManagement";
import { ChallengesManagement } from "@/components/admin/ChallengesManagement";
import { GalleryManagement } from "@/components/admin/GalleryManagement";

const AdminLoginForm = ({ onLogin }: { onLogin: (username: string, password: string) => { success: boolean, message?: string } }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const result = onLogin(username, password);
    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <CardDescription>
                Sign in to access the event management system
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-100 border border-red-200 text-red-600 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
              />
              <p className="text-xs text-muted-foreground">
                Demo credentials: admin / admin123
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Sign In</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

const AdminPage = () => {
  const { isAuthenticated, loading, login, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<CMSEvent[]>(cmsService.events.getAll());
  const [editingEvent, setEditingEvent] = useState<CMSEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Refresh events when component mounts
    setEvents(cmsService.events.getAll());
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={login} />;
  }

  const resetForm = () => {
    setEditingEvent(null);
    setIsCreating(false);
  };

  const handleCreateEvent = () => {
    setIsCreating(true);
    setEditingEvent({
      id: crypto.randomUUID(),
      title: "",
      shortName: "",
      description: "",
      longDescription: "",
      date: "",
      eventStartDate: "",
      eventEndDate: "",
      location: "",
      color: "bg-blue-500",
      published: false,
    });
  };

  const handleEditEvent = (event: CMSEvent) => {
    setEditingEvent({...event});
    setIsCreating(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      cmsService.events.delete(id);
      setEvents(cmsService.events.getAll());
      toast.success("Event deleted successfully");
    }
  };

  const handleSaveEvent = () => {
    if (!editingEvent) return;
    
    if (isCreating) {
      cmsService.events.create(editingEvent);
      toast.success("Event created successfully");
    } else {
      cmsService.events.update(editingEvent.id, editingEvent);
      toast.success("Event updated successfully");
    }
    
    setEvents(cmsService.events.getAll());
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingEvent) return;
    
    const { name, value } = e.target;
    setEditingEvent({
      ...editingEvent,
      [name]: value
    });
  };

  const handleTogglePublish = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingEvent) return;
    
    setEditingEvent({
      ...editingEvent,
      published: e.target.checked
    });
  };

  const handleToggleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingEvent) return;
    
    setEditingEvent({
      ...editingEvent,
      featured: e.target.checked
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Convention CMS</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="p-6">
        <ScrollSection>
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-8 flex max-w-full overflow-x-auto">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="home">Home Content</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="press">Press Releases</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="marquee">Marquee</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <EventsManagement />
            </TabsContent>

            <TabsContent value="home">
              <HomeContentManagement />
            </TabsContent>

            <TabsContent value="speakers">
              <SpeakersManagement />
            </TabsContent>

            <TabsContent value="agenda">
              <AgendaManagement />
            </TabsContent>

            <TabsContent value="partners">
              <PartnersManagement />
            </TabsContent>

            <TabsContent value="resources">
              <ResourcesManagement />
            </TabsContent>
            
            <TabsContent value="gallery">
              <GalleryManagement />
            </TabsContent>

            <TabsContent value="press">
              <PressReleaseManagement />
            </TabsContent>

            <TabsContent value="topics">
              <TopicsManagement />
            </TabsContent>

            <TabsContent value="marquee">
              <MarqueeManagement />
            </TabsContent>

            <TabsContent value="challenges">
              <ChallengesManagement />
            </TabsContent>
          </Tabs>
        </ScrollSection>
      </main>
    </div>
  );
};

export default AdminPage;
