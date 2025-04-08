
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface NetworkBackgroundProps {
  nodes?: number;
  className?: string;
}

export function NetworkBackground({ nodes = 20, className = "" }: NetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodeElements, setNodeElements] = useState<Node[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Create nodes when component mounts or window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Generate random nodes
        const newNodes: Node[] = [];
        for (let i = 0; i < nodes; i++) {
          newNodes.push({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 6 + 2, // 2-8px
            color: getRandomColor(),
          });
        }
        setNodeElements(newNodes);
      }
    };

    // Get random color based on theme
    const getRandomColor = () => {
      const colors = ['#FF6479', '#2A9D8F', '#E63946', '#3F7E44', '#9b87f5'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [nodes]);

  // Track mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`network-bg relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {nodeElements.map((node) => {
        // Calculate distance from mouse
        const dx = node.x - mousePosition.x;
        const dy = node.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isInfluenced = distance < 200; // Influence radius
        
        return (
          <motion.div
            key={node.id}
            className="absolute rounded-full"
            initial={{ 
              x: node.x, 
              y: node.y, 
              width: node.size, 
              height: node.size 
            }}
            animate={{ 
              x: isInfluenced ? node.x + (dx > 0 ? 20 : -20) : node.x,
              y: isInfluenced ? node.y + (dy > 0 ? 20 : -20) : node.y,
              width: isInfluenced ? node.size * 1.5 : node.size,
              height: isInfluenced ? node.size * 1.5 : node.size,
              opacity: isInfluenced ? 0.8 : 0.3
            }}
            style={{ 
              backgroundColor: node.color,
              boxShadow: isInfluenced ? `0 0 10px ${node.color}` : 'none'
            }}
            transition={{ duration: 0.5 }}
          />
        );
      })}
      {/* Add connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodeElements.map((node, i) => {
          return nodeElements.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 100) { // Only connect nearby nodes
              return (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={node.x + node.size / 2}
                  y1={node.y + node.size / 2}
                  x2={otherNode.x + otherNode.size / 2}
                  y2={otherNode.y + otherNode.size / 2}
                  strokeWidth={Math.max(0.5, 1 - distance / 100)}
                  stroke="rgba(150,150,150,0.2)"
                  strokeDasharray="2,2"
                  animate={{ 
                    opacity: distance < 50 ? 0.5 : 0.2
                  }}
                />
              );
            }
            return null;
          });
        })}
      </svg>
    </div>
  );
}
