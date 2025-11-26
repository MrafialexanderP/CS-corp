import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ImpactSection = () => {
  return (
    <section id="about" className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Curved decorative lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0 100 Q 200 50 400 100 T 800 100" stroke="hsl(var(--coral))" strokeWidth="3" fill="none" />
        <path d="M 100 300 Q 400 250 700 300 T 1200 300" stroke="hsl(var(--vibrant-blue))" strokeWidth="3" fill="none" />
        <path d="M -100 500 Q 300 450 700 500 T 1400 500" stroke="hsl(var(--vibrant-purple))" strokeWidth="3" fill="none" />
      </svg>
      
      {/* Star icons */}
      <Star className="absolute top-12 left-12 text-coral fill-coral" size={32} />
      <Star className="absolute top-20 right-24 text-vibrant-blue fill-vibrant-blue" size={24} />
      <Star className="absolute bottom-32 left-32 text-vibrant-purple fill-vibrant-purple" size={28} />
      <Star className="absolute bottom-16 right-16 text-coral fill-coral animate-pulse" size={20} />
      
      <div className="absolute top-8 left-48 w-12 h-12 bg-primary rounded-lg transform rotate-45" />
      <div className="absolute bottom-8 right-48 w-12 h-12 bg-primary rounded-lg transform rotate-45" />
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <span className="text-coral">We create </span>
          <span className="text-coral italic underline decoration-4">impactful</span>
          <span className="text-coral"> experiences</span>
          <br />
          <span className="text-coral">and productions.</span>
        </h2>
        
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full font-semibold"
        >
          LEARN MORE →
        </Button>
      </div>
    </section>
  );
};

export default ImpactSection;
