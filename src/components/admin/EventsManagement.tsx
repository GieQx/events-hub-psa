
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CMSEvent } from "@/types/cms";
import { Switch } from "@/components/ui/switch";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Plus, Trash2, Edit, Circle, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import cmsService from "@/services/cmsService";
import { generateId } from "@/services/cmsUtils";
import { shouldDisableEvent } from "@/utils/eventHelpers";

// Color palettes
const SDG_INSPIRED_PALETTE = [
  { name: "SDG Green", color: "#3F7E44", variable: "126 28% 37%" },
  { name: "SDG Blue", color: "#0A97D9", variable: "198 89% 45%" },
  { name: "SDG Red", color: "#E5243B", variable: "355 77% 52%" },
  { name: "SDG Orange", color: "#FD6925", variable: "22 98% 57%" },
  { name: "SDG Yellow", color: "#DDA63A", variable: "39 64% 55%" },
  { name: "SDG Magenta", color: "#C5192D", variable: "352 75% 45%" },
  { name: "SDG Teal", color: "#26BDE2", variable: "192 76% 52%" },
  { name: "SDG Purple", color: "#8F1838", variable: "341 71% 33%" },
];

const BLUE_ORANGE_PALETTE = [
  { name: "Bright Orange", color: "#F97316", variable: "24 94% 53%" },
  { name: "Deep Orange", color: "#EA580C", variable: "25 95% 48%" },
  { name: "Light Orange", color: "#FB923C", variable: "27 96% 61%" },
  { name: "Soft Orange", color: "#FEC6A1", variable: "29 96% 82%" },
  { name: "Ocean Blue", color: "#0EA5E9", variable: "199 89% 48%" },
  { name: "Deep Blue", color: "#0369A1", variable: "200 98% 32%" },
  { name: "Sky Blue", color: "#38BDF8", variable: "198 93% 60%" },
  { name: "Light Blue", color: "#BAE6FD", variable: "199 94% 86%" },
];

const DEFAULT_COLORS = [
  { name: "RVS Pink", color: "#FF6479", variable: "352 100% 69%" },
  { name: "BMS Teal", color: "#2A9D8F", variable: "173 58% 39%" },
  { name: "SM Red", color: "#E63946", variable: "355 77% 56%" },
  { name: "CS Green", color: "#3F7E44", variable: "126 28% 37%" },
];

// Helper to convert color to HSL variable value
const getColorVariable = (color: string): string => {
  // Find in all palettes
  const allPalettes = [...SDG_INSPIRED_PALETTE, ...BLUE_ORANGE_PALETTE, ...DEFAULT_COLORS];
  const colorObj = allPalettes.find(c => c.color === color);
  return colorObj ? colorObj.variable : "";
};

const EventsManagement = () => {
  const [events, setEvents] = useState<CMSEvent[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CMSEvent | null>(null);
  const [colorPalette, setColorPalette] = useState<"default" | "sdg" | "blueOrange">("default");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Initial empty event state
  const emptyEvent: CMSEvent = {
    id: "",
    title: "",
    shortName: "",
    description: "",
    longDescription: "",
    date: "",
    eventStartDate: "",
    eventEndDate: "",
    location: "",
    color: "#FF6479", // Default to RVS pink
    videoUrl: "",
    imageUrl: "/placeholder.svg",
    featured: false,
    published: true
  };

  const [currentEvent, setCurrentEvent] = useState<CMSEvent>(emptyEvent);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    try {
      const allEvents = cmsService.events.getAll();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleAddEvent = () => {
    setIsEditing(false);
    setCurrentEvent({
      ...emptyEvent,
      id: generateId()
    });
    setShowColorPicker(false);
  };

  const handleEditEvent = (event: CMSEvent) => {
    setIsEditing(true);
    setCurrentEvent({...event});
    setSelectedEvent(event);
    setShowColorPicker(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        cmsService.events.delete(id);
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCurrentEvent(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleColorSelect = (color: string) => {
    setCurrentEvent(prev => ({
      ...prev,
      color: color
    }));
    setShowColorPicker(false);
  };

  const handleSaveEvent = () => {
    try {
      // Validate required fields
      if (!currentEvent.title || !currentEvent.description || !currentEvent.eventStartDate) {
        alert("Please fill in all required fields: Title, Description, and Start Date");
        return;
      }
      
      // Get the HSL variable value
      const colorVariable = getColorVariable(currentEvent.color);
      
      // Build the event with the correct format
      const eventToSave = {
        ...currentEvent,
        color: `bg-[${currentEvent.color}]`,
        gradientClass: `hero-gradient-${currentEvent.id}`
      };

      if (isEditing) {
        cmsService.events.update(currentEvent.id, eventToSave);
      } else {
        cmsService.events.create(eventToSave);
      }
      
      loadEvents();
      setCurrentEvent(emptyEvent);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error saving event:", error);
      alert(`Error saving event: ${error}`);
    }
  };
  
  const getCurrentPalette = () => {
    switch (colorPalette) {
      case "sdg":
        return SDG_INSPIRED_PALETTE;
      case "blueOrange":
        return BLUE_ORANGE_PALETTE;
      default:
        return DEFAULT_COLORS;
    }
  };

  const isEventDisabled = (dateString: string) => {
    return shouldDisableEvent(dateString, 600);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Events Management</CardTitle>
          <Button onClick={handleAddEvent} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Event List</TabsTrigger>
            {(isEditing || currentEvent.id) && (
              <TabsTrigger value="edit">
                {isEditing ? "Edit Event" : "New Event"}
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No events found. Create your first event.
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: event.color.replace('bg-[', '').replace(']', '') }}
                        />
                      </TableCell>
                      <TableCell>{event.id}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-xs">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full ${event.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {event.published ? 'Published' : 'Draft'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full ${event.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {event.featured ? 'Featured' : 'Not Featured'}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full ${isEventDisabled(event.eventStartDate) ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {isEventDisabled(event.eventStartDate) ? 'Disabled (>600 days)' : 'Enabled'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditEvent(event)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="edit">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={currentEvent.title}
                    onChange={handleInputChange}
                    placeholder="e.g., National Convention on Statistics"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="shortName">Short Name</Label>
                  <Input 
                    id="shortName"
                    name="shortName"
                    value={currentEvent.shortName}
                    onChange={handleInputChange}
                    placeholder="e.g., NCS"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={currentEvent.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the event"
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea 
                  id="longDescription"
                  name="longDescription"
                  value={currentEvent.longDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the event"
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Display Date</Label>
                  <Input 
                    id="date"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleInputChange}
                    placeholder="e.g., June 15-17, 2026"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="eventStartDate">Start Date *</Label>
                  <Input 
                    id="eventStartDate"
                    name="eventStartDate"
                    type="datetime-local"
                    value={currentEvent.eventStartDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="eventEndDate">End Date</Label>
                  <Input 
                    id="eventEndDate"
                    name="eventEndDate"
                    type="datetime-local"
                    value={currentEvent.eventEndDate}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={currentEvent.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="color">Brand Color</Label>
                    <div className="flex items-center mt-1 gap-2">
                      <div 
                        className="w-10 h-10 rounded-md border border-gray-300"
                        style={{ backgroundColor: currentEvent.color }}
                      />
                      <Input 
                        id="color"
                        name="color"
                        value={currentEvent.color}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mb-px flex gap-2 items-center">
                        <Palette className="h-4 w-4" />
                        Select Color
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Select Brand Color</DialogTitle>
                        <DialogDescription>
                          Choose a color from one of the available palettes for this event.
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="default" onValueChange={(value) => setColorPalette(value as any)}>
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="default">Default Colors</TabsTrigger>
                          <TabsTrigger value="sdg">SDG Inspired</TabsTrigger>
                          <TabsTrigger value="blueOrange">Blue-Orange</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="default" className="mt-0">
                          <div className="grid grid-cols-4 gap-2">
                            {DEFAULT_COLORS.map(color => (
                              <Button
                                key={color.name}
                                variant="outline"
                                className="h-16 flex flex-col gap-1 items-center justify-center p-1"
                                onClick={() => handleColorSelect(color.color)}
                              >
                                <div 
                                  className="w-8 h-8 rounded-full"
                                  style={{ backgroundColor: color.color }}
                                />
                                <span className="text-xs text-center">{color.name}</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="sdg" className="mt-0">
                          <div className="grid grid-cols-4 gap-2">
                            {SDG_INSPIRED_PALETTE.map(color => (
                              <Button
                                key={color.name}
                                variant="outline"
                                className="h-16 flex flex-col gap-1 items-center justify-center p-1"
                                onClick={() => handleColorSelect(color.color)}
                              >
                                <div 
                                  className="w-8 h-8 rounded-full"
                                  style={{ backgroundColor: color.color }}
                                />
                                <span className="text-xs text-center">{color.name}</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="blueOrange" className="mt-0">
                          <div className="grid grid-cols-4 gap-2">
                            {BLUE_ORANGE_PALETTE.map(color => (
                              <Button
                                key={color.name}
                                variant="outline"
                                className="h-16 flex flex-col gap-1 items-center justify-center p-1"
                                onClick={() => handleColorSelect(color.color)}
                              >
                                <div 
                                  className="w-8 h-8 rounded-full"
                                  style={{ backgroundColor: color.color }}
                                />
                                <span className="text-xs text-center">{color.name}</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowColorPicker(false)}>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input 
                    id="videoUrl"
                    name="videoUrl"
                    value={currentEvent.videoUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., https://example.com/video.mp4"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl"
                    name="imageUrl"
                    value={currentEvent.imageUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., /placeholder.svg"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="published" 
                    checked={currentEvent.published} 
                    onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="featured" 
                    checked={currentEvent.featured} 
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured on Homepage</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentEvent(emptyEvent);
                    setSelectedEvent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEvent}>
                  {isEditing ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventsManagement;
