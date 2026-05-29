-- ============================================================================
-- Supabase Schema: Rosario Graphics — Fase 1: Captación y Atribución
-- ============================================================================
-- Ejecutar en SQL Editor de Supabase (Dashboard → SQL Editor)
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: leads
-- ============================================================================
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_number     SERIAL UNIQUE,

  -- Contacto
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  service         TEXT NOT NULL,
  ciudad          TEXT,
  comentarios     TEXT,

  -- Fuente y atribución
  source_page     TEXT DEFAULT 'WEB DIRECTA',
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_term        TEXT,
  utm_content     TEXT,
  gclid           TEXT,
  fbc             TEXT,
  fbp             TEXT,
  referrer        TEXT,

  -- Sesión y dispositivo
  session_id      TEXT,
  device_type     TEXT,
  screen_resolution TEXT,
  user_agent      TEXT,
  ip_address      TEXT,

  -- Meta CAPI deduplication
  event_id        TEXT UNIQUE,

  -- Pipeline interno
  lead_status     TEXT DEFAULT 'new',
  metadata        JSONB,

  -- Auditoría
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_leads_email        ON leads(email);
CREATE INDEX idx_leads_created_at   ON leads(created_at DESC);
CREATE INDEX idx_leads_utm_source   ON leads(utm_source);
CREATE INDEX idx_leads_status       ON leads(lead_status);
CREATE INDEX idx_leads_event_id     ON leads(event_id);

-- ============================================================================
-- ENUM: lead_status values (constraint instead of enum for portability)
-- ============================================================================
ALTER TABLE leads
  ADD CONSTRAINT chk_lead_status
  CHECK (lead_status IN ('new', 'contacted', 'qualified', 'converted', 'lost'));

-- ============================================================================
-- AUTO-UPDATE updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (para futuro dashboard)
-- ============================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Solo inserts anónimos permitidos (para formulario público)
CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Solo usuarios autenticados pueden leer
CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated');

-- Solo autenticados pueden actualizar estado
CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================================
-- NOTA: El service_role key (SUPABASE_SERVICE_KEY) bypassea RLS.
--       El anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) respeta RLS.
-- ============================================================================
