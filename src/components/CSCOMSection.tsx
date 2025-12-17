import { motion } from "framer-motion";
import ShowMoreButton from "./ShowMoreButton";
import ProductionCard from "./ProductionCard";

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
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-[42px] font-bold italic leading-tight text-coral">
              Precision in Every Detail: From
              <br />
              Concept to Construction
            </h2>
          </motion.div>
          <div className="absolute top-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <ShowMoreButton />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {productions.map((item, index) => (
            <ProductionCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              location={item.location}
              image={item.image}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pb-14 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-3xl sm:text-4xl font-bold italic leading-tight text-coral">
              Precision in Every
              <br />
              Detail: From Concept
              <br />
              to Construction.
            </h3>
            <div className="pt-2">
              <ShowMoreButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <img
              src="/fotocampuran.png"
              alt="CSCOM production collage"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CSCOMSection;
