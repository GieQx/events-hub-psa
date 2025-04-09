
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash, Save } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSSpeaker } from "@/types/cms";

export function SpeakersManagement() {
  const [speakers, setSpeakers] = useState<CMSSpeaker[]>(cmsService.speakers.getAll());
  const [editingSpeaker, setEditingSpeaker] = useState<CMSSpeaker | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("all");

  useEffect(() => {
    if (selectedEventId === "all") {
      setSpeakers(cmsService.speakers.getAll());
    } else {
      setSpeakers(cmsService.speakers.getByEventId(selectedEventId));
    }
  }, [selectedEventId]);
  
  const resetForm = () => {
    setEditingSpeaker(null);
    setIsCreating(false);
  };

  const handleCreateSpeaker = () => {
    setIsCreating(true);
    setEditingSpeaker({
      id: crypto.randomUUID(),
      eventId: selectedEventId !== "all" ? selectedEventId : events[0]?.id || "",
      name: "",
      role: "",
      company: "",
      bio: "",
      imageUrl: "",
      photoUrl: "",
      featured: false,
      socialLinks: {
        twitter: "",
        linkedin: "",
        website: ""
      }
    });
  };

  const handleEditSpeaker = (speaker: CMSSpeaker) => {
    setEditingSpeaker({...speaker});
    setIsCreating(false);
  };

  const handleDeleteSpeaker = (id: string) => {
    if (window.confirm("Are you sure you want to delete this speaker?")) {
      cmsService.speakers.delete(id);
      setSpeakers(selectedEventId !== "all" ? cmsService.speakers.getByEventId(selectedEventId) : cmsService.speakers.getAll());
      toast.success("Speaker deleted successfully");
    }
  };

  const handleSaveSpeaker = () => {
    if (!editingSpeaker) return;
    
    if (!editingSpeaker.name || !editingSpeaker.role || !editingSpeaker.company) {
      toast.error("Name, role, and company are required fields");
      return;
    }
    
    try {
      if (isCreating) {
        cmsService.speakers.create(editingSpeaker);
        toast.success("Speaker created successfully");
      } else {
        cmsService.speakers.update(editingSpeaker.id, editingSpeaker);
        toast.success("Speaker updated successfully");
      }
      
      setSpeakers(selectedEventId !== "all" ? cmsService.speakers.getByEventId(selectedEventId) : cmsService.speakers.getAll());
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingSpeaker) return;
    
    const { name, value } = e.target;
    
    if (name.startsWith("social.")) {
      const socialField = name.split(".")[1];
      setEditingSpeaker({
        ...editingSpeaker,
        socialLinks: {
          ...editingSpeaker.socialLinks,
          [socialField]: value
        }
      });
    } else {
      setEditingSpeaker({
        ...editingSpeaker,
        [name]: value
      });
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(value);
  };

  const handleSpeakerEventChange = (value: string) => {
    if (!editingSpeaker) return;
    
    setEditingSpeaker({
      ...editingSpeaker,
      eventId: value
    });
  };

  const handleToggleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingSpeaker) return;
    
    setEditingSpeaker({
      ...editingSpeaker,
      featured: e.target.checked
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Speakers Management</h2>
        <div className="flex items-center gap-4">
          <div className="w-56">
            <Select value={selectedEventId} onValueChange={handleEventChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateSpeaker} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Speaker
          </Button>
        </div>
      </div>

      {editingSpeaker ? (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Speaker" : "Edit Speaker"}</CardTitle>
            <CardDescription>
              {isCreating ? "Add a new speaker to the platform" : "Modify speaker details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventId">Event</Label>
                <Select 
                  value={editingSpeaker.eventId} 
                  onValueChange={handleSpeakerEventChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingSpeaker.name} 
                  onChange={handleInputChange} 
                  placeholder="Speaker name" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={editingSpeaker.role} 
                  onChange={handleInputChange} 
                  placeholder="Speaker role" 
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={editingSpeaker.company} 
                  onChange={handleInputChange} 
                  placeholder="Company name" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                value={editingSpeaker.bio} 
                onChange={handleInputChange} 
                placeholder="Speaker biography" 
                className="min-h-[150px]" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="photoUrl">Photo URL</Label>
                <Input 
                  id="photoUrl" 
                  name="photoUrl" 
                  value={editingSpeaker.photoUrl} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/photo.jpg" 
                />
              </div>
              <div>
                <Label htmlFor="presentationTitle">Presentation Title (Optional)</Label>
                <Input 
                  id="presentationTitle" 
                  name="presentationTitle" 
                  value={editingSpeaker.presentationTitle || ""} 
                  onChange={handleInputChange} 
                  placeholder="Presentation title" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="social.linkedin">LinkedIn URL</Label>
                <Input 
                  id="social.linkedin" 
                  name="social.linkedin" 
                  value={editingSpeaker.socialLinks?.linkedin || ""} 
                  onChange={handleInputChange} 
                  placeholder="https://linkedin.com/in/username" 
                />
              </div>
              <div>
                <Label htmlFor="social.twitter">Twitter URL</Label>
                <Input 
                  id="social.twitter" 
                  name="social.twitter" 
                  value={editingSpeaker.socialLinks?.twitter || ""} 
                  onChange={handleInputChange} 
                  placeholder="https://twitter.com/username" 
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={editingSpeaker.featured}
                onChange={handleToggleFeatured}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="featured">Featured Speaker</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSaveSpeaker} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Speaker
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.length > 0 ? (
            speakers.map((speaker) => (
              <Card key={speaker.id} className={`${speaker.featured ? 'border-2 border-blue-500' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{speaker.name}</CardTitle>
                      <CardDescription>{speaker.role} at {speaker.company}</CardDescription>
                    </div>
                    <div className="flex-shrink-0">
                      {speaker.photoUrl && (
                        <img 
                          src={speaker.photoUrl} 
                          alt={speaker.name} 
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{speaker.bio}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Event: {events.find(e => e.id === speaker.eventId)?.title || speaker.eventId}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditSpeaker(speaker)} className="flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteSpeaker(speaker.id)} className="flex items-center gap-1">
                    <Trash className="h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {selectedEventId 
                ? "No speakers found for this event. Add some speakers!" 
                : "No speakers found. Add some speakers!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
