import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

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
  variant?: 'default' | 'featured'; // 'featured' for special pattern layout
}

const CustomMasonry: React.FC<CustomMasonryProps> = ({ 
  items, 
  onItemClick,
  columns = 3,
  variant = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  // Compute columns for default variant (hooks must be unconditional)
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
      
      // Consistent height variations for better masonry effect
      const itemHeight = item.height || (300 + (Math.floor(Math.random() * 5) * 50));
      
      columnHeights.current[minColIdx] += itemHeight + 24; // match gap-6 (24px)
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
      animate={items.length > 0 ? "visible" : "hidden"}
    >
      {variant === 'featured' && items.length >= 5 ? (
        <div className="grid grid-cols-3 gap-6 auto-rows-max">
          {items.map((item, idx) => {
            const colSpan = 'col-span-1';
            let rowSpan = 'row-span-2';

            if (idx % 5 === 0 || idx % 5 === 2) {
              rowSpan = 'row-span-2';
            } else if (idx % 5 === 1 || idx % 5 === 3 || idx % 5 === 4) {
              rowSpan = 'row-span-1';
            }

            return (
              <motion.div
                key={item.id}
                className={`cursor-pointer group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[0.98] ${colSpan} ${rowSpan}`}
                variants={itemVariants}
                onClick={() => onItemClick?.(item)}
              >
                <div className="relative w-full h-full">
                  <OptimizedImage
                    src={item.img}
                    alt={item.title || 'Production'}
                    className="w-full h-full object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  {(item.title || item.subtitle) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300">
                      {item.title && (<h3 className="font-bold text-sm text-white line-clamp-2">{item.title}</h3>)}
                      {item.subtitle && (<p className="text-xs text-white/90 line-clamp-1 mt-1">{item.subtitle}</p>)}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {columnItems.current.map((columnItemsList, colIdx) => (
            <div key={`col-${colIdx}`} className="flex flex-col gap-6">
              {columnItemsList.map((item) => (
                <motion.div
                  key={item.id}
                  className="cursor-pointer group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[0.98]"
                  variants={itemVariants}
                  onClick={() => onItemClick?.(item)}
                  style={{ height: item.height ? `${item.height}px` : '350px' }}
                >
                  <div className="relative w-full h-full">
                    <OptimizedImage
                      src={item.img}
                      alt={item.title || 'Production'}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    {(item.title || item.subtitle) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transition-all duration-300">
                        {item.title && (<h3 className="font-bold text-sm text-white line-clamp-2">{item.title}</h3>)}
                        {item.subtitle && (<p className="text-xs text-white/90 line-clamp-1 mt-1">{item.subtitle}</p>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CustomMasonry;
