import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollVelocity from './ScrollVelocity';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceSlider = () => {
  const [activePanel, setActivePanel] = useState<'cscorp' | 'cscom' | 'cspro'>('cscorp');
  const isMobile = useIsMobile();

  const panels = [
    {
      key: 'cscorp' as const,
      logo: '/cscorp1.png',
      bg: "url('/bird.jpeg')",
      desc:
        'Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.',
      statLabel: 'Production Hub',
      statValue: 'CSCORP'
    },
    {
      key: 'cscom' as const,
      logo: 'cscom1.png',
      desc:
        'Your dedicated partner for comprehensive Event Organizing, Brand Activation, MICE, Exhibition, and Entertainment solutions.',
      statLabel: 'Client',
      statValue: '990K+'
    },
    {
      key: 'cspro' as const,
      logo: '/cspro1.png',
      desc:
        'Event Construction, Signage & Branding, Promotional Items, and Digital Printing for every need.',
      statLabel: 'Production Partner',
      statValue: 'CSPRO'
    }
  ];

  const marqueeText = "OUR SERVICE • ";
  const marqueeItems = Array.from({ length: 3 });

  const mobilePanels = panels;
  const brandButtons: Array<{
    key: 'cscorp' | 'cscom' | 'cspro';
    icon: string;
    iconClassName: string;
    ringGradient: string;
  }> = [
    {
      key: 'cscorp',
      icon: '/logocs.png',
      iconClassName: 'w-10 h-10',
      ringGradient: 'linear-gradient(130deg, #2A3582 0%, #EB670E 100%)'
    },
    {
      key: 'cscom',
      icon: '/cscom1.png',
      iconClassName: 'w-11 h-6',
      ringGradient: 'linear-gradient(130deg, #EB670E 0%, #2A3582 100%)'
    },
    {
      key: 'cspro',
      icon: '/cspro1.png',
      iconClassName: 'w-11 h-6',
      ringGradient: 'linear-gradient(130deg, #EB670E 0%, #2A3582 100%)'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Marquee - Blue background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#2A3582' }}>
        <ScrollVelocity
          texts={['OUR SERVICE •']}
          velocity={-50}
          className="text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em]"
          numCopies={4}
          scrollerClassName="flex whitespace-nowrap"
          parallaxClassName="overflow-hidden"
        />
      </div>

      {/* Mobile: Horizontal selector + vertical content */}
      {isMobile ? (
        <div className="py-8 px-4 space-y-6">
          <div className="flex items-center justify-center gap-3 pb-4">
            {brandButtons.map((brand) => {
              const isActive = activePanel === brand.key;

              return (
                <motion.button
                  key={brand.key}
                  onClick={() => setActivePanel(brand.key)}
                  whileTap={{ scale: 0.96 }}
                  className="rounded-full p-[2px]"
                  style={{ background: brand.ringGradient }}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  aria-label={`Show ${brand.key.toUpperCase()} service`}
                >
                  <span
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                    style={{
                      background: isActive ? brand.ringGradient : '#ffffff',
                      boxShadow: isActive ? '0 8px 18px rgba(42, 53, 130, 0.22)' : 'none'
                    }}
                  >
                    <img
                      src={brand.icon}
                      alt={brand.key.toUpperCase()}
                      className={`${brand.iconClassName} object-contain transition-all duration-200 ${isActive ? 'brightness-0 invert' : ''}`}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>

          {mobilePanels.map((panel) => (
            panel.key === activePanel && (
              <div
                key={panel.key}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
              >
                {panel.bg ? (
                  <div
                    className="h-48 w-full bg-center bg-cover"
                    style={{ backgroundImage: panel.bg }}
                  />
                ) : (
                  <div className="h-56 w-full bg-gray-100 flex items-center justify-center">
                    <motion.img
                      src={panel.logo}
                      alt={panel.key}
                      className="h-32 sm:h-40 object-contain"
                      whileTap={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <p className="text-gray-800 text-base leading-relaxed">
                    {panel.desc}
                  </p>
                  <div className="text-gray-700 text-sm font-semibold">{panel.statValue}</div>
                  <div className="text-gray-500 text-xs">{panel.statLabel}</div>

                  {/* Mobile Service Images Slider - CSCOM only */}
                  {panel.key === 'cscom' && (
                    <div className="w-screen -mx-6 mt-4">
                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory pl-6 pr-6">
                        {['Event Organizing', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service, idx) => (
                          <div key={service} className={`relative flex-shrink-0 w-32 aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden group snap-center ${idx === 4 ? 'mr-6' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(235, 103, 14, 0.8), rgba(235, 103, 14, 0.2))' }} />
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <p className="text-white text-[10px] font-bold leading-tight text-center">{service}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile Service Images Slider - CSPRO */}
                  {panel.key === 'cspro' && (
                    <div className="w-screen -mx-6 mt-4">
                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory pl-6 pr-6">
                        {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service, idx) => (
                          <div key={service} className={`relative flex-shrink-0 w-32 aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden group snap-center ${idx === 3 ? 'mr-6' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-t" style={{ backgroundImage: 'linear-gradient(to top, rgba(42, 53, 130, 0.9), rgba(42, 53, 130, 0.2))' }} />
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <p className="text-white text-[10px] font-bold leading-tight text-center">{service}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <>
          <div className="relative h-[840px] overflow-hidden bg-[#ececec]">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-3">
              {brandButtons.map((brand) => {
                const isActive = activePanel === brand.key;

                return (
                  <motion.button
                    key={brand.key}
                    onClick={() => setActivePanel(brand.key)}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-full p-[2px]"
                    style={{ background: brand.ringGradient }}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    aria-label={`Show ${brand.key.toUpperCase()} service`}
                  >
                    <span
                      className="w-[66px] h-[66px] rounded-full flex items-center justify-center"
                      style={{
                        background: isActive ? brand.ringGradient : '#ffffff',
                        boxShadow: isActive ? '0 10px 24px rgba(42, 53, 130, 0.26)' : 'none'
                      }}
                    >
                      <img
                        src={brand.icon}
                        alt={brand.key.toUpperCase()}
                        className={`${brand.iconClassName} object-contain transition-all duration-200 ${isActive ? 'brightness-0 invert' : ''}`}
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activePanel === 'cscorp' && (
                <motion.div
                  key="cscorp"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative h-full"
                  style={{
                    backgroundImage: "url('/bird.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="relative h-full flex items-center justify-center text-center px-8 md:px-12 lg:px-16 pt-24 pb-10">
                    <div className="max-w-3xl w-full">
                      <img src="/cscorp1.png" alt="CS Corp" className="w-40 md:w-48 lg:w-56 mb-4 mx-auto" />
                      <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto leading-snug">
                      Your one-stop solution for all production needs: Event Construction, Signage & Branding, Promotional Items, and Digital Printing.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePanel === 'cscom' && (
                <motion.div
                  key="cscom"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full bg-[#ececec]"
                >
                  <div className="h-full flex flex-col pt-20 pb-8">
                    <div className="px-8 md:px-12 lg:px-16 text-center">
                      <img src="/cscom1.png" alt="CSCOM" className="w-40 md:w-48 lg:w-56 mb-1 mx-auto" />
                      <p className="text-gray-900 text-[42px] mb-4 font-semibold leading-none">@cscom.co</p>

                      <p className="text-gray-900 text-[clamp(24px,2.2vw,46px)] max-w-4xl mx-auto mb-4 leading-[1.06]">
                        Your dedicated partner for comprehensive <span className="font-bold">Event Organizing, Brand Activation, MICE, Exhibition,</span> and <span className="font-bold">Entertainment solutions.</span>
                      </p>

                      <div>
                        <h3 className="text-[clamp(68px,5vw,96px)] font-bold text-black leading-[0.9]">990K+</h3>
                        <p className="text-black text-[clamp(42px,2.3vw,54px)] leading-[0.95] mt-1">client</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-1 w-full max-w-[1380px] mx-auto mt-6 mb-10">
                      {['Event Organizer', 'Activation', 'MICE', 'Exhibition', 'Entertainment'].map((service, idx) => (
                        <div key={service} className="relative h-[170px] md:h-[190px] lg:h-[210px] bg-[#151515] overflow-hidden group rounded-sm">
                          <img
                            src={idx === 0 ? '/EO.png' : idx === 1 ? '/Activation.png' : idx === 2 ? '/MICE.png' : idx === 3 ? '/Exibition.png' : '/Entertaiment.png'}
                            alt={service}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/15" />
                          <div className="absolute top-2 left-0 right-0 px-2">
                            <p className="text-white text-lg font-bold italic leading-tight text-center">{service}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activePanel === 'cspro' && (
                <motion.div
                  key="cspro"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full pt-20 flex flex-col items-center text-center px-8 md:px-12 lg:px-16 pb-8 bg-[#ececec]"
                >
                  <img src="/cspro1.png" alt="CSPRO" className="w-40 md:w-48 lg:w-56 mb-1" />
                  <p className="text-gray-900 text-sm md:text-base mb-3 font-semibold">@cspro_event</p>

                  <p className="text-gray-900 text-[clamp(24px,2.2vw,42px)] max-w-4xl mb-4 leading-[1.08] px-3">
                    Your one-stop solution for all production needs: <span className="font-bold">Event Construction, Signage & Branding, Promotional Items,</span> and <span className="font-bold">Digital Printing.</span>
                  </p>

                  <div className="mb-4">
                    <h3 className="text-[clamp(62px,4.7vw,94px)] font-bold text-black leading-[0.9]">900K+</h3>
                    <p className="text-black text-[clamp(34px,2.1vw,52px)] leading-[0.95] mt-1">client</p>
                  </div>

                  <div className="grid grid-cols-4 gap-1 w-full max-w-[1260px] px-0 mt-6 mb-10">
                    {['Event Contractor', 'Promotional Items', 'Signage & Branding', 'Printings & Acrylic Media'].map((service, idx) => (
                      <div key={service} className="relative h-[180px] md:h-[200px] lg:h-[220px] bg-gray-200 overflow-hidden group rounded-sm">
                        <img src={idx === 0 ? '/OurProductions.png' : idx === 1 ? '/CSPRO.png' : idx === 2 ? '/R4.png' : '/OurEvents.png'} alt={service} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/15" />
                        <div className="absolute top-2 left-0 right-0 px-2">
                          <p className="text-white text-lg font-bold italic leading-tight text-center">{service}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </>
      )}
      {/* Bottom Marquee - Coral background, white text */}
      <div className="py-4 md:py-5 overflow-hidden" style={{ backgroundColor: '#EB670E' }}>
        <ScrollVelocity
          texts={['OUR SERVICE •']}
          velocity={50}
          className="text-white font-black italic text-3xl md:text-4xl lg:text-5xl tracking-[0.2em]"
          numCopies={4}
          scrollerClassName="flex whitespace-nowrap"
          parallaxClassName="overflow-hidden"
        />
      </div>
    </div>
  );
};

export default ServiceSlider;
