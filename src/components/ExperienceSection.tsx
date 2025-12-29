import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ShowMoreButtonSimple from './ShowMoreButtonSimple';

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Scroll progress for title animation
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "center center"]
  });

  // Transform values for title animation
  const titleOpacity = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [0, 0, 1, 1]);
  const titleY = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [80, 80, 0, 0]);
  const titleBlur = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [10, 10, 0, 0]);
  const titleScale = useTransform(titleScrollProgress, [0, 0.3, 0.7, 1], [0.8, 0.8, 1, 1]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  
  // Transform values for individual text lines
  const line1Opacity = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [0, 0, 1, 1]);
  const line1Y = useTransform(titleScrollProgress, [0, 0.4, 0.8, 1], [40, 40, 0, 0]);
  const line2Opacity = useTransform(titleScrollProgress, [0, 0.5, 0.9, 1], [0, 0, 1, 1]);
  const line2Y = useTransform(titleScrollProgress, [0, 0.5, 0.9, 1], [40, 40, 0, 0]);

  return (
    <section ref={sectionRef} className="relative bg-gray-50" style={{ minHeight: '160vh' }}>
      <div className="sticky top-0 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col">
          {/* Header - Now part of the same sticky layer with enhanced scroll animation */}
          <motion.div
  ref={titleRef}
  className="text-center mb-3 sm:mb-4 md:mb-5 pt-2 sm:pt-4 md:pt-20"
  style={{
    opacity: titleOpacity,
    y: titleY,
    filter: titleFilter,
    scale: titleScale,
  }}
>
  <motion.h2
    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
               font-bold italic text-[#3C597F] leading-tight"
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
      className="block mt-1 sm:mt-2"
      style={{
        opacity: line2Opacity,
        y: line2Y,
      }}
    >
      & Harmonious Collaborations
    </motion.span>
  </motion.h2>
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
            <motion.div
              className="flex-1 mb-6 sm:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Event Organizer</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Comprehensive planning and execution services for unforgettable events
              </p>
            </motion.div>
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: -180, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                LOGO
              </motion.div>
            </motion.div>
          </ScrollStackItem>

          {/* Brand Activation Card */}
          <ScrollStackItem itemClassName="bg-[#EF6C4E] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <motion.div
              className="flex-1 mb-6 sm:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Brand Activation</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Strategic campaigns that bring brands to life and engage audiences
              </p>
            </motion.div>
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: 180, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                LOGO
              </motion.div>
            </motion.div>
          </ScrollStackItem>

          {/* MICE Card */}
          <ScrollStackItem itemClassName="bg-[#3C597F] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <motion.div
              className="flex-1 mb-6 sm:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">MICE</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Meetings, Incentives, Conferences & Events management solutions
              </p>
            </motion.div>
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: -180, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                LOGO
              </motion.div>
            </motion.div>
          </ScrollStackItem>

          {/* Exhibition Card */}
          <ScrollStackItem itemClassName="bg-[#EF6C4E] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <motion.div
              className="flex-1 mb-6 sm:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Exhibition</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Creative exhibition design and immersive experiential spaces
              </p>
            </motion.div>
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: 180, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                LOGO
              </motion.div>
            </motion.div>
          </ScrollStackItem>

          {/* Entertainment Card */}
          <ScrollStackItem itemClassName="bg-[#3C597F] text-white h-80 sm:h-75 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <motion.div
              className="flex-1 mb-6 sm:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Entertainment</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Professional entertainment and performance production services
              </p>
            </motion.div>
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: -180, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                LOGO
              </motion.div>
            </motion.div>
          </ScrollStackItem>
            </ScrollStack>
          </div>
        </div>
      </div>
      
      {/* Button Below ScrollStack - Outside sticky container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center py-8">
        <ShowMoreButtonSimple />
      </div>
    </section>
  );
};

export default ExperienceSection;
