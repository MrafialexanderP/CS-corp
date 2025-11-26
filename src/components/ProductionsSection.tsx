import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const productions = [
  {
    title: "Youtube Creator Collective",
    subtitle: "Booth Productions",
    image: "/placeholder.svg"
  },
  {
    title: "Astra Corporate Affairs Awards",
    subtitle: "Event by ASTRA",
    image: "/placeholder.svg"
  },
  {
    title: "Dulux",
    subtitle: "Booth at Kawan Lama Purwokerto",
    image: "/placeholder.svg"
  }
];

const ProductionsSection = () => {
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
          <button className="text-sm font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
          <div className="bg-primary rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR PRODUCTIONS</h2>
          </div>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {productions.map((production, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden bg-coral border-0 rounded-2xl shadow-lg">
                <div className="aspect-video bg-gray-200">
                  <img src={production.image} alt={production.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-1">{production.title}</h3>
                  <p className="text-white/90 text-sm">{production.subtitle}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductionsSection;
