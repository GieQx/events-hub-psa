
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface Faq {
  question: string;
  answer: string;
}

interface FaqsSectionProps {
  faqs: Faq[];
  className?: string;
}

export function FaqsSection({ faqs, className = "" }: FaqsSectionProps) {
  return (
    <div className={className}>
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
  );
}
