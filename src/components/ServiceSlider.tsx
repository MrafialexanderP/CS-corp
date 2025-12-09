import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceSlider = () => {
  const [activeView, setActiveView] = useState<'default' | 'cscom' | 'cspro'>('default');

  const marqueeText = "OUR SERVICE • ";

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const getDirection = (newView: 'default' | 'cscom' | 'cspro') => {
    const order = { default: 0, cscom: 1, cspro: 2 };
    return order[newView] > order[activeView] ? 1 : -1;
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="bg-vibrant-blue py-3 overflow-hidden">
        <div className="w-full flex whitespace-nowrap">
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative h-[500px] flex overflow-hidden">
        
        {/* Content Area - Left Side */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Default View - CSCORP */}
            {activeView === 'default' && (
              <motion.div
                key="content-default"
                custom={getDirection('default')}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <div 
                  className="h-full bg-cover bg-center bg-no-repeat relative"
                  style={{ backgroundImage: 'url(/togetherness.png)' }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
                    {/* Title */}
                    <h1 
                      className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span className="text-[#6B8BA4]">CS</span>
                      <span className="text-coral">CORP</span>
                    </h1>

                    {/* Description */}
                    <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                      Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CSCOM View */}
            {activeView === 'cscom' && (
              <motion.div
                key="content-cscom"
                custom={getDirection('cscom')}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 bg-vibrant-blue"
              >
                <div className="h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/20 text-6xl md:text-7xl font-bold mb-2"
                  >
                    01
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                  >
                    CSCOM
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white/85 text-base lg:text-lg mb-8 max-w-2xl leading-relaxed"
                  >
                    Strategic communication and event management solutions that connect brands with their audiences.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-wrap gap-3 max-w-2xl"
                  >
                    {['Event Organizer', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service) => (
                      <span
                        key={service}
                        className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                      >
                        {service}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* CSPRO View */}
            {activeView === 'cspro' && (
              <motion.div
                key="content-cspro"
                custom={getDirection('cspro')}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 bg-coral"
              >
                <div className="h-full flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/20 text-6xl md:text-7xl font-bold mb-2"
                  >
                    02
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                  >
                    CSPRO
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white/85 text-base lg:text-lg mb-8 max-w-2xl leading-relaxed"
                  >
                    Comprehensive production services from concept to completion with quality craftsmanship.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-wrap gap-3 max-w-2xl"
                  >
                    {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service) => (
                      <span
                        key={service}
                        className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                      >
                        {service}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Tabs */}
        <div className="flex flex-shrink-0">
          {/* CSCOM Tab - Blue */}
          <button
            onClick={() => setActiveView(activeView === 'cscom' ? 'default' : 'cscom')}
            className={`w-[80px] md:w-[100px] h-full flex items-center justify-center transition-all duration-300 ${
              activeView === 'cscom' 
                ? 'bg-vibrant-blue/80' 
                : 'bg-vibrant-blue hover:bg-vibrant-blue/90'
            }`}
          >
            <span 
              className="text-white font-bold text-xl md:text-2xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSCOM
            </span>
          </button>

          {/* CSPRO Tab - Coral */}
          <button
            onClick={() => setActiveView(activeView === 'cspro' ? 'default' : 'cspro')}
            className={`w-[80px] md:w-[100px] h-full flex items-center justify-center transition-all duration-300 ${
              activeView === 'cspro' 
                ? 'bg-coral/80' 
                : 'bg-coral hover:bg-coral/90'
            }`}
          >
            <span 
              className="text-white font-bold text-xl md:text-2xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSPRO
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Marquee - Coral background, white text */}
      <div className="bg-coral py-3 overflow-hidden">
        <div className="w-full flex whitespace-nowrap">
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider flex-1">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
