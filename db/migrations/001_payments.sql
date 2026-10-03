CREATE TABLE payment_accounts (
  id UUID PRIMARY KEY,
  account_slug TEXT NOT NULL UNIQUE,
  family_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  total_amount_cents BIGINT NOT NULL CHECK (total_amount_cents > 0),
  opening_covered_cents BIGINT NOT NULL DEFAULT 0 CHECK (opening_covered_cents >= 0),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paid', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (opening_covered_cents <= total_amount_cents)
);

CREATE TABLE contributions (
  id UUID PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES payment_accounts (id),
  amount_cents BIGINT NOT NULL CHECK (amount_cents > 0),
  currency CHAR(3) NOT NULL DEFAULT 'BRL' CHECK (currency = 'BRL'),
  provider TEXT NOT NULL,
  provider_payment_id TEXT,
  external_reference TEXT NOT NULL UNIQUE,
  idempotency_key TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'failed', 'expired', 'cancelled', 'refunded')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX contributions_provider_payment_id_unique
  ON contributions (provider, provider_payment_id)
  WHERE provider_payment_id IS NOT NULL;

CREATE INDEX contributions_account_status_created
  ON contributions (account_id, status, created_at);

CREATE TABLE payment_webhook_events (
  provider TEXT NOT NULL,
  provider_event_id TEXT NOT NULL,
  contribution_id UUID REFERENCES contributions (id),
  event_type TEXT NOT NULL,
  processing_status TEXT NOT NULL DEFAULT 'received'
    CHECK (processing_status IN ('received', 'processed', 'ignored', 'failed')),
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  PRIMARY KEY (provider, provider_event_id)
);