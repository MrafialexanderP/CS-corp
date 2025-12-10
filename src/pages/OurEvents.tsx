import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X } from 'lucide-react';

interface EventItem {
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

const OurEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const events: EventItem[] = [
    {
      id: '1',
      img: '/placeholder.svg',
      url: '#',
      height: 600,
      title: 'K-Content BizWeek 2025 by KOCCA',
      subtitle: 'Agency Daehang Congratulates Indonesia Organized by CSCOM',
      client: 'Daehang Communications Indonesia',
      year: '2025',
      location: 'Jakarta Convention Center'
    },
    {
      id: '2',
      img: '/placeholder.svg',
      url: '#',
      height: 500,
      title: 'Pesta IWET 2025 by Tlnet',
      subtitle: 'Pesta Iklim & Iklim Pesta Organized by Cooperation Partner',
      client: 'Tlnet',
      year: '2025',
      location: 'Jakarta'
    },
    {
      id: '3',
      img: '/placeholder.svg',
      url: '#',
      height: 550,
      title: 'Great Chinggu Launch 2024',
      subtitle: 'New Product Launch',
      client: 'Great Chinggu',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '4',
      img: '/placeholder.svg',
      url: '#',
      height: 450,
      title: 'Launching Buku Apresiasi Jan 25th 2025',
      subtitle: 'Book Launch Event',
      client: 'Publisher',
      year: '2025',
      location: 'Jakarta'
    },
    {
      id: '5',
      img: '/placeholder.svg',
      url: '#',
      height: 520,
      title: 'KRU Hondas Sultan Activation',
      subtitle: 'Brand Activation Campaign',
      client: 'Honda',
      year: '2024',
      location: 'Various Locations'
    },
    {
      id: '6',
      img: '/placeholder.svg',
      url: '#',
      height: 580,
      title: 'A MOMENT AT JAM House (Launchingshowcase)',
      subtitle: 'Music Showcase Event',
      client: 'JAM House',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '7',
      img: '/placeholder.svg',
      url: '#',
      height: 490,
      title: 'Panini Indonesia Activation',
      subtitle: 'Brand Activation & Exhibition',
      client: 'Panini',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '8',
      img: '/placeholder.svg',
      url: '#',
      height: 530,
      title: 'AQUA DANONE KLHK AMDAL',
      subtitle: 'Environmental Program',
      client: 'Aqua Danone',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '9',
      img: '/placeholder.svg',
      url: '#',
      height: 510,
      title: 'Vitamin Kesesah Original Harvest',
      subtitle: 'Product Launch Campaign',
      client: 'Original Harvest',
      year: '2024',
      location: 'The National Theater, Jakarta'
    },
    {
      id: '10',
      img: '/placeholder.svg',
      url: '#',
      height: 470,
      title: 'OpenYork Palmeran (retorative 2024 Jakarta)',
      subtitle: 'Corporate Event',
      client: 'OpenYork',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '11',
      img: '/placeholder.svg',
      url: '#',
      height: 560,
      title: 'Exam Buleuseed Invitation 2024',
      subtitle: 'Educational Event',
      client: 'Education Partner',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '12',
      img: '/placeholder.svg',
      url: '#',
      height: 500,
      title: 'McDonalds K-Grand',
      subtitle: 'Restaurant Grand Opening',
      client: 'McDonalds',
      year: '2024',
      location: 'Jakarta'
    },
    {
      id: '13',
      img: '/placeholder.svg',
      url: '#',
      height: 540,
      title: 'RAPP(invent Focus Collaboration 2023)',
      subtitle: 'Partnership Event',
      client: 'RAPP',
      year: '2023',
      location: 'Jakarta'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/OurEvents.png)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            OUR EVENTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white max-w-3xl"
          >
            Creating Impactful Experiences & Harmonious Collaborations
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div style={{ height: '2000px' }}>
            <Masonry
              items={events}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={1.05}
              blurToFocus={true}
              stagger={0.03}
              onItemClick={(item) => setSelectedEvent(item as EventItem)}
            />
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/2">
                  <img
                    src={selectedEvent.img}
                    alt={selectedEvent.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {selectedEvent.subtitle}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">CLIENT</span>
                      <p className="text-gray-600">{selectedEvent.client}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">YEAR</span>
                      <p className="text-gray-600">{selectedEvent.year}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">LOCATION</span>
                      <p className="text-gray-600">{selectedEvent.location}</p>
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

export default OurEvents;
