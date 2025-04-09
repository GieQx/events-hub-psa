
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash, Save, FileText, Video, Link as LinkIcon, Image } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSResource } from "@/types/cms";

export function ResourcesManagement() {
  const [resources, setResources] = useState<CMSResource[]>(cmsService.resources.getAll());
  const [editingResource, setEditingResource] = useState<CMSResource | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  useEffect(() => {
    if (selectedEventId) {
      setResources(cmsService.resources.getByEventId(selectedEventId));
    } else {
      setResources(cmsService.resources.getAll());
    }
  }, [selectedEventId]);
  
  const resetForm = () => {
    setEditingResource(null);
    setIsCreating(false);
  };

  const handleCreateResource = () => {
    setIsCreating(true);
    setEditingResource({
      id: crypto.randomUUID(),
      eventId: selectedEventId || events[0]?.id || "",
      title: "",
      description: "",
      type: "pdf",
      url: "",
      category: "presentation",
      order: 0
    });
  };

  const handleEditResource = (resource: CMSResource) => {
    setEditingResource({...resource});
    setIsCreating(false);
  };

  const handleDeleteResource = (id: string) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      cmsService.resources.delete(id);
      setResources(selectedEventId ? cmsService.resources.getByEventId(selectedEventId) : cmsService.resources.getAll());
      toast.success("Resource deleted successfully");
    }
  };

  const handleSaveResource = () => {
    if (!editingResource) return;
    
    if (!editingResource.title || !editingResource.url) {
      toast.error("Title and URL are required fields");
      return;
    }
    
    try {
      if (isCreating) {
        cmsService.resources.create(editingResource);
        toast.success("Resource created successfully");
      } else {
        cmsService.resources.update(editingResource.id, editingResource);
        toast.success("Resource updated successfully");
      }
      
      setResources(selectedEventId ? cmsService.resources.getByEventId(selectedEventId) : cmsService.resources.getAll());
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingResource) return;
    
    const { name, value } = e.target;
    setEditingResource({
      ...editingResource,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!editingResource) return;
    
    setEditingResource({
      ...editingResource,
      [name]: value
    });
  };

  const getResourceIcon = (type: string) => {
    switch(type) {
      case "pdf": return <FileText className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "link": return <LinkIcon className="h-4 w-4" />;
      case "image": return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resources Management</h2>
        <div className="flex items-center gap-4">
          <div className="w-56">
            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateResource} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      {editingResource ? (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Resource" : "Edit Resource"}</CardTitle>
            <CardDescription>
              {isCreating ? "Add a new resource to the platform" : "Modify resource details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventId">Event</Label>
                <Select 
                  value={editingResource.eventId} 
                  onValueChange={(value) => handleSelectChange("eventId", value)}
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
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={editingResource.title} 
                  onChange={handleInputChange} 
                  placeholder="Resource title" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editingResource.description || ""} 
                onChange={handleInputChange} 
                placeholder="Resource description" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Resource Type</Label>
                <Select 
                  value={editingResource.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={editingResource.category || "presentation"} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                name="url" 
                value={editingResource.url} 
                onChange={handleInputChange} 
                placeholder="https://example.com/resource" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fileSize">File Size (Optional)</Label>
                <Input 
                  id="fileSize" 
                  name="fileSize" 
                  value={editingResource.fileSize || ""} 
                  onChange={handleInputChange} 
                  placeholder="e.g. 2.5 MB" 
                />
              </div>
              <div>
                <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
                <Input 
                  id="thumbnailUrl" 
                  name="thumbnailUrl" 
                  value={editingResource.thumbnailUrl || ""} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/thumbnail.jpg" 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSaveResource} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Resource
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                  <CardDescription className="flex justify-between items-center">
                    <span>{resource.category}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {resource.type.toUpperCase()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{resource.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Event: {events.find(e => e.id === resource.eventId)?.title || resource.eventId}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)} className="flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteResource(resource.id)} className="flex items-center gap-1">
                    <Trash className="h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {selectedEventId 
                ? "No resources found for this event. Add some resources!" 
                : "No resources found. Add some resources!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
