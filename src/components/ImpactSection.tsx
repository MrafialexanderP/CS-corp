import { Button } from "@/components/ui/button";

const ImpactSection = () => {
  return (
    <section className="bg-white py-24 px-6 relative">
      <div className="absolute top-8 left-8 w-12 h-12 bg-primary rounded-lg transform rotate-45" />
      <div className="absolute bottom-8 right-8 w-12 h-12 bg-primary rounded-lg transform rotate-45" />
      
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
