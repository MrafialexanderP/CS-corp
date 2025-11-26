import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import ScrollVelocity from './ScrollVelocity';

const ServiceSection = () => {
  const csProdServices = [
    'Event Contractor',
    'Promotional Items',
    'Signage & Branding',
    'Printings & Acrylic Media'
  ];

  const csComServices = [
    'Event Organizer',
    'Activation',
    'MICE',
    'Exhibition',
    'Entertainment'
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Curved text scroll animation
  const { scrollYProgress: curveScrollProgress } = useScroll({
    target: curveRef,
    offset: ["start end", "end start"]
  });

  // Text offset moves along the curve as you scroll - start from left (-50%) and move right
  const textOffset = useTransform(curveScrollProgress, [0, 1], [-30, 30]);
  
  // Update textPath startOffset on scroll
  useMotionValueEvent(textOffset, "change", (latest) => {
    if (textPathRef.current) {
      textPathRef.current.setAttribute("startOffset", `${latest}%`);
    }
  });

  // Card 1 (CSPROD) - starts visible, scales down and moves up as you scroll
  const card1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.85]);
  const card1Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, -40]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Card 2 (CSCOM) - starts below, moves up to overlap
  const card2Y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [400, 200, 50, 0]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);

  return (
    <section id="service" className="relative">
      {/* Curved Text Header with Wave Background */}
      <div ref={curveRef} className="relative bg-white overflow-hidden">
        {/* Wave background shape */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 250" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Define the curved path for text - follows the wave edge */}
          <defs>
            <path 
              id="serviceCurve" 
              fill="transparent"
              d="M-200,115 C0,135 120,75 360,55 C480,35 600,75 720,95 C840,115 960,75 1080,55 C1200,35 1320,75 1640,95"
            />
          </defs>
          
          {/* Blue curved background */}
          <path 
            fill="#0A4AAC"
            d="M0,250 L0,120 C120,140 240,80 360,60 C480,40 600,80 720,100 C840,120 960,80 1080,60 C1200,40 1320,80 1440,100 L1440,250 Z"
          />
          
          {/* Curved text that follows the wave edge */}
          <text dy="-15">
            <textPath 
              ref={textPathRef}
              href="#serviceCurve"
              startOffset="-30%"
              className="fill-vibrant-blue font-bold"
              style={{ 
                fontSize: '38px',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
              }}
            >
              OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE
            </textPath>
          </text>
        </svg>
      </div>

      {/* Scroll Stack Container - Full Height for scroll effect */}
      <div 
        ref={containerRef}
        className="relative bg-vibrant-blue min-h-[200vh]"
      >
        {/* Sticky Container for Cards */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-8 py-12 overflow-hidden">
          <div className="relative w-full max-w-5xl h-[600px] md:h-[500px]">
            
            {/* Card 1 - CSPROD (Back card) */}
            <motion.div
              style={{
                scale: card1Scale,
                y: card1Y,
                opacity: card1Opacity,
              }}
              className="absolute inset-x-0 top-0 mx-auto w-full max-w-4xl bg-white rounded-[40px] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.3)] z-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-bold mb-8">
                    <span className="text-gray-900">CS</span>
                    <span className="text-coral">PROD</span>
                  </h3>
                  <div className="space-y-3">
                    {csProdServices.map((service, index) => (
                      <div 
                        key={index}
                        className="bg-coral text-white px-6 py-4 rounded-2xl font-semibold text-center transition-all duration-200 hover:bg-coral-light hover:shadow-md"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative element */}
                <div className="hidden md:block w-48 h-32 border-2 border-gray-300 rounded-2xl relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - CSCOM (Front card that slides up) */}
            <motion.div
              style={{
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity,
              }}
              className="absolute inset-x-0 top-12 mx-auto w-full max-w-4xl bg-coral rounded-[40px] p-8 md:p-12 shadow-[0_0_60px_rgba(0,0,0,0.4)] z-20"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                    <span className="text-white">CS</span>
                    <span className="text-white/80">COM</span>
                  </h3>
                  <div className="space-y-3">
                    {csComServices.map((service, index) => (
                      <div 
                        key={index}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold text-center transition-all duration-200 hover:bg-white/30 hover:shadow-md border border-white/30"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative element */}
                <div className="hidden md:block w-48 h-32 border-2 border-white/50 rounded-2xl relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-white border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Scroll Velocity Text Animation - Two rows like the design */}
      <div className="w-full overflow-hidden">
        {/* First row - Black background, white text, moves right */}
        <div className="bg-black py-4">
          <ScrollVelocity
            texts={['PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP •']}
            velocity={100}
            className="text-white text-xl md:text-2xl lg:text-3xl font-bold px-4"
            numCopies={8}
            damping={50}
            stiffness={300}
            parallaxClassName="w-full"
            scrollerClassName="gap-0"
          />
        </div>
        {/* Second row - White background, black text, moves left */}
        <div className="bg-white py-4">
          <ScrollVelocity
            texts={['PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP •']}
            velocity={-100}
            className="text-black text-xl md:text-2xl lg:text-3xl font-bold px-4"
            numCopies={8}
            damping={50}
            stiffness={300}
            parallaxClassName="w-full"
            scrollerClassName="gap-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
