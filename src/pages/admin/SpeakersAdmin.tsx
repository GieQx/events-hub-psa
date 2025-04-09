
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollSection } from "@/components/ScrollSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { ChevronLeft, Plus, Edit, Trash, Save } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSSpeaker } from "@/types/cms";

const SpeakersAdmin = () => {
  const [speakers, setSpeakers] = useState<CMSSpeaker[]>(cmsService.speakers.getAll());
  const [editingSpeaker, setEditingSpeaker] = useState<CMSSpeaker | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("rvs");
  const events = cmsService.events.getAll();

  const resetForm = () => {
    setEditingSpeaker(null);
    setIsCreating(false);
  };

  const handleCreateSpeaker = () => {
    setIsCreating(true);
    setEditingSpeaker({
      id: crypto.randomUUID(),
      eventId: selectedEventId,
      name: "",
      role: "",
      company: "",
      bio: "",
      imageUrl: "",
      photoUrl: "",
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
      setSpeakers(cmsService.speakers.getAll());
      toast.success("Speaker deleted successfully");
    }
  };

  const handleSaveSpeaker = () => {
    if (!editingSpeaker) return;
    
    try {
      if (isCreating) {
        cmsService.speakers.create(editingSpeaker);
        toast.success("Speaker created successfully");
      } else {
        cmsService.speakers.update(editingSpeaker.id, editingSpeaker);
        toast.success("Speaker updated successfully");
      }
      
      setSpeakers(cmsService.speakers.getAll());
      resetForm();
    } catch (error) {
      toast.error("Error saving speaker");
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingSpeaker) return;
    
    const { name, value } = e.target;
    setEditingSpeaker({
      ...editingSpeaker,
      [name]: value
    });
  };

  const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingSpeaker) return;
    
    const { name, value } = e.target;
    setEditingSpeaker({
      ...editingSpeaker,
      socialLinks: {
        ...editingSpeaker.socialLinks,
        [name]: value
      }
    });
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(value);
    if (editingSpeaker) {
      setEditingSpeaker({
        ...editingSpeaker,
        eventId: value
      });
    }
  };

  const filteredSpeakers = selectedEventId ? 
    speakers.filter(speaker => speaker.eventId === selectedEventId) : 
    speakers;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Speakers Management</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollSection>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedEventId} onValueChange={handleEventChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateSpeaker} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Speaker
            </Button>
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
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={editingSpeaker.name} 
                      onChange={handleInputChange} 
                      placeholder="Full name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventId">Event</Label>
                    <Select value={editingSpeaker.eventId} onValueChange={handleEventChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map(event => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role" 
                      name="role" 
                      value={editingSpeaker.role} 
                      onChange={handleInputChange} 
                      placeholder="Job title" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={editingSpeaker.company} 
                      onChange={handleInputChange} 
                      placeholder="Company or organization" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={editingSpeaker.bio} 
                    onChange={handleInputChange} 
                    placeholder="Professional biography" 
                    className="min-h-[120px]" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Photo URL</Label>
                  <Input 
                    id="photoUrl" 
                    name="photoUrl" 
                    value={editingSpeaker.photoUrl} 
                    onChange={handleInputChange} 
                    placeholder="URL to profile image" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input 
                      id="twitter" 
                      name="twitter" 
                      value={editingSpeaker.socialLinks?.twitter || ""} 
                      onChange={handleSocialLinksChange} 
                      placeholder="https://twitter.com/username" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input 
                      id="linkedin" 
                      name="linkedin" 
                      value={editingSpeaker.socialLinks?.linkedin || ""} 
                      onChange={handleSocialLinksChange} 
                      placeholder="https://linkedin.com/in/username" 
                    />
                  </div>
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
              {filteredSpeakers.map((speaker) => (
                <Card key={speaker.id}>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden">
                        <img 
                          src={speaker.photoUrl || speaker.imageUrl || '/placeholder.svg'} 
                          alt={speaker.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-center">{speaker.name}</CardTitle>
                    <CardDescription className="text-center">
                      {speaker.role} at {speaker.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{speaker.bio}</p>
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
              ))}
            </div>
          )}
        </ScrollSection>
      </main>
    </div>
  );
};

export default SpeakersAdmin;
