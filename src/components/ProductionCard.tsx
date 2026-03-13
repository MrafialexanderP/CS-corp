import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

interface ProductionCardProps {
  title: string;
  subtitle?: string;
  location?: string;
  image: string;
  index: number;
}

const ProductionCard: React.FC<ProductionCardProps> = ({
  title,
  subtitle,
  location,
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
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3 overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden relative">
          <OptimizedImage
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6"
          >
            <h4 className="text-white font-bold text-lg text-center mb-4">{title}</h4>
            {subtitle && (
              <p className="text-white/90 text-sm text-center mb-3">{subtitle}</p>
            )}
            {location && (
              <p className="text-white/80 text-xs text-center">{location}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Card Info - Shows when not hovered */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="text-left"
      >
        <h4 className="text-base font-semibold leading-tight text-gray-900">
          {title}
        </h4>
        {subtitle && (
          <p className="text-sm text-gray-700 leading-tight mt-1">{subtitle}</p>
        )}
        {location && (
          <p className="text-xs text-gray-600 mt-1">{location}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductionCard;
