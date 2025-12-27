import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

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

  return (
    <section className="bg-white py-24">
      {/* Header stays centered */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex items-center justify-between mb-12"
        >
          <Link 
            to="/productions"
            className="text-sm font-semibold hover:opacity-70 transition-opacity"
          >
            click to see more →
          </Link>
          <div className="bg-primary rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR PRODUCTIONS</h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductionsSection;
