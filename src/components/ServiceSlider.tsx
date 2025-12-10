import { useState } from 'react';
import { motion } from 'framer-motion';

const ServiceSlider = () => {
  const [activePanel, setActivePanel] = useState<'default' | 'cscom' | 'cspro'>('default');

  const marqueeText = "OUR SERVICE • ";
  const marqueeItems = Array.from({ length: 3 });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#3C597F' }}>
        <div className="flex w-full whitespace-nowrap items-center justify-between">
          {marqueeItems.map((_, idx) => (
            <span
              key={`top-marquee-${idx}`}
              className="flex-1 text-center text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] leading-none"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal Accordion */}
      <div className="relative h-[600px] flex overflow-hidden">
        
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
            style={{ 
              backgroundImage: 'linear-gradient(to bottom, #3C597F 0%, #EF6C4E 100%)'
            }}
          >
            
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
                  <span style={{ color: '#3C597F' }}>CS</span>
                  <span style={{ color: '#EF6C4E' }}>CORP</span>
                </h1>
                <p className="text-white/90 text-base md:text-lg max-w-xl leading-relaxed">
                  Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.
                </p>
              </motion.div>
            ) : (
              <div 
                className="relative z-10 h-full flex items-center justify-center" 
                style={{ backgroundImage: 'linear-gradient(to bottom, #3C597F 0%, #EF6C4E 100%)' }}
              >
                <span 
                  className="text-white font-black italic text-5xl md:text-6xl lg:text-7xl tracking-[0.08em] leading-none"
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
          className={`relative overflow-hidden cursor-pointer ${activePanel === 'cscom' ? 'bg-white' : ''}`}
          style={{ backgroundColor: activePanel === 'cscom' ? 'white' : '#3C597F' }}
          onClick={() => setActivePanel('cscom')}
        >
          {activePanel === 'cscom' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 py-12"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 italic" style={{ color: '#EF6C4E' }}>CSCOM</h2>
              <p className="text-gray-600 text-base mb-6">@cscom.co</p>
              
              <p className="text-gray-800 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
                Your dedicated partner for comprehensive <span className="font-bold">Event Organizing, Brand Activation, MICE, Exhibition,</span> and <span className="font-bold">Entertainment solutions.</span>
              </p>

              <div className="mb-10">
                <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-1">990K+</h3>
                <p className="text-gray-600 text-lg">client</p>
              </div>

              {/* Service Images Grid */}
              <div className="grid grid-cols-5 gap-3 w-full max-w-4xl px-4">
                {['Event Organizing', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service) => (
                  <div key={service} className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(239, 108, 78, 0.8), rgba(239, 108, 78, 0.2))' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-bold leading-tight">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center" style={{ backgroundColor: '#3C597F' }}>
              <span 
                className="text-[#EF6C4E] font-black italic text-5xl md:text-6xl lg:text-7xl tracking-[0.08em] leading-none"
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
          className={`relative overflow-hidden cursor-pointer ${activePanel === 'cspro' ? 'bg-white' : ''}`}
          style={{ backgroundColor: activePanel === 'cspro' ? 'white' : '#EF6C4E' }}
          onClick={() => setActivePanel('cspro')}
        >
          {activePanel === 'cspro' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full overflow-y-auto flex flex-col justify-center items-center text-center px-6 md:px-10 lg:px-12 py-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 italic" style={{ color: '#3C597F' }}>CSPRO</h2>
              <p className="text-gray-600 text-sm md:text-base mb-4">@cspro_event</p>
              
              <p className="text-gray-800 text-sm md:text-base max-w-2xl mb-6 leading-relaxed px-4">
                Your one-stop solution for all production needs: <span className="font-bold">Event Construction, Signage & Branding, Promotional Items,</span> and <span className="font-bold">Digital Printing.</span>
              </p>

              <div className="mb-6">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">990K+</h3>
                <p className="text-gray-600 text-base">client</p>
              </div>

              {/* Service Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl px-4">
                {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service) => (
                  <div key={service} className="relative aspect-[3/4] bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(60, 89, 127, 0.9), transparent)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-white text-xs md:text-sm font-bold leading-tight">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center" style={{ backgroundColor: '#EF6C4E' }}>
              <span 
                className="text-[#3C597F] font-black italic text-5xl md:text-6xl lg:text-7xl tracking-[0.08em] leading-none"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                CSPRO
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Marquee - Coral background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#EF6C4E' }}>
        <div className="flex w-full whitespace-nowrap items-center justify-between">
          {marqueeItems.map((_, idx) => (
            <span
              key={`bottom-marquee-${idx}`}
              className="flex-1 text-center text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] leading-none"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
