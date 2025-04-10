
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Calendar, MapPin, Save } from "lucide-react";
import cmsService from "@/services/cmsService";
import { format } from "date-fns";

export function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    shortName: "",
    description: "",
    longDescription: "",
    date: "",
    location: "",
    venueName: "",
    venueAddress: "",
    venueDescription: "",
    mapUrl: "",
    imageUrl: "",
    videoUrl: "",
    color: "",
    gradientClass: "",
    eventStartDate: "",
    eventEndDate: "",
    published: true,
    featured: false
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const allEvents = cmsService.events.getAll();
    setEvents(allEvents);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleCreateEvent = () => {
    setCurrentEvent(null);
    setFormData({
      id: crypto.randomUUID(),
      title: "",
      shortName: "",
      description: "",
      longDescription: "",
      date: "",
      location: "",
      venueName: "",
      venueAddress: "",
      venueDescription: "",
      mapUrl: "",
      imageUrl: "/placeholder.svg",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      color: "bg-rvs-primary",
      gradientClass: "hero-gradient-rvs",
      eventStartDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      eventEndDate: format(new Date(new Date().setDate(new Date().getDate() + 2)), "yyyy-MM-dd'T'HH:mm:ss"),
      published: true,
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setCurrentEvent(event);
    setFormData({
      ...event
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (event: any) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (currentEvent) {
      try {
        cmsService.events.delete(currentEvent.id);
        toast.success("Event deleted successfully");
        loadEvents();
      } catch (error) {
        toast.error("Failed to delete event");
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSaveEvent = () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.shortName || !formData.description || !formData.eventStartDate || !formData.eventEndDate) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (currentEvent) {
        // Update existing event
        cmsService.events.update(formData.id, formData);
        toast.success("Event updated successfully");
      } else {
        // Create new event
        cmsService.events.create(formData);
        toast.success("Event created successfully");
      }
      
      setIsDialogOpen(false);
      loadEvents();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Event
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No events have been created yet</p>
          <Button onClick={handleCreateEvent} variant="outline">
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ 
                  backgroundImage: event.imageUrl !== "/placeholder.svg" 
                    ? `url(${event.imageUrl})` 
                    : "none",
                  backgroundColor: event.imageUrl === "/placeholder.svg" ? "#f3f4f6" : "transparent"
                }}
              />
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{event.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${event.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {event.published ? 'Published' : 'Draft'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{event.description}</p>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteEvent(event)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            <DialogDescription>
              {currentEvent ? "Update the event details below" : "Fill in the details to create a new event"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g., National Convention on Civil Registration" 
                />
              </div>
              
              <div>
                <Label htmlFor="shortName">Short Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="shortName" 
                  name="shortName" 
                  value={formData.shortName} 
                  onChange={handleInputChange} 
                  placeholder="e.g., NCCR"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Short Description <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  placeholder="Brief description of the event"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea 
                  id="longDescription" 
                  name="longDescription" 
                  value={formData.longDescription} 
                  onChange={handleInputChange} 
                  placeholder="Detailed description of the event"
                  rows={6}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Event Display Date</Label>
                <Input 
                  id="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  placeholder="e.g., June 15-17, 2026"
                />
              </div>
              
              <div>
                <Label htmlFor="eventStartDate">Event Start Date & Time <span className="text-red-500">*</span></Label>
                <Input 
                  id="eventStartDate" 
                  name="eventStartDate" 
                  type="datetime-local"
                  value={formData.eventStartDate} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="eventEndDate">Event End Date & Time <span className="text-red-500">*</span></Label>
                <Input 
                  id="eventEndDate" 
                  name="eventEndDate" 
                  type="datetime-local"
                  value={formData.eventEndDate} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              
              <div>
                <Label htmlFor="venueName">Venue Name</Label>
                <Input 
                  id="venueName" 
                  name="venueName" 
                  value={formData.venueName} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Moscone Center"
                />
              </div>
              
              <div>
                <Label htmlFor="venueAddress">Venue Address</Label>
                <Input 
                  id="venueAddress" 
                  name="venueAddress" 
                  value={formData.venueAddress} 
                  onChange={handleInputChange} 
                  placeholder="e.g., 747 Howard St, San Francisco, CA 94103"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <Label htmlFor="venueDescription">Venue Description</Label>
              <Textarea 
                id="venueDescription" 
                name="venueDescription" 
                value={formData.venueDescription} 
                onChange={handleInputChange} 
                placeholder="Description of the venue"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="mapUrl">Map URL</Label>
              <Input 
                id="mapUrl" 
                name="mapUrl" 
                value={formData.mapUrl} 
                onChange={handleInputChange} 
                placeholder="Google Maps embed URL"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <Label htmlFor="imageUrl">Cover Image URL</Label>
              <Input 
                id="imageUrl" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleInputChange} 
                placeholder="URL to the event cover image"
              />
            </div>
            
            <div>
              <Label htmlFor="videoUrl">Background Video URL</Label>
              <Input 
                id="videoUrl" 
                name="videoUrl" 
                value={formData.videoUrl} 
                onChange={handleInputChange} 
                placeholder="URL to the event background video"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <Label htmlFor="color">Event Theme Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => handleSelectChange('color', value)}
              >
                <SelectTrigger id="color">
                  <SelectValue placeholder="Select a color theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-rvs-primary">RVS Primary (Red)</SelectItem>
                  <SelectItem value="bg-bms-primary">BMS Primary (Teal)</SelectItem>
                  <SelectItem value="bg-sm-primary">SM Primary (Dark Red)</SelectItem>
                  <SelectItem value="bg-cs-primary">CS Primary (Green)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="gradientClass">Gradient Style</Label>
              <Select
                value={formData.gradientClass}
                onValueChange={(value) => handleSelectChange('gradientClass', value)}
              >
                <SelectTrigger id="gradientClass">
                  <SelectValue placeholder="Select a gradient style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero-gradient-rvs">RVS Gradient</SelectItem>
                  <SelectItem value="hero-gradient-bms">BMS Gradient</SelectItem>
                  <SelectItem value="hero-gradient-sm">SM Gradient</SelectItem>
                  <SelectItem value="hero-gradient-cs">CS Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="published">Published</Label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent} className="gap-2">
              <Save className="h-4 w-4" />
              {currentEvent ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
