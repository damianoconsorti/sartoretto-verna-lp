import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface VideoItem {
  name: string;
  location: string;
  src: string;
  accent: string;
  portrait?: boolean;
}

const videos: VideoItem[] = [
  {
    name: 'Farmacia San Leo',
    location: 'Reggio Calabria (RC)',
    src: 'https://sv-it.b-cdn.net/Farmacia%20San%20Leo%20-%20%20intervista.mp4',
    accent: '#00B5B5',
  },
  {
    name: 'Farmacia Zucca',
    location: 'Segrate (MI)',
    src: 'https://sv-it.b-cdn.net/zucca%20intervista.mp4',
    accent: '#CCFF00',
  },
  {
    name: 'Farmacia Sundas',
    location: 'Senorbì (CA)',
    src: 'https://sv-it.b-cdn.net/intervista%20Sundas.mp4',
    accent: '#CC00FF',
  },
  {
    name: 'Antica Farmacia Berardelli',
    location: 'Cosenza (CS)',
    src: 'https://sv-it.b-cdn.net/Intervista%20Berardelli_verticale.mov',
    accent: '#CCFF00',
    portrait: true,
  },
];

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    ref.current?.play();
    setPlaying(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease, delay: index * 0.1 }}
      className="relative overflow-hidden bg-[#111] flex flex-col"
    >
      {/* Accent bar top */}
      <div className="h-[3px] w-full shrink-0" style={{ background: video.accent }} />

      {/* Video container */}
      <div className={`relative w-full ${video.portrait ? 'aspect-[9/16]' : 'aspect-video'} bg-black`}>
        <video
          ref={ref}
          src={video.src}
          className="absolute inset-0 w-full h-full object-contain"
          controls={playing}
          preload="metadata"
          playsInline
        />

        {/* Play overlay — nascosto dopo play */}
        {!playing && (
          <div
            className="absolute inset-0 flex flex-col items-end justify-between p-5 cursor-pointer group/play"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
            onClick={handlePlay}
          >
            {/* Play button */}
            <div className="self-center mt-auto mb-auto">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover/play:scale-110"
                style={{ background: video.accent }}
              >
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
                  <path d="M2 2L20 12L2 22V2Z" fill="#0a0a0a" />
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="w-full">
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase font-semibold mb-1"
                style={{ color: video.accent }}
              >
                {video.location}
              </p>
              <h3 className="font-display text-white uppercase leading-none text-xl md:text-2xl">
                {video.name}
              </h3>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const landscape = videos.filter(v => !v.portrait);
  const portrait = videos.find(v => v.portrait)!;

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

        {/* 3 video orizzontali */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 mb-px">
          {landscape.map((v, i) => (
            <VideoCard key={v.name} video={v} index={i} />
          ))}
        </div>

        {/* Video verticale Berardelli — centrato, larghezza contenuta */}
        <div className="bg-white/8 flex justify-center">
          <div className="w-full md:max-w-[360px]">
            <VideoCard video={portrait} index={3} />
          </div>
        </div>

      </div>
    </section>
  );
}
