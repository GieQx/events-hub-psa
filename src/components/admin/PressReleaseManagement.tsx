
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PressRelease } from "@/components/types";
import cmsService from "@/services/cmsService";
import { toast } from "sonner";
import { Trash2, PlusCircle, ExternalLink, Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import { getEventBorderColor, getEventColor } from "@/utils/eventHelpers";

export function PressReleaseManagement() {
  const { eventId = "nccrvs" } = useParams<{ eventId: string }>();
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPressRelease, setCurrentPressRelease] = useState<PressRelease>({
    id: "",
    title: "",
    date: new Date().toISOString().substring(0, 10),
    content: "",
    eventId: eventId,
    source: "",
    url: "",
    featured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(eventId || "all");

  useEffect(() => {
    loadPressReleases();
    loadEvents();
  }, [eventId]);

  const loadPressReleases = () => {
    try {
      const releases = cmsService.pressReleases ? cmsService.pressReleases.getAll() : [];
      setPressReleases(releases);
    } catch (error) {
      console.error("Error loading press releases:", error);
      setPressReleases([]);
    }
  };

  const loadEvents = () => {
    try {
      const allEvents = cmsService.events.getAll();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    }
  };

  const handleAddPressRelease = () => {
    setIsEditing(false);
    setCurrentPressRelease({
      id: "",
      title: "",
      date: new Date().toISOString().substring(0, 10),
      content: "",
      eventId: eventId || events[0]?.id || "",
      source: "",
      url: "",
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditPressRelease = (release: PressRelease) => {
    setIsEditing(true);
    setCurrentPressRelease({
      ...release,
      date: new Date(release.date).toISOString().substring(0, 10),
    });
    setIsDialogOpen(true);
  };

  const handleDeletePressRelease = (id: string) => {
    if (confirm("Are you sure you want to delete this press release?")) {
      try {
        if (cmsService.pressReleases) {
          cmsService.pressReleases.remove(id);
          loadPressReleases();
          toast.success("Press release deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting press release:", error);
        toast.error("Failed to delete press release");
      }
    }
  };

  const handleSavePressRelease = () => {
    if (!currentPressRelease.title || !currentPressRelease.content || !currentPressRelease.eventId) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (cmsService.pressReleases) {
        if (isEditing) {
          cmsService.pressReleases.update(currentPressRelease);
          toast.success("Press release updated successfully");
        } else {
          cmsService.pressReleases.add({
            ...currentPressRelease,
            id: Date.now().toString(),
          });
          toast.success("Press release added successfully");
        }
        setIsDialogOpen(false);
        loadPressReleases();
      } else {
        console.error("Press release service not available");
        toast.error("Press release service not available");
      }
    } catch (error) {
      console.error("Error saving press release:", error);
      toast.error("Failed to save press release");
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const filteredPressReleases = activeTab === "all" 
    ? pressReleases 
    : pressReleases.filter(release => release.eventId === activeTab);

  // Sort releases by date (newest first)
  const sortedPressReleases = [...filteredPressReleases].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Press Release Management</h2>
          <p className="text-muted-foreground">
            Manage press releases for all events
          </p>
        </div>
        <Button onClick={handleAddPressRelease}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Press Release
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All Events</TabsTrigger>
          {events.map((event) => (
            <TabsTrigger key={event.id} value={event.id}>
              {event.title || event.shortName || event.id}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {sortedPressReleases.length > 0 ? (
            sortedPressReleases.map((release) => {
              const eventData = events.find(e => e.id === release.eventId);
              const eventName = eventData?.shortName || eventData?.title || release.eventId;
              
              return (
                <Card key={release.id} className={`overflow-hidden ${getEventBorderColor(release.eventId)}`}>
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="mb-1">{release.title}</CardTitle>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{new Date(release.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{eventName}</span>
                          {release.featured && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 dark:text-amber-400 font-medium">Featured</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPressRelease(release)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePressRelease(release.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-4 text-sm">
                      <div dangerouslySetInnerHTML={{ __html: release.content.substring(0, 200) + (release.content.length > 200 ? '...' : '') }} />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">
                        {release.source && `Source: ${release.source}`}
                      </div>
                      {release.url && (
                        <a
                          href={release.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          View original <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No press releases found</p>
              <Button 
                variant="outline" 
                onClick={handleAddPressRelease} 
                className="mt-4"
              >
                Add your first press release
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Press Release" : "Add New Press Release"}</DialogTitle>
            <DialogDescription>
              Fill in the details of the press release. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={currentPressRelease.title}
                  onChange={(e) => setCurrentPressRelease({ ...currentPressRelease, title: e.target.value })}
                  placeholder="Enter press release title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={currentPressRelease.date}
                  onChange={(e) => setCurrentPressRelease({ ...currentPressRelease, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event">Event *</Label>
                <Select
                  value={currentPressRelease.eventId}
                  onValueChange={(value) => setCurrentPressRelease({ ...currentPressRelease, eventId: value })}
                >
                  <SelectTrigger id="event">
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title || event.shortName || event.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source (Optional)</Label>
                <Input
                  id="source"
                  value={currentPressRelease.source || ""}
                  onChange={(e) => setCurrentPressRelease({ ...currentPressRelease, source: e.target.value })}
                  placeholder="e.g., Press Office"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">External URL (Optional)</Label>
              <Input
                id="url"
                value={currentPressRelease.url || ""}
                onChange={(e) => setCurrentPressRelease({ ...currentPressRelease, url: e.target.value })}
                placeholder="https://example.com/press-release"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={currentPressRelease.content}
                onChange={(e) => setCurrentPressRelease({ ...currentPressRelease, content: e.target.value })}
                placeholder="Enter the press release content"
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                You can use basic HTML tags for formatting
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="featured"
                checked={currentPressRelease.featured || false}
                onCheckedChange={(checked) => setCurrentPressRelease({ ...currentPressRelease, featured: checked })}
              />
              <Label htmlFor="featured" className="font-normal">
                Featured press release (highlighted on the event page)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePressRelease}>
              {isEditing ? "Update" : "Add"} Press Release
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
