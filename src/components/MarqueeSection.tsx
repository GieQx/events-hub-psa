
interface MarqueeSectionProps {
  items: string[];
  className?: string;
  primaryColor?: string;
}

export function MarqueeSection({ items, className = "", primaryColor = "#3B82F6" }: MarqueeSectionProps) {
  // Duplicate the items to create a seamless loop
  const marqueeItems = [...items, ...items];

  return (
    <div className={`marquee-container overflow-hidden py-4 ${className}`}>
      <div 
        className="marquee-content flex animate-marquee items-center"
        style={{ animationDuration: `${items.length * 5}s` }}
      >
        {marqueeItems.map((item, index) => (
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
