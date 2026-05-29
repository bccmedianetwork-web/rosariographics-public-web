export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.rosariographics.com/#business",
  "name": "Rosario Graphics",
  "description": "Expertos en fabricación e instalación de fachadas modernas en ACM, letreros 3D y señalización comercial premium en Santo Domingo.",
  "url": "https://www.rosariographics.com/",
  "image": "https://www.rosariographics.com/images/local.webp",
  "logo": "https://www.rosariographics.com/icon-web1-64.png",
  "telephone": "+18094226527",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Santo Domingo",
    "addressLocality": "Santo Domingo",
    "addressRegion": "Distrito Nacional",
    "postalCode": "10301",
    "addressCountry": "DO",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.489704,
    "longitude": -69.873211,
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:30", "closes": "13:00" },
  ],
  "sameAs": ["https://facebook.com/rosariographic", "https://instagram.com/rosariographic"],
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.rosariographics.com/#service",
  "name": "Rosario Graphics - Fachadas ACM y Letreros 3D",
  "image": "https://www.rosariographics.com/images/local.webp",
  "telephone": "+18094226527",
  "description": "Fabricación e instalación de fachadas en ACM, letreros 3D acrílicos con LED, cajas de luz y rotulación comercial en Santo Domingo.",
  "areaServed": { "@type": "City", "name": "Santo Domingo" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santo Domingo",
    "addressRegion": "Distrito Nacional",
    "addressCountry": "DO",
  },
  "priceRange": "$$",
  "url": "https://www.rosariographics.com/",
};
