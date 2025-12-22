import { motion } from "framer-motion";
import ShowMoreButtonSimple from "./ShowMoreButtonSimple";
import ProductionCard from "./ProductionCard";
import Masonry from "./Masonry";

type Production = {
  title: string;
  subtitle?: string;
  location?: string;
  image: string;
};

// Data dummy; ganti image path dengan aset sebenarnya bila tersedia
const productions: Production[] = [
  {
    title: "Youtube Creator Collective",
    subtitle: "Event Productions",
    location: "Organized by: Gala Event Management",
    image: "/placeholder.svg",
  },
  {
    title: "Astra Corporate Affairs Awards",
    subtitle: "Event Productions",
    location: "Organized by: Gala Event Management",
    image: "/placeholder.svg",
  },
  {
    title: "Dulux Booth at Karman Paint Expo 2025 Purwokerto",
    subtitle: "Event Productions",
    location: "",
    image: "/placeholder.svg",
  },
  {
    title: "Seruni",
    subtitle: "Booth - Mall to Mall 2025",
    location: "",
    image: "/placeholder.svg",
  },
  {
    title: "Pertamina Bright Gas Booth at Parantale Event 2025",
    subtitle: "Event Productions",
    location: "Organized by: 3Action",
    image: "/placeholder.svg",
  },
  {
    title: "Sony 1000x Series",
    subtitle: "Booth - Mall Exhibition",
    location: "Organized by: Gala Event Management",
    image: "/placeholder.svg",
  },
];

const CSCOMSection = () => {
  return (
    <section className="bg-transparent">
      <div className="px-4 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="mx-auto max-w-4xl text-3xl sm:text-4xl lg:text-[42px] font-bold italic leading-tight" style={{ color: '#3C597F' }}>
            Creating Impactful Experiences
            <br />
            & Harmonious Collaborations
          </h2>
        </motion.div>
      </div>

      <div className="px-4 pb-6 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          {(() => {
            const patternHeights = [260, 420, 260, 260, 420, 260]; // H, V, H, H, V, H
            const items = productions.map((p, idx) => ({
              id: `${idx}-${p.title}`,
              img: p.image,
              url: '#',
              height: patternHeights[idx % patternHeights.length],
              title: p.title,
              subtitle: p.subtitle
            }));
            return <Masonry items={items} animateFrom="bottom" />;
          })()}
        </div>
        <div className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end">
          <ShowMoreButtonSimple />
        </div>
      </div>

      <div className="px-4 pb-14 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 lg:pr-12 lg:pt-8"
          >
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold italic leading-tight text-coral">
              Precision in Every
              <br />
              Detail: From Concept
              <br />
              to Construction.
            </h3>
            <div className="mx-auto max-w-6xl mt-6 sm:mt-8 flex justify-end">
              <ShowMoreButtonSimple />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full flex justify-center lg:justify-end"
          >
            <img
              src="/fotocampuran.png"
              alt="CSCOM production collage"
              loading="lazy"
              className="w-full max-w-[600px] lg:max-w-[700px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCOMSection;
