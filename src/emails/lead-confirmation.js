/**
 * HTML template for the automatic confirmation email sent to the lead.
 *
 * Responsive layout, max-width 600px, works across major email clients.
 */

const LOGO_URL = "https://www.rosariographics.com/images/icon-web1-64.png";

export function leadConfirmationHtml({ name, service }) {
  const safeName = name || "cliente";
  const safeService = service || "cotización";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Recibimos tu solicitud</title>
  <style>
    .email-body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }
    .email-header {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      padding: 32px 24px;
      text-align: center;
    }
    .email-header img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.3);
      margin-bottom: 12px;
    }
    .email-header h1 {
      color: #ffffff;
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .email-body-content {
      padding: 32px 24px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body-content h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 16px;
      color: #111827;
    }
    .email-body-content p {
      margin: 0 0 16px;
      font-size: 15px;
      color: #4b5563;
    }
    .info-card {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin: 20px 0;
    }
    .info-card p {
      margin: 0 0 4px;
      font-size: 14px;
    }
    .info-card strong {
      color: #111827;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background-color: #25d366;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      margin: 8px 0;
    }
    .btn:hover {
      background-color: #1ebe5e;
    }
    .email-footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .email-footer p {
      margin: 4px 0;
      font-size: 12px;
      color: #9ca3af;
    }
    .social-links {
      margin: 12px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      font-size: 13px;
      color: #dc2626;
      text-decoration: none;
      font-weight: 500;
    }
    .social-links a:hover {
      text-decoration: underline;
    }
    @media only screen and (max-width: 480px) {
      .email-body-content { padding: 24px 16px; }
      .email-header { padding: 24px 16px; }
      .email-header h1 { font-size: 18px; }
    }
  </style>
</head>
<body class="email-body">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <div class="email-container">

          <!-- HEADER -->
          <div class="email-header">
            <img src="${LOGO_URL}" alt="Rosario Graphics" width="56" height="56">
            <h1>¡Solicitud Recibida!</h1>
          </div>

          <!-- BODY -->
          <div class="email-body-content">
            <h2>Gracias por contactarnos, ${safeName}</h2>

            <p>
              Hemos recibido tu solicitud de <strong>${safeService}</strong> exitosamente.
              Nuestro equipo está revisando los detalles y te contactará en menos de
              <strong>4 horas</strong> para brindarte una cotización personalizada.
            </p>

            <div class="info-card">
              <p><strong>Servicio solicitado:</strong> ${safeService}</p>
              <p><strong>Tiempo de respuesta:</strong> Menos de 4 horas</p>
            </div>

            <p>
              Si necesitas atención inmediata, puedes llamarnos o escribirnos al
              <strong> +1 809-422-6527</strong>.
            </p>

            <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
              Si no realizaste esta solicitud, por favor ignora este mensaje.
            </p>
          </div>

          <!-- FOOTER -->
          <div class="email-footer">
            <p style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px;">Rosario Graphics</p>
            <p>Santo Domingo, República Dominicana</p>
            <div class="social-links">
              <a href="https://facebook.com/rosariographic" target="_blank">Facebook</a>
              <a href="https://instagram.com/rosariographic" target="_blank">Instagram</a>
              <a href="https://www.rosariographics.com" target="_blank">Sitio Web</a>
            </div>
            <p>© ${new Date().getFullYear()} Rosario Graphics. Todos los derechos reservados.</p>
          </div>

        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
