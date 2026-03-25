import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import CustomMasonry from '@/components/CustomMasonry';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
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
  const itemsPerPage = isMobile ? 4 : 13;

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
    
    return productionsData.map((production, idx) => {
      const mainImage = production.images && production.images.length > 0 
        ? getImageUrl(production.images[0].image, production.images[0].image_url)
        : '/placeholder.svg';
      
      // Stagger heights so rows after the first don't align too uniformly
      const staggerBase = 420;
      const staggerStep = 60;
      const height = staggerBase + (idx % 3) * staggerStep;

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

  // Auto-slide effect for modal images
  useEffect(() => {
    if (!selected || selected.allImages.length < 2) return;
    
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % selected.allImages.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
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
        data-nav-hero="true"
        className="relative h-[40vh] sm:h-[50vh] md:h-[60vh]"
      >
        <OptimizedImage
          src="/OurProductions.png"
          alt=""
          aria-hidden="true"
          priority
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italic text-white mb-3 sm:mb-4 md:mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            OUR PRODUCTIONS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white max-w-3xl px-2"
          >
            Precision in Every Detail: From Concept to Construction
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery (full-bleed) */}
      <section className="py-12 sm:py-16 md:py-20">
        {/* Status messages centered */}
        <div className="max-w-7xl mx-auto px-6">
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
        </div>

        {!loading && !error && items.length > 0 && (
          <>
            {/* Mobile Grid Layout */}
            {isMobile ? (
              <>
                <div className="grid grid-cols-1 gap-6 px-6">
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
                      <OptimizedImage
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        sizes="(min-width: 640px) 50vw, 100vw"
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
                  {/* Masonry with equal side padding matching gaps */}
                  <div className="w-full px-6">
                    <CustomMasonry
                      items={visibleItems.length ? visibleItems : items.slice(0, INITIAL_LOAD_COUNT)}
                      onItemClick={(item) => handleItemClick(item as ProductItem)}
                      columns={3}
                    />
                  </div>
                  {/* Sentinel for infinite loading */}
                  <div ref={loadMoreRef} className="h-8" />
                </>
              )}
            </>
          )}
      </section>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10010] bg-black/70"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl min-h-[85vh] max-h-[95vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-8 md:w-10 h-8 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 md:w-8 h-6 md:h-8 text-gray-900" strokeWidth={2} />
              </button>

              {/* Modal Content */}
              <div className="p-6 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
                  {/* Left: Text content */}
                  <div className="order-2 md:order-1 flex flex-col justify-between h-full">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                        {selected.title}
                      </h2>
                      {selected.subtitle && (
                        <div className="space-y-1 mb-8 md:mb-12">
                          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                            {selected.subtitle}
                          </p>
                          {selected.location && (
                            <p className="text-gray-700 text-sm sm:text-base md:text-lg">{selected.location}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-auto pt-8">
                      <div>
                        <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider block mb-2">CLIENT</span>
                        <p className="text-gray-900 text-base md:text-lg font-medium">{selected.client}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-500 text-xs uppercase tracking-wider block mb-2">YEAR</span>
                        <p className="text-gray-900 text-base md:text-lg font-medium">{selected.year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Image Gallery - Single image with auto-slide */}
                  <div className="order-1 md:order-2 w-full flex items-center">
                    <div className="rounded-xl overflow-hidden bg-gray-100 w-full relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`img-${slideIndex}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <OptimizedImage
                            src={selected.allImages[slideIndex % selected.allImages.length]}
                            alt={`${selected.title} - Image ${slideIndex + 1}`}
                            priority
                            className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[500px] object-cover"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                          />
                        </motion.div>
                      </AnimatePresence>
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
