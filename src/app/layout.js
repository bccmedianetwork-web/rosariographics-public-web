import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rosario Graphics | Fachadas en ACM y Letreros 3D en Santo Domingo",
  description: "Fabricamos fachadas modernas en ACM y letreros 3D que transforman tu negocio. Garantía de 3 años en Santo Domingo. ¡Cotiza hoy Gratis!",
  alternates: {
    canonical: "https://www.rosariographics.com/",
    languages: {
      "es-DO": "https://www.rosariographics.com/",
    },
  },
  robots: "index, follow, max-image-preview:large",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://www.rosariographics.com/",
    title: "Rosario Graphics | Fachadas Modernas y Letreros 3D",
    description: "Transformamos la imagen de tu negocio con fachadas de alto impacto. ¡Cotiza gratis!",
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
    title: "Rosario Graphics | Especialistas en Fachadas y Letreros",
    images: ["https://www.rosariographics.com/images/local.webp"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
      </head>
      <body className="bg-[#0b0f19] text-white antialiased font-sans">
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K87LGD97');`}
        </Script>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K87LGD97"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
      </body>
    </html>
  );
}
