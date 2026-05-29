# Environment Variables Checklist — Rosario Graphics (public-web)

Copia estas variables al panel de Vercel (Settings → Environment Variables).
Las marcadas con `*` son **obligatorias** para el funcionamiento básico.

---

## 📧 SMTP / AWS SES (Email transaccional)

| Variable | Estado | Dónde obtenerlo |
|----------|--------|-----------------|
| `SMTP_HOST`* | `email-smtp.us-east-1.amazonaws.com` | Fijo para SES región us-east-1 |
| `SMTP_PORT`* | `587` | STARTTLS |
| `SMTP_USER`* | `AKIA...` | AWS IAM → Access Key ID (o SMTP credentials de SES Console) |
| `SMTP_PASS`* | — | Derivado del Secret Access Key (o SMTP credentials de SES Console) |
| `SMTP_FROM`* | `ventas@rosariographics.com` | Debe estar verificado en SES → Verified identities |
| `SMTP_FROM_NAME` | `Rosario Graphics` | Nombre visible del remitente |

> Antes de producción: verifica el dominio en SES, configura DKIM/SPF (ver `docs/AWS_SES_DNS_SETUP.md`),
> y solicita salir del sandbox si estás en cuenta nueva.

---

## 🗄️ Supabase (Base de datos)

| Variable | Estado | Dónde obtenerlo |
|----------|--------|-----------------|
| `SUPABASE_URL`* | `https://uhjjhsqnieledktneooz.supabase.co` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_KEY`* | `sb_secret_...` | Supabase Dashboard → Project Settings → API → service_role key |

> Ejecuta `supabase-schema.sql` en SQL Editor antes de usar el formulario.

---

## 🛡️ Cloudflare Turnstile (Anti-bot)

| Variable | Ejemplo | Dónde obtenerlo |
|----------|---------|-----------------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`* | `0x4AAAAAACZyCzieLizMr5uQ` | Cloudflare Dashboard → Turnstile → Site Key |
| `TURNSTILE_SECRET_KEY`* | `0x4AAAAAACZyC5H5Pcun52uK2xTW21muhCs` | Cloudflare Dashboard → Turnstile → Secret Key |

---

## 📊 Meta CAPI (Conversions API — opcional)

| Variable | Estado | Dónde obtenerlo |
|----------|--------|-----------------|
| `META_CAPI_PIXEL_ID` | `772542905442419` | Meta Events Manager → Pixel → Settings → Pixel ID |
| `META_CAPI_ACCESS_TOKEN` | `EAAd...` | Meta Events Manager → Pixel → Settings → Conversions API → Access Token |

---

## 📬 Contacto

| Variable | Estado |
|----------|--------|
| `CONTACT_EMAIL`* | `ventas@rosariographics.com` — destino de notificaciones internas |

---

## Resumen rápido — Las 10 obligatorias

```env
# SMTP / AWS SES
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=<IAM_ACCESS_KEY_ID>
SMTP_PASS=<SMTP_PASSWORD_DERIVED>
SMTP_FROM=ventas@rosariographics.com
SMTP_FROM_NAME=Rosario Graphics

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=<service_role_key>

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAA...
TURNSTILE_SECRET_KEY=0x4AAAA...

# Contacto
CONTACT_EMAIL=ventas@rosariographics.com

# Meta CAPI (opcional)
META_CAPI_PIXEL_ID=<pixel_id>
META_CAPI_ACCESS_TOKEN=<access_token>
```

---

## ✅ Orden de llenado en Vercel

| Paso | Variables |
|------|-----------|
| 1 | `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` |
| 2 | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` |
| 3 | `SMTP_*` (6 vars) + `CONTACT_EMAIL` |
| 4 | `META_CAPI_*` (opcional) |
