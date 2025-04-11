
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin } from "lucide-react";
import { getEventColor } from "@/utils/eventHelpers";
import { FadeInSection } from "@/components/home/FadeInSection";

interface FeaturedEventsSectionProps {
  featuredEvents: any[];
}

export const FeaturedEventsSection = ({ featuredEvents }: FeaturedEventsSectionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                Explore our signature events crafted to deliver exceptional experiences 
                and valuable insights for professionals across industries.
              </p>
            </div>
            <Link to="/events" className="mt-4 md:mt-0 group flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
              <span>View all events</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.length > 0 ? (
            featuredEvents.map((event, index) => (
              <FadeInSection key={event.id} delay={index * 0.1}>
                <Link to={`/events/${event.id}`} className="block group">
                  <div className="rounded-xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
                      {event.imageUrl ? (
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${getEventColor(event.id)}`}>
                          <span className="text-white text-2xl font-bold">{event.shortName || event.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium px-4 py-2 rounded-full border border-white">View Event</span>
                      </div>
                    </div>
                    <div className={`p-6 ${getEventColor(event.id)} text-white`}>
                      <div className="mb-3 flex justify-between">
                        <span className="text-sm font-medium opacity-90">{event.date}</span>
                        <span className="text-sm font-bold opacity-90">{event.shortName}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-4">{event.description}</p>
                      <div className="flex items-center text-sm opacity-90">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">No featured events available. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
