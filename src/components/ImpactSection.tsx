import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Blue diamond/star decoration component
const BlueDiamond = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none"
  >
    <defs>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
    </defs>
    <path 
      d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" 
      fill="#0A4AAC"
      filter="url(#blur)"
      opacity="0.9"
    />
    <path 
      d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" 
      fill="#0A4AAC"
    />
  </svg>
);

const ImpactSection = () => {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Blue Diamond Decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 sm:top-16 left-4 sm:left-8 md:left-16"
      >
        <BlueDiamond className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-12 sm:bottom-20 right-4 sm:right-8 md:right-16"
      >
        <BlueDiamond className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
      </motion.div>

      <div className="max-w-4xl mx-auto text-left relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight"
        >
          <span className="text-coral">We create impactful experience </span>
          <span className="text-coral italic">and Productions</span>
          <br />
        </motion.h2>
      </div>
    </section>
  );
};

export default ImpactSection;
