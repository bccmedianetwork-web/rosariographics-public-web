"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { generateEventId } from "@/lib/events";
import { useTracking } from "./TrackingProvider";

const SERVICE_OPTIONS = [
  { value: "Letreros 3D", label: "Letreros Corpóreos 3D" },
  { value: "Fachada ACM", label: "Fachada en ACM" },
  { value: "Caja de Luz", label: "Caja de Luz LED" },
  { value: "Rotulacion Vehicular", label: "Rotulación en Vinil/Vehicular" },
  { value: "Otro", label: "Otro / Cotización General" },
];

const NAME_RE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,100}$/;
const PHONE_RE = /^[\d\s\-+()]{6,20}$/;

export default function ContactModal({ isOpen, onClose }) {
  const tracking = useTracking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tipo_letrero: "",
    ciudad: "",
    comentarios: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const formOpenTimeRef = useRef(null);

  const isValid = useMemo(() => {
    const nameOk = NAME_RE.test(formData.name.trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneOk = PHONE_RE.test(formData.phone.trim());
    const serviceOk = formData.tipo_letrero !== "";
    return nameOk && emailOk && phoneOk && serviceOk;
  }, [formData]);

  const turnstileRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    formOpenTimeRef.current = Date.now();
    document.body.style.overflow = "hidden";

    const container = turnstileRef.current;

    function renderWidget() {
      if (window.turnstile && container) {
        window.turnstile.render(container, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: "dark",
        });
      }
    }

    const existingScript = document.getElementById("cf-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.id = "cf-turnstile-script";
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      renderWidget();
    }

    return () => {
      document.body.style.overflow = "";
      if (window.turnstile && container) {
        window.turnstile.remove(container);
      }
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (value.trim().length < 2) return "Mínimo 2 caracteres";
        if (!NAME_RE.test(value.trim())) return "Solo letras, espacios, apóstrofes y guiones";
        break;
      }
      case "email": {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
        break;
      }
      case "phone": {
        if (value.trim().length < 6) return "Mínimo 6 dígitos";
        if (!PHONE_RE.test(value.trim())) return "Solo dígitos, +, -, espacios y paréntesis";
        break;
      }
    }
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    if (err) {
      setFieldErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const errors = {};
    for (const field of ["name", "email", "phone"]) {
      const err = validateField(field, formData[field]);
      if (err) errors[field] = err;
    }
    if (!formData.tipo_letrero) errors.tipo_letrero = "Selecciona un servicio";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const formEventId = generateEventId("form");
    const turnstileToken = document.querySelector('input[name="cf-turnstile-response"]')?.value || "";

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: "form_lead_conversion", event_id: formEventId });
    }

    try {
      const submitTime = Date.now();
      const sourcePage =
        typeof window !== "undefined"
          ? window.location.pathname === "/"
            ? "HOME"
            : window.location.pathname.slice(1).toUpperCase().replace(/\//g, "_") || "HOME"
          : "WEB DIRECTA";

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source_page: sourcePage,
          event_id: formEventId,
          turnstileToken,
          form_open_time: formOpenTimeRef.current,
          form_submit_time: submitTime,
          ...tracking,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setStatus({
          type: "success",
          message: result.duplicate
            ? "Ya recibimos tu solicitud anteriormente. Te contactaremos pronto."
            : "¡Solicitud enviada! Te contactaremos en menos de 4 horas.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          tipo_letrero: "",
          ciudad: "",
          comentarios: "",
        });
        setFieldErrors({});
      } else {
        const errBody = await res.json().catch(() => ({}));
        setStatus({
          type: "error",
          message: errBody.error || "Ocurrió un error. Por favor intenta nuevamente.",
        });
      }
    } catch {
      setStatus({ type: "error", message: "Error de conexión. Intenta más tarde." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />
        <div className="inline-block align-bottom bg-neutral-900 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-red-700/50 relative">
          <div className="bg-neutral-900 px-6 py-8 sm:p-8">
            <div className="sm:flex sm:items-start w-full mb-6">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-600 sm:mx-0 sm:h-10 sm:w-10 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0l2 2m0-2h2m-6-6h6m2 0h-6" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-2xl leading-6 font-extrabold text-white uppercase">Cotización Rápida</h3>
                <p className="text-sm text-gray-400 mt-2">Déjanos tus datos y nos pondremos en contacto en menos de 4 horas.</p>
              </div>
            </div>

            {status.message && (
              <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${status.type === "success" ? "bg-green-900/50 text-green-300 border border-green-700" : "bg-red-900/50 text-red-300 border border-red-700"}`}>
                {status.message}
              </div>
            )}

            <form className="space-y-4 mt-4" onSubmit={handleSubmit} noValidate>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                <input
                  type="text" name="name" id="name" required
                  value={formData.name} onChange={handleChange} onBlur={handleBlur}
                  maxLength={100}
                  className={`mt-1 block w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white outline-none transition ${
                    fieldErrors.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 focus:ring-red-500 focus:border-red-500"
                  }`}
                  placeholder="Tu nombre o empresa"
                />
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Profesional</label>
                <input
                  type="email" name="email" id="email" required
                  value={formData.email} onChange={handleChange} onBlur={handleBlur}
                  maxLength={255}
                  className={`mt-1 block w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white outline-none transition ${
                    fieldErrors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 focus:ring-red-500 focus:border-red-500"
                  }`}
                  placeholder="ejemplo@negocio.com"
                />
                {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Teléfono (WhatsApp)</label>
                <input
                  type="tel" name="phone" id="phone" required
                  value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                  maxLength={20}
                  className={`mt-1 block w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white outline-none transition ${
                    fieldErrors.phone ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 focus:ring-red-500 focus:border-red-500"
                  }`}
                  placeholder="+1 809 555 1234"
                />
                {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>

              <div>
                <label htmlFor="tipo_letrero" className="block text-sm font-medium text-gray-300">Tipo de Servicio</label>
                <select name="tipo_letrero" id="tipo_letrero" required value={formData.tipo_letrero} onChange={handleChange}
                  className={`mt-1 block w-full px-4 py-3 bg-neutral-800 border rounded-lg text-white outline-none transition ${
                    fieldErrors.tipo_letrero ? "border-red-500 ring-1 ring-red-500" : "border-gray-700 focus:ring-red-500 focus:border-red-500"
                  }`}
                >
                  <option value="" disabled>Selecciona un servicio...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {fieldErrors.tipo_letrero && <p className="text-red-400 text-xs mt-1">{fieldErrors.tipo_letrero}</p>}
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-300">Ciudad / Sector</label>
                <input type="text" name="ciudad" id="ciudad" value={formData.ciudad} onChange={handleChange} maxLength={100}
                  className="mt-1 block w-full px-4 py-3 bg-neutral-800 border border-gray-700 rounded-lg text-white outline-none focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="Ej: Santo Domingo, Santiago..."
                />
              </div>

              <div>
                <label htmlFor="comentarios" className="block text-sm font-medium text-gray-300">Detalles (Opcional)</label>
                <textarea name="comentarios" id="comentarios" rows={3} maxLength={1000} value={formData.comentarios} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 bg-neutral-800 border border-gray-700 rounded-lg text-white outline-none resize-none focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="Medidas, ubicación, etc."
                />
              </div>

              <div ref={turnstileRef} />

              <div className="pt-4 flex flex-col gap-3">
                <button type="submit" disabled={loading || !isValid}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-red-700/40 uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? "Enviando..." : "Enviar Solicitud"}
                </button>
                <button type="button" onClick={onClose}
                  className="w-full py-3 bg-transparent text-gray-400 hover:text-white font-medium text-sm transition-all"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
