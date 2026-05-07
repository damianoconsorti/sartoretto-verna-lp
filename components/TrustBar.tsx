import React from 'react';
import { motion } from 'framer-motion';

const clients = ['Lloyds Farmacia', 'Farmacie Comunali', 'Comifar', 'Unifarm', 'Federfarma'];

export default function TrustBar() {
  return (
    <section className="bg-[#1a1a1a] border-b border-white/10 py-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-14 lg:px-24 flex flex-col md:flex-row md:items-center gap-4 md:gap-12"
      >
        <p className="font-sans font-semibold text-white text-base md:text-lg leading-snug shrink-0">
          Da oltre <span className="text-acid font-bold">60 anni</span>,{' '}
          più di <span className="text-acid font-bold">3.000 realizzazioni</span> nel mondo.
        </p>
        <div className="hidden md:block w-px h-6 bg-white/20 shrink-0" />
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 items-center">
          {clients.map((c) => (
            <span key={c} className="text-white/25 text-xs md:text-sm tracking-[0.18em] uppercase font-sans">
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
