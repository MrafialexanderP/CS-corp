import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceSlider = () => {
  // null = default (CSCORP), 'cscom' = CSCOM expanded, 'cspro' = CSPRO expanded
  const [activeView, setActiveView] = useState<null | 'cscom' | 'cspro'>(null);

  const marqueeText = "OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • ";

  const cscomServices = ['Event Organizer', 'Activation', 'MICE', 'Exhibition', 'Entertainment'];
  const csproServices = ['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="bg-vibrant-blue py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-service">
          <span className="text-white font-bold text-lg tracking-wider mx-4">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider mx-4">{marqueeText}</span>
        </div>
      </div>

      {/* Main Content Area - Stacked Cards Effect */}
      <div className="relative h-[500px] overflow-hidden">
        
        {/* Layer 1 (Back) - CSPRO - Always visible at back */}
        <motion.div 
          className="absolute inset-0 flex"
          animate={{
            x: activeView === 'cspro' ? 0 : 0,
            scale: activeView === 'cspro' ? 1 : 0.92,
            opacity: activeView === 'cspro' ? 1 : 0.7,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ zIndex: activeView === 'cspro' ? 30 : 10 }}
        >
          {/* CSCOM Tab untuk switch */}
          <button
            onClick={() => setActiveView(activeView === 'cspro' ? null : 'cscom')}
            className="w-[100px] h-full bg-vibrant-blue flex items-center justify-center cursor-pointer flex-shrink-0 hover:brightness-110 transition-all"
          >
            <span 
              className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSCOM
            </span>
          </button>

          {/* CSPRO Content */}
          <div className="flex-1 bg-coral p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="text-white/20 text-7xl md:text-8xl font-bold mb-2">02</div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">CSPRO</h3>
            <p className="text-white/85 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
              We deliver comprehensive production services from concept to completion. Our team specializes in creating impactful brand experiences through quality craftsmanship.
            </p>
            <div className="flex flex-wrap gap-3 max-w-lg">
              {csproServices.map((service) => (
                <span
                  key={service}
                  className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Layer 2 (Middle) - CSCOM */}
        <motion.div 
          className="absolute inset-0 flex"
          animate={{
            x: activeView === 'cspro' ? '100%' : activeView === 'cscom' ? 0 : 0,
            scale: activeView === 'cscom' ? 1 : activeView === 'cspro' ? 1 : 0.96,
            opacity: activeView === 'cscom' ? 1 : activeView === 'cspro' ? 1 : 0.85,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ zIndex: activeView === 'cscom' ? 30 : 20 }}
        >
          {/* CSCORP Tab untuk kembali */}
          <button
            onClick={() => setActiveView(null)}
            className="w-[100px] h-full bg-gray-700 flex items-center justify-center cursor-pointer flex-shrink-0 hover:brightness-110 transition-all"
          >
            <span 
              className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              <span className="text-[#6B8BA4]">CS</span>
              <span className="text-coral">CORP</span>
            </span>
          </button>

          {/* CSCOM Content */}
          <div className="flex-1 bg-vibrant-blue p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="text-white/20 text-7xl md:text-8xl font-bold mb-2">01</div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">CSCOM</h3>
            <p className="text-white/85 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
              Strategic communication and event management solutions that connect brands with their audiences. We create memorable experiences that drive engagement.
            </p>
            <div className="flex flex-wrap gap-3 max-w-lg">
              {cscomServices.map((service) => (
                <span
                  key={service}
                  className="bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* CSPRO Tab untuk switch */}
          <button
            onClick={() => setActiveView('cspro')}
            className="w-[100px] h-full bg-coral flex items-center justify-center cursor-pointer flex-shrink-0 hover:brightness-110 transition-all"
          >
            <span 
              className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSPRO
            </span>
          </button>
        </motion.div>

        {/* Layer 3 (Front) - CSCORP - Default view */}
        <motion.div 
          className="absolute inset-0 flex"
          animate={{
            x: activeView === 'cscom' ? '100%' : activeView === 'cspro' ? '100%' : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ zIndex: 30 }}
        >
          {/* Background Image - CSCORP */}
          <div className="flex-1 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/togetherness.png)' }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* CSCORP Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 px-8">
              <h2 
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="text-[#6B8BA4]">CS</span>
                <span className="text-coral">CORP</span>
              </h2>
              <p className="text-white/90 text-center max-w-2xl text-base md:text-lg leading-relaxed">
                Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.
              </p>
            </div>
          </div>

          {/* CSCOM Tab - Blue */}
          <button
            onClick={() => setActiveView('cscom')}
            className="w-[100px] h-full bg-vibrant-blue flex items-center justify-center cursor-pointer flex-shrink-0 hover:brightness-110 transition-all border-l-2 border-white/10"
          >
            <span 
              className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSCOM
            </span>
          </button>

          {/* CSPRO Tab - Coral */}
          <button
            onClick={() => setActiveView('cspro')}
            className="w-[100px] h-full bg-coral flex items-center justify-center cursor-pointer flex-shrink-0 hover:brightness-110 transition-all"
          >
            <span 
              className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wider"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              CSPRO
            </span>
          </button>
        </motion.div>

        {/* Stack indicator - Visual hint of stacked cards on the left */}
        <AnimatePresence>
          {activeView === null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-[10%] bottom-[10%] w-3 bg-vibrant-blue/60 rounded-r-sm"
                style={{ zIndex: 5 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-3 top-[15%] bottom-[15%] w-2 bg-coral/50 rounded-r-sm"
                style={{ zIndex: 4 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Marquee - Coral background, white text */}
      <div className="bg-coral py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-service-reverse">
          <span className="text-white font-bold text-lg tracking-wider mx-4">{marqueeText}</span>
          <span className="text-white font-bold text-lg tracking-wider mx-4">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
