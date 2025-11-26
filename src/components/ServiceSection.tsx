import { motion } from "framer-motion";

const ServiceSection = () => {
  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        {/* Curved wave background */}
        <svg className="w-full h-32 md:h-40" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0 L0 100 Q360 150 720 100 T1440 100 L1440 0 Z" fill="hsl(var(--primary))" />
        </svg>
        
        {/* Marquee text positioned on the wave */}
        <div className="absolute top-8 md:top-12 left-0 right-0 overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-3xl md:text-4xl font-bold text-white mx-8">OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-gray-800">CS</span>
                <span className="text-coral">PROD</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {[
                'Event Contractor',
                'Promotional Items',
                'Signage & Branding',
                'Printings & Acrylic Media'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-coral text-white px-6 py-4 rounded-xl font-semibold text-center"
                >
                  <span className="text-white mr-2">{index + 1}</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-gray-800">CS</span>
                <span className="text-coral">COM</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {[
                'Event Organizer',
                'Activation',
                'MICE',
                'Exhibition',
                'Entertainment'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-coral text-white px-6 py-4 rounded-xl font-semibold text-center"
                >
                  <span className="text-white mr-2">{index + 1}</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative overflow-hidden bg-gradient-to-r from-vibrant-purple via-purple-600 to-vibrant-purple py-8">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-5xl md:text-6xl font-black text-white uppercase tracking-wider px-8" style={{ fontFamily: 'Impact, Arial Black, sans-serif', letterSpacing: '0.15em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP • 
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
