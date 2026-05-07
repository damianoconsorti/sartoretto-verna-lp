import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const small = [
  { name: 'Farmacia Bellini',      location: 'Catania', category: 'Ristrutturazione', seed: 215 },
  { name: 'Farmacia San Leo',      location: 'Rimini',  category: 'Restyling',        seed: 220 },
  { name: 'Farmacia Appio Latino', location: 'Roma',    category: 'Ampliamento',      seed: 225 },
  { name: 'Farmacia Beneduce',     location: 'Napoli',  category: 'Trasferimento',    seed: 230 },
];

export default function ProjectGallery() {
  return (
    <section id="realizzazioni" className="bg-[#0a0a0a] pt-16 md:pt-24">

      {/* ── Header ── */}
      <div className="px-6 md:px-14 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-3">
            Realizzazioni selezionate
          </p>
          <h2
            className="font-display text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 7.5rem)' }}
          >
            Progetti<br />
            <span className="text-acid">Selezionati</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:items-end gap-4"
        >
          <p className="text-white/55 text-base md:text-lg font-sans font-light max-w-[36ch] md:text-right leading-relaxed">
            Storie di successo tangibili: design d'impatto e performance commerciali misurabili.
          </p>
          <a
            href="#contatti"
            className="inline-flex items-center gap-3 bg-white text-dark font-sans font-bold text-sm tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-acid transition-colors duration-200 self-start md:self-auto"
          >
            Richiedi una consulenza →
          </a>
        </motion.div>
      </div>

      {/* ── GRIGLIA 2 colonne ──────────────────────────────────────
          Mobile  : featured (420px) sopra, poi 2×2 (210px/cella)
          Desktop : left=featured (620px), right=2×2 (308px/cella)
          620px = 308×2 + 4px gap → nessuno spazio vuoto
      ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#333]">

        {/* ── Colonna sinistra: card grande ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden h-[420px] md:h-[620px]"
        >
          <img
            src="https://picsum.photos/seed/210/800/1200"
            alt="Farmacia Catona"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,181,181,0.32) 100%)' }}
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-sans px-3 py-1.5 bg-black/25 backdrop-blur-sm inline-block">
              Nuova apertura
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
            <p className="text-white/50 text-sm tracking-[0.28em] uppercase font-sans mb-2">
              Reggio Calabria
            </p>
            <h3
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
            >
              Farmacia Catona
            </h3>
          </div>
        </motion.div>

        {/* ── Colonna destra: 2×2 grid ── */}
        <div className="grid grid-cols-2 gap-px">
          {small.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="relative overflow-hidden h-[210px] md:h-[308px]"
            >
              <img
                src={`https://picsum.photos/seed/${p.seed}/600/600`}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' }}
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="border border-white/25 text-white text-xs tracking-[0.18em] uppercase font-sans px-2.5 py-1 bg-black/25 backdrop-blur-sm inline-block">
                  {p.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                <p className="text-white/45 text-xs tracking-[0.25em] uppercase font-sans mb-1">
                  {p.location}
                </p>
                <h3 className="font-display text-white uppercase leading-none text-lg md:text-xl">
                  {p.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
