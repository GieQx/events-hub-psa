
import { useRef } from "react";
import { Users, Calendar, MapPin, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInSection } from "@/components/home/FadeInSection";

export const EventStatsSection = () => {
  const counterRef = useRef(null);
  const stats = [
    { id: 1, icon: <Users className="h-6 w-6" />, value: 1000, label: "Attendees", suffix: "+" },
    { id: 2, icon: <Calendar className="h-6 w-6" />, value: 10, label: "Events", suffix: "" },
    { id: 3, icon: <MapPin className="h-6 w-6" />, value: 4, label: "Locations", suffix: "" },
    { id: 4, icon: <BarChart2 className="h-6 w-6" />, value: 98, label: "Satisfaction Rate", suffix: "%" }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-12">Our Events at a Glance</h2>
        </FadeInSection>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeInSection key={stat.id} delay={index * 0.1}>
              <Card className="text-center border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 text-blue-600 dark:text-blue-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center justify-center" ref={counterRef}>
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className="text-3xl font-bold">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};
