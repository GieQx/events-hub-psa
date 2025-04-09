
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, CalendarIcon, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import cmsService from "@/services/cmsService";
import { getEventBorderColor } from "@/utils/eventHelpers";

export function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>({
    id: "",
    title: "",
    shortName: "",
    description: "",
    longDescription: "",
    date: "",
    location: "",
    eventStartDate: "",
    eventEndDate: "",
    image: "",
    videoUrl: "",
    registrationUrl: "",
    status: "upcoming",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    try {
      const allEvents = cmsService.events.getAll();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    }
  };

  const handleAddEvent = () => {
    setIsEditing(false);
    setCurrentEvent({
      id: "",
      title: "",
      shortName: "",
      description: "",
      longDescription: "",
      date: "",
      location: "",
      eventStartDate: "",
      eventEndDate: "",
      image: "",
      videoUrl: "",
      registrationUrl: "",
      status: "upcoming",
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setIsEditing(true);
    setCurrentEvent({
      ...event,
      date: event.date || "",
      eventStartDate: event.eventStartDate || "",
      eventEndDate: event.eventEndDate || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        cmsService.events.delete(id);
        loadEvents();
        toast.success("Event deleted successfully");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
      }
    }
  };

  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.id) {
      toast.error("Title and ID are required");
      return;
    }

    try {
      if (isEditing) {
        cmsService.events.update(currentEvent.id, currentEvent);
        toast.success("Event updated successfully");
      } else {
        cmsService.events.create(currentEvent);
        toast.success("Event added successfully");
      }
      setIsDialogOpen(false);
      loadEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Events Management</h2>
          <p className="text-muted-foreground">
            Manage all statistical events in the platform
          </p>
        </div>
        <Button onClick={handleAddEvent}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event.id} className={`overflow-hidden ${getEventBorderColor(event.id)}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle>{event.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              {event.shortName && (
                <p className="text-sm text-muted-foreground">
                  {event.shortName}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex items-center text-sm">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {formatDate(event.eventStartDate)} - {formatDate(event.eventEndDate)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID: {event.id}</span>
                <span className="capitalize">{event.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">No events found</p>
          <Button onClick={handleAddEvent}>Add your first event</Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              Enter the details of the event. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Event ID *</Label>
                <Input
                  id="id"
                  placeholder="e.g., nccrvs"
                  value={currentEvent.id}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, id: e.target.value })}
                  disabled={isEditing}
                />
                <p className="text-xs text-muted-foreground">
                  Unique identifier for the event (used in URLs)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., National Convention on Civil Registration"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  placeholder="e.g., NCCRVS 2025"
                  value={currentEvent.shortName || ""}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, shortName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentEvent.status}
                  onValueChange={(value) => setCurrentEvent({ ...currentEvent, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventStartDate">Start Date</Label>
                <Input
                  id="eventStartDate"
                  type="date"
                  value={currentEvent.eventStartDate || ""}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, eventStartDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventEndDate">End Date</Label>
                <Input
                  id="eventEndDate"
                  type="date"
                  value={currentEvent.eventEndDate || ""}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, eventEndDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Manila Convention Center"
                value={currentEvent.location || ""}
                onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description"
                value={currentEvent.description || ""}
                onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDescription">Full Description</Label>
              <Textarea
                id="longDescription"
                placeholder="Enter detailed information about the event"
                value={currentEvent.longDescription || ""}
                onChange={(e) => setCurrentEvent({ ...currentEvent, longDescription: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="e.g., https://example.com/image.jpg"
                  value={currentEvent.image || ""}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, image: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  placeholder="e.g., https://example.com/video.mp4"
                  value={currentEvent.videoUrl || ""}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, videoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationUrl">Registration URL</Label>
              <Input
                id="registrationUrl"
                placeholder="e.g., https://example.com/register"
                value={currentEvent.registrationUrl || ""}
                onChange={(e) => setCurrentEvent({ ...currentEvent, registrationUrl: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              {isEditing ? "Update" : "Add"} Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
