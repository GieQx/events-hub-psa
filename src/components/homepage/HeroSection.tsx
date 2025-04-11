
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";

export const HeroSection = () => {
  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Discover Premier Conventions
          </h2>
        </ScrollSection>
        
        <ScrollSection delay={0.4}>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Join us at these government statistical agency events featuring experts, cutting-edge insights, and valuable networking opportunities.
          </p>
        </ScrollSection>
        
        <ScrollSection delay={0.6}>
          <div className="mb-8 flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="#events">Explore Events</Link>
              </Button>
            </motion.div>
          </div>
        </ScrollSection>
        
        <ScrollSection delay={0.8}>
          <motion.div 
            className="relative mx-auto mb-16 max-w-5xl overflow-hidden rounded-xl shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
              alt="Convention hall" 
              className="w-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ height: "350px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-left text-white">
              <h3 className="text-2xl font-bold">Major Statistical Conventions for 2025-2027</h3>
              <p className="max-w-lg">From cutting-edge statistical analysis to community engagement, our conventions bring together the best minds and innovators.</p>
            </div>
          </motion.div>
        </ScrollSection>
      </div>
    </section>
  );
};
