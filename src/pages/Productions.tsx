import Masonry from "@/components/Masonry";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchProductions } from "@/lib/api-services";
import { getImageUrl } from "@/lib/api-constants";
import type { Production } from "@/lib/api-constants";
import { Link } from "react-router-dom";

const Productions = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [productions, setProductions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductions = async () => {
      try {
        setLoading(true);
        const data = await fetchProductions();
        
        // Map API data to component format
        const mappedProductions = data.map((prod: Production, index: number) => {
          // Prioritize image_url from API, fallback to constructed URL
          const imageUrl = prod.images && prod.images.length > 0
            ? getImageUrl(prod.images[0].image, prod.images[0].image_url)
            : '/placeholder.svg';
          
          const heights = [600, 500, 550, 450, 520, 580, 490, 530, 510, 470, 560, 500, 540];
          
          return {
            id: String(prod.id),
            title: prod.judul,
            subtitle: prod.deskripsi,
            img: imageUrl,
            url: '#',
            height: heights[index % heights.length],
          };
        });
        
        setProductions(mappedProductions);
        setError(null);
      } catch (err) {
        console.error('Failed to load productions:', err);
        setError('Failed to load productions');
        // Fallback to empty array
        setProductions([]);
      } finally {
        setLoading(false);
      }
    };

    loadProductions();
  }, []);

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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex items-center justify-between mb-12"
          >
            <Link 
              to="/" 
              className="text-sm font-semibold hover:opacity-70 transition-opacity"
            >
              ← back to home
            </Link>
            <div className="bg-primary rounded-full px-8 py-4">
              <h2 className="text-2xl font-bold text-white">OUR PRODUCTIONS</h2>
            </div>
          </motion.div>

          {error && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8 text-gray-500">
              <p>Loading productions...</p>
            </div>
          )}
        </div>
      </section>

      {/* Masonry grid spans the full viewport width */}
      {!loading && !error && productions.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative w-full pb-24"
        >
          <div style={{ minHeight: '2000px' }}>
            <Masonry
              items={productions}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              stagger={0.04}
            />
          </div>
        </motion.section>
      )}

      <Footer />
    </div>
  );
};

export default Productions;

