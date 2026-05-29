"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav id="header" className={`p-6 px-4 sticky top-0 z-[999] shadow-lg border-b border-gray-700/30 transition-all duration-300 ${
        scrolled ? "header-scrolled" : "header-default"
      }`}>
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <a className="flex items-center gap-2" href="/">
            <div style={{ width: "32px", height: "32px", position: "relative" }}>
              <Image
                src="/images/icon-web1-64.png"
                alt="Rosario Graphics"
                fill
                sizes="32px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <span className="font-bold text-lg text-white">Rosario Graphics</span>
          </a>

          <ul className="hidden lg:flex gap-12 text-gray-300">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className="hover:text-white transition-colors" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onOpenModal} className="py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-150 rounded text-sm text-white font-semibold">
              Cotización Gratis
            </button>
          </div>

          <button className="lg:hidden text-gray-300" aria-label="Abrir menú" onClick={() => setMobileMenuOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* BACKDROP MENU MOVIL */}
      <div className={`fixed inset-0 z-[9999] ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed right-0 top-0 h-auto w-[85vw] shadow-2xl border-l border-gray-600 p-6 transition-transform duration-300" style={{ backgroundColor: "rgba(28, 35, 45, 0.95)" }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-600">
            <span className="text-white font-bold text-xl">Menú</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2" aria-label="Cerrar menú">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="block pl-6 py-3 text-white hover:bg-gray-700/50 rounded-lg transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-600">
            <button onClick={() => { setMobileMenuOpen(false); onOpenModal(); }} className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-bold transition-colors">
              Cotización Gratis
            </button>
          </div>
        </div>
      </div>
    </>
  );
}