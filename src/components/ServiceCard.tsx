import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black rounded-3xl overflow-hidden border-4 border-white shadow-2xl cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ x: 5 }}
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 w-fit hover:bg-gray-100 transition-colors"
        >
          Get In Touch
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
