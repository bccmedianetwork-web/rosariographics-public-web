"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
          <Link className="flex items-center gap-2" href="/">
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
          </Link>

          <ul className="hidden lg:flex gap-12 text-gray-300">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className="hover:text-white transition-colors" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a href="https://wa.me/18094226527" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:text-green-400 transition-colors text-sm font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat
            </a>
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
          <div className="mt-6 pt-4 border-t border-gray-600 space-y-3">
            <a href="https://wa.me/18094226527" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat con Ventas
            </a>
            <button onClick={() => { setMobileMenuOpen(false); onOpenModal(); }} className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-bold transition-colors">
              Cotización Gratis
            </button>
          </div>
        </div>
      </div>
    </>
  );
}