
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Plus, Minus, Home, Layout } from "lucide-react";
import cmsService from "@/services/cmsService";

export function HomeContentManagement() {
  const [content, setContent] = useState<any>(null);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the home content
    const homeContent = cmsService.homeContent.get();
    setContent(homeContent);
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTestimonial = () => {
    setContent(prev => ({
      ...prev,
      testimonials: [
        ...(prev.testimonials || []),
        {
          id: crypto.randomUUID(),
          text: "",
          author: "",
          position: "",
          company: ""
        }
      ]
    }));
  };

  const handleRemoveTestimonial = (id: string) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((t: any) => t.id !== id)
    }));
  };

  const handleTestimonialChange = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((t: any) => 
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  const handleFeaturedEventsChange = (eventId: string) => {
    setContent(prev => {
      const featured = prev.featuredEvents || [];
      if (featured.includes(eventId)) {
        return {
          ...prev,
          featuredEvents: featured.filter((id: string) => id !== eventId)
        };
      } else {
        return {
          ...prev,
          featuredEvents: [...featured, eventId]
        };
      }
    });
  };

  const handleSaveContent = () => {
    try {
      const updatedContent = cmsService.homeContent.update(content);
      if (updatedContent) {
        toast.success("Home content updated successfully");
      } else {
        toast.error("Failed to update home content");
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!content) {
    return <div className="text-center py-8">No home content available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Home Page Content</h2>
        <Button onClick={handleSaveContent} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Hero Section
          </CardTitle>
          <CardDescription>
            Configure the main hero section content on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input 
              id="heroTitle" 
              name="heroTitle" 
              value={content.heroTitle || ""} 
              onChange={handleInputChange} 
              placeholder="Hero title" 
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Textarea 
              id="heroSubtitle" 
              name="heroSubtitle" 
              value={content.heroSubtitle || ""} 
              onChange={handleInputChange} 
              placeholder="Hero subtitle" 
            />
          </div>
          <div>
            <Label htmlFor="heroBackgroundStyle">Hero Background Style</Label>
            <Select
              value={content.heroBackgroundStyle || "bg-gradient-to-r from-blue-500 to-purple-600"}
              onValueChange={(value) => handleSelectChange('heroBackgroundStyle', value)}
            >
              <SelectTrigger id="heroBackgroundStyle">
                <SelectValue placeholder="Select a background style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg-gradient-to-r from-blue-500 to-purple-600">Blue to Purple</SelectItem>
                <SelectItem value="bg-gradient-to-r from-green-400 to-blue-500">Green to Blue</SelectItem>
                <SelectItem value="bg-gradient-to-r from-pink-500 to-yellow-500">Pink to Yellow</SelectItem>
                <SelectItem value="bg-gradient-to-r from-purple-500 to-indigo-500">Purple to Indigo</SelectItem>
                <SelectItem value="bg-gradient-to-r from-yellow-400 to-orange-500">Yellow to Orange</SelectItem>
                <SelectItem value="bg-gradient-to-r from-blue-500 to-teal-400">Blue to Teal</SelectItem>
                <SelectItem value="bg-rvs-primary">RVS Primary</SelectItem>
                <SelectItem value="bg-bms-primary">BMS Primary</SelectItem>
                <SelectItem value="bg-sm-primary">SM Primary</SelectItem>
                <SelectItem value="bg-cs-primary">CS Primary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Featured Events
          </CardTitle>
          <CardDescription>
            Select which events to feature on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`feature-${event.id}`}
                  checked={(content.featuredEvents || []).includes(event.id)}
                  onChange={() => handleFeaturedEventsChange(event.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor={`feature-${event.id}`}>{event.title}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events Section</CardTitle>
          <CardDescription>
            Configure the upcoming events section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="upcomingEventsTitle">Section Title</Label>
            <Input 
              id="upcomingEventsTitle" 
              name="upcomingEventsTitle" 
              value={content.upcomingEventsTitle || ""} 
              onChange={handleInputChange} 
              placeholder="Upcoming Events" 
            />
          </div>
          <div>
            <Label htmlFor="upcomingEventsSubtitle">Section Subtitle</Label>
            <Input 
              id="upcomingEventsSubtitle" 
              name="upcomingEventsSubtitle" 
              value={content.upcomingEventsSubtitle || ""} 
              onChange={handleInputChange} 
              placeholder="Subtitle for upcoming events section" 
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Testimonials</CardTitle>
            <CardDescription>
              Manage testimonials shown on the homepage
            </CardDescription>
          </div>
          <Button onClick={handleAddTestimonial} variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-3 w-3" />
            Add Testimonial
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {content.testimonials?.map((testimonial: any, index: number) => (
              <div key={testimonial.id} className="border rounded-md p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Testimonial {index + 1}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveTestimonial(testimonial.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div>
                  <Label htmlFor={`testimonial-${testimonial.id}-text`}>Testimonial Text</Label>
                  <Textarea 
                    id={`testimonial-${testimonial.id}-text`}
                    value={testimonial.text || ""}
                    onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)}
                    placeholder="Testimonial text"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor={`testimonial-${testimonial.id}-author`}>Author</Label>
                    <Input 
                      id={`testimonial-${testimonial.id}-author`}
                      value={testimonial.author || ""}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'author', e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-${testimonial.id}-position`}>Position</Label>
                    <Input 
                      id={`testimonial-${testimonial.id}-position`}
                      value={testimonial.position || ""}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'position', e.target.value)}
                      placeholder="Author position"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-${testimonial.id}-company`}>Company</Label>
                    <Input 
                      id={`testimonial-${testimonial.id}-company`}
                      value={testimonial.company || ""}
                      onChange={(e) => handleTestimonialChange(testimonial.id, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </div>
            ))}

            {content.testimonials?.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No testimonials added yet. Click "Add Testimonial" to create one.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveContent} className="w-full">Save All Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
