import Masonry from "@/components/Masonry";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const productions = [
  {
    id: '1',
    title: 'K-Content BizWeek 2025 by KOCCA',
    subtitle: 'Agency Daehang Congratulates Indonesia Organized by CSCOM',
    img: '/placeholder.svg',
    url: '#',
    height: 600
  },
  {
    id: '2',
    title: 'Pesta IWET 2025 by Tlnet',
    subtitle: 'Pesta Iklim & Iklim Pesta Organized by Cooperation Partner',
    img: '/placeholder.svg',
    url: '#',
    height: 500
  },
  {
    id: '3',
    title: 'Great Chinggu Launch 2024',
    subtitle: 'New Product Launch',
    img: '/placeholder.svg',
    url: '#',
    height: 550
  },
  {
    id: '4',
    title: 'Launching Buku Apresiasi Jan 25th 2025',
    subtitle: 'Book Launch Event',
    img: '/placeholder.svg',
    url: '#',
    height: 450
  },
  {
    id: '5',
    title: 'KRU Hondas Sultan Activation',
    subtitle: 'Brand Activation Campaign',
    img: '/placeholder.svg',
    url: '#',
    height: 520
  },
  {
    id: '6',
    title: 'A MOMENT AT JAM House (Launchingshowcase)',
    subtitle: 'Music Showcase Event',
    img: '/placeholder.svg',
    url: '#',
    height: 580
  },
  {
    id: '7',
    title: 'Panini Indonesia Activation',
    subtitle: 'Brand Activation & Exhibition',
    img: '/placeholder.svg',
    url: '#',
    height: 490
  },
  {
    id: '8',
    title: 'AQUA DANONE KLHK AMDAL',
    subtitle: 'Environmental Program',
    img: '/placeholder.svg',
    url: '#',
    height: 530
  },
  {
    id: '9',
    title: 'Vitamin Kesesah Original Harvest',
    subtitle: 'Product Launch Campaign',
    img: '/placeholder.svg',
    url: '#',
    height: 510
  },
  {
    id: '10',
    title: 'OpenYork Palmeran (retorative 2024 Jakarta)',
    subtitle: 'Corporate Event',
    img: '/placeholder.svg',
    url: '#',
    height: 470
  },
  {
    id: '11',
    title: 'Exam Buleuseed Invitation 2024',
    subtitle: 'Educational Event',
    img: '/placeholder.svg',
    url: '#',
    height: 560
  },
  {
    id: '12',
    title: 'McDonalds K-Grand',
    subtitle: 'Restaurant Grand Opening',
    img: '/placeholder.svg',
    url: '#',
    height: 500
  },
  {
    id: '13',
    title: 'RAPP(invent Focus Collaboration 2023)',
    subtitle: 'Partnership Event',
    img: '/placeholder.svg',
    url: '#',
    height: 540
  }
];

const ProductionsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex items-center justify-between mb-12"
        >
          <button className="text-sm font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
          <div className="bg-primary rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR PRODUCTIONS</h2>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          <div style={{ height: '2000px' }}>
            <Masonry
              items={productions}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              stagger={0.04}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductionsSection;
