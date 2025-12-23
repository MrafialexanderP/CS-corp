import { useEffect, useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { fetchProductions } from '@/lib/api-services';
import { getImageUrl } from '@/lib/api-constants';
import type { Production } from '@/lib/api-constants';

interface ProductItem {
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

const OurProducts = () => {
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 4 : 15;
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Desktop infinite scroll state
  const [visibleItems, setVisibleItems] = useState<ProductItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const INITIAL_LOAD_COUNT = 9;
  const LOAD_MORE_COUNT = 6;

  const defaultItems: ProductItem[] = useMemo(() => [
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
  ], []);

  useEffect(() => {
    const loadProductions = async () => {
      try {
        setLoading(true);
        const data = await fetchProductions();
        
        // Map API data to ProductItem format
        const mappedItems = data.map((prod: Production, index: number) => {
          // Prioritize image_url from API, fallback to constructed URL
          const imageUrl = prod.images && prod.images.length > 0
            ? prod.images[0].image_url || getImageUrl(prod.images[0].image)
            : '/placeholder.svg';
          
          const heights = [480, 320, 400, 350, 420, 380, 340, 420, 360, 400, 500, 380, 420, 360, 440];
          const year = new Date(prod.tanggal).getFullYear().toString();
          
          return {
            id: String(prod.id),
            img: imageUrl,
            url: '#',
            height: heights[index % heights.length],
            title: prod.judul,
            subtitle: prod.deskripsi,
            client: prod.client,
            year: year,
            location: 'Jakarta', // Default location - adjust if needed
          };
        });
        
        setItems(mappedItems.length > 0 ? mappedItems : defaultItems);
        setError(null);
      } catch (err) {
        console.error('Failed to load productions:', err);
        setError('Failed to load productions');
        setItems(defaultItems); // Fallback to default items
      } finally {
        setLoading(false);
      }
    };

    loadProductions();
  }, []);

  // Pagination logic for mobile
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

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

  // Auto-rotate images in modal
  useEffect(() => {
    if (!selected) return;
    setSlideIndex(0);
    const imgs = selected.images && selected.images.length > 0 ? selected.images : [selected.img];
    if (imgs.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % imgs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [selected]);

  // Initialize and handle infinite scroll for desktop only
  useEffect(() => {
    if (isMobile) return; // keep mobile behavior intact

    // Initial load once
    setVisibleItems(prev => (prev.length ? prev : items.slice(0, INITIAL_LOAD_COUNT)));

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleItems((prev) => {
            if (prev.length >= items.length) return prev;
            const next = items.slice(0, Math.min(prev.length + LOAD_MORE_COUNT, items.length));
            return next;
          });
        }
      },
      { rootMargin: '1200px 0px 0px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isMobile, items]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/OurProductions.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4"
          >
            OUR PRODUCTIONS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-2xl text-white max-w-3xl px-2"
          >
            Precision in Every Detail: From Concept to Construction
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-12 text-gray-500">
              <p>Loading productions...</p>
            </div>
          )}
          
          {!loading && !error && items.length > 0 && (
            <>
              {/* Mobile Grid Layout */}
              {isMobile ? (
                <>
                  <div className="grid grid-cols-1 gap-6">
                    {paginatedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => setSelected(item)}
                      >
                        <div className="aspect-[4/3] w-full overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-12">
                          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/90 text-sm line-clamp-1">
                            {item.subtitle || item.client}
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
                    items={visibleItems.length ? visibleItems : items.slice(0, INITIAL_LOAD_COUNT)}
                    animateFrom="bottom"
                    scaleOnHover
                    hoverScale={0.95}
                    blurToFocus
                    stagger={0.03}
                    onItemClick={(item) => setSelected(item as ProductItem)}
                  />
              {/* Sentinel for infinite loading */}
              <div ref={loadMoreRef} className="h-8" />
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl md:rounded-3xl md:max-h-[90vh] md:w-[98vw] md:max-w-none md:mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle Bar - Mobile Only */}
              <div className="flex md:hidden justify-center pt-3 pb-2 sticky top-0 bg-white z-10">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 md:top-5 md:right-5 z-20 w-10 md:w-11 h-10 md:h-11 flex items-center justify-center bg-gray-100 md:bg-white rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
              </button>

              {/* Desktop two-column layout like the design */}
              <div className="px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Left: Text content */}
                  <div className="order-2 md:order-1">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                      {selected.title}
                    </h2>
                    {selected.subtitle && (
                      <div className="space-y-1 mb-8">
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          {selected.subtitle}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-6 max-w-md">
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wider block mb-1">CLIENT</span>
                        <p className="text-gray-900 text-sm sm:text-base">{selected.client}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-xs uppercase tracking-wider block mb-1">YEAR</span>
                        <p className="text-gray-900 text-sm sm:text-base">{selected.year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Auto-rotating image */}
                  <div className="order-1 md:order-2 w-full">
                    <div className="w-full rounded-2xl overflow-hidden md:rounded-xl">
                      <img
                        src={(selected.images && selected.images.length > 0 ? selected.images : [selected.img])[slideIndex]}
                        alt={selected.title}
                        className="w-full h-72 sm:h-80 md:h-[420px] object-cover"
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

export default OurProducts;
