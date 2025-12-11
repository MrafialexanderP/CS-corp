import { motion } from 'framer-motion';
import LogoLoop, { LogoItem } from './LogoLoop';

// Row 1 logos
const row1Logos: LogoItem[] = [
  { src: '/placeholder.svg', alt: 'Client 1', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 2', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Guinness', width: 80, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 3', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 4', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Kormi', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 5', width: 60, height: 60 },
];

// Row 2 logos
const row2Logos: LogoItem[] = [
  { src: '/placeholder.svg', alt: 'Tunas', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Jinro', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Traveloka', width: 80, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 6', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Cetaphil', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Serangkay', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Opentext', width: 60, height: 60 },
];

// Row 3 logos
const row3Logos: LogoItem[] = [
  { src: '/placeholder.svg', alt: 'JTI', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Client 7', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Smartcity', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Hoka', width: 80, height: 60 },
  { src: '/placeholder.svg', alt: 'PetPod', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Dulux', width: 60, height: 60 },
  { src: '/placeholder.svg', alt: 'Tesla', width: 60, height: 60 },
];

const ClientsSection = () => {
  return (
    <section id="client" className="bg-gray-50 py-12 sm:py-16 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-vibrant-blue text-white py-4 sm:py-6 px-4 sm:px-6 text-center mb-8 sm:mb-12"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold italic tracking-wide">
          OUR CLIENTS
        </h2>
      </motion.div>

      {/* Logo Rows */}
      <div className="space-y-8 sm:space-y-12 px-4 sm:px-6">
        {/* Row 1 - Left to Right */}
        <LogoLoop
          logos={row1Logos}
          speed={80}
          direction="left"
          gap={60}
          logoHeight={90}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 1"
        />

        {/* Row 2 - Right to Left */}
        <LogoLoop
          logos={row2Logos}
          speed={-80}
          direction="right"
          gap={60}
          logoHeight={90}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 2"
        />

        {/* Row 3 - Left to Right */}
        <LogoLoop
          logos={row3Logos}
          speed={80}
          direction="left"
          gap={60}
          logoHeight={90}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 3"
        />
      </div>
    </section>
  );
};

export default ClientsSection;
