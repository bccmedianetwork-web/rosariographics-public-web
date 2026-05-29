import nodemailer from "nodemailer";
import { log } from "@/lib/logger";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const isDev = !host || !user || !pass;

  if (isDev) {
    log.info("Mailer: SMTP no configurado — modo dev", { host, port, user: !!user });
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
}

async function sendWithRetry(transporter, mailOptions, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      if (attempt === retries) throw error;
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
      log.warn("Mailer: reintentando envío", { attempt, retries, delay, error: error.message });
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  const transporter = getTransporter();

  if (!transporter) {
    log.info("Mailer [DEV]: Email no enviado", { to, subject, htmlLength: html?.length || 0 });
    return { success: true, dev: true };
  }

  try {
    const info = await sendWithRetry(transporter, {
      from: `"${process.env.SMTP_FROM_NAME || "Rosario Graphics"}" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html,
      replyTo,
    });

    log.info("Mailer: Email enviado OK", {
      to,
      subject,
      messageId: info.messageId,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    log.error("Mailer: Error al enviar email tras reintentos", {
      to,
      subject,
      error: error.message,
      code: error.code,
    });

    return { success: false, error: error.message };
  }
}
