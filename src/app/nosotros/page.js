import Image from "next/image";
import { businessJsonLd, serviceJsonLd } from "@/data/organization";

export const metadata = {
  title: "Nosotros | Rosario Graphics - Expertos en Fachadas ACM y Letreros 3D",
  description: "Conoce a Rosario Graphics, especialistas en fachadas comerciales en ACM y letreros 3D en Santo Domingo. Más de 10 años de experiencia transformando negocios.",
  alternates: {
    canonical: "https://www.rosariographics.com/nosotros",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://www.rosariographics.com/nosotros",
    title: "Nosotros | Rosario Graphics",
    description: "Expertos en fachadas comerciales y letreros 3D en Santo Domingo. Más de 10 años de experiencia.",
    images: [
      {
        url: "https://www.rosariographics.com/images/local.webp",
        width: 1200,
        height: 630,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Rosario Graphics",
    images: ["https://www.rosariographics.com/images/local.webp"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.rosariographics.com/" },
    { "@type": "ListItem", "position": 2, "name": "Nosotros", "item": "https://www.rosariographics.com/nosotros" },
  ],
};

const VALUES = [
  {
    title: "Calidad Garantizada",
    desc: "Materiales premium y 3 años de garantía en todos nuestros trabajos.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Puntualidad",
    desc: "Cumplimos con los plazos acordados. Tu tiempo es importante para nosotros.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Equipo Profesional",
    desc: "Técnicos especializados con experiencia en proyectos de alta complejidad.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 7 3 3 0 01-6 0z" />
      </svg>
    ),
  },
  {
    title: "Diseño Personalizado",
    desc: "Creamos proyectos únicos adaptados a tu marca y presupuesto.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Cobertura Nacional",
    desc: "Servicios en todo Santo Domingo y República Dominicana.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Precios Competitivos",
    desc: "La mejor relación calidad-precio del mercado.",
    icon: (
      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main>
        {/* HERO */}
        <section className="hero-gradient py-10 px-6">
          <div className="max-w-7xl mx-auto relative" />
        </section>

        {/* HISTORIA */}
        <section className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Nuestra Historia</h2>
                <div className="space-y-4 text-gray-400">
                  <p>
                    <strong className="text-white">Rosario Graphics</strong> nació con la misión de transformar la imagen comercial de los negocios en Santo Domingo y toda la República Dominicana.
                  </p>
                  <p>
                    Convertimos locales comunes en puntos de referencia mediante el uso de <strong className="text-white">ACM (Alucobond)</strong> y letreros 3D con iluminación LED, garantizando que tu marca brille incluso de noche.
                  </p>
                  <p>
                    Nuestro equipo de profesionales combina técnica de vanguardia con materiales premium para garantizar acabados impecables que elevan la presencia de tu empresa.
                  </p>
                  <p>
                    Cada proyecto es una oportunidad de hacer crecer tu marca. Por eso ponemos el mismo cuidado y dedicación en cada trabajo, grande o pequeño.
                  </p>
                </div>
              </div>
              <div className="image-hover-zoom rounded-2xl overflow-hidden">
                <Image
                  src="/images/local.webp"
                  alt="Fachada profesional de Rosario Graphics"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-8 px-6">
          <div className="bg-gray-800/50 rounded-2xl p-4 max-w-4xl mx-auto mb-4">
            <div className="flex flex-wrap justify-center items-stretch gap-3">
              {[
                { number: "10+", label: "Años de Experiencia" },
                { number: "500+", label: "Proyectos Entregados" },
                { number: "3", label: "Años de Garantía" },
                { number: "100%", label: "Clientes Felices" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 min-w-[140px] max-w-[180px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 text-center border border-white/5 hover:-translate-y-1 hover:border-red-600/30 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-white to-red-600 bg-clip-text text-transparent leading-tight">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-1 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Nuestros Valores</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Nos diferencia nuestro compromiso con la calidad y la satisfacción del cliente.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 rounded-2xl p-5 text-center hover:-translate-y-1 hover:border-red-600/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-600/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO CTA */}
        <section className="py-16 bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-gray-300 mb-6">
              Contáctanos hoy y recibe una cotización gratis
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contacto"
                className="inline-block py-4 px-8 w-full md:w-auto text-base text-white bg-red-600 hover:bg-red-700 font-medium text-center rounded-md shadow-sm transition-all"
              >
                Solicitar Cotización
              </a>
              <a
                className="inline-block py-4 px-8 w-full md:w-auto text-base text-white bg-gray-700 hover:bg-gray-600 font-medium text-center rounded-md shadow-sm transition-all"
                href="mailto:ventas@rosariographics.com"
              >
                Email: ventas@rosariographics.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
