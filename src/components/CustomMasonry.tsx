import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Item {
  id: string;
  img: string;
  title?: string;
  subtitle?: string;
  height?: number;
}

interface CustomMasonryProps {
  items: Item[];
  onItemClick?: (item: Item) => void;
  columns?: number;
}

const CustomMasonry: React.FC<CustomMasonryProps> = ({ 
  items, 
  onItemClick,
  columns = 3,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    items.forEach((item) => {
      const img = new Image();
      img.src = item.img;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === items.length) {
          setImagesLoaded(loadedCount);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === items.length) {
          setImagesLoaded(loadedCount);
        }
      };
    });
  }, [items]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Calculate column heights for Pinterest-style layout
  const columnHeights = useRef<number[]>([]);
  const columnItems = useRef<Item[][]>([]);

  // Reset on items change
  useEffect(() => {
    // Initialize arrays
    columnHeights.current = new Array(columns).fill(0);
    columnItems.current = Array.from({ length: columns }, () => [] as Item[]);

    if (items.length === 0) return;

    items.forEach((item) => {
      // Find column with minimum height
      const minColIdx = columnHeights.current.indexOf(Math.min(...columnHeights.current));
      
      // Each item has a random or predefined height for variety
      const itemHeight = item.height || (250 + Math.floor(Math.random() * 200));
      
      columnHeights.current[minColIdx] += itemHeight + 8; // 8 for gap
      if (columnItems.current[minColIdx]) {
        columnItems.current[minColIdx].push(item);
      }
    });
  }, [items, columns]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate={imagesLoaded > 0 ? "visible" : "hidden"}
    >
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {columnItems.current.map((columnItemsList, colIdx) => (
          <div key={`col-${colIdx}`} className="flex flex-col gap-2">
            {columnItemsList.map((item) => (
              <motion.div
                key={item.id}
                className="cursor-pointer group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-95"
                variants={itemVariants}
                onClick={() => onItemClick?.(item)}
                style={{ height: item.height ? `${item.height}px` : 'auto' }}
              >
                <div className="relative w-full h-full">
                  {/* Image */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Text Overlay */}
                  {(item.title || item.subtitle) && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.title && (
                        <h3 className="font-bold text-sm line-clamp-2">
                          {item.title}
                        </h3>
                      )}
                      {item.subtitle && (
                        <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CustomMasonry;
