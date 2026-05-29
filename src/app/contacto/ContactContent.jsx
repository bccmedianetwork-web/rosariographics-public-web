"use client";

import {
  IconBrandWhatsapp,
  IconArrowRight,
  IconMail,
  IconClock,
  IconShieldCheck,
  IconRosetteDiscountCheck,
  IconMapPin,
} from "@tabler/icons-react";

export default function ContactContent() {
  return (
    <section
      id="contacto"
      className="bg-[#0b0f19] py-20 px-6 lg:px-16"
      aria-label="Sección de contacto — Rosario Graphics"
    >
      <div className="max-w-[900px] mx-auto">

        <div className="text-center mb-12">
          <span className="inline-block bg-red-600 text-white text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded mb-4">
            Contacto
          </span>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-3 tracking-tight">
            ¿Listo para transformar tu negocio?
          </h1>
          <p className="text-gray-400 text-[15px] max-w-[480px] mx-auto leading-relaxed">
            Contáctanos hoy y recibe una cotización gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

          <a
            href="https://wa.me/18094226527"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#111827] border border-gray-700/60 hover:border-red-600 rounded-2xl p-5 no-underline transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-full bg-[#1f2937] flex items-center justify-center flex-shrink-0">
              <IconBrandWhatsapp size={22} className="text-green-500" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">WhatsApp</p>
              <p className="text-[15px] font-medium text-white mb-0">Chat con ventas</p>
              <p className="text-xs text-green-500 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                En línea ahora
              </p>
            </div>
            <IconArrowRight size={18} className="text-gray-500 group-hover:text-white transition-colors ml-auto" aria-hidden="true" />
          </a>

          <a
            href="mailto:ventas@rosariographics.com"
            className="group flex items-center gap-4 bg-[#111827] border border-gray-700/60 hover:border-red-600 rounded-2xl p-5 no-underline transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-full bg-[#1f2937] flex items-center justify-center flex-shrink-0">
              <IconMail size={22} className="text-red-600" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">Email</p>
              <p className="text-[15px] font-medium text-white mb-0 truncate">ventas@rosariographics.com</p>
              <p className="text-xs text-amber-500 mt-1 flex items-center gap-1.5">
                <IconClock size={12} aria-hidden="true" />
                Respuesta en menos de 4 h
              </p>
            </div>
            <IconArrowRight size={18} className="text-gray-500 group-hover:text-white transition-colors ml-auto" aria-hidden="true" />
          </a>

        </div>

        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-gray-800/80">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <IconShieldCheck size={16} className="text-green-500" aria-hidden="true" />
            Garantía de 3 años
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <IconRosetteDiscountCheck size={16} className="text-green-500" aria-hidden="true" />
            Cotización gratis
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <IconMapPin size={16} className="text-gray-500" aria-hidden="true" />
            Santo Domingo, RD
          </div>
        </div>

      </div>
    </section>
  );
}
