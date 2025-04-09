
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
import { CMSPartner } from "@/types/cms";

const PartnersAdmin = () => {
  const [partners, setPartners] = useState<CMSPartner[]>(cmsService.partners.getAll());
  const [editingPartner, setEditingPartner] = useState<CMSPartner | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("rvs");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const events = cmsService.events.getAll();

  const partnerCategories = ['platinum', 'gold', 'silver', 'bronze', 'media', 'community'];

  const resetForm = () => {
    setEditingPartner(null);
    setIsCreating(false);
  };

  const handleCreatePartner = () => {
    setIsCreating(true);
    setEditingPartner({
      id: crypto.randomUUID(),
      eventId: selectedEventId,
      name: "",
      description: "",
      logoUrl: "",
      website: "",
      category: 'silver',
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
      setPartners(cmsService.partners.getAll());
      toast.success("Partner deleted successfully");
    }
  };

  const handleSavePartner = () => {
    if (!editingPartner) return;
    
    try {
      if (isCreating) {
        cmsService.partners.create(editingPartner);
        toast.success("Partner created successfully");
      } else {
        cmsService.partners.update(editingPartner.id, editingPartner);
        toast.success("Partner updated successfully");
      }
      
      setPartners(cmsService.partners.getAll());
      resetForm();
    } catch (error) {
      toast.error("Error saving partner");
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPartner) return;
    
    const { name, value } = e.target;
    setEditingPartner({
      ...editingPartner,
      [name]: name === 'order' ? parseInt(value) : value
    });
  };

  const handleCategoryChange = (value: string) => {
    if (editingPartner) {
      setEditingPartner({
        ...editingPartner,
        category: value as 'platinum' | 'gold' | 'silver' | 'bronze' | 'media' | 'community'
      });
    } else {
      setSelectedCategory(value);
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(value);
    if (editingPartner) {
      setEditingPartner({
        ...editingPartner,
        eventId: value
      });
    }
  };

  let filteredPartners = partners;
  
  if (selectedEventId) {
    filteredPartners = filteredPartners.filter(partner => partner.eventId === selectedEventId);
  }
  
  if (selectedCategory) {
    filteredPartners = filteredPartners.filter(partner => partner.category === selectedCategory);
  }

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
            <h1 className="text-2xl font-bold">Partners Management</h1>
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
                value={selectedCategory || ""}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {partnerCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreatePartner} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
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
                  <div className="space-y-2">
                    <Label htmlFor="name">Partner Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={editingPartner.name} 
                      onChange={handleInputChange} 
                      placeholder="Organization name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventId">Event</Label>
                    <Select value={editingPartner.eventId} onValueChange={handleEventChange}>
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
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={editingPartner.category} 
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {partnerCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input 
                      id="order" 
                      name="order" 
                      type="number"
                      min="0"
                      value={editingPartner.order || 0} 
                      onChange={handleInputChange} 
                      placeholder="Display order (0 = automatic)" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={editingPartner.description || ""} 
                    onChange={handleInputChange} 
                    placeholder="Brief description of the partnership" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input 
                    id="logoUrl" 
                    name="logoUrl" 
                    value={editingPartner.logoUrl} 
                    onChange={handleInputChange} 
                    placeholder="URL to partner's logo" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={editingPartner.website || ""} 
                    onChange={handleInputChange} 
                    placeholder="https://example.com" 
                  />
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
              {filteredPartners.map((partner) => (
                <Card key={partner.id} className={`border-l-4 border-l-${partner.category === 'platinum' ? 'gray-400' : partner.category === 'gold' ? 'yellow-400' : partner.category === 'silver' ? 'gray-300' : partner.category === 'bronze' ? 'amber-700' : 'blue-500'}`}>
                  <CardHeader>
                    <div className="flex justify-center mb-4 h-16">
                      {partner.logoUrl && (
                        <img 
                          src={partner.logoUrl} 
                          alt={partner.name}
                          className="h-full object-contain"
                        />
                      )}
                    </div>
                    <CardTitle>{partner.name}</CardTitle>
                    <CardDescription>
                      {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)} Partner
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {partner.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                    )}
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline mt-2 inline-block"
                      >
                        Visit Website
                      </a>
                    )}
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
              ))}
            </div>
          )}
        </ScrollSection>
      </main>
    </div>
  );
};

export default PartnersAdmin;
