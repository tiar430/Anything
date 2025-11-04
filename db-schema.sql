-- Database Schema for Anything App
-- Run these commands to create all required tables

-- Authentication Tables

CREATE TABLE IF NOT EXISTS auth_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  "emailVerified" TIMESTAMP,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  provider VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  access_token TEXT,
  expires_at INTEGER,
  refresh_token TEXT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
  "userId" UUID NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth_verification_token (
  identifier VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  token VARCHAR(255) NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Application Tables

CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  total_reward NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  program_id VARCHAR(255) UNIQUE NOT NULL,
  brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  program_type VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  target_value NUMERIC(15, 2) NOT NULL,
  achievement_value NUMERIC(15, 2) DEFAULT 0,
  reward_value NUMERIC(15, 2) NOT NULL,
  reward_type VARCHAR(50) NOT NULL,
  estimated_reward NUMERIC(15, 2) DEFAULT 0,
  remaining_target NUMERIC(15, 2) DEFAULT 0,
  time_gone_percent INTEGER DEFAULT 0,
  program_status VARCHAR(50) DEFAULT 'Active',
  reward_status VARCHAR(50) DEFAULT 'Unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance

CREATE INDEX IF NOT EXISTS idx_auth_accounts_user_id ON auth_accounts("userId");
CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id ON auth_sessions("userId");
CREATE INDEX IF NOT EXISTS idx_programs_brand_id ON programs(brand_id);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(program_status);
CREATE INDEX IF NOT EXISTS idx_programs_reward_status ON programs(reward_status);

-- Comments for documentation

COMMENT ON TABLE auth_users IS 'Stores user account information';
COMMENT ON TABLE auth_accounts IS 'Stores linked authentication provider accounts';
COMMENT ON TABLE auth_sessions IS 'Stores user session data with JWT tokens';
COMMENT ON TABLE auth_verification_token IS 'Stores email verification tokens';
COMMENT ON TABLE brands IS 'Stores brand information for the loyalty program';
COMMENT ON TABLE programs IS 'Stores loyalty/reward program details with tracking information';
