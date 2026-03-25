"use client";

import { useState } from "react";

/* ─── Project data ─── */
const projects = [
  {
    name: "Tour de Fore",
    href: "https://tourdefore.com",
    fontClass: "font-tour-de-fore",
    logo: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        {/* Trident/flag icon */}
        <path d="M24 6v36" stroke="#c8894f" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 6l-10 14c0 0 4 3 10 0s10 0 10 0L24 6z" fill="none" stroke="#c8894f" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="24,6 24,14 30,10" fill="#e07832" />
      </svg>
    ),
  },
  {
    name: "DoppelWriter",
    href: "https://doppelwriter.com",
    fontClass: "font-doppelwriter",
    logo: (
      <svg viewBox="0 0 32 32" className="w-12 h-12">
        <path d="M22 6L10 22l-2 4 4-2L24 8z" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 10l4 4" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "whatpeptidesdo",
    href: "https://whatpeptidesdo.com",
    fontClass: "font-peptides",
    logo: (
      <svg viewBox="0 0 32 32" className="w-12 h-12" fill="none">
        <circle cx="8" cy="16" r="3" stroke="#e07832" strokeWidth="2" />
        <circle cx="16" cy="8" r="3" stroke="#e07832" strokeWidth="2" />
        <circle cx="24" cy="16" r="3" stroke="#e07832" strokeWidth="2" />
        <line x1="10.5" y1="14" x2="13.5" y2="10" stroke="#e07832" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18.5" y1="10" x2="21.5" y2="14" stroke="#e07832" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "I'm Frustrated",
    href: "https://imfrustrated.org",
    fontClass: "font-frustrated",
    logo: (
      <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
        <rect x="4" y="4" width="32" height="24" rx="6" fill="#E8664A" />
        <polygon points="10,28 10,36 18,28" fill="#E8664A" />
        <line x1="13" y1="13" x2="17" y2="15" stroke="#FEFCFA" strokeWidth="2" strokeLinecap="round" />
        <line x1="27" y1="13" x2="23" y2="15" stroke="#FEFCFA" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="19" r="1.5" fill="#FEFCFA" />
        <circle cx="25" cy="19" r="1.5" fill="#FEFCFA" />
        <line x1="15" y1="24" x2="25" y2="24" stroke="#FEFCFA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "idonthaveawill",
    href: "https://idonthaveawill.com",
    fontClass: "font-will",
    logo: (
      <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
        <path d="M8 4C8 2.89543 8.89543 2 10 2H24L32 10V36C32 37.1046 31.1046 38 30 38H10C8.89543 38 8 37.1046 8 36V4Z" fill="#1a1a2e" />
        <path d="M24 2L32 10H26C24.8954 10 24 9.10457 24 8V2Z" fill="#2d2d4a" />
        <rect x="13" y="15" width="14" height="1.5" rx="0.75" fill="#4a4a6a" />
        <rect x="13" y="19.5" width="10" height="1.5" rx="0.75" fill="#4a4a6a" />
        <rect x="13" y="24" width="12" height="1.5" rx="0.75" fill="#4a4a6a" />
        <circle cx="28" cy="30" r="9" fill="#16a34a" />
        <path d="M23.5 30L26.5 33L32.5 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      {/* The image drives the page height — fully visible, no crop */}
      <img
        src="/hero.jpeg"
        alt="Nicholaus C. Mills"
        className="w-full h-auto block"
      />

      {/* Grid overlaid between chin and handwritten text (~52-72% down the image) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute left-0 right-0 flex items-center justify-center px-4 pointer-events-auto"
          style={{ top: "33%", height: "20%" }}
        >
          <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-3xl w-full">
            {projects.map((project, i) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col items-center justify-center gap-2 p-3 md:p-5 rounded-2xl border transition-all duration-300 ${
                  hovered === i
                    ? "bg-white/25 border-white/35 scale-[1.05] shadow-2xl shadow-black/20"
                    : "bg-white/[0.10] border-white/[0.15] backdrop-blur-md hover:bg-white/20 hover:border-white/30"
                }`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {project.logo}
                </div>
                <span
                  className={`${project.fontClass} text-[10px] md:text-sm text-black/80 text-center leading-tight transition-colors duration-300 group-hover:text-black`}
                >
                  {project.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
