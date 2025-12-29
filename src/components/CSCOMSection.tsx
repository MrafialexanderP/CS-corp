import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress for title animation
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "center center"]
  });

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

  // Transform values for title
  const titleOpacity = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const titleY = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [60, 60, 0, 0]);
  const titleBlur = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [8, 8, 0, 0]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  
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
  
  // Transform values for title lines
  const line1Opacity = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);
  const line1Y = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [30, 30, 0, 0]);
  const line2Opacity = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const line2Y = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [30, 30, 0, 0]);
  
  // Transform values for bottom text lines
  const bottomLine1Opacity = useTransform(bottomScrollProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);
  const bottomLine1Y = useTransform(bottomScrollProgress, [0, 0.3, 0.7, 1], [40, 40, 0, 0]);
  const bottomLine2Opacity = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const bottomLine2Y = useTransform(bottomScrollProgress, [0, 0.4, 0.8, 1], [40, 40, 0, 0]);
  const bottomLine3Opacity = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [0, 0, 1, 1]);
  const bottomLine3Y = useTransform(bottomScrollProgress, [0, 0.5, 0.9, 1], [40, 40, 0, 0]);
  const buttonOpacity = useTransform(bottomScrollProgress, [0, 0.6, 1], [0, 0, 1]);
  const buttonY = useTransform(bottomScrollProgress, [0, 0.6, 1], [20, 20, 0]);

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
          ref={titleRef}
          className="text-center mb-6"
          style={{
            opacity: titleOpacity,
            y: titleY,
            filter: titleFilter,
          }}
        >
          <motion.h2 
            className="mx-auto max-w-4xl text-3xl sm:text-4xl lg:text-[42px] font-bold italic leading-tight" 
            style={{ color: '#3C597F' }}
          >
            <motion.span
              className="block"
              style={{
                opacity: line1Opacity,
                y: line1Y,
              }}
            >
              Creating Impactful Experiences
            </motion.span>
            <motion.span
              className="block"
              style={{
                opacity: line2Opacity,
                y: line2Y,
              }}
            >
              & Harmonious Collaborations
            </motion.span>
          </motion.h2>
        </motion.div>
      </div>

      <div className="px-4 pb-6 sm:pb-8">
        <motion.div 
          ref={masonryRef}
          className="mx-auto max-w-6xl"
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
        <motion.div 
          className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end"
          style={{
            opacity: masonryOpacity,
            y: masonryY,
          }}
        >
          <ShowMoreButtonSimple />
        </motion.div>
      </div>

      <div ref={bottomSectionRef} className="px-4 pb-14 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-6 lg:pr-12 lg:pt-8"
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
            <motion.div 
              className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end"
              style={{
                opacity: buttonOpacity,
                y: buttonY,
              }}
            >
              <ShowMoreButtonSimple />
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full flex justify-center lg:justify-end"
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
              className="w-full max-w-[600px] lg:max-w-[700px]"
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
