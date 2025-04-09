
import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
      <p className="text-xl md:text-2xl max-w-2xl mx-auto">{description}</p>
    </div>
  );
};
