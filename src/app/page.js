import Image from "next/image";
import { businessJsonLd, serviceJsonLd } from "@/data/organization";
import CotizarButton from "@/components/CotizarButton";

const PROJECTS = [
  {
    id: "proyecto1",
    image: "/images/Letrero-3D_frente_de_acrilico.webp",
    alt: "Letras y letreros 3D acrílico con luces LED en Santo Domingo",
    title: "Letrero letras 3D",
    description: "Instalación de alto impacto visual para restaurante. Acrílico 3D con luces led frontal, sistema trim-cap + Aluminio y fondo en ACM.",
  },
  {
    id: "proyecto2",
    image: "/images/Fachada_Comercial_en-ACM_800-600.webp",
    alt: "Revestimiento de fachada en ACM en Santo Domingo",
    title: "Fachada Comercial en ACM",
    description: "Transformación de fachada comercial mediante revestimiento integral en paneles de ACM. Letrero de identidad corporativa fabricado en acrílico con iluminación LED interna.",
  },
  {
    id: "proyecto3",
    image: "/images/CAJA-DE-LUZ-800-600.webp",
    alt: "Caja de luz metálica con iluminación LED en Santo Domingo",
    title: "Caja De Luz Metálica",
    description: "Estructuras de alta durabilidad en lona panaflex traslúcida con iluminación LED integrada, diseñadas para dar máxima visibilidad 24 horas.",
  },
];

const SERVICES = [
  { title: "Letreros 3D", description: "Letras corpóreas de acabado premium con iluminación LED. Diseño 3D de alta durabilidad para proyectar una imagen moderna." },
  { title: "Fachadas en ACM", description: "Revestimiento moderno con aluminio compuesto (ACM). Aporta elegancia y protección a tu fachada con acabados industriales de lujo." },
  { title: "Caja de Luz", description: "Publicidad luminosa con tecnología LED interna para máxima visibilidad nocturna. Estructuras resistentes 24/7." },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main>
        {/* SECCIÓN HERO */}
        <section className="py-12 px-6 lg:px-16" aria-labelledby="hero-title">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <span className="py-1 px-2 text-xs bg-red-600 uppercase rounded font-semibold text-white">Santo Domingo</span>
              <h1 id="hero-title" className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Transforma tu <span className="text-red-600">presencia comercial</span> con fachadas en ACM
              </h1>
              <p className="text-sm text-gray-300">
                Expertos en fabricación e instalación de <strong>señalización comercial premium en Santo Domingo</strong>. Desde fachadas en <strong>ACM (Alucobond)</strong> hasta letreros 3D en acrílico y publicidad exterior; garantizamos acabados impecables que elevan la imagen de tu empresa.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <CotizarButton className="py-4 px-7 bg-red-600 hover:bg-red-700 rounded shadow transition-all font-semibold text-white text-center">
                  Solicitar Cotización
                </CotizarButton>
                <a className="py-4 px-7 bg-gray-700 hover:bg-gray-800 rounded shadow transition-all font-semibold text-white text-center" href="#proyectos">
                  Ver Proyectos
                </a>
              </div>
            </div>

            {/* Contenedor relativo de imagen estable */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] relative w-full">
              <Image
                src="/images/local.webp"
                alt="Letrero 3D profesional de Rosario Graphics"
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN GALERÍA */}
        <section id="proyectos" className="py-16 px-6 lg:px-16" aria-labelledby="proyectos-title">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 text-xs bg-red-600 uppercase rounded font-semibold text-white">Galería</span>
              <h2 id="proyectos-title" className="mt-4 text-3xl md:text-4xl font-bold text-white">Proyectos Realizados en Santo Domingo</h2>
              <p className="mt-2 text-gray-300 max-w-2xl mx-auto">Transformamos tu imagen comercial con fachadas modernas y letreros profesionales.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <article key={project.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg hover:scale-[1.02] transition-transform duration-200">
                  <div className="w-full h-56 relative">
                    <Image src={project.image} alt={project.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                    <a className="text-red-400 hover:text-red-300 font-bold underline decoration-red-800/40 underline-offset-4 transition-colors text-sm" href={`#${project.id}`}>
                      Ver detalles →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN SERVICIOS */}
        <section id="servicios" className="py-16 px-6 lg:px-16" aria-labelledby="servicios-title">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="servicios-title" className="text-3xl md:text-4xl font-bold text-white">Nuestros Servicios</h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">Soluciones completas de señalización comercial con materiales premium y garantía de calidad.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div key={service.title} className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700 hover:scale-[1.02] transition-transform duration-200">
                  <h3 className="bg-red-600 text-white mx-auto rounded-lg py-2 px-4 mb-4 text-xl font-bold">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN LLAMADO A LA ACCIÓN INTERMEDIO */}
        <section id="contacto" className="py-16 bg-gray-800/40 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para transformar tu negocio?</h2>
            <p className="text-gray-300 mb-6">Contáctanos hoy y recibe una cotización gratis</p>
            <div className="flex flex-wrap justify-center gap-4">
              <CotizarButton className="inline-block py-4 px-8 w-full md:w-auto text-base text-white bg-red-600 hover:bg-red-700 font-medium text-center rounded-md shadow-sm transition-all">
                Solicitar Cotización
              </CotizarButton>
              <a className="inline-block py-4 px-8 w-full md:w-auto text-base text-white bg-gray-700 hover:bg-gray-600 font-medium text-center rounded-md shadow-sm transition-all" href="mailto:ventas@rosariographics.com">
                Email: ventas@rosariographics.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}