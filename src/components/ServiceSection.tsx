import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import ServiceSlider from './ServiceSlider';
import StatsAndCTA from './StatsAndCTA';

const ServiceSection = () => {
  const curveRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

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
          
          {/* Blue curved background - using same color as section below */}
          <path 
            fill="hsl(209, 91%, 38%)"
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

      {/* Service Slider - Horizontal Tab Navigation */}
      <ServiceSlider />
      
      {/* Stats Counter and CTA Section */}
      <StatsAndCTA />
    </section>
  );
};

export default ServiceSection;
