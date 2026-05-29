/**
 * HTML template for the internal notification email sent to sales team.
 *
 * Responsive layout, dense data table for quick scanning.
 */

const LOGO_URL = "https://www.rosariographics.com/images/icon-web1-64.png";

export function internalNotificationHtml({
  name, email, phone, service, ciudad, comentarios, sourcePage,
  leadNumber, isDuplicate,
  leadCategory, leadChannel, leadScore,
  utmSource, utmMedium, utmCampaign,
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Lead - ${name}</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f4; font-family: -apple-system, 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 24px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #dc2626, #991b1b); padding: 24px; text-align: center; }
    .header img { width: 48px; height: 48px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); margin-bottom: 8px; }
    .header h1 { color: #fff; font-size: 20px; margin: 0; font-weight: 700; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    .badge-new { background: #dcfce7; color: #166534; }
    .badge-dup { background: #fef3c7; color: #92400e; }
    .body { padding: 24px; }
    .lead-ref { font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px; }
    table.data { width: 100%; border-collapse: collapse; margin: 16px 0; }
    table.data td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; vertical-align: top; }
    table.data td:first-child { font-weight: 600; color: #374151; width: 120px; white-space: nowrap; }
    table.data td:last-child { color: #111827; word-break: break-word; }
    .chip { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; margin: 1px; }
    .chip-cat { background: #dbeafe; color: #1e40af; }
    .chip-channel { background: #ede9fe; color: #5b21b6; }
    .chip-score { background: #fef3c7; color: #92400e; }
    .footer { background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    @media only screen and (max-width: 480px) {
      .body { padding: 16px; }
      table.data td { display: block; width: auto; padding: 4px 8px; }
      table.data td:first-child { padding-top: 10px; }
    }
  </style>
</head>
<body>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr><td align="center" style="padding: 16px;">
      <div class="container">

        <div class="header">
          <img src="${LOGO_URL}" alt="RG" width="48" height="48">
          <h1>Nuevo Lead</h1>
          ${isDuplicate
            ? '<span class="badge badge-dup">⚠ DUPLICADO</span>'
            : '<span class="badge badge-new">● NUEVO</span>'}
        </div>

        <div class="body">
          <p class="lead-ref">${leadNumber ? `Lead #${leadNumber}` : "Lead (sin ref)"}</p>

          <table class="data" role="presentation">
            <tr><td>Nombre</td><td>${name}</td></tr>
            <tr><td>Email</td><td>${email}</td></tr>
            <tr><td>Teléfono</td><td><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td>Servicio</td><td>${service}</td></tr>
            <tr><td>Ciudad</td><td>${ciudad || "—"}</td></tr>
            <tr><td>Comentarios</td><td>${comentarios || "—"}</td></tr>
            <tr><td>Origen</td><td>${sourcePage || "WEB DIRECTA"}</td></tr>
            <tr><td>Clasificación</td><td>
              <span class="chip chip-cat">${leadCategory || "general"}</span>
              <span class="chip chip-channel">${leadChannel || "direct"}</span>
              <span class="chip chip-score">score: ${leadScore || 0}</span>
            </td></tr>
            ${utmSource ? `<tr><td>UTM Source</td><td>${utmSource}${utmMedium ? ` / ${utmMedium}` : ""}${utmCampaign ? ` / ${utmCampaign}` : ""}</td></tr>` : ""}
            ${isDuplicate ? '<tr><td colspan="2" style="color:#92400e;font-weight:600;">⚠ Mismo email + servicio en &lt;24h — lead no duplicado en BD</td></tr>' : ""}
          </table>
        </div>

        <div class="footer">
          <p>Rosario Graphics · Sistema de Captación · ${new Date().toISOString().split("T")[0].replace(/-/g, "/")}</p>
        </div>

      </div>
    </td></tr>
  </table>
</body>
</html>`;
}
