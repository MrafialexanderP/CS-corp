import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const masonryRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress for masonry animation
  const { scrollYProgress: masonryScrollProgress } = useScroll({
    target: masonryRef,
    offset: ["start end", "center center"]
  });

  // Scroll progress for bottom section animation
  const { scrollYProgress: bottomScrollProgress } = useScroll({
    target: bottomSectionRef,
    offset: ["start end", "center center"]
  });

  // Transform values for masonry container
  const masonryOpacity = useTransform(masonryScrollProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);
  const masonryY = useTransform(masonryScrollProgress, [0, 0.3, 0.7, 1], [80, 80, 0, 0]);

  // Transform values for bottom section
  const textOpacity = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const textX = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [-80, -80, 0, 0]);
  const imageOpacity = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [0, 0, 1, 1]);
  const imageX = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [80, 80, 0, 0]);
  const imageScale = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [0.85, 0.85, 1, 1]);
  const imageBlur = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [10, 10, 0, 0]);
  const imageFilter = useMotionTemplate`blur(${imageBlur}px)`;
  
  // Transform values for bottom text lines
  const bottomLine1Opacity = useTransform(bottomScrollProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);
  const bottomLine1Y = useTransform(bottomScrollProgress, [0, 0.3, 0.7, 1], [40, 40, 0, 0]);
  const bottomLine2Opacity = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const bottomLine2Y = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [40, 40, 0, 0]);
  const bottomLine3Opacity = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [0, 0, 1, 1]);
  const bottomLine3Y = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [40, 40, 0, 0]);

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
    <section className="bg-transparent -mt-32 sm:-mt-20 md:mt-0" id="cscom">
      <div className="pb-6 sm:pb-8">
        <motion.div 
          ref={masonryRef}
          className="relative w-full px-6 sm:px-8 md:px-12"
          style={{
            opacity: masonryOpacity,
            y: masonryY,
          }}
        >
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
        </motion.div>
      </div>

      <div ref={bottomSectionRef} className="relative pb-14 sm:pb-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-6 lg:pt-8 px-4 lg:pl-8 xl:pl-12"
            style={{
              opacity: textOpacity,
              x: textX,
            }}
          >
            <motion.h3 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold italic leading-tight text-coral"
            >
              <motion.span
                className="block"
                style={{
                  opacity: bottomLine1Opacity,
                  y: bottomLine1Y,
                }}
              >
                Precision in Every
              </motion.span>
              <motion.span
                className="block"
                style={{
                  opacity: bottomLine2Opacity,
                  y: bottomLine2Y,
                }}
              >
                Detail: From Concept
              </motion.span>
              <motion.span
                className="block"
                style={{
                  opacity: bottomLine3Opacity,
                  y: bottomLine3Y,
                }}
              >
                to Construction.
              </motion.span>
            </motion.h3>
          </motion.div>

          <motion.div
            className="w-full px-4 lg:px-6 xl:px-8"
            style={{
              opacity: imageOpacity,
              x: imageX,
              scale: imageScale,
            }}
          >
            <motion.img
              src="/fotocampuran.png"
              alt="CSCOM production collage"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{
                filter: imageFilter,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCOMSection;
