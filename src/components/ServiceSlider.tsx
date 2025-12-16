import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollVelocity from './ScrollVelocity';

const ServiceSlider = () => {
  const [activePanel, setActivePanel] = useState<'cscorp' | 'cscom' | 'cspro'>('cscorp');

  const marqueeText = "OUR SERVICE • ";
  const marqueeItems = Array.from({ length: 3 });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#3C597F' }}>
        <ScrollVelocity
          texts={['OUR SERVICE •']}
          velocity={-50}
          className="text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em]"
          numCopies={4}
          scrollerClassName="flex whitespace-nowrap"
          parallaxClassName="overflow-hidden"
        />
      </div>

      {/* Horizontal Accordion */}
      <div className="relative h-[700px] flex overflow-hidden">
        
        {/* CSCORP Panel */}
        <motion.div
          animate={{
            width: activePanel === 'cscorp' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={"relative overflow-hidden cursor-pointer"}
          style={
            activePanel === 'cscorp'
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#E5E7EB' }
          }
          onClick={() => setActivePanel(activePanel === 'cscorp' ? 'cscorp' : 'cscorp')}
        >
          {activePanel === 'cscorp' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 py-8"
            >
              <img 
                src="/cscorp1.png"
                alt="CS Corp"
                className="w-36 md:w-44 lg:w-52 mb-3"
              />
              <p className="text-gray-800 text-sm md:text-base max-w-2xl leading-relaxed">
                Your one-stop solution for all production needs: <span className="font-bold">Event Construction, Signage & Branding, Promotional Items,</span> and <span className="font-bold">Digital Printing.</span>
              </p>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <img 
                src="/cscorp1.png"
                alt="CS Corp"
                className="w-24 md:w-28 lg:w-32"
              />
            </div>
          )}
        </motion.div>

        {/* CSCOM Panel */}
        <motion.div
          animate={{
            width: activePanel === 'cscom' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={"relative overflow-hidden cursor-pointer"}
          style={
            activePanel === 'cscom'
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#E5E7EB' }
          }
          onClick={() => setActivePanel('cscom')}
        >
          {activePanel === 'cscom' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full flex flex-col justify-center items-center text-center px-8 md:px-12 lg:px-16 py-8"
            >
              <img 
                src="cscom1.png"
                alt="CSCOM"
                className="w-36 md:w-44 lg:w-52 mb-3"
              />
              <p className="text-gray-600 text-sm mb-4">@cscom.co</p>
              
              <p className="text-gray-800 text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
                Your dedicated partner for comprehensive <span className="font-bold">Event Organizing, Brand Activation, MICE, Exhibition,</span> and <span className="font-bold">Entertainment solutions.</span>
              </p>

              <div className="mb-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">990K+</h3>
                <p className="text-gray-600 text-base">client</p>
              </div>

              {/* Service Images Grid */}
              <div className="grid grid-cols-5 gap-3 w-full max-w-4xl px-4">
                {['Event Organizing', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service) => (
                  <div key={service} className="relative aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(239, 108, 78, 0.8), rgba(239, 108, 78, 0.2))' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-xs font-bold leading-tight">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <img 
                src="/logocskom.png"
                alt="CSCOM"
                className="w-24 md:w-28 lg:w-32"
              />
            </div>
          )}
        </motion.div>

        {/* CSPRO Panel */}
        <motion.div
          animate={{
            width: activePanel === 'cspro' ? '100%' : '150px'
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className={"relative overflow-hidden cursor-pointer"}
          style={
            activePanel === 'cspro'
              ? { backgroundColor: 'white' }
              : { backgroundColor: '#E5E7EB' }
          }
          onClick={() => setActivePanel('cspro')}
        >
          {activePanel === 'cspro' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-full overflow-y-auto flex flex-col justify-center items-center text-center px-6 md:px-10 lg:px-12 py-6"
            >
              <img 
                src="/cspro1.png"
                alt="CSPRO"
                className="w-36 md:w-44 lg:w-52 mb-3"
              />
              <p className="text-gray-600 text-sm md:text-base mb-4">@cspro_event</p>
              
              <p className="text-gray-800 text-sm md:text-base max-w-2xl mb-6 leading-relaxed px-4">
                Your one-stop solution for all production needs: <span className="font-bold">Event Construction, Signage & Branding, Promotional Items,</span> and <span className="font-bold">Digital Printing.</span>
              </p>

              <div className="mb-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">990K+</h3>
                <p className="text-gray-600 text-base">client</p>
              </div>

              {/* Service Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl px-4">
                {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service) => (
                  <div key={service} className="relative aspect-[2/3] bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(60, 89, 127, 0.9), transparent)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-[10px] md:text-xs font-bold leading-tight">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <img 
                src="/logocspro.png"
                alt="CSPRO"
                className="w-24 md:w-28 lg:w-32"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Marquee - Coral background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#EF6C4E' }}>
        <ScrollVelocity
          texts={['OUR SERVICE •']}
          velocity={50}
          className="text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em]"
          numCopies={4}
          scrollerClassName="flex whitespace-nowrap"
          parallaxClassName="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default ServiceSlider;
