/**
 * HTML template for Touchpoint 2 — Casos de éxito y testimonios.
 */

const LOGO_URL = "https://www.rosariographics.com/images/icon-web1-64.png";

export function testimoniosHtml({ name }) {
  const safeName = name || "cliente";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Casos de éxito — Rosario Graphics</title>
  <style>
    body { margin:0; padding:0; background:#f4f4f4; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; }
    .container { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
    .header { background:linear-gradient(135deg,#dc2626,#991b1b); padding:32px 24px; text-align:center; }
    .header img { width:56px; height:56px; border-radius:50%; border:3px solid rgba(255,255,255,0.3); margin-bottom:12px; }
    .header h1 { color:#fff; font-size:22px; font-weight:700; margin:0; }
    .body { padding:32px 24px; color:#333; line-height:1.6; }
    .body h2 { font-size:20px; font-weight:600; margin:0 0 16px; color:#111827; }
    .body p { margin:0 0 16px; font-size:15px; color:#4b5563; }
    .testimonial { background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin:20px 0; }
    .testimonial p { font-size:14px; font-style:italic; color:#374151; margin:0 0 8px; }
    .testimonial .author { font-size:13px; font-weight:600; color:#111827; font-style:normal; }
    .highlight { display:inline-block; background:#fef3c7; color:#92400e; padding:2px 10px; border-radius:12px; font-size:13px; font-weight:500; margin:2px; }
    .btn { display:inline-block; padding:12px 28px; background-color:#25d366; color:#fff !important; text-decoration:none; border-radius:8px; font-weight:600; font-size:15px; }
    .footer { background:#f9fafb; padding:24px; text-align:center; border-top:1px solid #e5e7eb; }
    .footer p { margin:4px 0; font-size:12px; color:#9ca3af; }
    @media only screen and (max-width:480px) { .body { padding:24px 16px; } .header { padding:24px 16px; } }
  </style>
</head>
<body>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding:24px 16px;">
    <div class="container">
      <div class="header">
        <img src="${LOGO_URL}" alt="Rosario Graphics" width="56" height="56">
        <h1>Casos de Éxito</h1>
      </div>
      <div class="body">
        <h2>${safeName}, esto es lo que logran nuestros clientes</h2>
        <p>Nos enorgullece compartir resultados reales de negocios que confiaron en nosotros para transformar su imagen.</p>

        <div class="testimonial">
          <p>"Contratamos una fachada en ACM con Rosario Graphics. Nuestras ventas aumentaron un 40% en los primeros 3 meses. La calidad del acabado es impresionante."</p>
          <p class="author">— Carlos M., Clínica Dental, Santo Domingo</p>
        </div>

        <div class="testimonial">
          <p>"El letrero 3D que instalaron nos dio una presencia increíble en la avenida. Todos los días recibimos clientes que nos encontraron por el letrero."</p>
          <p class="author">— Laura G., Restaurante, Santiago</p>
        </div>

        <p style="margin-top:24px;">¿Listo para ser el próximo caso de éxito?</p>
        <p style="text-align:center;">
          <a href="https://wa.me/18094226527?text=Hola%2C%20vi%20los%20testimonios%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n" class="btn">Quiero resultados como estos</a>
        </p>
      </div>
      <div class="footer">
        <p style="font-weight:600;color:#374151;">Rosario Graphics</p>
        <p>Santo Domingo, República Dominicana</p>
        <p>© ${new Date().getFullYear()} Rosario Graphics. Todos los derechos reservados.</p>
      </div>
    </div>
  </td></tr></table>
</body>
</html>`;
}
