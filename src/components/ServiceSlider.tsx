import { useState } from 'react';
import { motion } from 'framer-motion';

const ServiceSlider = () => {
  const [activePanel, setActivePanel] = useState<'default' | 'cscom' | 'cspro'>('default');

  const marqueeText = "OUR SERVICE • ";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="bg-vibrant-blue py-3 overflow-hidden">
        <div className="flex whitespace-nowrap gap-0">
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
        </div>
      </div>

      {/* Horizontal Accordion */}
      <div className="relative h-[500px] flex overflow-hidden">
        
        {/* Default Panel - CSCORP */}
        <motion.div
          animate={{
            width: activePanel === 'default' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden cursor-pointer"
          onClick={() => setActivePanel('default')}
        >
          <div 
            className="h-full bg-cover bg-center bg-no-repeat relative w-full"
            style={{ backgroundImage: 'url(/togetherness.png)' }}
          >
            <div className="absolute inset-0 bg-black/50" />
            
            {activePanel === 'default' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8"
              >
                <h1 
                  className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="text-[#6B8BA4]">CS</span>
                  <span className="text-coral">CORP</span>
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                  Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.
                </p>
              </motion.div>
            ) : (
              <div className="relative z-10 h-full flex items-center justify-center">
                <span 
                  className="text-white font-bold text-3xl tracking-wider"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                >
                  CSCORP
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* CSCOM Panel */}
        <motion.div
          animate={{
            width: activePanel === 'cscom' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden bg-vibrant-blue cursor-pointer"
          onClick={() => setActivePanel('cscom')}
        >
          {activePanel === 'cscom' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col justify-center p-8 md:p-12 lg:p-16"
            >
              <div className="text-white/20 text-6xl md:text-7xl font-bold mb-2">01</div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">CSCOM</h2>
              <p className="text-white/85 text-base lg:text-lg mb-8 max-w-2xl leading-relaxed">
                Strategic communication and event management solutions that connect brands with their audiences.
              </p>
              <div className="flex flex-wrap gap-3 max-w-2xl">
                {['Event Organizer', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service) => (
                  <span
                    key={service}
                    className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span 
                className="text-white font-bold text-3xl tracking-wider"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                CSCOM
              </span>
            </div>
          )}
        </motion.div>

        {/* CSPRO Panel */}
        <motion.div
          animate={{
            width: activePanel === 'cspro' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden bg-coral cursor-pointer"
          onClick={() => setActivePanel('cspro')}
        >
          {activePanel === 'cspro' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col justify-center p-8 md:p-12 lg:p-16"
            >
              <div className="text-white/20 text-6xl md:text-7xl font-bold mb-2">02</div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">CSPRO</h2>
              <p className="text-white/85 text-base lg:text-lg mb-8 max-w-2xl leading-relaxed">
                Comprehensive production services from concept to completion with quality craftsmanship.
              </p>
              <div className="flex flex-wrap gap-3 max-w-2xl">
                {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service) => (
                  <span
                    key={service}
                    className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span 
                className="text-white font-bold text-3xl tracking-wider"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                CSPRO
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Marquee - Coral background, white text */}
      <div className="bg-coral py-3 overflow-hidden">
        <div className="flex whitespace-nowrap gap-0">
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
