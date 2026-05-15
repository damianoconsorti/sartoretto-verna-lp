import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '1965', color: '#CCFF00', label: 'Fondazione' },
  { value: '3A', color: '#00B5B5', label: 'generazione di architetti' },
  { value: '+40', color: '#CC00FF', label: 'paesi nel mondo dove abbiamo realizzato farmacie' },
  { value: '+2500', color: '#0a0a0a', label: 'realizzazioni completate nel mondo' },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-t border-[#eee] border-b border-[#eee]">
      {/* 2 colonne su mobile, 4 su desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#eee]">
        {stats.map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="min-h-[180px] md:min-h-[220px] px-6 md:px-10 py-10 md:py-14 flex flex-col items-center justify-center gap-3 text-center"
          >
            <div className="flex items-end justify-center gap-1.5 leading-none flex-wrap">
              <span
                className="font-display uppercase"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 5.6rem)', color: s.color }}
              >
                {s.value}
              </span>
            </div>
            <p className="text-[#555] text-sm md:text-base font-sans font-light leading-relaxed max-w-[24ch]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
