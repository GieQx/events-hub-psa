
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
import { ChevronLeft, Plus, Edit, Trash, Save, FileText, Video, Link as LinkIcon, Image, File } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSResource } from "@/types/cms";

const ResourcesAdmin = () => {
  const [resources, setResources] = useState<CMSResource[]>(cmsService.resources.getAll());
  const [editingResource, setEditingResource] = useState<CMSResource | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("rvs");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const events = cmsService.events.getAll();

  const resourceTypes = ['pdf', 'video', 'link', 'image', 'other'];
  
  const resetForm = () => {
    setEditingResource(null);
    setIsCreating(false);
  };

  const handleCreateResource = () => {
    setIsCreating(true);
    setEditingResource({
      id: crypto.randomUUID(),
      eventId: selectedEventId,
      title: "",
      description: "",
      type: 'pdf',
      url: "",
      fileSize: "",
      thumbnailUrl: "",
      category: "",
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
      setResources(cmsService.resources.getAll());
      toast.success("Resource deleted successfully");
    }
  };

  const handleSaveResource = () => {
    if (!editingResource) return;
    
    try {
      if (isCreating) {
        cmsService.resources.create(editingResource);
        toast.success("Resource created successfully");
      } else {
        cmsService.resources.update(editingResource.id, editingResource);
        toast.success("Resource updated successfully");
      }
      
      setResources(cmsService.resources.getAll());
      resetForm();
    } catch (error) {
      toast.error("Error saving resource");
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingResource) return;
    
    const { name, value } = e.target;
    setEditingResource({
      ...editingResource,
      [name]: name === 'order' ? parseInt(value) : value
    });
  };

  const handleTypeChange = (value: string) => {
    if (editingResource) {
      setEditingResource({
        ...editingResource,
        type: value as 'pdf' | 'video' | 'link' | 'image' | 'other'
      });
    } else {
      setSelectedType(value);
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(value);
    if (editingResource) {
      setEditingResource({
        ...editingResource,
        eventId: value
      });
    }
  };

  let filteredResources = resources;
  
  if (selectedEventId) {
    filteredResources = filteredResources.filter(resource => resource.eventId === selectedEventId);
  }
  
  if (selectedType) {
    filteredResources = filteredResources.filter(resource => resource.type === selectedType);
  }

  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      case 'link': return <LinkIcon className="h-5 w-5 text-green-500" />;
      case 'image': return <Image className="h-5 w-5 text-purple-500" />;
      default: return <File className="h-5 w-5 text-gray-500" />;
    }
  };

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
            <h1 className="text-2xl font-bold">Resources Management</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollSection>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
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
              
              <Select 
                value={selectedType || ""}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {resourceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateResource} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
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
                  <div className="space-y-2">
                    <Label htmlFor="title">Resource Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={editingResource.title} 
                      onChange={handleInputChange} 
                      placeholder="Resource title" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventId">Event</Label>
                    <Select value={editingResource.eventId} onValueChange={handleEventChange}>
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
                    <Label htmlFor="type">Resource Type</Label>
                    <Select 
                      value={editingResource.type} 
                      onValueChange={handleTypeChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {resourceTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      name="category" 
                      value={editingResource.category || ""} 
                      onChange={handleInputChange} 
                      placeholder="Resource category (optional)" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={editingResource.description || ""} 
                    onChange={handleInputChange} 
                    placeholder="Brief description of the resource" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Resource URL</Label>
                  <Input 
                    id="url" 
                    name="url" 
                    value={editingResource.url} 
                    onChange={handleInputChange} 
                    placeholder="URL to the resource" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fileSize">File Size</Label>
                    <Input 
                      id="fileSize" 
                      name="fileSize" 
                      value={editingResource.fileSize || ""} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 2.5 MB" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input 
                      id="order" 
                      name="order" 
                      type="number"
                      min="0"
                      value={editingResource.order || 0} 
                      onChange={handleInputChange} 
                      placeholder="Display order (0 = automatic)" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                  <Input 
                    id="thumbnailUrl" 
                    name="thumbnailUrl" 
                    value={editingResource.thumbnailUrl || ""} 
                    onChange={handleInputChange} 
                    placeholder="URL to thumbnail image (optional)" 
                  />
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
              {filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      {getResourceIcon(resource.type)}
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      {resource.category && ` • ${resource.category}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {resource.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{resource.description}</p>
                    )}
                    {resource.fileSize && (
                      <p className="text-xs text-gray-500">Size: {resource.fileSize}</p>
                    )}
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                    >
                      View Resource
                    </a>
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
              ))}
            </div>
          )}
        </ScrollSection>
      </main>
    </div>
  );
};

export default ResourcesAdmin;
