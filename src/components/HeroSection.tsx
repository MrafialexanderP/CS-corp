import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Use motion values for real-time cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for primary orb
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Slower spring for secondary orb
  const slowSpringConfig = { damping: 35, stiffness: 120, mass: 1 };
  const slowX = useSpring(mouseX, slowSpringConfig);
  const slowY = useSpring(mouseY, slowSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden"
    >
      {/* Base gradient background - coral to blue like the image */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 80%, rgba(214, 95, 68, 0.95) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 70% 30%, rgba(100, 150, 200, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(180, 120, 140, 0.6) 0%, transparent 50%),
            linear-gradient(180deg, 
              rgba(214, 95, 68, 0.9) 0%, 
              rgba(200, 100, 100, 0.85) 25%,
              rgba(180, 120, 140, 0.8) 50%,
              rgba(120, 140, 180, 0.85) 75%,
              rgba(100, 150, 200, 0.9) 100%
            )
          `
        }}
      />
      
      {/* Interactive blue orb - follows cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle at center, 
            rgba(100, 150, 220, 0.7) 0%, 
            rgba(100, 150, 200, 0.5) 30%, 
            rgba(120, 140, 180, 0.3) 50%, 
            transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Interactive coral/pink orb - trails behind */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: slowX,
          y: slowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 350,
          height: 350,
          background: `radial-gradient(circle at center, 
            rgba(214, 95, 68, 0.6) 0%, 
            rgba(200, 100, 120, 0.4) 40%, 
            transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-16 tracking-wide"
        >
          THE CS PHILOSOPHY
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-white">C</span>amar/ <span className="italic">Seagull</span>
            </h2>
            <p className="text-white/90 text-sm">A creature of three Elements:</p>
            <p className="text-white/90 text-sm">Land, Sea, Air</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-white">S</span>akti/ <span className="italic">Mighty</span>
            </h2>
            <p className="text-white/90 text-sm">The Powerful being</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade to white - smooth transition to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%,
            rgba(255,255,255,0.15) 30%,
            rgba(255,255,255,0.5) 60%,
            rgba(255,255,255,0.85) 80%,
            rgba(255,255,255,1) 100%
          )`
        }}
      />
    </section>
  );
};

export default HeroSection;
