import { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { motion } from 'framer-motion';
import ServiceSlider from './ServiceSlider';
import StatsAndCTA from './StatsAndCTA';

const ServiceSection = () => {
  const curveRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [activeServiceTab, setActiveServiceTab] = useState(0);

  // Colors based on active tab: 0 = blue (CSPRO), 1 = coral/orange (CSCOM)
  // Using exact hex values for consistency
  const curveColor = activeServiceTab === 0 ? 'hsl(214, 90%, 36%)' : 'hsl(13, 66%, 55%)';

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

  return (
    <section id="service" className="relative">
      {/* Service Slider - Horizontal Tab Navigation */}
      <ServiceSlider onTabChange={setActiveServiceTab} />

      {/* Curved Text Footer - Below Slider */}
      <div ref={curveRef} className="relative bg-white overflow-hidden">
        {/* Wave background shape - inverted */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 250" 
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          {/* Define the curved path for text */}
          <defs>
            <path 
              id="serviceCurveBottom" 
              fill="transparent"
              d="M-200,135 C0,115 120,175 360,195 C480,215 600,175 720,155 C840,135 960,175 1080,195 C1200,215 1320,175 1640,155"
            />
          </defs>
          
          {/* Curved background - color changes based on active tab */}
          <motion.path 
            initial={false}
            animate={{ fill: curveColor }}
            transition={{ duration: 0.5 }}
            d="M0,0 L0,150 C120,130 240,170 360,190 C480,210 600,170 720,150 C840,130 960,170 1080,190 C1200,210 1320,170 1440,150 L1440,0 Z"
          />
          
          {/* Curved text that follows the wave edge */}
          <text dy="25">
            <textPath 
              ref={textPathRef}
              href="#serviceCurveBottom"
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
      
      {/* Stats Counter Section */}
      <StatsAndCTA />
    </section>
  );
};

export default ServiceSection;
