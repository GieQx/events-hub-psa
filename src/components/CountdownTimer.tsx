
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 lg:gap-6">
      {timeBlocks.map((block, index) => (
        <Card 
          key={index} 
          className="flex flex-col items-center justify-center p-2 md:p-4 border border-white/30 backdrop-blur-sm bg-black/60 shadow-xl text-white"
        >
          <span className="text-xl md:text-3xl lg:text-4xl font-bold">
            {block.value.toString().padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-gray-100">
            {block.label}
          </span>
        </Card>
      ))}
    </div>
  );
}
