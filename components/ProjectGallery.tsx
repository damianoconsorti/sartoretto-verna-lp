import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const asset = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

interface Project {
  name: string;
  location: string;
  category: string;
  imgSrc: string;
  gradient: string;
  brief: string;
  challenge: string;
  solution: string;
  feedback: string;
}

const featured: Project = {
  name: 'Farmacia Catona',
  location: 'Reggio Calabria',
  category: 'Nuova apertura',
  imgSrc: asset('CATONA.jpg'),
  gradient: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,181,181,0.32) 100%)',
  brief: 'Progettazione di un nuovo concept retail focalizzato su percorsi di acquisto fluidi e punti consulenza distintivi.',
  challenge: 'Dare identità a un locale appena acquisito, migliorando accoglienza e segmentazione prodotti senza compromettere il budget.',
  solution: 'Progetto d’arredo su misura con layout a “zone esperienziali”, scaffali dinamici e una zona servizi facilmente riconoscibile.',
  feedback: '“La farmacia è diventata più attraente e ordinata, i clienti restano più a lungo e abbiamo registrato un aumento delle vendite.”',
};

const small: Project[] = [
  {
    name: 'Farmacia Bellini',
    location: 'Catania',
    category: 'Ristrutturazione',
    imgSrc: asset('BELLINI.jpg'),
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
    brief: 'Riorganizzazione degli spazi e creazione di un percorso cliente più chiaro per valorizzare prodotti premium e servizi.',
    challenge: 'Lo spazio era diviso male e il cliente non riusciva a trovare rapidamente i reparti principali.',
    solution: 'Nuova disposizione delle isole merceologiche, segnaletica lineare e un desk accoglienza centrale per guidare il flusso.',
    feedback: '“Ora la farmacia comunica professionalità e il traffico si è stabilizzato nella parte più strategica del negozio.”',
  },
  {
    name: 'Farmacia San Leo',
    location: 'Rimini',
    category: 'Restyling',
    imgSrc: asset('San-Leo-1.jpg'),
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
    brief: 'Restyling completo per modernizzare l’immagine e creare un’esperienza più confortevole per il cliente.',
    challenge: 'L’arredamento datato e le tonalità scure rendevano lo spazio percepito come poco invitante.',
    solution: 'Nuovi materiali luminosi, cornici verdi e un’illuminazione studiata per valorizzare prodotti e aree consulenza.',
    feedback: '“Il cambiamento visivo ha reso la farmacia più moderna e il feedback dei clienti è stato immediatamente positivo.”',
  },
  {
    name: 'Farmacia Appio Latino',
    location: 'Roma',
    category: 'Ampliamento',
    imgSrc: asset('APPIO-LATINO.jpg'),
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
    brief: 'Ampliamento mirato per includere nuovi servizi wellness e area estetica all’interno della farmacia.',
    challenge: 'Gestire un’estensione senza interrompere il negozio esistente e mantenere una forte identità di brand.',
    solution: 'Proposta spaziale integrata con un’esperienza di ingresso chiara e un layout lineare tra ingresso, servizi e espositore.',
    feedback: '“Abbiamo ottenuto un nuovo spazio valorizzante che sembra naturale e funziona molto bene anche in termini di vendite.”',
  },
  {
    name: 'Farmacia Beneduce',
    location: 'Napoli',
    category: 'Trasferimento',
    imgSrc: asset('BENEDUCE.png'),
    gradient: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
    brief: 'Trasferimento e riprogettazione completa del punto vendita per conservare clientela e migliorare la visibilità.',
    challenge: 'Ricreare l’esperienza della farmacia in una nuova zona mantenendo i riferimenti del brand.',
    solution: 'Nuovo layout con una doppia vetrina, una zona servizi più visibile e spazi espositivi ottimizzati.',
    feedback: '“Il trasferimento è stato gestito con ordine e l’ambiente trasmette ora più fiducia ai clienti.”',
  },
];

export default function ProjectGallery() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="realizzazioni" className="bg-[#0a0a0a] pt-16 md:pt-24">

      {/* Header */}
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

      {/* Contenitore animato: griglia ↔ dettaglio */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>

          {/* ── VISTA GRIGLIA ── */}
          {!selected && (
            <motion.div
              key="grid"
              initial={{ x: '-6%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-8%', opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#333]"
            >
              {/* Card grande */}
              <div
                className="relative overflow-hidden h-[420px] md:h-[620px] group cursor-pointer"
                onClick={() => setSelected(featured)}
              >
                <img
                  src={featured.imgSrc}
                  alt={featured.name}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 [transition:filter_400ms_ease]"
                />
                <div className="absolute inset-0" style={{ background: featured.gradient }} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-sans px-4 py-2">
                    Espandi →
                  </span>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="border border-white/30 text-white text-sm tracking-[0.2em] uppercase font-sans px-3 py-1.5 bg-black/25 backdrop-blur-sm inline-block">
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <p className="text-white/50 text-sm tracking-[0.28em] uppercase font-sans mb-2">{featured.location}</p>
                  <h3 className="font-display text-white uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}>
                    {featured.name}
                  </h3>
                </div>
              </div>

              {/* 2×2 grid */}
              <div className="grid grid-cols-2 gap-px">
                {small.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                    className="relative overflow-hidden h-[210px] md:h-[308px] group cursor-pointer"
                    onClick={() => setSelected(p)}
                  >
                    <img
                      src={p.imgSrc}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 [transition:filter_400ms_ease]"
                    />
                    <div className="absolute inset-0" style={{ background: p.gradient }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-[0.25em] uppercase font-sans px-3 py-1.5">
                        Espandi →
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 z-10">
                      <span className="border border-white/25 text-white text-xs tracking-[0.18em] uppercase font-sans px-2.5 py-1 bg-black/25 backdrop-blur-sm inline-block">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                      <p className="text-white/45 text-xs tracking-[0.25em] uppercase font-sans mb-1">{p.location}</p>
                      <h3 className="font-display text-white uppercase leading-none text-lg md:text-xl">{p.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── VISTA ESPANSA ── */}
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease }}
              className="relative w-full overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[620px]">
                <div className="relative overflow-hidden">
                  <img
                    src={selected.imgSrc}
                    alt={selected.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.26) 45%, transparent 100%)' }}
                  />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.22em] uppercase font-sans font-semibold px-4 py-2.5 hover:bg-acid hover:text-dark hover:border-acid transition-colors duration-200"
                  >
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"/>
                    </svg>
                    Tutti i progetti
                  </button>
                </div>

                <div className="relative bg-[#050505] px-6 py-8 md:px-12 md:py-12 flex flex-col justify-center text-white">
                  <div className="max-w-2xl">
                    <span className="border border-white/20 text-white text-xs tracking-[0.22em] uppercase font-sans px-3 py-1.5 bg-white/5 backdrop-blur-sm inline-block mb-5">
                      {selected.category}
                    </span>
                    <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-sans mb-3">
                      {selected.location}
                    </p>
                    <h3
                      className="font-display uppercase leading-none"
                      style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
                    >
                      {selected.name}
                    </h3>
                    <p className="text-white/70 text-base leading-relaxed mt-6 md:mt-8">
                      {selected.brief}
                    </p>

                    <div className="mt-10 space-y-8">
                      <div>
                        <p className="text-acid text-xs tracking-[0.28em] uppercase font-sans mb-3">Sfida / Soluzione</p>
                        <p className="text-white/70 leading-7">{selected.challenge}</p>
                        <p className="text-white/70 leading-7 mt-4">{selected.solution}</p>
                      </div>

                      <div>
                        <p className="text-acid text-xs tracking-[0.28em] uppercase font-sans mb-3">Feedback cliente</p>
                        <p className="text-white/70 leading-7">{selected.feedback}</p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      {[featured, ...small].filter(p => p.name !== selected.name).slice(0, 3).map((p) => (
                        <button
                          key={p.name}
                          onClick={() => setSelected(p)}
                          className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white text-sm font-sans uppercase tracking-[0.18em] px-4 py-3 hover:bg-acid hover:text-dark transition-colors duration-200"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
