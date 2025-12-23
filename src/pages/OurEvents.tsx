import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Masonry from '@/components/Masonry';
import Footer from '@/components/Footer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { fetchEvents } from '@/lib/api-services';
import { getImageUrl } from '@/lib/api-constants';
import type { Event } from '@/lib/api-constants';

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

const INITIAL_LOAD_COUNT = 9;
const LOAD_MORE_COUNT = 6;

const OurEvents = () => {
  const isMobile = useIsMobile();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPage = isMobile ? 4 : 13;

  /* ===================== DEFAULT UI (FALLBACK) ===================== */
  const defaultEvents: EventItem[] = useMemo(
    () => [
      {
        id: '1',
        img: '/placeholder.svg',
        images: ['/placeholder.svg'],
        url: '#',
        height: 600,
        title: 'K-Content BizWeek 2025 by KOCCA',
        subtitle: 'Agency Daehang Congratulates Indonesia Organized by CSCOM',
        client: 'Daehang Communications Indonesia',
        year: '2025',
        location: 'Jakarta',
      },
      {
        id: '2',
        img: '/placeholder.svg',
        images: ['/placeholder.svg'],
        url: '#',
        height: 520,
        title: 'Great Chinggu Launch 2024',
        subtitle: 'New Product Launch',
        client: 'Great Chinggu',
        year: '2024',
        location: 'Jakarta',
      },
    ],
    []
  );

  /* ===================== FETCH API ===================== */
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchEvents();

        if (!data || data.length === 0) {
          setEvents(defaultEvents);
          return;
        }

        const heights = [600, 500, 550, 450, 520, 580, 490, 530, 510, 470];

// ===================== dummy lokasi =====================

       const mapped: EventItem[] = data.map((evt: Event, index: number) => {
  const images =
    evt.images && evt.images.length > 0
      ? evt.images.map((img) => img.image_url || getImageUrl(img.image))
      : ['/placeholder.svg'];

  return {
    id: String(evt.id),
    img: images[0],
    images,
    url: '#',
    height: heights[index % heights.length],
    title: evt.judul,
    subtitle: evt.deskripsi,
    client: evt.client,
    year: new Date(evt.tanggal).getFullYear().toString(),

    // ✅ DUMMY LOCATION (AMAN)
    location: 'Jakarta',
  };
});

        setEvents(mapped);
      } catch (e) {
        console.error(e);
        setError('Failed to load events');
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [defaultEvents]);

  /* ===================== MOBILE PAGINATION ===================== */
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ===================== DESKTOP INFINITE SCROLL ===================== */
  useEffect(() => {
    if (isMobile) return;

    setVisibleEvents(events.slice(0, INITIAL_LOAD_COUNT));

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleEvents((prev) =>
            prev.length >= events.length
              ? prev
              : events.slice(0, prev.length + LOAD_MORE_COUNT)
          );
        }
      },
      { rootMargin: '1000px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [events, isMobile]);

  /* ===================== MODAL IMAGE SLIDER ===================== */
  useEffect(() => {
    if (!selectedEvent) return;

    setSlideIndex(0);
    const imgs = selectedEvent.images ?? [selectedEvent.img];
    if (imgs.length <= 1) return;

    const timer = setInterval(
      () => setSlideIndex((i) => (i + 1) % imgs.length),
      3000
    );

    return () => clearInterval(timer);
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(/OurEvents.png)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold">OUR EVENTS</h1>
          <p className="mt-4 text-lg">
            Creating Impactful Experiences & Harmonious Collaborations
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {isMobile ? (
              <div className="grid gap-6">
                {paginatedEvents.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedEvent(e)}
                    className="rounded-xl overflow-hidden shadow cursor-pointer"
                  >
                    <img src={e.img} className="h-56 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold">{e.title}</h3>
                      <p className="text-sm text-gray-600">{e.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Masonry
                  items={visibleEvents}
                  onItemClick={(item) => setSelectedEvent(item as EventItem)}
                />
                <div ref={loadMoreRef} className="h-10" />
              </>
            )}
          </>
        )}
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setSelectedEvent(null)}
              >
                <X />
              </button>

              <img
                src={
                  (selectedEvent.images ?? [selectedEvent.img])[slideIndex]
                }
                className="h-64 w-full object-cover rounded-xl mb-6"
              />

              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <p className="text-gray-600 mt-2">
                {selectedEvent.subtitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default OurEvents;
