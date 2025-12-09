import { motion } from "framer-motion";

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
    <section className="bg-white">
      <div className="px-4 py-14 sm:py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-3xl sm:text-4xl lg:text-[42px] font-bold italic leading-tight text-coral"
        >
          Precision in Every Detail: From
          <br />
          Concept to Construction
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1356b4] px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#0f4591]"
        >
          show more
        </motion.button>
      </div>

      <div className="px-4 pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {productions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative mb-3 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold leading-tight text-gray-900">{item.title}</h4>
                {item.subtitle && <p className="text-sm text-gray-700 leading-tight mt-1">{item.subtitle}</p>}
                {item.location && <p className="text-xs text-gray-600 mt-1">{item.location}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CSCOMSection;
