
import { ScrollSection } from "@/components/ScrollSection";

export const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <ScrollSection>
          <h2 className="mb-8 text-center text-3xl font-bold">About Our Conventions</h2>
        </ScrollSection>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ScrollSection delay={0.3}>
            <div>
              <h3 className="text-2xl font-bold mb-4">Supporting Statistical Education</h3>
              <p className="mb-4">Our conventions are designed to enhance stakeholder engagement while building a foundation for integrating statistical education into mainstream curricula.</p>
              <p>Through interactive sessions, workshops, and networking opportunities, we aim to improve accessibility and understanding of statistical information.</p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Expert-led sessions on modern statistical methodologies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Interactive workshops for hands-on learning</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Networking with industry leaders and peers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Access to the latest research and publications</span>
                </li>
              </ul>
            </div>
          </ScrollSection>
          
          <ScrollSection delay={0.5}>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80" 
                alt="People at convention" 
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollSection>
        </div>
      </div>
    </section>
  );
};
