import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ShowMoreButtonSimple from "./ShowMoreButtonSimple";
import ProductionCard from "./ProductionCard";
import Masonry from "./Masonry";
import { fetchEvents } from "@/lib/api-services";
import { getImageUrl } from "@/lib/api-constants";
import type { Event } from "@/lib/api-constants";

type Production = {
  title: string;
  subtitle?: string;
  location?: string;
  image: string;
};

const CSCOMSection = () => {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        
        // Transform API data and limit to maximum 9 events
        const transformedProductions: Production[] = data
          .slice(0, 9) // Limit to maximum 9 events
          .map((event: Event) => {
            const mainImage = event.images && event.images.length > 0 
              ? getImageUrl(event.images[0].image, event.images[0].image_url)
              : '/placeholder.svg';

            return {
              title: event.judul,
              subtitle: event.deskripsi || "Event Productions",
              location: event.client ? `Client: ${event.client}` : "",
              image: mainImage,
            };
          });
        
        setProductions(transformedProductions);
      } catch (error) {
        console.error('Failed to load events:', error);
        setProductions([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="bg-transparent">
      <div className="px-4 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="mx-auto max-w-4xl text-3xl sm:text-4xl lg:text-[42px] font-bold italic leading-tight" style={{ color: '#3C597F' }}>
            Creating Impactful Experiences
            <br />
            & Harmonious Collaborations
          </h2>
        </motion.div>
      </div>

      <div className="px-4 pb-6 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl" style={{ height: i % 2 === 0 ? 420 : 260 }} />
              ))}
            </div>
          ) : (
            (() => {
              const patternHeights = [260, 420, 260, 260, 420, 260, 260, 420, 260]; // Pattern untuk 9 items
              const items = productions.map((p, idx) => ({
                id: `${idx}-${p.title}`,
                img: p.image,
                url: '#',
                height: patternHeights[idx % patternHeights.length],
                title: p.title,
                subtitle: p.subtitle
              }));
              return <Masonry items={items} animateFrom="bottom" />;
            })()
          )}
        </div>
        <div className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end">
          <ShowMoreButtonSimple />
        </div>
      </div>

      <div className="px-4 pb-14 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:pr-12 lg:pt-8"
          >
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold italic leading-tight text-coral">
              Precision in Every
              <br />
              Detail: From Concept
              <br />
              to Construction.
            </h3>
            <div className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end">
              <ShowMoreButtonSimple />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full flex justify-center lg:justify-end"
          >
            <img
              src="/fotocampuran.png"
              alt="CSCOM production collage"
              loading="lazy"
              className="w-full max-w-[600px] lg:max-w-[700px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCOMSection;
