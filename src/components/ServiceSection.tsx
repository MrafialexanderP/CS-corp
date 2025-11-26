import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

interface ParallaxProps {
  children: string;
}

function StaticText({ children }: ParallaxProps) {
  return (
    <div className="parallax">
      <div className="scroller">
        <span>{children}</span>
      </div>
    </div>
  );
}

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

  const footerRef = useRef(null);

  return (
    <section id="service" className="relative">
      {/* Wave Header */}
      <div className="relative overflow-hidden bg-vibrant-blue">
        <svg className="w-full h-32 md:h-40 lg:h-48 block" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0 L0 100 Q360 150 720 100 T1440 100 L1440 0 Z" fill="hsl(var(--primary))" />
          <path d="M0 200 Q360 100 720 150 T1440 150 L1440 200 Z" fill="hsl(var(--vibrant-blue))" />
        </svg>
        
        {/* Static text positioned on the wave */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            OUR SERVICE • OUR SERVICE • OUR SERVICE
          </span>
        </div>
      </div>
      
      {/* Services Grid - no top padding to connect with wave */}
      <div className="bg-vibrant-blue py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {/* CS PROD Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold">
                  <span className="text-gray-900">CS</span>
                  <span className="text-coral">PROD</span>
                </h3>
              </div>
              
              <div className="space-y-3">
                {csProdServices.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-coral hover:bg-coral-light text-white px-6 py-4 rounded-2xl font-semibold text-center transition-all duration-200 hover:shadow-md transform hover:scale-105"
                  >
                    <span className="text-white font-bold mr-3 text-lg">{index + 1}</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
            
            {/* CS COM Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold">
                  <span className="text-gray-900">CS</span>
                  <span className="text-coral">COM</span>
                </h3>
              </div>
              
              <div className="space-y-3">
                {csComServices.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-coral hover:bg-coral-light text-white px-6 py-4 rounded-2xl font-semibold text-center transition-all duration-200 hover:shadow-md transform hover:scale-105"
                  >
                    <span className="text-white font-bold mr-3 text-lg">{index + 1}</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bar with Static Text */}
      <div 
        ref={footerRef}
        className="py-12 md:py-16 overflow-hidden bg-gradient-to-r from-vibrant-blue via-vibrant-blue to-coral"
      >
        <StaticText>
          PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP
        </StaticText>
        <StaticText>
          PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP
        </StaticText>
      </div>
    </section>
  );
};

export default ServiceSection;
