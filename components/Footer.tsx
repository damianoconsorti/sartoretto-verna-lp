import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-6 px-8 md:px-14 lg:px-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-white/30 text-sm font-sans">
          © {new Date().getFullYear()} Sartoretto Verna S.R.L. — P.IVA 07291841008
        </p>
        <a href="#" className="text-white/30 text-sm font-sans hover:text-white/60 transition-colors cursor-pointer">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
