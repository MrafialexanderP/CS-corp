import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { fetchProductions } from '@/lib/api-services';
import type { Production } from '@/lib/api-constants';
import { getImageUrl } from '@/lib/api-constants';

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
  location?: string;
}

interface SelectedProductData extends ProductItem {
  allImages: string[];
}

const OurProducts = () => {
  const [selected, setSelected] = useState<SelectedProductData | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 4 : 15;

  // API data state
  const [productionsData, setProductionsData] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Desktop infinite scroll state
  const [visibleItems, setVisibleItems] = useState<ProductItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const INITIAL_LOAD_COUNT = 9;
  const LOAD_MORE_COUNT = 6;

  // Transform API data to ProductItem format
  const items: ProductItem[] = useMemo(() => {
    if (!productionsData.length) return [];
    
    return productionsData.map((production) => {
      const mainImage = production.images && production.images.length > 0 
        ? getImageUrl(production.images[0].image, production.images[0].image_url)
        : '/placeholder.svg';
      
      // Calculate height based on image count (for variety in masonry)
      const height = 400 + (production.images?.length || 0) * 50;

      // Extract year from tanggal
      const year = production.tanggal ? new Date(production.tanggal).getFullYear().toString() : '';

      return {
        id: production.id.toString(),
        img: mainImage,
        url: '#',
        height: Math.min(height, 700), // Cap at 700
        title: production.judul,
        subtitle: production.deskripsi,
        client: production.client,
        year: year,
        location: undefined, // Not in API, keeping optional
      };
    });
  }, [productionsData]);

  // Load productions from API
  useEffect(() => {
    const loadProductions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductions();
        setProductionsData(data || []);
      } catch (err) {
        console.error('Failed to load productions:', err);
        setError('Failed to load productions');
        setProductionsData([]);
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

  // Handle item click - transform to include all images
  const handleItemClick = (item: ProductItem) => {
    const apiProduction = productionsData.find(p => p.id.toString() === item.id);
    const allImages = apiProduction && apiProduction.images && apiProduction.images.length > 0
      ? apiProduction.images.map(img => getImageUrl(img.image, img.image_url))
      : [item.img];
    
    setSelected({
      ...item,
      allImages,
    });
    setSlideIndex(0);
  };

  // Manual image navigation
  const handlePrevImage = () => {
    if (!selected) return;
    setSlideIndex((prev) => (prev - 1 + selected.allImages.length) % selected.allImages.length);
  };

  const handleNextImage = () => {
    if (!selected) return;
    setSlideIndex((prev) => (prev + 1) % selected.allImages.length);
  };

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
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading productions...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No productions available</p>
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
                        className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                        onClick={() => handleItemClick(item)}
                      >
                    <div className="w-full h-64 overflow-hidden rounded-t-xl bg-gray-100">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-900 font-bold text-lg mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {item.subtitle}
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
                  onItemClick={(item) => handleItemClick(item as ProductItem)}
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

                  {/* Right: Image Gallery */}
                  <div className="order-1 md:order-2 w-full">
                    <div className="relative w-full rounded-2xl overflow-hidden md:rounded-xl">
                      {selected.allImages.length > 0 ? (
                        <>
                          <img
                            src={selected.allImages[slideIndex]}
                            alt={selected.title}
                            className="w-full h-72 sm:h-80 md:h-[420px] object-cover"
                          />
                          {selected.allImages.length > 1 && (
                            <>
                              {/* Navigation Buttons */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrevImage();
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
                                aria-label="Previous image"
                              >
                                <ChevronLeftIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNextImage();
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
                                aria-label="Next image"
                              >
                                <ChevronRightIcon className="w-5 h-5" />
                              </button>
                              
                              {/* Image Counter */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {slideIndex + 1} / {selected.allImages.length}
                              </div>
                              
                              {/* Thumbnail Indicators */}
                              {selected.allImages.length <= 6 && (
                                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                  {selected.allImages.map((img, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSlideIndex(idx);
                                      }}
                                      className={`w-2 h-2 rounded-full transition-all ${
                                        slideIndex === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                                      }`}
                                      aria-label={`Go to image ${idx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <img
                          src={selected.img}
                          alt={selected.title}
                          className="w-full h-72 sm:h-80 md:h-[420px] object-cover"
                        />
                      )}
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
