import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  { q: 'Cosa succede dopo aver compilato il form?',
    a: 'Verrai ricontattato per un primo confronto dedicato, in cui analizzeremo il tuo progetto e capiremo se e come possiamo supportarti.' },
  { q: 'Quanto costa progettare o ristrutturare una farmacia?',
    a: 'Ogni progetto è diverso. Il nostro approccio parte dagli obiettivi di business e dal contesto specifico, per costruire una soluzione coerente. Il primo confronto serve proprio a definire un ordine di grandezza realistico.' },
  { q: 'Fate solo arredo farmacia o anche progettazione completa?',
    a: 'Non siamo solo un fornitore di arredi. Ci occupiamo di progettazione strategica completa: layout, flussi, esperienza, identità e realizzazione dello spazio.' },
  { q: 'Lavorate solo su nuove aperture o anche su ristrutturazioni?',
    a: 'Entrambe. Seguiamo nuove aperture, ristrutturazioni e restyling strategici, adattando il progetto allo stato attuale della farmacia.' },
  { q: 'Dovrò chiudere la farmacia durante i lavori?',
    a: 'Assolutamente no. Il nostro sistema di allestimento è studiato per permetterti di continuare a servire i tuoi clienti mentre noi trasformiamo il tuo spazio, proteggendo il tuo fatturato quotidiano senza alcun disagio.' },
  { q: 'Quanto dura un progetto?',
    a: 'Dipende dalla complessità. In generale, un progetto completo richiede alcune settimane per la fase strategica e progettuale, seguite dalla realizzazione operativa.' },
];

const FAQItem: React.FC<{ item: typeof faqs[0]; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.06 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-5 py-6 text-left group"
      >
        <span className="font-sans font-semibold text-white text-base md:text-lg leading-snug group-hover:text-acid transition-colors duration-200 flex-1">
          {item.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 border flex items-center justify-center mt-0.5 transition-all duration-300 ${
            open ? 'bg-acid border-acid rotate-45' : 'border-white/25 group-hover:border-acid'
          }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 11 11">
            <path d="M5.5 0V11M0 5.5H11" stroke={open ? '#0a0a0a' : 'white'} strokeWidth="1.5"/>
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70 text-base md:text-lg font-sans font-light leading-relaxed max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <section className="bg-[#1a1a1a] border-t border-white/10 py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">
        {/* Layout: 1 colonna mobile → 2 colonne desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-5">
              Domande frequenti
            </p>
            <h2
              className="font-display text-white uppercase leading-none mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
            >
              Hai dubbi?<br />
              <span className="text-acid">Li abbiamo</span><br />
              già sentiti.
            </h2>
            <p className="text-white/50 text-base md:text-lg font-sans font-light leading-relaxed max-w-[28ch]">
              Le domande più comuni dei farmacisti che si avvicinano a noi per la prima volta.
            </p>
          </motion.div>

          <div>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
