
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundStyle?: string;
  darkOverlay?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  backgroundStyle = "bg-gradient-to-r from-blue-500 to-purple-600",
  darkOverlay = false
}) => {
  return (
    <div className={`${backgroundStyle} text-white py-20 px-4 relative`}>
      {darkOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">{description}</p>
        
        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
