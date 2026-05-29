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

export async function sendEmail({ to, subject, text, html, replyTo }) {
  const transporter = getTransporter();

  if (!transporter) {
    log.info("Mailer [DEV]: Email no enviado", { to, subject, htmlLength: html?.length || 0 });
    return { success: true, dev: true };
  }

  try {
    const info = await transporter.sendMail({
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
    log.error("Mailer: Error al enviar email", {
      to,
      subject,
      error: error.message,
      code: error.code,
    });

    return { success: false, error: error.message };
  }
}
