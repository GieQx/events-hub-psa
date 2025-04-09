
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollSection } from "@/components/ScrollSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { ChevronLeft, Plus, Edit, Trash, Save, Users, Calendar, Building, FileText } from "lucide-react";

import cmsService from "@/services/cmsService";
import { CMSEvent } from "@/types/cms";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<CMSEvent[]>(cmsService.events.getAll());
  const [editingEvent, setEditingEvent] = useState<CMSEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
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
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollSection>
          <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid grid-cols-5">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Events Management</h2>
                <Button onClick={handleCreateEvent} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </div>

              {editingEvent ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{isCreating ? "Create New Event" : "Edit Event"}</CardTitle>
                    <CardDescription>
                      {isCreating ? "Add a new event to the platform" : "Modify event details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          value={editingEvent.title} 
                          onChange={handleInputChange} 
                          placeholder="Enter event title" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shortName">Short Name</Label>
                        <Input 
                          id="shortName" 
                          name="shortName" 
                          value={editingEvent.shortName} 
                          onChange={handleInputChange} 
                          placeholder="Short name (e.g. RVS)" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={editingEvent.description} 
                        onChange={handleInputChange} 
                        placeholder="Brief description" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longDescription">Long Description</Label>
                      <Textarea 
                        id="longDescription" 
                        name="longDescription" 
                        value={editingEvent.longDescription} 
                        onChange={handleInputChange}
                        placeholder="Detailed description" 
                        className="min-h-[120px]" 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Display Date</Label>
                        <Input 
                          id="date" 
                          name="date" 
                          value={editingEvent.date} 
                          onChange={handleInputChange} 
                          placeholder="May 15-18, 2026" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventStartDate">Start Date</Label>
                        <Input 
                          id="eventStartDate" 
                          name="eventStartDate" 
                          type="date"
                          value={editingEvent.eventStartDate} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventEndDate">End Date</Label>
                        <Input 
                          id="eventEndDate" 
                          name="eventEndDate" 
                          type="date"
                          value={editingEvent.eventEndDate} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={editingEvent.location} 
                          onChange={handleInputChange} 
                          placeholder="City, Country" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">Theme Color</Label>
                        <Input 
                          id="color" 
                          name="color" 
                          value={editingEvent.color} 
                          onChange={handleInputChange} 
                          placeholder="bg-blue-500" 
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={editingEvent.published}
                        onChange={handleTogglePublish}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button onClick={handleSaveEvent} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Event
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <Card key={event.id} className={`border-l-4 ${event.published ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.shortName} • {event.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{event.description}</p>
                        <p className="text-sm mt-2">{event.location}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)} className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)} className="flex items-center gap-1">
                          <Trash className="h-3 w-3" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="speakers">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Speakers Management</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage speaker profiles for all events
                  </p>
                </div>
                <Link to="/admin/speakers">
                  <Button className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Manage Speakers
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Speakers Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      Add and manage speakers for your events. Create speaker profiles, assign them to sessions, and showcase their expertise.
                    </p>
                    <Link to="/admin/speakers">
                      <Button>Go to Speakers Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agenda">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Agenda Management</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage event schedules and sessions
                  </p>
                </div>
                <Link to="/admin/agenda">
                  <Button className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Manage Agenda
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Agenda Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      Create and manage detailed schedules for your events. Organize by days, add sessions, assign speakers, and more.
                    </p>
                    <Link to="/admin/agenda">
                      <Button>Go to Agenda Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="partners">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Partners Management</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage sponsors and partners
                  </p>
                </div>
                <Link to="/admin/partners">
                  <Button className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Manage Partners
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Building className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Partners Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      Add and categorize event sponsors and partners. Manage logos, descriptions, and sponsorship levels.
                    </p>
                    <Link to="/admin/partners">
                      <Button>Go to Partners Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Resources Management</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Manage downloadable content and materials
                  </p>
                </div>
                <Link to="/admin/resources">
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Manage Resources
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Resources Management</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                      Upload and manage resources like PDFs, videos, and presentations. Categorize content for attendees.
                    </p>
                    <Link to="/admin/resources">
                      <Button>Go to Resources Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollSection>
      </main>
    </div>
  );
};

export default AdminPage;
