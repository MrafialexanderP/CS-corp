import { Button } from "@/components/ui/button";
import ScrollTypeText from "./ScrollTypeText";

const ImpactSection = () => {
  return (
    <section id="about" className="bg-white pt-8 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">
          <ScrollTypeText
            text="We create impactful experiences and productions."
            className="text-coral"
            containerClassName="inline-block"
          />
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
