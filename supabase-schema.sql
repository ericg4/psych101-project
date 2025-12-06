-- Supabase Database Schema for Psychology Website
-- Run this SQL in your Supabase SQL Editor

-- Sessions table to track anonymous sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Landing page responses
CREATE TABLE IF NOT EXISTS landing_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  version_shown TEXT NOT NULL CHECK (version_shown IN ('clean', 'cluttered')),
  stress_rating INTEGER NOT NULL CHECK (stress_rating >= 1 AND stress_rating <= 10),
  easier_version TEXT CHECK (easier_version IN ('clean', 'cluttered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gestalt demo responses
CREATE TABLE IF NOT EXISTS gestalt_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  screen_a_time INTEGER NOT NULL,
  screen_b_time INTEGER NOT NULL,
  faster_screen TEXT NOT NULL CHECK (faster_screen IN ('A', 'B')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schema/recognition demo responses
CREATE TABLE IF NOT EXISTS schema_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  easier_layout TEXT NOT NULL CHECK (easier_layout IN ('A', 'B')),
  more_trustworthy_layout TEXT NOT NULL CHECK (more_trustworthy_layout IN ('A', 'B')),
  hover_time_a INTEGER,
  hover_time_b INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trust demo responses
CREATE TABLE IF NOT EXISTS trust_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  selected_product TEXT NOT NULL CHECK (selected_product IN ('headphones', 'earbuds', 'speaker')),
  trust_rating INTEGER NOT NULL CHECK (trust_rating >= 1 AND trust_rating <= 10),
  purchase_intent BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dopamine demo responses
CREATE TABLE IF NOT EXISTS dopamine_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  feed_a_time INTEGER NOT NULL,
  feed_b_time INTEGER NOT NULL,
  scarcity_clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_landing_session ON landing_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_gestalt_session ON gestalt_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_schema_session ON schema_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_trust_session ON trust_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_dopamine_session ON dopamine_responses(session_id);

-- Enable Row Level Security (RLS) - allow anonymous inserts
ALTER TABLE landing_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE gestalt_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE dopamine_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous inserts and selects
CREATE POLICY "Allow anonymous inserts" ON landing_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON landing_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous updates" ON landing_responses
  FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous inserts" ON gestalt_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON gestalt_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON schema_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON schema_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON trust_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON trust_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON dopamine_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON dopamine_responses
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON sessions
  FOR SELECT USING (true);
