import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ServiceTab {
  id: string;
  number: string;
  title: string;
  verticalTitle: string;
  description: string;
  services: string[];
  bgColor: string;
  accentColor: string;
  textColor: string;
}

interface ServiceSliderProps {
  onTabChange?: (tabIndex: number) => void;
}

const ServiceSlider = ({ onTabChange }: ServiceSliderProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);

  const serviceTabs: ServiceTab[] = [
    {
      id: 'cspro',
      number: '01',
      title: 'CSPRO',
      verticalTitle: 'Production',
      description: 'We deliver comprehensive production services from concept to completion. Our team specializes in creating impactful brand experiences through quality craftsmanship and innovative solutions.',
      services: [
        'Event Contractor',
        'Promotional Items',
        'Signage & Branding',
        'Printings & Acrylic Media'
      ],
      bgColor: 'bg-vibrant-blue',
      accentColor: 'bg-coral',
      textColor: 'text-vibrant-blue'
    },
    {
      id: 'cscom',
      number: '02',
      title: 'CSCOM',
      verticalTitle: 'Communication',
      description: 'Strategic communication and event management solutions that connect brands with their audiences. We create memorable experiences that drive engagement and build lasting relationships.',
      services: [
        'Event Organizer',
        'Activation',
        'MICE',
        'Exhibition',
        'Entertainment'
      ],
      bgColor: 'bg-coral',
      accentColor: 'bg-vibrant-blue',
      textColor: 'text-coral'
    }
  ];

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
    onTabChange?.(index);
  };

  useEffect(() => {
    onTabChange?.(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const currentTab = serviceTabs[activeTab];

  return (
    <div className="relative w-full h-[550px] overflow-hidden">
      <div className="flex h-full">
        {/* Left Tab - Shows when tab 1 (CSCOM) is active */}
        <AnimatePresence mode="wait">
          {activeTab === 1 && (
            <motion.button
              key="left-tab"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => handleTabClick(0)}
              className="relative w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 bg-white text-gray-800 hover:bg-gray-50 flex-shrink-0 border-r border-gray-100"
            >
              <span className="text-2xl md:text-3xl font-bold text-vibrant-blue">01</span>
              <span 
                className="text-sm md:text-base font-semibold tracking-widest text-gray-800"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                Production
              </span>
              <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center text-white">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Slider Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 }
              }}
              className={`absolute inset-0 ${currentTab.bgColor}`}
            >
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 max-w-4xl">
                {/* Number badge */}
                <motion.div 
                  className="text-white/20 text-8xl md:text-9xl font-bold absolute top-8 left-8 leading-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentTab.number}
                </motion.div>

                {/* Title */}
                <motion.h3 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentTab.title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-white/85 text-base lg:text-lg mb-8 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {currentTab.description}
                </motion.p>

                {/* Services Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
                  {currentTab.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + serviceIndex * 0.05 }}
                      className="bg-white/15 backdrop-blur-sm text-white px-4 py-3 rounded-full font-medium text-center text-sm border border-white/20 hover:bg-white/25 transition-all cursor-default"
                    >
                      {service}
                    </motion.div>
                  ))}
                </div>

                {/* Learn More Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${currentTab.accentColor} text-white px-6 py-3 rounded-full font-semibold w-fit flex items-center gap-2 shadow-lg text-sm`}
                >
                  Learn more
                  <ArrowRight size={16} />
                </motion.button>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {serviceTabs.map((_, index) => (
                  <button
                    key={index}
                    className="h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                    style={{ width: 50 }}
                    onClick={() => handleTabClick(index)}
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: activeTab === index ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Tab - Shows when tab 0 (CSPRO) is active */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.button
              key="right-tab"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => handleTabClick(1)}
              className="relative w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 bg-white text-gray-800 hover:bg-gray-50 flex-shrink-0 border-l border-gray-100"
            >
              <span className="text-2xl md:text-3xl font-bold text-coral">02</span>
              <span 
                className="text-sm md:text-base font-semibold tracking-widest text-gray-800"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                Communication
              </span>
              <div className="w-10 h-10 rounded-full bg-vibrant-blue flex items-center justify-center text-white">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Active Tab Indicator on the side */}
        <div className="relative w-20 md:w-24 h-full flex-shrink-0">
          <motion.div
            className={`absolute inset-0 ${currentTab.bgColor} flex flex-col items-center justify-between py-8`}
            layoutId="activeTab"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-2xl md:text-3xl font-bold text-white">
              {currentTab.number}
            </span>
            <span 
              className="text-sm md:text-base font-semibold tracking-widest text-white"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {currentTab.verticalTitle}
            </span>
            <motion.div
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
              animate={{ rotate: 45 }}
            >
              <span className="text-2xl font-light">+</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
