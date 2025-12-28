import { motion } from 'framer-motion';
import LogoLoop, { LogoItem } from './LogoLoop';

import { useEffect, useState } from 'react';
import { fetchClients } from '@/lib/api-services';
import type { Client } from '@/lib/api-constants';
import { getImageUrl } from '@/lib/api-constants';

const NUM_ROWS = 3;

function splitClientsToRows(clients: Client[]): LogoItem[][] {
  const perRow = Math.ceil(clients.length / NUM_ROWS);
  const rows: LogoItem[][] = [];
  for (let i = 0; i < NUM_ROWS; ++i) {
    const slice = clients.slice(i * perRow, (i + 1) * perRow);
    rows.push(
      slice.map((client) => {
        const src = client.icon_url || getImageUrl(client.icon);
        return {
          src,
          alt: client.nama_client,
          width: 68,
          height: 68,
        } as LogoItem;
      })
    );
  }
  return rows;
}

const ClientsSection = () => {
  const [rows, setRows] = useState<LogoItem[][]>([[],[],[]]);
  useEffect(() => {
    fetchClients().then(apiClients => {
      const split = splitClientsToRows(apiClients);
      setRows(split);
    });
  }, []);

  return (
    <section id="client" className="bg-gray-50 py-12 sm:py-16 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-vibrant-blue text-white py-4 sm:py-6 px-4 sm:px-6 text-center mb-8 sm:mb-12"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold italic tracking-wide">
          OUR CLIENTS
        </h2>
      </motion.div>

      {/* Logo Rows */}
      <div className="space-y-8 sm:space-y-12 px-4 sm:px-6">
        {/* Row 1 - Left to Right */}
        <LogoLoop
          logos={rows[0]}
          speed={80}
          direction="left"
          gap={60}
          logoHeight={120}
          logoWidth={120}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 1"
        />
        {/* Row 2 - Right to Left */}
        <LogoLoop
          logos={rows[1]}
          speed={80}
          direction="right"
          gap={60}
          logoHeight={120}
          logoWidth={120}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 2"
        />
        {/* Row 3 - Left to Right */}
        <LogoLoop
          logos={rows[2]}
          speed={80}
          direction="left"
          gap={60}
          logoHeight={120}
          logoWidth={120}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#f9fafb"
          ariaLabel="Partner logos row 3"
        />
      </div>
    </section>
  );
};

export default ClientsSection;
