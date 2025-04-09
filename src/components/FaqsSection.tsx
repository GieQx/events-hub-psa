
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Faq } from "@/components/types";
import { getParticleColor, getEventTextColor } from "@/utils/eventHelpers";

interface FaqsSectionProps {
  faqs: Faq[];
  className?: string;
  eventId?: string;
}

export function FaqsSection({ faqs, className = "", eventId = "nccrvs" }: FaqsSectionProps) {
  return (
    <div className={`relative ${className}`}>
      <ParticleBackground 
        color={getParticleColor(eventId)} 
        particleCount={60}
        className="absolute inset-0 opacity-20 z-0" 
      />
      <div className="relative z-10">
        <h2 className="mb-6 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className={`text-left hover:${getEventTextColor(eventId)}`}>
                  {faq.question}
                </AccordionTrigger>
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
