
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Plus, Minus, FileText, Tag } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSEvent, CMSTopic } from "@/types/cms";

export function TopicsManagement() {
  const [topics, setTopics] = useState<CMSTopic[]>([]);
  const [events, setEvents] = useState<CMSEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [editingTopic, setEditingTopic] = useState<CMSTopic | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      loadTopics(selectedEvent);
    }
  }, [selectedEvent]);

  const loadData = () => {
    const eventsData = cmsService.events.getAll();
    setEvents(eventsData);
    
    if (eventsData.length > 0 && !selectedEvent) {
      setSelectedEvent(eventsData[0].id);
    }
    
    setLoading(false);
  };

  const loadTopics = (eventId: string) => {
    const topicsData = cmsService.topics.getByEventId(eventId);
    setTopics(topicsData);
  };

  const handleCreateTopic = () => {
    if (!selectedEvent) {
      toast.error("Please select an event first");
      return;
    }
    
    setIsCreating(true);
    setEditingTopic({
      id: crypto.randomUUID(),
      eventId: selectedEvent,
      title: "",
      description: "",
      category: "",
      tags: [],
      order: topics.length + 1
    });
  };

  const handleEditTopic = (topic: CMSTopic) => {
    setEditingTopic({...topic});
    setIsCreating(false);
  };

  const handleDeleteTopic = (id: string) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      cmsService.topics.delete(id);
      loadTopics(selectedEvent);
      toast.success("Topic deleted successfully");
    }
  };

  const handleSaveTopic = () => {
    if (!editingTopic) return;
    
    try {
      if (isCreating) {
        cmsService.topics.create(editingTopic);
        toast.success("Topic created successfully");
      } else {
        cmsService.topics.update(editingTopic.id, editingTopic);
        toast.success("Topic updated successfully");
      }
      
      loadTopics(selectedEvent);
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingTopic) return;
    
    const { name, value } = e.target;
    setEditingTopic({
      ...editingTopic,
      [name]: value
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingTopic) return;
    
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    setEditingTopic({
      ...editingTopic,
      tags: tagsArray
    });
  };

  const resetForm = () => {
    setEditingTopic(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="h-6 w-6" />
          Topics Management
        </h2>
        <Button onClick={handleCreateTopic} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Topic
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <Label htmlFor="event-select" className="min-w-[80px]">Event:</Label>
        <Select 
          value={selectedEvent} 
          onValueChange={setSelectedEvent}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select an event" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {editingTopic ? (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Topic" : "Edit Topic"}</CardTitle>
            <CardDescription>
              {isCreating ? "Add a new topic to the event" : "Modify topic details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={editingTopic.title} 
                onChange={handleInputChange} 
                placeholder="Enter topic title" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editingTopic.description} 
                onChange={handleInputChange} 
                placeholder="Topic description" 
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  name="category" 
                  value={editingTopic.category} 
                  onChange={handleInputChange} 
                  placeholder="Topic category" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order" 
                  name="order" 
                  type="number"
                  value={editingTopic.order?.toString() || "1"} 
                  onChange={handleInputChange} 
                  placeholder="Display order" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={editingTopic.tags?.join(', ') || ""} 
                onChange={handleTagsChange} 
                placeholder="AI, Technology, Marketing, etc." 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input 
                id="imageUrl" 
                name="imageUrl" 
                value={editingTopic.imageUrl || ""} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSaveTopic} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Topic
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <Card key={topic.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      {topic.title}
                    </CardTitle>
                    <CardDescription>{topic.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{topic.description}</p>
                    {topic.tags && topic.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {topic.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleEditTopic(topic)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteTopic(topic.id)}>Delete</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No topics found for this event</p>
              <Button onClick={handleCreateTopic}>Create First Topic</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
