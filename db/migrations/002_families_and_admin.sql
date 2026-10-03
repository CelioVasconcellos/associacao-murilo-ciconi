CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  identity_provider TEXT NOT NULL,
  identity_subject TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'administrator', 'editor', 'reviewer', 'finance')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  UNIQUE (identity_provider, identity_subject),
  UNIQUE (email)
);

CREATE TABLE families (
  slug TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending_review', 'approved', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO families (slug)
SELECT DISTINCT family_slug
FROM payment_accounts
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE payment_accounts
  ADD CONSTRAINT payment_accounts_family_slug_fkey
  FOREIGN KEY (family_slug) REFERENCES families (slug);

CREATE TABLE family_profiles (
  family_slug TEXT PRIMARY KEY REFERENCES families (slug),
  public_label TEXT NOT NULL,
  patient_first_name TEXT,
  patient_age SMALLINT CHECK (patient_age BETWEEN 0 AND 130),
  caregiver_display TEXT,
  headline TEXT NOT NULL,
  story_paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(story_paragraphs) = 'array'),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending_review', 'approved', 'published', 'unpublished')),
  created_by_admin_id UUID REFERENCES admin_users (id),
  reviewed_by_admin_id UUID REFERENCES admin_users (id),
  reviewed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE family_consents (
  id UUID PRIMARY KEY,
  family_slug TEXT NOT NULL REFERENCES families (slug),
  scope TEXT NOT NULL
    CHECK (scope IN ('public_story', 'account_need', 'identifiable_image')),
  policy_version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'granted', 'revoked')),
  consented_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  evidence_reference TEXT,
  recorded_by_admin_id UUID REFERENCES admin_users (id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((status = 'granted' AND consented_at IS NOT NULL) OR status <> 'granted'),
  CHECK ((status = 'revoked' AND revoked_at IS NOT NULL) OR status <> 'revoked')
);

CREATE INDEX family_consents_family_scope_status
  ON family_consents (family_slug, scope, status);

CREATE TABLE admin_audit_events (
  id UUID PRIMARY KEY,
  actor_admin_id UUID REFERENCES admin_users (id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  request_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX admin_audit_events_entity_created
  ON admin_audit_events (entity_type, entity_id, created_at);