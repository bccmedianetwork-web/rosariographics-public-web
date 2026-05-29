# AWS SES — Configuración de DNS

Este documento describe los registros DNS que debes agregar en tu proveedor
de DNS (GoDaddy, Cloudflare, HostGator, etc.) para habilitar Amazon SES con
el dominio `rosariographics.com`.

---

## 1. Verificar el dominio en SES

1. Ve a AWS Console → SES → Configuration → Domains → Verify a Domain
2. Ingresa `rosariographics.com`
3. Marca **Generate DKIM settings** (keep 2048-bit)
4. AWS te mostrará 3 registros CNAME + 1 TXT

Agrega los siguientes registros en tu DNS:

### Registro TXT para verificación de dominio

```
Tipo: TXT
Nombre: _amazonses.rosariographics.com
Valor: "XXXXXXXXXXXX" (te lo da AWS)
TTL: 3600
```

### 3 registros CNAME para DKIM

```
Tipo: CNAME
Nombre: xxxxx._domainkey.rosariographics.com
Valor: xxxxx.dkim.amazonses.com
TTL: 3600
```

```
Tipo: CNAME
Nombre: xxxxx._domainkey.rosariographics.com
Valor: xxxxx.dkim.amazonses.com
TTL: 3600
```

```
Tipo: CNAME
Nombre: xxxxx._domainkey.rosariographics.com
Valor: xxxxx.dkim.amazonses.com
TTL: 3600
```

> Los valores exactos de `xxxxx` los genera SES al verificar el dominio.

---

## 2. SPF — Autorizar a SES para enviar como `rosariographics.com`

Agrega o modifica el registro SPF existente:

```
Tipo: TXT
Nombre: rosariographics.com
Valor: "v=spf1 include:amazonses.com ~all"
TTL: 3600
```

Si ya tienes un registro SPF (ej. de Zoho), **no lo reemplaces**, solo
agrega `include:amazonses.com`. Ejemplo con Zoho + SES:

```
"v=spf1 include:zoho.com include:amazonses.com ~all"
```

---

## 3. Verificar el correo `info@rosariographics.com` (o el que uses como FROM)

SES requiere verificar cada dirección FROM, a menos que todo el dominio
esté verificado (paso 1). Si el dominio está verificado, cualquier
dirección `@rosariographics.com` es válida automáticamente.

---

## 4. MAIL FROM domain (opcional pero recomendado)

Configurar un subdominio de rebote mejora la entregabilidad.

1. En SES → Configuration → Domains → `rosariographics.com` → Set MAIL FROM
2. Subdominio sugerido: `bounce.rosariographics.com`
3. AWS te dará un valor MX. Agrega:

```
Tipo: MX
Nombre: bounce.rosariographics.com
Valor: feedback-smtp.us-east-1.amazonses.com
TTL: 3600
```

Y un registro TXT:

```
Tipo: TXT
Nombre: bounce.rosariographics.com
Valor: "v=spf1 include:amazonses.com ~all"
TTL: 3600
```

---

## 5. Salir del Sandbox

Por defecto, SES solo puede enviar a emails verificados manualmente.
Para enviar al público general, solicita producción:

1. AWS Console → SES → Dashboard → Request Production Access
2. Completa el formulario justificando el caso de uso (transaccional)
3. La aprobación toma de 1 a 24 horas hábiles

---

## 6. Verificación rápida

Una vez configurado, puedes probar manualmente:

```bash
# Usando AWS CLI:
aws ses send-email \
  --region us-east-1 \
  --from "Rosario Graphics <info@rosariographics.com>" \
  --destination "ToAddresses=tu-correo@example.com" \
  --message "Subject={Data=Prueba SES,Charset=UTF-8},Body={Html={Data=<h1>¡Funciona!</h1>,Charset=UTF-8}}"
```

O desde la app en modo dev: los correos se loguean sin enviar realmente
(mientras `AWS_ACCESS_KEY_ID` esté vacío en `.env.local`).

---

## Resumen de registros necesarios

| Tipo | Nombre | Valor | Obligatorio |
|------|--------|-------|-------------|
| TXT | `_amazonses.rosariographics.com` | (de AWS) | ✅ Sí |
| CNAME | `xxxxx._domainkey.rosariographics.com` | `xxxxx.dkim.amazonses.com` ×3 | ✅ Sí |
| TXT | `rosariographics.com` | `v=spf1 include:amazonses.com ~all` | ✅ Sí |
| MX | `bounce.rosariographics.com` | `feedback-smtp.us-east-1.amazonses.com` | ⬜ Opcional |
| TXT | `bounce.rosariographics.com` | `v=spf1 include:amazonses.com ~all` | ⬜ Opcional |
