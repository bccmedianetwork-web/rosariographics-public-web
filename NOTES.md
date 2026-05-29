# Rosario Graphics — Notas de Sesión

## Stack
Next.js 16.2.6 · Tailwind CSS v4 · Supabase · nodemailer/SES SMTP · Meta CAPI · Cloudflare Turnstile

## Arquitectura
Landing page + lead capture. Sin WhatsApp API, CRM admin, cron, ni tracking endpoint.

## Lo Último que Hicimos

### CSP — next.config.mjs
- `script-src`: GTM, Turnstile, FB, GA, `googleads.g.doubleclick.net`, `www.googleadservices.com`, `unsafe-inline`, `unsafe-eval`
- `img-src`: GTM, FB, LinkedIn, `www.google.com`, `www.google.com.do`, `*.google.com.do`, `www.googleadservices.com`, `googleads.g.doubleclick.net`
- `connect-src`: Turnstile, FB Graph, `www.google.com`, `www.google.com.do`, `*.google.com.do`, `www.googleadservices.com`, `analytics.google.com`, `googleads.g.doubleclick.net`, `stats.g.doubleclick.net`, GTM
- `frame-src`: GTM, Turnstile
- `trusted-types`: NO tocado (es del Tag Assistant de Chrome, no afecta producción)

### Validación de Orígenes — quote + capi routes
- `STATIC_ORIGINS` reemplazó a `ALLOWED_ORIGINS`
- Función `isOriginAllowed(origin)` en runtime (fuera del POST)
  - `origin.endsWith(".vercel.app")` → permite cualquier preview
  - `process.env.VERCEL_URL` y `process.env.NEXT_PUBLIC_SITE_URL` evaluados en runtime
  - `!origin` → permite (peticiones server-to-server)
- Dentro del POST se llama con `request.headers.get("origin")`

### CotizarButton en /nosotros
- Botón "Solicitar Cotización" en /nosotros ahora usa `<CotizarButton>` que dispara ContactModal
- Mismo patrón que la home page.js (Server Component + CotizarButton client component)

### Navbar — Chat por WhatsApp
- Desktop: link "Chat" con ícono WhatsApp, al lado de Cotización Gratis
- Mobile: botón verde "Chat con Ventas" antes de Cotización Gratis
- Ambos a `https://wa.me/18094226527`

### Archivos Eliminados (cleanup fase 2)
- `src/lib/whatsapp.js`, `src/app/api/webhooks/whatsapp/route.js`
- `src/app/api/cron/process-automations/route.js`
- `src/app/api/track/route.js`
- `src/components/WasaBtn.jsx`
- `src/app/admin/` (6 archivos)
- `supabase-schema-fase2.sql`, `api/webhooks/`, `api/cron/`

### Archivos Creados
- `src/lib/mailer.js` — nodemailer + SMTP (port 587, STARTTLS)
- `src/components/ModalContext.jsx` — React context para modal
- `src/components/CotizarButton.jsx` — client button que usa useModal

### Repositorio
- Git remote: `origin` → `https://github.com/bccmedianetwork-web/rosariographics-public-web.git`
- Rama: `main`
- Vercel CI/CD conectado: push a main → deploy automático

## Variables de Entorno (`.env.local` — no commitear)

| Variable | Descripción |
|----------|-------------|
| SUPABASE_URL | `https://uhjjhsqnieledktneooz.supabase.co` |
| SUPABASE_SERVICE_KEY | service_role key |
| SMTP_HOST | `email-smtp.us-east-1.amazonaws.com` |
| SMTP_PORT | `587` |
| SMTP_USER | IAM Access Key |
| SMTP_PASS | SES SMTP password (derivado de IAM Secret v4 signing) |
| SMTP_FROM | `ventas@rosariographics.com` |
| SMTP_FROM_NAME | `Rosario Graphics` |
| CONTACT_EMAIL | `ventas@rosariographics.com` |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | Cloudflare Turnstile site key |
| TURNSTILE_SECRET_KEY | Cloudflare Turnstile secret key |
| META_CAPI_PIXEL_ID | `772542905442419` |
| META_CAPI_ACCESS_TOKEN | Meta Conversions API token |

## Pendiente
- [ ] Ejecutar `supabase-schema.sql` en Supabase SQL Editor (crea tabla `leads`)
- [ ] Verificar DKIM/SPF en SES para `ventas@rosariographics.com`
- [ ] Salir del sandbox de SES si es cuenta nueva
- [ ] Probar form submit real → email + Meta CAPI
- [ ] Deploy a producción con dominio real `rosariographics.com`

## Posibles Issues Conocidos
- Rate limiter in-memory (Map) — no funciona globalmente en serverless Vercel; migrar a Upstash/Vercel KV si escala
- `crypto.subtle.digest` en capi route — funciona en Node 18+ pero requiere `globalThis.crypto`
