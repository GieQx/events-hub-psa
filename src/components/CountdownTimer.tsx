
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`grid grid-cols-4 gap-2 md:gap-4 ${className}`}>
      <div className="flex flex-col items-center rounded-lg bg-white/90 p-2 shadow-md dark:bg-gray-800/90 md:p-4 border border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold md:text-4xl text-gray-900 dark:text-white">{timeLeft.days}</span>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Days</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-white/90 p-2 shadow-md dark:bg-gray-800/90 md:p-4 border border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold md:text-4xl text-gray-900 dark:text-white">{timeLeft.hours}</span>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Hours</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-white/90 p-2 shadow-md dark:bg-gray-800/90 md:p-4 border border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold md:text-4xl text-gray-900 dark:text-white">{timeLeft.minutes}</span>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Minutes</span>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-white/90 p-2 shadow-md dark:bg-gray-800/90 md:p-4 border border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold md:text-4xl text-gray-900 dark:text-white">{timeLeft.seconds}</span>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Seconds</span>
      </div>
    </div>
  );
}
