
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash, Save, Globe } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSPartner } from "@/types/cms";

export function PartnersManagement() {
  const [partners, setPartners] = useState<CMSPartner[]>(cmsService.partners.getAll());
  const [editingPartner, setEditingPartner] = useState<CMSPartner | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    { value: "platinum", label: "Platinum" },
    { value: "gold", label: "Gold" },
    { value: "silver", label: "Silver" },
    { value: "bronze", label: "Bronze" },
    { value: "media", label: "Media" },
    { value: "community", label: "Community" }
  ];

  useEffect(() => {
    let filteredPartners = cmsService.partners.getAll();
    
    if (selectedEventId) {
      filteredPartners = filteredPartners.filter(partner => partner.eventId === selectedEventId);
    }
    
    if (selectedCategory) {
      filteredPartners = filteredPartners.filter(partner => partner.category === selectedCategory);
    }
    
    setPartners(filteredPartners);
  }, [selectedEventId, selectedCategory]);
  
  const resetForm = () => {
    setEditingPartner(null);
    setIsCreating(false);
  };

  const handleCreatePartner = () => {
    setIsCreating(true);
    setEditingPartner({
      id: crypto.randomUUID(),
      eventId: selectedEventId || events[0]?.id || "",
      name: "",
      logoUrl: "",
      category: "gold",
      order: 0
    });
  };

  const handleEditPartner = (partner: CMSPartner) => {
    setEditingPartner({...partner});
    setIsCreating(false);
  };

  const handleDeletePartner = (id: string) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      cmsService.partners.delete(id);
      
      let filteredPartners = cmsService.partners.getAll();
      if (selectedEventId) {
        filteredPartners = filteredPartners.filter(partner => partner.eventId === selectedEventId);
      }
      if (selectedCategory) {
        filteredPartners = filteredPartners.filter(partner => partner.category === selectedCategory);
      }
      setPartners(filteredPartners);
      
      toast.success("Partner deleted successfully");
    }
  };

  const handleSavePartner = () => {
    if (!editingPartner) return;
    
    if (!editingPartner.name || !editingPartner.logoUrl) {
      toast.error("Name and logo URL are required fields");
      return;
    }
    
    try {
      if (isCreating) {
        cmsService.partners.create(editingPartner);
        toast.success("Partner created successfully");
      } else {
        cmsService.partners.update(editingPartner.id, editingPartner);
        toast.success("Partner updated successfully");
      }
      
      let filteredPartners = cmsService.partners.getAll();
      if (selectedEventId) {
        filteredPartners = filteredPartners.filter(partner => partner.eventId === selectedEventId);
      }
      if (selectedCategory) {
        filteredPartners = filteredPartners.filter(partner => partner.category === selectedCategory);
      }
      setPartners(filteredPartners);
      
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPartner) return;
    
    const { name, value } = e.target;
    setEditingPartner({
      ...editingPartner,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!editingPartner) return;
    
    setEditingPartner({
      ...editingPartner,
      [name]: value
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "platinum": return "bg-gray-300";
      case "gold": return "bg-yellow-200";
      case "silver": return "bg-gray-200";
      case "bronze": return "bg-amber-600";
      case "media": return "bg-blue-200";
      case "community": return "bg-green-200";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Partners Management</h2>
        <div className="flex items-center gap-4">
          <div className="w-48">
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
          <div className="w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreatePartner} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>
      </div>

      {editingPartner ? (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Partner" : "Edit Partner"}</CardTitle>
            <CardDescription>
              {isCreating ? "Add a new partner to the platform" : "Modify partner details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventId">Event</Label>
                <Select 
                  value={editingPartner.eventId} 
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
                <Label htmlFor="name">Partner Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingPartner.name} 
                  onChange={handleInputChange} 
                  placeholder="Partner name" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editingPartner.description || ""} 
                onChange={handleInputChange} 
                placeholder="Partner description" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input 
                  id="logoUrl" 
                  name="logoUrl" 
                  value={editingPartner.logoUrl} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/logo.png" 
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL (Optional)</Label>
                <Input 
                  id="website" 
                  name="website" 
                  value={editingPartner.website || ""} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={editingPartner.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order" 
                  name="order" 
                  type="number"
                  value={editingPartner.order?.toString() || "0"} 
                  onChange={handleInputChange} 
                  min="0" 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSavePartner} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Partner
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.length > 0 ? (
            partners.map((partner) => (
              <Card key={partner.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(partner.category)}`}>
                      {partner.category.toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {partner.logoUrl && (
                    <div className="flex justify-center bg-gray-50 dark:bg-gray-800 p-4 rounded">
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.name} logo`} 
                        className="max-h-16 object-contain" 
                      />
                    </div>
                  )}
                  
                  {partner.description && (
                    <p className="text-sm">{partner.description}</p>
                  )}
                  
                  {partner.website && (
                    <div className="flex items-center gap-1 text-sm text-blue-500">
                      <Globe className="h-3 w-3" />
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="truncate">
                        {partner.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Event: {events.find(e => e.id === partner.eventId)?.title || partner.eventId}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditPartner(partner)} className="flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeletePartner(partner.id)} className="flex items-center gap-1">
                    <Trash className="h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {selectedEventId 
                ? "No partners found for this event or category. Add some partners!" 
                : "No partners found. Add some partners!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
