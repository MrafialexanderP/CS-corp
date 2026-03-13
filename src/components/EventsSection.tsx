import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchEvents } from "@/lib/api-services";
import { getImageUrl } from "@/lib/api-constants";
import type { Event } from "@/lib/api-constants";
import OptimizedImage from "./OptimizedImage";

interface EventItem {
  title: string;
  date: string;
  image: string;
}

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
        loading="lazy"
        decoding="async"
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
  // Observe entire section visibility
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.2 });

  // Only animate after user actually scrolls at least once
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  useEffect(() => {
    const markScrolled = () => setHasUserScrolled(true);
    // Do not set initial value from window.scrollY to avoid auto-trigger on refresh
    window.addEventListener('scroll', markScrolled, { passive: true });
    return () => window.removeEventListener('scroll', markScrolled);
  }, []);

  const shouldAnimate = hasUserScrolled && sectionInView;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        
        // Transform API data and limit to 9 events max
        const transformedEvents: EventItem[] = data
          .slice(0, 9) // Limit to maximum 9 events
          .map((event: Event) => {
            const mainImage = event.images && event.images.length > 0 
              ? getImageUrl(event.images[0].image, event.images[0].image_url)
              : '/placeholder.svg';
            
            // Format date from tanggal
            let formattedDate = '';
            if (event.tanggal) {
              const date = new Date(event.tanggal);
              const day = date.getDate();
              const month = date.toLocaleDateString('en-US', { month: 'short' });
              const year = date.getFullYear();
              formattedDate = `${month} ${day}${getDaySuffix(day)} ${year}`;
            }

            return {
              title: event.judul,
              date: formattedDate,
              image: mainImage,
            };
          });
        
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Helper function to get day suffix (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

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
    hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // Small helper for per-card parallax tied to scroll progress
  const ParallaxItem: React.FC<{ index: number; children: React.ReactNode; active: boolean }> = ({ index, children, active }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start 90%", "end 10%"],
    });
    const { ref: inViewRef, inView: cardInView } = useInView({ threshold: 0.35, triggerOnce: true });
    const setRefs = useCallback((el: HTMLDivElement | null) => {
      targetRef.current = el;
      inViewRef(el);
    }, [inViewRef]);

    // Vary speed a bit per column for a pleasing effect
    const speeds = [16, 8, 12];
    const speed = speeds[index % 3];
    const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

    return (
      <motion.div ref={setRefs} className="relative" style={{ y }}>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={active && cardInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative overflow-hidden py-32 px-8 md:px-12 lg:px-16">
      <OptimizedImage
        src="/OurEvents.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex items-center justify-between mb-20"
        >
          <div className="rounded-full px-12 py-6" style={{ backgroundColor: '#EF6C4E' }}>
            <h2 className="text-4xl font-bold text-white">OUR EVENTS</h2>
          </div>
          <a 
            href="/events" 
            className="text-lg font-semibold hover:opacity-70 transition-opacity text-white"
          >
            click to see more →
          </a>
        </motion.div>
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-300 animate-pulse rounded-3xl aspect-[3/2]" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {events.map((event, index) => (
              <ParallaxItem key={index} index={index} active={shouldAnimate}>
                <Card className="overflow-hidden bg-primary border-0 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <div className="aspect-[3/2] bg-gray-200 overflow-hidden">
                    <ImageWithLoading src={event.image} alt={event.title} />
                  </div>
                  <div className="p-10">
                    <h3 className="text-white font-bold text-2xl mb-4 leading-tight">{event.title}</h3>
                    {event.date && <p className="text-white/90 text-lg">{event.date}</p>}
                  </div>
                </Card>
              </ParallaxItem>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
