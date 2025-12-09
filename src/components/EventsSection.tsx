import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const events = [
  {
    title: "K-Content BizWeek 2025 by KOCCA",
    date: "Jan 24th-30th 2025",
    image: "/placeholder.svg"
  },
  {
    title: "Shila Fun Run 2025",
    date: "Jan 7th 2025",
    image: "/placeholder.svg"
  },
  {
    title: "The New BMW X3 & BMW Z Grand Coupe Launch by BMW",
    date: "",
    image: "/placeholder.svg"
  }
];

const ImageWithLoading = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent animate-shimmer" 
               style={{
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s infinite'
               }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {hasError && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Image not found</span>
        </div>
      )}
    </div>
  );
};

const EventsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-32 px-8 md:px-12 lg:px-16">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/OurEvents.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex items-center justify-between mb-20"
        >
          <div className="rounded-full px-12 py-6" style={{ backgroundColor: '#EF6C4E' }}>
            <h2 className="text-4xl font-bold text-white">OUR EVENTS</h2>
          </div>
          <button className="text-lg font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {events.map((event, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden bg-primary border-0 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="aspect-[3/2] bg-gray-200 overflow-hidden">
                  <ImageWithLoading src={event.image} alt={event.title} />
                </div>
                <div className="p-10">
                  <h3 className="text-white font-bold text-2xl mb-4 leading-tight">{event.title}</h3>
                  {event.date && <p className="text-white/90 text-lg">{event.date}</p>}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
