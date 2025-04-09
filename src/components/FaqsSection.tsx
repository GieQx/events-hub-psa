
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Faq } from "@/components/types";

interface FaqsSectionProps {
  faqs: Faq[];
  className?: string;
  eventId?: string;
}

export function FaqsSection({ faqs, className = "", eventId = "rvs" }: FaqsSectionProps) {
  // Get the correct event particle color
  const getParticleColor = () => {
    switch(eventId) {
      case "rvs": return "#FF6479";
      case "bms": return "#2A9D8F";
      case "sm": return "#E63946";
      case "cs": return "#3F7E44";
      default: return "#9b87f5";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <ParticleBackground 
        color={getParticleColor()} 
        particleCount={40}
        className="absolute inset-0 opacity-15 z-0" 
      />
      <div className="relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
