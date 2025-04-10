import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Calendar, Save } from "lucide-react";
import cmsService from "@/services/cmsService";
import { format } from "date-fns";

export function PressReleaseManagement() {
  const [pressReleases, setPressReleases] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPressRelease, setCurrentPressRelease] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    eventId: "",
    title: "",
    summary: "",
    content: "",
    publishDate: "",
    imageUrl: "",
    author: "",
    published: true
  });

  useEffect(() => {
    loadPressReleases();
    loadEvents();
  }, []);

  const loadPressReleases = () => {
    try {
      // Initialize press releases in CMS if they don't exist
      if (!cmsService.pressReleases) {
        cmsService.pressReleases = {
          items: [],
          getAll: function() {
            return this.items;
          },
          getByEvent: function(eventId: string) {
            return this.items.filter((item: any) => item.eventId === eventId);
          },
          getByEventId: function(eventId: string) {
            return this.getByEvent(eventId);
          },
          get: function(id: string) {
            return this.items.find((item: any) => item.id === id);
          },
          create: function(data: any) {
            this.items.push(data);
            return data;
          },
          update: function(id: string, data: any) {
            const index = this.items.findIndex((item: any) => item.id === id);
            if (index !== -1) {
              this.items[index] = data;
              return data;
            }
            return null;
          },
          delete: function(id: string) {
            const index = this.items.findIndex((item: any) => item.id === id);
            if (index !== -1) {
              this.items.splice(index, 1);
              return true;
            }
            return false;
          }
        };
      }
      
      const allPressReleases = cmsService.pressReleases.getAll();
      setPressReleases(allPressReleases);
    } catch (error) {
      console.error("Error loading press releases:", error);
      toast.error("Failed to load press releases");
    }
  };

  const loadEvents = () => {
    try {
      const allEvents = cmsService.events.getAll();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      toast.error("Failed to load events");
    }
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

  const handleCreatePressRelease = () => {
    setCurrentPressRelease(null);
    const defaultEventId = events.length > 0 ? events[0].id : "";
    setFormData({
      id: crypto.randomUUID(),
      eventId: defaultEventId,
      title: "",
      summary: "",
      content: "",
      publishDate: format(new Date(), "yyyy-MM-dd"),
      imageUrl: "",
      author: "",
      published: true
    });
    setIsDialogOpen(true);
  };

  const handleEditPressRelease = (pressRelease: any) => {
    setCurrentPressRelease(pressRelease);
    setFormData({
      ...pressRelease
    });
    setIsDialogOpen(true);
  };

  const handleDeletePressRelease = (pressRelease: any) => {
    setCurrentPressRelease(pressRelease);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePressRelease = () => {
    if (currentPressRelease) {
      try {
        cmsService.pressReleases.delete(currentPressRelease.id);
        toast.success("Press release deleted successfully");
        loadPressReleases();
      } catch (error) {
        toast.error("Failed to delete press release");
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSavePressRelease = () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.summary || !formData.eventId) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (currentPressRelease) {
        // Update existing press release
        cmsService.pressReleases.update(formData.id, formData);
        toast.success("Press release updated successfully");
      } else {
        // Create new press release
        cmsService.pressReleases.create(formData);
        toast.success("Press release created successfully");
      }
      
      setIsDialogOpen(false);
      loadPressReleases();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getEventTitle = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : "Unknown Event";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Press Releases Management</h2>
        <Button onClick={handleCreatePressRelease} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Press Release
        </Button>
      </div>

      {pressReleases.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No press releases have been created yet</p>
          <Button onClick={handleCreatePressRelease} variant="outline">
            Create Your First Press Release
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressReleases.map((pressRelease) => (
            <Card key={pressRelease.id} className="overflow-hidden">
              {pressRelease.imageUrl && (
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${pressRelease.imageUrl})` }}
                />
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {getEventTitle(pressRelease.eventId)}
                  </span>
                  {pressRelease.published && (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Published
                    </span>
                  )}
                </div>
                <CardTitle>{pressRelease.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{pressRelease.summary}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{pressRelease.publishDate}</span>
                </div>
                {pressRelease.author && (
                  <p className="text-sm mt-2 italic">By {pressRelease.author}</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditPressRelease(pressRelease)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeletePressRelease(pressRelease)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Press Release Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentPressRelease ? "Edit Press Release" : "Create New Press Release"}</DialogTitle>
            <DialogDescription>
              {currentPressRelease ? "Update the press release details below" : "Fill in the details to create a new press release"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Press release title" 
              />
            </div>
            
            <div>
              <Label htmlFor="eventId">Related Event <span className="text-red-500">*</span></Label>
              <Select
                value={formData.eventId}
                onValueChange={(value) => handleSelectChange('eventId', value)}
              >
                <SelectTrigger id="eventId">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="summary">Summary <span className="text-red-500">*</span></Label>
            <Textarea 
              id="summary" 
              name="summary" 
              value={formData.summary} 
              onChange={handleInputChange} 
              placeholder="Brief summary of the press release"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              name="content" 
              value={formData.content} 
              onChange={handleInputChange} 
              placeholder="Full content of the press release"
              rows={6}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input 
                id="publishDate" 
                name="publishDate" 
                type="date"
                value={formData.publishDate} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                name="author" 
                value={formData.author} 
                onChange={handleInputChange} 
                placeholder="Author's name"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleInputChange} 
              placeholder="URL to the press release image"
            />
          </div>
          
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
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePressRelease} className="gap-2">
              <Save className="h-4 w-4" />
              {currentPressRelease ? "Update Press Release" : "Create Press Release"}
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
              Are you sure you want to delete "{currentPressRelease?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePressRelease}>
              Delete Press Release
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
