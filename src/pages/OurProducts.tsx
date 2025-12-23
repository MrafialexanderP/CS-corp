import { useEffect, useMemo, useRef, useState } from 'react';
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
  images: string[];
  url: string;
  height: number;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  location: string;
}

const OurProducts = () => {
  const isMobile = useIsMobile();

  const [items, setItems] = useState<ProductItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<ProductItem[]>([]);
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = isMobile ? 4 : 15;
  const INITIAL_LOAD = 9;
  const LOAD_MORE = 6;

  /* =======================
      DUMMY DATA (SAFE)
  ======================== */
  const defaultItems: ProductItem[] = useMemo(() => [
    {
      id: '1',
      img: '/placeholder.svg',
      images: ['/placeholder.svg'],
      url: '#',
      height: 480,
      title: 'Youtube Creator Collective Event Productions',
      subtitle: 'Organized by: Vibe Event Management',
      client: 'YouTube',
      year: '2025',
      location: 'Jakarta',
    },
  ], []);

  /* =======================
      FETCH API
  ======================== */
  useEffect(() => {
    const loadProductions = async () => {
      try {
        setLoading(true);
        const data = await fetchProductions();

        const heights = [480, 320, 400, 350, 420, 380, 340, 420, 360, 400];

        const mapped: ProductItem[] = data.map((prod: Production, i) => {
          const images =
            prod.images && prod.images.length > 0
              ? prod.images.map(img => img.image_url || getImageUrl(img.image))
              : ['/placeholder.svg'];

          return {
            id: String(prod.id),
            img: images[0],
            images,
            url: '#',
            height: heights[i % heights.length],
            title: prod.judul,
            subtitle: prod.deskripsi,
            client: prod.client,
            year: new Date(prod.tanggal).getFullYear().toString(),
            location: 'Jakarta', // ✅ dummy aman
          };
        });

        setItems(mapped.length ? mapped : defaultItems);
        setVisibleItems(mapped.slice(0, INITIAL_LOAD));
        setError(null);
      } catch {
        setItems(defaultItems);
        setVisibleItems(defaultItems);
        setError('Failed to load productions');
      } finally {
        setLoading(false);
      }
    };

    loadProductions();
  }, [defaultItems]);

  /* =======================
      INFINITE SCROLL (DESKTOP)
  ======================== */
  useEffect(() => {
    if (isMobile) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems(prev =>
            items.slice(0, Math.min(prev.length + LOAD_MORE, items.length))
          );
        }
      },
      { rootMargin: '1200px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [items, isMobile]);

  /* =======================
      MODAL SLIDESHOW
  ======================== */
  useEffect(() => {
    if (!selected || selected.images.length <= 1) return;

    setSlideIndex(0);
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % selected.images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [selected]);

  /* =======================
      MOBILE PAGINATION
  ======================== */
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginated = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =======================
      RENDER
  ======================== */
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* CONTENT */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {loading && <p className="text-center">Loading productions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {isMobile ? (
              <div className="grid gap-6">
                {paginated.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className="rounded-xl overflow-hidden shadow cursor-pointer"
                  >
                    <img src={item.img} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.client}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Masonry
                  items={visibleItems}
                  onItemClick={item => setSelected(item as ProductItem)}
                />
                <div ref={loadMoreRef} className="h-10" />
              </>
            )}
          </>
        )}
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setSelected(null)}
              >
                <X />
              </button>

              <img
                src={selected.images[slideIndex]}
                className="w-full h-72 object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">{selected.title}</h2>
              <p className="text-gray-600">{selected.client}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default OurProducts;
