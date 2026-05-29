import ContactContent from "./ContactContent";

export const metadata = {
  title: "Contacto | Rosario Graphics - Fachadas ACM y Letreros 3D en Santo Domingo",
  description: "Solicita una cotización gratis. Expertos en fachadas ACM, letreros 3D y cajas de luz LED en Santo Domingo. Respondemos en menos de 4 horas.",
  alternates: {
    canonical: "https://www.rosariographics.com/contacto",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://www.rosariographics.com/contacto",
    title: "Contacto | Rosario Graphics",
    description: "Solicita tu cotización gratis. Respondemos en menos de 4 horas.",
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
    title: "Contacto | Rosario Graphics",
    images: ["https://www.rosariographics.com/images/local.webp"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.rosariographics.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contacto", "item": "https://www.rosariographics.com/contacto" },
  ],
};

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactContent />
    </>
  );
}
