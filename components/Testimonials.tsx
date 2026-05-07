import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: 'Con Sartoretto Verna abbiamo trasformato uno spazio difficile in una farmacia redditizia. Il fatturato è cresciuto del 38% nel primo anno. Non è un arredatore: è un partner strategico.',
    author: 'Dr. Antonio Caputo',
    pharmacy: 'Farmacia Caputo',
    location: 'Bari',
    year: '2023',
    bar: '#00B5B5',
    bgImg: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/mpFUHVbKW3PQXRUAg9RxuY',
  },
  {
    quote: 'Quello che ci ha convinto è il metodo. Ogni scelta del layout aveva una ragione legata ai flussi e al comportamento del paziente. Il risultato è visibile ogni giorno alla cassa.',
    author: 'Dr.ssa Marta Zucca',
    pharmacy: 'Farmacia Zucca',
    location: 'Milano',
    year: '2022',
    bar: '#CCFF00',
    bgImg: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/ec5y4oSZuvQ5uF56eyWyGh',
  },
  {
    quote: 'Abbiamo inaugurato in 4 settimane, a farmacia aperta. La puntualità e la cura nei dettagli ci hanno impressionato quanto il progetto finale. Ci siamo affidati a loro anche per la seconda sede.',
    author: 'Dr. Luca Berardelli',
    pharmacy: 'Farmacia Berardelli',
    location: 'Roma',
    year: '2024',
    bar: '#CC00FF',
    bgImg: 'https://storage.googleapis.com/lp-assets-prod/yHL3HA6j9ARWnPLvbF8fdD/cjipopvikKzfsH9rGTYjcW',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/10 py-20 md:py-32">
      <div className="px-6 md:px-14 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <p className="text-acid text-sm tracking-[0.4em] uppercase font-sans font-semibold mb-4">
            Testimonianze
          </p>
          <h2
            className="font-display text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
          >
            Chi ha già scelto<br />
            <span className="text-acid">di vendere di più.</span>
          </h2>
        </motion.div>

        {/* Cards — 1 colonna su mobile, 3 su desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.pharmacy}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease, delay: i * 0.1 }}
              className="relative overflow-hidden"
            >
              {/* Immagine di sfondo reale con overlay rgba(0,0,0,0.75) */}
              <div className="absolute inset-0">
                <img
                  src={t.bgImg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.75)' }} />
              </div>

              {/* Accent top bar */}
              <div className="relative z-10 h-1 w-full" style={{ background: t.bar }} />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-9 flex flex-col gap-7">
                {/* Quote mark */}
                <div
                  className="font-display text-6xl leading-none select-none"
                  style={{ color: t.bar, opacity: 0.6 }}
                >
                  "
                </div>

                <blockquote
                  className="text-white font-sans font-light"
                  style={{ fontSize: '1.125rem', lineHeight: 1.75 }}
                >
                  {t.quote}
                </blockquote>

                <div className="border-t border-white/20 pt-6">
                  <p className="font-display text-white uppercase text-xl leading-none mb-2">
                    {t.author}
                  </p>
                  <p
                    className="text-base tracking-[0.22em] uppercase font-sans font-semibold"
                    style={{ color: t.bar }}
                  >
                    {t.pharmacy} · {t.location}
                  </p>
                  <p className="text-white/45 text-sm font-sans mt-1.5">Progetto {t.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
