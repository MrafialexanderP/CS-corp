import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex items-center justify-between mb-12"
        >
          <div className="bg-coral rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR EVENTS</h2>
          </div>
          <button className="text-sm font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden bg-primary border-0 rounded-2xl shadow-lg">
                <div className="aspect-video bg-gray-200">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                  {event.date && <p className="text-white/80 text-sm">{event.date}</p>}
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
