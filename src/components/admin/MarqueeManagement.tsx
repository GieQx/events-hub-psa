
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Plus, Trash, Info, ArrowUp, ArrowDown } from "lucide-react";
import cmsService from "@/services/cmsService";

export interface MarqueeItem {
  id: string;
  text: string;
  eventId: string;
  order: number;
  active: boolean;
}

export function MarqueeManagement() {
  const [marqueeItems, setMarqueeItems] = useState<MarqueeItem[]>([]);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [previewItems, setPreviewItems] = useState<string[]>([]);

  useEffect(() => {
    // Load marquee items from localStorage
    const storedItems = localStorage.getItem('cms_marquee_items');
    let items: MarqueeItem[] = [];
    
    if (storedItems) {
      items = JSON.parse(storedItems);
    } else {
      // Initialize with default items if none exist
      items = [
        { id: "1", text: "Welcome to the National Convention on Civil Registration and Vital Statistics", eventId: "nccrvs", order: 1, active: true },
        { id: "2", text: "Registration opens May 1, 2026", eventId: "nccrvs", order: 2, active: true },
        { id: "3", text: "Join us for the National Convention on Community-Based Monitoring System", eventId: "cbms", order: 1, active: true },
        { id: "4", text: "Early bird registration ends July 15, 2026", eventId: "cbms", order: 2, active: true },
        { id: "5", text: "Celebrate National Statistics Month this November", eventId: "nsm", order: 1, active: true },
        { id: "6", text: "Submit your papers for the National Convention on Statistics by January 15, 2027", eventId: "ncs", order: 1, active: true },
      ];
      localStorage.setItem('cms_marquee_items', JSON.stringify(items));
    }
    
    setMarqueeItems(items);
    updatePreviewItems(items, selectedEventId);
    setLoading(false);
  }, []);

  useEffect(() => {
    updatePreviewItems(marqueeItems, selectedEventId);
  }, [selectedEventId]);

  const updatePreviewItems = (items: MarqueeItem[], eventId: string) => {
    const filtered = items.filter(item => item.active && (eventId === "all" || item.eventId === eventId));
    const texts = filtered.sort((a, b) => a.order - b.order).map(item => item.text);
    setPreviewItems(texts);
  };

  const handleAddItem = () => {
    const newItem: MarqueeItem = {
      id: crypto.randomUUID(),
      text: "",
      eventId: selectedEventId === "all" ? "nccrvs" : selectedEventId,
      order: marqueeItems.length + 1,
      active: true
    };
    
    const updatedItems = [...marqueeItems, newItem];
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = marqueeItems.filter(item => item.id !== id);
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const handleTextChange = (id: string, value: string) => {
    const updatedItems = marqueeItems.map(item => 
      item.id === id ? { ...item, text: value } : item
    );
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const handleEventChange = (id: string, eventId: string) => {
    const updatedItems = marqueeItems.map(item => 
      item.id === id ? { ...item, eventId } : item
    );
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const handleActiveChange = (id: string, active: boolean) => {
    const updatedItems = marqueeItems.map(item => 
      item.id === id ? { ...item, active } : item
    );
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const moveItemUp = (id: string) => {
    const index = marqueeItems.findIndex(item => item.id === id);
    if (index <= 0) return;
    
    const updatedItems = [...marqueeItems];
    const temp = { ...updatedItems[index] };
    updatedItems[index] = { ...updatedItems[index - 1], order: temp.order };
    updatedItems[index - 1] = { ...temp, order: updatedItems[index - 1].order };
    
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const moveItemDown = (id: string) => {
    const index = marqueeItems.findIndex(item => item.id === id);
    if (index >= marqueeItems.length - 1) return;
    
    const updatedItems = [...marqueeItems];
    const temp = { ...updatedItems[index] };
    updatedItems[index] = { ...updatedItems[index + 1], order: temp.order };
    updatedItems[index + 1] = { ...temp, order: updatedItems[index + 1].order };
    
    setMarqueeItems(updatedItems);
    updatePreviewItems(updatedItems, selectedEventId);
  };

  const handleSaveItems = () => {
    try {
      // Save to localStorage
      localStorage.setItem('cms_marquee_items', JSON.stringify(marqueeItems));
      toast.success("Marquee items saved successfully");
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getFilteredItems = () => {
    return selectedEventId === "all" 
      ? marqueeItems 
      : marqueeItems.filter(item => item.eventId === selectedEventId);
  };

  const getEventName = (id: string) => {
    const event = events.find(event => event.id === id);
    return event ? event.shortName : id;
  };

  const getPrimaryColor = (eventId: string) => {
    switch(eventId) {
      case "nccrvs": return "#FF6479";
      case "cbms": return "#2A9D8F";
      case "nsm": return "#E63946";
      case "ncs": return "#3F7E44";
      default: return "#3B82F6";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marquee Information Management</h2>
        <Button onClick={handleSaveItems} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Marquee Preview
          </CardTitle>
          <CardDescription>
            See how your marquee will appear on the event pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="filter-event">Filter by Event</Label>
            <Select
              value={selectedEventId}
              onValueChange={setSelectedEventId}
            >
              <SelectTrigger id="filter-event">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.shortName} - {event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="marquee-container overflow-hidden py-4">
              <div className="flex items-center">
                {previewItems.length > 0 ? (
                  previewItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="mx-4 whitespace-nowrap px-4 py-2 font-medium"
                      style={{ 
                        borderLeft: `4px solid ${getPrimaryColor(selectedEventId !== "all" ? selectedEventId : "nccrvs")}`,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                      }}
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="text-center w-full text-gray-500">No items to display</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Manage Marquee Items</h3>
        <Button onClick={handleAddItem} variant="outline" size="sm" className="flex items-center gap-1">
          <Plus className="h-3 w-3" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {getFilteredItems().length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No marquee items found. Click "Add Item" to create one.
          </div>
        ) : (
          getFilteredItems().map((item, index) => (
            <Card key={item.id} className={`border-l-4`} style={{ borderLeftColor: getPrimaryColor(item.eventId) }}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <Label htmlFor={`item-${item.id}-text`}>Announcement Text</Label>
                      <Input 
                        id={`item-${item.id}-text`}
                        value={item.text}
                        onChange={(e) => handleTextChange(item.id, e.target.value)}
                        placeholder="Enter announcement text"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => moveItemUp(item.id)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => moveItemDown(item.id)}
                        disabled={index === getFilteredItems().length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`item-${item.id}-event`}>Associated Event</Label>
                      <Select
                        value={item.eventId}
                        onValueChange={(value) => handleEventChange(item.id, value)}
                      >
                        <SelectTrigger id={`item-${item.id}-event`}>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map(event => (
                            <SelectItem key={event.id} value={event.id}>{event.shortName} - {event.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        type="checkbox"
                        id={`item-${item.id}-active`}
                        checked={item.active}
                        onChange={(e) => handleActiveChange(item.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`item-${item.id}-active`}>Active</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Button onClick={handleSaveItems} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
}
