import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface EventItem {
  id: string;
  img: string;
  images?: string[];
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
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 4 : 13;

  // Desktop infinite scroll state
  const [visibleEvents, setVisibleEvents] = useState<EventItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const INITIAL_LOAD_COUNT = 9;
  const LOAD_MORE_COUNT = 6;

  const events: EventItem[] = useMemo(() => [
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
  ], []);

  // Pagination logic for mobile
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = events.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Auto-rotate images inside modal
  useEffect(() => {
    if (!selectedEvent) return;
    setSlideIndex(0);
    const imgs = selectedEvent.images && selectedEvent.images.length > 0 ? selectedEvent.images : [selectedEvent.img];
    if (imgs.length <= 1) return; // no rotation needed
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % imgs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [selectedEvent]);

  // Initialize and handle infinite scroll for desktop only
  useEffect(() => {
    if (isMobile) return; // keep mobile behavior intact

    // Initial load
    setVisibleEvents(prev => (prev.length ? prev : events.slice(0, INITIAL_LOAD_COUNT)));

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleEvents((prev) => {
            if (prev.length >= events.length) return prev;
            const next = events.slice(0, Math.min(prev.length + LOAD_MORE_COUNT, events.length));
            return next;
          });
        }
      },
      { rootMargin: '1200px 0px 0px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, events]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/OurEvents.png)' }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6"
          >
            OUR EVENTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl px-2"
          >
            Creating Impactful Experiences & Harmonious Collaborations
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Grid Layout */}
          {isMobile ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                {paginatedEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-12">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-1">
                        {event.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                          currentPage === page
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Desktop Masonry Layout with Infinite Scroll */
            <>
              <Masonry
                items={visibleEvents.length ? visibleEvents : events.slice(0, INITIAL_LOAD_COUNT)}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={1.05}
                blurToFocus={true}
                stagger={0.03}
                onItemClick={(item) => setSelectedEvent(item as EventItem)}
              />
              {/* Sentinel for infinite loading */}
              <div ref={loadMoreRef} className="h-8" />
            </>
          )}
        </div>
      </section>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white z-10">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <div className="px-6 pb-8 md:px-10 md:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Left: Text */}
                  <div className="order-2 md:order-1">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                      {selectedEvent.title}
                    </h2>
                    <div className="space-y-1 mb-8">
                      <p className="text-gray-700 text-sm sm:text-base">
                        {selectedEvent.subtitle}
                      </p>
                      {selectedEvent.location && (
                        <p className="text-gray-700 text-sm sm:text-base">{selectedEvent.location}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-6 max-w-md">
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wider block mb-1">CLIENT</span>
                        <p className="text-gray-900 text-sm sm:text-base">{selectedEvent.client}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wider block mb-1">YEAR</span>
                        <p className="text-gray-900 text-sm sm:text-base">{selectedEvent.year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Auto-rotating Image */}
                  <div className="order-1 md:order-2 w-full">
                    <div className="w-full rounded-2xl overflow-hidden md:rounded-xl">
                      <img
                        src={(selectedEvent.images && selectedEvent.images.length > 0 ? selectedEvent.images : [selectedEvent.img])[slideIndex]}
                        alt={selectedEvent.title}
                        className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
                      />
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
