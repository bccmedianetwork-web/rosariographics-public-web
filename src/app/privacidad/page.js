export const metadata = {
  title: "Política de Privacidad | Rosario Graphics",
  description: "Política de privacidad de Rosario Graphics. Conoce cómo manejamos tus datos personales en Santo Domingo, República Dominicana.",
  alternates: {
    canonical: "https://www.rosariographics.com/privacidad",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://www.rosariographics.com/privacidad",
    title: "Política de Privacidad | Rosario Graphics",
    description: "Conoce cómo manejamos tus datos personales en Rosario Graphics.",
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
    title: "Política de Privacidad | Rosario Graphics",
    images: ["https://www.rosariographics.com/images/local.webp"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.rosariographics.com/" },
    { "@type": "ListItem", "position": 2, "name": "Privacidad", "item": "https://www.rosariographics.com/privacidad" },
  ],
};

export default function PrivacidadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-[#0b0f19] py-20 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold">Política de Privacidad</h1>
            <p className="text-gray-400 mt-3">En Rosario Graphics respetamos y protegemos tu privacidad</p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Responsable del Tratamiento</h2>
              <p className="text-gray-300 mb-4">Rosario Graphics, con sede en Santo Domingo, República Dominicana, es responsable del tratamiento de tus datos personales.</p>
              <ul className="space-y-2 text-gray-300">
                <li><strong>Teléfono:</strong> +1 809 422 6527</li>
                <li><strong>Email:</strong> ventas@rosariographics.com</li>
                <li><strong>Sitio web:</strong> www.rosariographics.com</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">2. Datos que Recopilamos</h2>
              <p className="text-gray-300 mb-4">Recopilamos los siguientes datos cuando utilizas nuestro formulario de contacto:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono (WhatsApp)</li>
                <li>Ciudad o sector de interés</li>
                <li>Tipo de servicio solicitado</li>
                <li>Mensaje o comentarios adicionales</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">3. Finalidad del Tratamiento</h2>
              <p className="text-gray-300 mb-4">Utilizamos tus datos exclusivamente para:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Responder a tu solicitud de cotización</li>
                <li>Contactarte vía WhatsApp o email</li>
                <li>Enviar información sobre nuestros servicios</li>
                <li>Mejorar nuestra atención al cliente</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">4. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-300 mb-4">Nuestro sitio web utiliza las siguientes cookies:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio</li>
                <li><strong>Google Analytics:</strong> Para analizar estadísticas de navegación</li>
                <li><strong>Cloudflare Turnstile:</strong> Para verificar que eres humano (no almacenan datos personales)</li>
                <li><strong>Google Tag Manager:</strong> Para gestión de analíticas</li>
              </ul>
              <p className="text-gray-300 mt-4">Puedes desactivar las cookies en la configuración de tu navegador.</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">5. Base Legal</h2>
              <p className="text-gray-300">El tratamiento de tus datos se basa en tu consentimiento explícito al enviar nuestro formulario de contacto. Al marcar el checkbox de aceptación, aceptas expresamente esta política de privacidad.</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">6. Destinatarios</h2>
              <p className="text-gray-300 mb-4">Tus datos no serán vendidos ni compartidos con terceros, excepto:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Proveedores de servicios técnicos (hosting, email)</li>
                <li>Google LLC (Analytics, Tag Manager)</li>
                <li>Cloudflare Inc. (seguridad del sitio)</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">7. Tus Derechos</h2>
              <p className="text-gray-300 mb-4">Tienes derecho a:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos incorrectos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al tratamiento de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
              <p className="text-gray-300 mt-4">Para ejercer estos derechos, contáctanos vía email a <a href="mailto:ventas@rosariographics.com" className="text-red-400 hover:text-red-300">ventas@rosariographics.com</a></p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">8. Seguridad</h2>
              <p className="text-gray-300 mb-4">Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Conexión segura HTTPS/SSL</li>
                <li>Validación de seguridad Cloudflare Turnstile</li>
                <li>Almacenamiento seguro de datos</li>
                <li>Acceso restringido a información personal</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">9. Menores de Edad</h2>
              <p className="text-gray-300">Nuestro sitio web no está dirigido a menores de edad. No recopilamos intencionadamente datos de personas menores de 18 años.</p>
            </div>

            <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4">10. Cambios en esta Política</h2>
              <p className="text-gray-300">Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor desde su publicación en esta página.</p>
            </div>

            <div className="text-center pt-8 border-t border-gray-800 text-gray-400 text-sm space-y-1">
              <p>Última actualización: 23 de febrero de 2026</p>
              <p>© 2026 Rosario Graphics. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
