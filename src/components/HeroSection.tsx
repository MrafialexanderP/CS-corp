import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [showCamarSakti, setShowCamarSakti] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for this section
      let progress = 0;
      if (rect.top < windowHeight) {
        progress = Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight));
      }
      
      setScrollProgress(progress);
      
      // Trigger animations once when scrolled to threshold
      if (progress > 0.05 && !showPhilosophy) {
        setShowPhilosophy(true);
      }
      if (progress > 0.3 && !showCamarSakti) {
        setShowCamarSakti(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showPhilosophy, showCamarSakti]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center pt-12 sm:pt-20 pb-24 sm:pb-28 md:pb-32 px-3 sm:px-6 overflow-hidden"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Background.png)'
        }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-2 sm:px-0">
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-wide sm:whitespace-nowrap"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, lineHeight: '1.2' }}
        >
          CAMAR SAKTI CORPORATION
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showPhilosophy ? 1 : 0, y: showPhilosophy ? 0 : 20 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-6 sm:mb-12 md:mb-16 tracking-wider"
        >
          THE CS PHILOSHOPHY
        </motion.h2>
        
        {/* Camar and Sakti Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 max-w-3xl mx-auto px-2 sm:px-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: showCamarSakti ? 1 : 0, x: showCamarSakti ? 0 : -30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left w-full sm:w-1/2"
          >
            <h3 className="text-sm sm:text-xl md:text-2xl text-white mb-1">
              <span className="font-bold text-white">C</span>amar/ <span className="italic font-light">Seagull</span>
            </h3>
            <p className="text-white/80 text-xs sm:text-sm italic">A creature of three Elements: Land,</p>
            <p className="text-white/80 text-xs sm:text-sm italic">Sea, Air</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: showCamarSakti ? 1 : 0, x: showCamarSakti ? 0 : 30 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-right w-full sm:w-1/2"
          >
            <h3 className="text-sm sm:text-xl md:text-2xl text-white mb-1">
              <span className="font-bold text-white">S</span>akti/ <span className="italic font-light">Mighty</span>
            </h3>
            <p className="text-white/80 text-xs sm:text-sm italic">The Powerful being</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[150px] pointer-events-none z-20"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%,
            rgba(255,255,255,0.3) 30%,
            rgba(255,255,255,0.6) 50%,
            rgba(255,255,255,0.85) 70%,
            rgba(255,255,255,1) 100%
          )`
        }}
      />
    </section>
  );
};

export default HeroSection;
