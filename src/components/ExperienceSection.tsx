import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ShowMoreButtonSimple from './ShowMoreButtonSimple';

const ExperienceSection = () => {
  const [buttonOffset, setButtonOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = window.setTimeout(() => {
        if (sectionRef.current) {
          const cards = sectionRef.current.querySelectorAll('.scroll-stack-card');
          if (cards.length > 0) {
            const lastCard = cards[cards.length - 1] as HTMLElement;
            const lastCardRect = lastCard.getBoundingClientRect();
            const sectionRect = sectionRef.current.getBoundingClientRect();

            const offset = lastCardRect.bottom - sectionRect.top;
            setButtonOffset(Math.max(offset + 30, 420)); // lower minimum offset to reduce whitespace
          }
        }
      }, 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gray-50" style={{ minHeight: '160vh' }}>
      <div className="sticky top-0 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
          {/* Header - Now part of the same sticky layer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 pt-8 sm:pt-12 md:pt-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3C597F] italic">
              Creating Impactful Experiences<br />
              & Harmonious Collaborations
            </h2>
          </motion.div>

          {/* ScrollStack Cards - Now part of the same sticky layer */}
          <div className="flex-1">
            <ScrollStack
              className="h-full"
              itemDistance={50}
              itemStackDistance={20}
              baseScale={0.95}
              useWindowScroll={true}
            >
          {/* Event Organizer Card */}
          <ScrollStackItem itemClassName="bg-[#3C597F] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Event Organizer</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Comprehensive planning and execution services for unforgettable events
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* Brand Activation Card */}
          <ScrollStackItem itemClassName="bg-[#EF6C4E] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Brand Activation</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Strategic campaigns that bring brands to life and engage audiences
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* MICE Card */}
          <ScrollStackItem itemClassName="bg-[#3C597F] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">MICE</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Meetings, Incentives, Conferences & Events management solutions
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* Exhibition Card */}
          <ScrollStackItem itemClassName="bg-[#EF6C4E] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Exhibition</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Creative exhibition design and immersive experiential spaces
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* Entertainment Card */}
          <ScrollStackItem itemClassName="bg-[#3C597F] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Entertainment</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Professional entertainment and performance production services
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>
            </ScrollStack>
          </div>

          {/* Button Below ScrollStack */}
          <div 
            style={{ 
              position: 'absolute',
              top: `${buttonOffset}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            <ShowMoreButtonSimple />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
