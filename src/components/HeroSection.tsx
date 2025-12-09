import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section 
      className="min-h-screen relative flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden"
    >
      {/* Base gradient background - coral to blue like the Figma */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              #D65F44 0%, 
              #C86B5A 20%,
              #A8707A 40%,
              #7A8BAA 60%,
              #5A7DB0 80%,
              #3D6EA8 100%
            )
          `
        }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-wide"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
        >
          CAMAR SAKTI CORPORATION
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-16 tracking-wider"
        >
          THE CS PHILOSHOPHY
        </motion.h2>
        
        {/* Camar and Sakti Section */}
        <div className="flex justify-between items-start max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-left"
          >
            <h3 className="text-xl md:text-2xl text-white mb-1">
              <span className="font-bold text-vibrant-blue">C</span>amar/ <span className="italic font-light">Seagull</span>
            </h3>
            <p className="text-white/80 text-xs italic">A creature of three Elements: Land,</p>
            <p className="text-white/80 text-xs italic">Sea, Air</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-right"
          >
            <h3 className="text-xl md:text-2xl text-white mb-1">
              <span className="font-bold text-vibrant-blue">S</span>akti/ <span className="italic font-light">Mighty</span>
            </h3>
            <p className="text-white/80 text-xs italic">The Powerful being</p>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/yourphonenumber"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>

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
