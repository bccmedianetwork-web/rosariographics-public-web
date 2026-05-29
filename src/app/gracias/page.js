import Link from "next/link";

export const metadata = {
  title: "¡Gracias por tu solicitud! | Rosario Graphics",
  description:
    "Hemos recibido tu solicitud de cotización. Un experto de Rosario Graphics se pondrá en contacto contigo en las próximas 24 horas.",
  robots: "noindex, follow",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto tiempo dura la garantía de las fachadas en ACM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ofrecemos 3 años de garantía en todas nuestras fachadas en ACM y letreros 3D.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen instalaciones en todo Santo Domingo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, realizamos instalaciones en todo el Gran Santo Domingo y ciudades principales de República Dominicana.",
      },
    },
  ],
};

export default function GraciasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 px-6 py-16">
        <div className="max-w-md w-full text-center bg-neutral-900 p-10 rounded-2xl shadow-2xl shadow-red-900/30 border border-red-800/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-red-500 mx-auto mb-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            ¡Gracias por tu Interés!
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            Hemos recibido tu solicitud de cotización. Un experto de Rosario
            Graphics se pondrá en contacto contigo en las próximas 24 horas.
          </p>

          <Link
            href="/"
            className="inline-block w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-red-700/40 transition-all hover:-translate-y-0.5"
          >
            Volver a la Página Principal
          </Link>

          <a
            href="https://wa.me/18094226527"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-5 text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            ¿Necesitas ayuda urgente? Escríbenos por WhatsApp
          </a>
        </div>
      </main>
    </>
  );
}
