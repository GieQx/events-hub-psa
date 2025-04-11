
import { Sparkles, Users, CornerRightDown } from "lucide-react";
import { FadeInSection } from "@/components/home/FadeInSection";

export const ValuePropositionSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl font-bold text-center mb-4">Why Attend Our Conventions?</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
            Our events are carefully crafted to provide valuable experiences that enhance your professional development
            and expand your network with like-minded individuals.
          </p>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "Expert Insights",
              description: "Learn from industry leaders and gain valuable knowledge about the latest trends and innovations."
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Networking Opportunities",
              description: "Connect with professionals, potential partners, and influencers in your field."
            },
            {
              icon: <CornerRightDown className="h-6 w-6" />,
              title: "Interactive Workshops",
              description: "Participate in hands-on sessions designed to enhance your skills and practical knowledge."
            }
          ].map((item, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
