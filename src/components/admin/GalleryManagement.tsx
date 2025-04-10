
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image, Save } from "lucide-react";
import cmsService from "@/services/cmsService";

export function GalleryManagement() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    eventId: "",
    title: "",
    description: "",
    url: "",
    thumbnailUrl: "",
    type: "image",
    category: "event"
  });

  useEffect(() => {
    loadPhotos();
    loadEvents();
  }, []);

  const loadPhotos = () => {
    try {
      const resources = cmsService.resources.getAll();
      const imageResources = resources.filter(resource => resource.type === 'image');
      setPhotos(imageResources);
    } catch (error) {
      console.error("Error loading photos:", error);
      toast.error("Failed to load photos");
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

  const handleAddPhoto = () => {
    setCurrentPhoto(null);
    const defaultEventId = events.length > 0 ? events[0].id : "";
    setFormData({
      id: crypto.randomUUID(),
      eventId: defaultEventId,
      title: "",
      description: "",
      url: "",
      thumbnailUrl: "",
      type: "image",
      category: "event"
    });
    setIsAddPhotoDialogOpen(true);
  };

  const handleEditPhoto = (photo: any) => {
    setCurrentPhoto(photo);
    setFormData({
      ...photo
    });
    setIsAddPhotoDialogOpen(true);
  };

  const handleDeletePhoto = (photo: any) => {
    setCurrentPhoto(photo);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePhoto = () => {
    if (currentPhoto) {
      try {
        cmsService.resources.delete(currentPhoto.id);
        toast.success("Photo deleted successfully");
        loadPhotos();
      } catch (error) {
        toast.error("Failed to delete photo");
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSavePhoto = () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.url || !formData.eventId) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Ensure photo data is correctly formatted
      const photoData = {
        ...formData,
        type: "image",
        thumbnailUrl: formData.thumbnailUrl || formData.url
      };
      
      if (currentPhoto) {
        // Update existing photo
        cmsService.resources.update(formData.id, photoData);
        toast.success("Photo updated successfully");
      } else {
        // Create new photo
        cmsService.resources.create(photoData);
        toast.success("Photo added successfully");
      }
      
      setIsAddPhotoDialogOpen(false);
      loadPhotos();
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
        <h2 className="text-2xl font-bold">Photo Gallery Management</h2>
        <Button onClick={handleAddPhoto} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Photo
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No photos have been added yet</p>
          <Button onClick={handleAddPhoto} variant="outline">
            Add Your First Photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {photo.category || "Event"}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg truncate">{photo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {getEventTitle(photo.eventId)}
                </p>
                <p className="text-sm line-clamp-2">{photo.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEditPhoto(photo)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeletePhoto(photo)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Photo Dialog */}
      <Dialog open={isAddPhotoDialogOpen} onOpenChange={setIsAddPhotoDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentPhoto ? "Edit Photo" : "Add New Photo"}</DialogTitle>
            <DialogDescription>
              {currentPhoto ? "Update the photo details below" : "Fill in the details to add a new photo to the gallery"}
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
                placeholder="Photo title" 
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
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Brief description of the photo"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="url">Image URL <span className="text-red-500">*</span></Label>
            <Input 
              id="url" 
              name="url" 
              value={formData.url} 
              onChange={handleInputChange} 
              placeholder="URL to the full size image"
            />
          </div>

          <div>
            <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
            <Input 
              id="thumbnailUrl" 
              name="thumbnailUrl" 
              value={formData.thumbnailUrl} 
              onChange={handleInputChange} 
              placeholder="URL to a smaller version of the image (if different)"
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to use the same URL as the main image</p>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="speaker">Speaker</SelectItem>
                <SelectItem value="venue">Venue</SelectItem>
                <SelectItem value="attendees">Attendees</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.url && (
            <div className="mt-4">
              <Label>Preview</Label>
              <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                <div className="aspect-video max-h-40 relative overflow-hidden rounded flex items-center justify-center">
                  <img 
                    src={formData.url} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPhotoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePhoto} className="gap-2">
              <Save className="h-4 w-4" />
              {currentPhoto ? "Update Photo" : "Add Photo"}
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
              Are you sure you want to delete "{currentPhoto?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePhoto}>
              Delete Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
