/**
 * HTML template for Touchpoint 3 — Garantías y manejo de objeciones.
 */

const LOGO_URL = "https://www.rosariographics.com/images/icon-web1-64.png";

export function garantiasHtml({ name }) {
  const safeName = name || "cliente";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Garantías — Rosario Graphics</title>
  <style>
    body { margin:0; padding:0; background:#f4f4f4; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; }
    .container { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
    .header { background:linear-gradient(135deg,#dc2626,#991b1b); padding:32px 24px; text-align:center; }
    .header img { width:56px; height:56px; border-radius:50%; border:3px solid rgba(255,255,255,0.3); margin-bottom:12px; }
    .header h1 { color:#fff; font-size:22px; font-weight:700; margin:0; }
    .body { padding:32px 24px; color:#333; line-height:1.6; }
    .body h2 { font-size:20px; font-weight:600; margin:0 0 16px; color:#111827; }
    .body p { margin:0 0 16px; font-size:15px; color:#4b5563; }
    .guarantee-grid { margin:20px 0; }
    .guarantee-item { background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin-bottom:12px; }
    .guarantee-item h3 { font-size:16px; font-weight:600; color:#111827; margin:0 0 4px; }
    .guarantee-item p { font-size:14px; color:#4b5563; margin:0; }
    .guarantee-item .icon { display:inline-block; margin-right:8px; font-size:18px; }
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
        <h1>Su inversión está protegida</h1>
      </div>
      <div class="body">
        <h2>${safeName}, queremos que tomes la mejor decisión con total confianza</h2>
        <p>Sabemos que invertir en la imagen de tu negocio es una decisión importante. Por eso respaldamos cada proyecto con garantías reales.</p>

        <div class="guarantee-grid">
          <div class="guarantee-item">
            <h3><span class="icon">🛡️</span>Garantía de 3 años</h3>
            <p>Todos nuestros letreros 3D y fachadas en ACM incluyen garantía contra defectos de fabricación e instalación. Sin sorpresas.</p>
          </div>
          <div class="guarantee-item">
            <h3><span class="icon">📐</span>Sin cargo por diseño</h3>
            <p>El diseño y la propuesta visual inicial son completamente gratuitos. Solo pagas cuando apruebes y estés 100% satisfecho.</p>
          </div>
          <div class="guarantee-item">
            <h3><span class="icon">🚚</span>Instalación profesional incluida</h3>
            <p>Nuestro equipo capacitado instala todo el proyecto llave en mano. No tienes que preocuparte por nada.</p>
          </div>
          <div class="guarantee-item">
            <h3><span class="icon">📞</span>Soporte post-venta directo</h3>
            <p>Después de la instalación, tienes acceso directo a nuestro equipo de soporte por WhatsApp para cualquier consulta o ajuste.</p>
          </div>
        </div>

        <p style="text-align:center; margin-top:24px;">
          <a href="https://wa.me/18094226527?text=Hola%2C%20quiero%20agendar%20una%20cotizaci%C3%B3n%20sin%20compromiso" class="btn">Agendar mi cotización sin compromiso</a>
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
