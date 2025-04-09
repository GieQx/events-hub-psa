
import { useState, useEffect } from "react";

interface MarqueeItem {
  id: string;
  text: string;
  eventId: string;
  order: number;
  active: boolean;
}

interface MarqueeSectionProps {
  items?: string[];
  className?: string;
  primaryColor?: string;
  eventId: string;
}

export function MarqueeSection({ 
  items = [], 
  className = "", 
  primaryColor = "#3B82F6",
  eventId
}: MarqueeSectionProps) {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Load marquee items from localStorage (admin settings)
    const storedItems = localStorage.getItem('cms_marquee_items');
    
    if (storedItems) {
      try {
        const allItems = JSON.parse(storedItems) as MarqueeItem[];
        // Filter items by eventId and active status
        const filteredItems = allItems
          .filter(item => item.eventId === eventId && item.active)
          .sort((a, b) => a.order - b.order)
          .map(item => item.text);
        
        setMarqueeItems(filteredItems.length > 0 ? filteredItems : items);
      } catch (error) {
        console.error("Error parsing marquee items:", error);
        setMarqueeItems(items);
      }
    } else {
      setMarqueeItems(items);
    }
  }, [eventId, items]);
  
  // Ensure items is not empty to prevent issues
  const safeItems = marqueeItems && marqueeItems.length > 0 
    ? marqueeItems 
    : ["No announcements available"];
  
  // Duplicate the items to create a seamless loop
  const duplicatedItems = [...safeItems, ...safeItems];

  return (
    <div className={`marquee-container overflow-hidden py-4 ${className}`}>
      <div 
        className="marquee-content flex animate-marquee items-center"
        style={{ animationDuration: `${safeItems.length * 5}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <div 
            key={index} 
            className="mx-4 whitespace-nowrap px-4 py-2 font-medium transition-transform duration-300 hover:scale-110"
            style={{ 
              borderLeft: `4px solid ${primaryColor}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
