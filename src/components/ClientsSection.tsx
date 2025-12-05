import { motion } from 'framer-motion';

// Client logos data - organized by rows
const clientsRow1 = [
  { name: 'Gojek', logo: '/placeholder.svg' },
  { name: 'Grab', logo: '/placeholder.svg' },
  { name: 'Hyundai', logo: '/placeholder.svg' },
  { name: 'Ajinomoto', logo: '/placeholder.svg' },
  { name: 'BCA', logo: '/placeholder.svg' },
  { name: 'BRI', logo: '/placeholder.svg' },
  { name: 'Clozette', logo: '/placeholder.svg' },
  { name: 'Garmin', logo: '/placeholder.svg' },
  { name: 'Gojek', logo: '/placeholder.svg' },
  { name: 'Grab', logo: '/placeholder.svg' },
  { name: 'Hyundai', logo: '/placeholder.svg' },
  { name: 'Ajinomoto', logo: '/placeholder.svg' },
];

const clientsRow2 = [
  { name: 'Pocari Sweat', logo: '/placeholder.svg' },
  { name: 'Telkomsel', logo: '/placeholder.svg' },
  { name: 'Ultra Milk', logo: '/placeholder.svg' },
  { name: 'Wuling', logo: '/placeholder.svg' },
  { name: 'Zinc', logo: '/placeholder.svg' },
  { name: 'Google', logo: '/placeholder.svg' },
  { name: 'Implora', logo: '/placeholder.svg' },
  { name: 'LG', logo: '/placeholder.svg' },
  { name: 'Pocari Sweat', logo: '/placeholder.svg' },
  { name: 'Telkomsel', logo: '/placeholder.svg' },
  { name: 'Ultra Milk', logo: '/placeholder.svg' },
  { name: 'Wuling', logo: '/placeholder.svg' },
];

const clientsRow3 = [
  { name: 'Softex', logo: '/placeholder.svg' },
  { name: 'Netflix', logo: '/placeholder.svg' },
  { name: 'Meta', logo: '/placeholder.svg' },
  { name: 'BCA', logo: '/placeholder.svg' },
  { name: 'Hyundai', logo: '/placeholder.svg' },
  { name: 'Ultra Milk', logo: '/placeholder.svg' },
  { name: 'Samsung', logo: '/placeholder.svg' },
  { name: 'Meta', logo: '/placeholder.svg' },
  { name: 'Softex', logo: '/placeholder.svg' },
  { name: 'Netflix', logo: '/placeholder.svg' },
  { name: 'Meta', logo: '/placeholder.svg' },
  { name: 'BCA', logo: '/placeholder.svg' },
];

interface MarqueeRowProps {
  clients: { name: string; logo: string }[];
  direction?: 'left' | 'right';
  duration?: number;
}

const MarqueeRow = ({ clients, direction = 'left', duration = 60 }: MarqueeRowProps) => {
  return (
    <div className="relative overflow-hidden py-3 group">
      {/* Two identical tracks side by side for seamless infinite loop */}
      <div 
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} ${duration}s linear infinite`,
        }}
      >
        {/* First set */}
        {clients.map((client, index) => (
          <motion.div
            key={`first-${client.name}-${index}`}
            className="flex-shrink-0 bg-white rounded-2xl px-8 py-6 flex items-center justify-center min-w-[160px] h-[80px] shadow-md mx-4"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </motion.div>
        ))}
        {/* Second set (duplicate for seamless loop) */}
        {clients.map((client, index) => (
          <motion.div
            key={`second-${client.name}-${index}`}
            className="flex-shrink-0 bg-white rounded-2xl px-8 py-6 flex items-center justify-center min-w-[160px] h-[80px] shadow-md mx-4"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </motion.div>
        ))}
      </div>
      
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

const ClientsSection = () => {
  return (
    <section id="client" className="bg-white py-24 overflow-hidden">
      {/* CSS for infinite marquee animation */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center">OUR CLIENTS</h2>
        <p className="text-gray-600 text-center mt-4">Still not convinced?
Well, they were.</p>
      </div>
      
      {/* Marquee Rows - truly infinite seamless loop */}
      <div className="space-y-2">
        <MarqueeRow clients={clientsRow1} direction="left" duration={40} />
        <MarqueeRow clients={clientsRow2} direction="right" duration={45} />
        <MarqueeRow clients={clientsRow3} direction="left" duration={35} />
      </div>
    </section>
  );
};

export default ClientsSection;
