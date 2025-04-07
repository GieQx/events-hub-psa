
interface MarqueeSectionProps {
  items: string[];
  className?: string;
}

export function MarqueeSection({ items, className = "" }: MarqueeSectionProps) {
  // Duplicate the items to create a seamless loop
  const marqueeItems = [...items, ...items];

  return (
    <div className={`marquee-container py-4 ${className}`}>
      <div className="marquee-content">
        {marqueeItems.map((item, index) => (
          <div 
            key={index} 
            className="mx-4 whitespace-nowrap px-4 font-medium"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
