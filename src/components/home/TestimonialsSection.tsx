
import { Card, CardContent } from "@/components/ui/card";
import { FadeInSection } from "@/components/home/FadeInSection";

interface TestimonialsSectionProps {
  testimonials: any[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="mb-10 text-3xl font-bold text-center">What People Are Saying</h2>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <FadeInSection key={testimonial.id} delay={index * 0.1}>
              <Card className="relative border-none shadow-lg h-full">
                <div className="absolute left-6 top-6 text-5xl text-gray-200 dark:text-gray-700">"</div>
                <CardContent className="p-8 pt-12 h-full flex flex-col">
                  <p className="mb-6 text-gray-600 dark:text-gray-300 relative z-10 flex-grow">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-300">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
