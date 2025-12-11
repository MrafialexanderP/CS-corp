import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';

interface ProductItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  location: string;
}

const OurProducts = () => {
  const [selected, setSelected] = useState<ProductItem | null>(null);

  const items: ProductItem[] = [
    { id: '1', img: '/placeholder.svg', url: '#', height: 480, title: 'Youtube Creator Collective Event Productions', subtitle: 'Organized by: Vibe Event Management', client: 'YouTube', year: '2025', location: 'Jakarta' },
    { id: '2', img: '/placeholder.svg', url: '#', height: 320, title: 'Astra Corporate Affairs Awards Event Productions', subtitle: 'Organized by: Gala Event Management', client: 'Astra', year: '2025', location: 'Jakarta' },
    { id: '3', img: '/placeholder.svg', url: '#', height: 400, title: 'Dulu Booth at Karman Paint Expo 2025', subtitle: '', client: 'Karman Paint', year: '2025', location: 'Expo' },
    { id: '4', img: '/placeholder.svg', url: '#', height: 350, title: 'Sernil Booth - Mall to Mall 2025', subtitle: '', client: 'Sernil', year: '2025', location: 'Mall to Mall' },
    { id: '5', img: '/placeholder.svg', url: '#', height: 420, title: 'Pertamina Bright Gas Booth at Paramita Event 2025', subtitle: 'Organized by: Mice', client: 'Pertamina', year: '2025', location: 'Jakarta' },
    { id: '6', img: '/placeholder.svg', url: '#', height: 380, title: 'Sony 1000x Series Booth - Mall Exhibition', subtitle: 'Organized by: Gala Event Management', client: 'Sony', year: '2025', location: 'Jakarta' },
    { id: '7', img: '/placeholder.svg', url: '#', height: 340, title: 'Guinness PODH - Standing Floor Display', subtitle: '', client: 'Guinness', year: '2024', location: 'Mall' },
    { id: '8', img: '/placeholder.svg', url: '#', height: 420, title: 'Guinness Branding Outlet - Neonbox', subtitle: '', client: 'Guinness', year: '2024', location: 'Outlet' },
    { id: '9', img: '/placeholder.svg', url: '#', height: 360, title: 'Guinness Smooth Branding Outlet', subtitle: '', client: 'Guinness', year: '2024', location: 'Outlet' },
    { id: '10', img: '/placeholder.svg', url: '#', height: 400, title: 'Smirnof Ice Standing Floor Display', subtitle: '', client: 'Smirnof', year: '2024', location: 'Mall' },
    { id: '11', img: '/placeholder.svg', url: '#', height: 500, title: 'Tweakss Booth at The 90s Festival 2019', subtitle: '', client: 'Tweakss', year: '2019', location: 'Festival' },
    { id: '12', img: '/placeholder.svg', url: '#', height: 380, title: 'Hennessy Booth - Jakarta X Beauty 2022', subtitle: '', client: 'Hennessy', year: '2022', location: 'Jakarta' },
    { id: '13', img: '/placeholder.svg', url: '#', height: 420, title: 'Branding Gondola Promotion', subtitle: '', client: 'Various', year: '2024', location: 'Retail' },
    { id: '14', img: '/placeholder.svg', url: '#', height: 360, title: 'Display Stand Activation', subtitle: '', client: 'Various', year: '2024', location: 'Retail' },
    { id: '15', img: '/placeholder.svg', url: '#', height: 440, title: 'Mall Exhibition Showcase', subtitle: '', client: 'Various', year: '2024', location: 'Exhibition' }
  ];

  const handleMasonryClick = (item: ProductItem) => {
    setSelected(item);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/OurProductions.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            OUR PRODUCTIONS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-white max-w-3xl"
          >
            Precision in Every Detail: From Concept to Construction
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div style={{ height: '2000px' }}>
            <Masonry
              items={items}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              stagger={0.03}
              onItemClick={handleMasonryClick}
            />
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center pt-24 pb-0 bg-black/70 pointer-events-none"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full h-[calc(100vh-96px)] md:h-auto overflow-y-auto shadow-2xl pointer-events-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-96 md:h-full">
                  <img
                    src={selected.img}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {selected.title}
                  </h2>
                  {selected.subtitle && (
                    <p className="text-gray-600 text-lg mb-8">{selected.subtitle}</p>
                  )}

                  <div className="space-y-6 text-base">
                    <div>
                      <span className="font-semibold text-gray-700 text-sm uppercase tracking-wider">CLIENT</span>
                      <p className="text-gray-600 text-lg mt-1">{selected.client}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm uppercase tracking-wider">YEAR</span>
                      <p className="text-gray-600 text-lg mt-1">{selected.year}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 text-sm uppercase tracking-wider">LOCATION</span>
                      <p className="text-gray-600 text-lg mt-1">{selected.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default OurProducts;
