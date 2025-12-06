-- Migration script to update trust_responses table
-- Run this in your Supabase SQL Editor

-- Option 1: Drop and recreate (WILL DELETE ALL EXISTING DATA)
-- Use this if you don't need to keep existing data

DROP TABLE IF EXISTS trust_responses CASCADE;

CREATE TABLE trust_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  selected_product TEXT NOT NULL CHECK (selected_product IN ('headphones', 'earbuds', 'speaker')),
  trust_rating INTEGER NOT NULL CHECK (trust_rating >= 1 AND trust_rating <= 10),
  purchase_intent BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate index
CREATE INDEX IF NOT EXISTS idx_trust_session ON trust_responses(session_id);

-- Re-enable RLS
ALTER TABLE trust_responses ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Allow anonymous inserts" ON trust_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous selects" ON trust_responses
  FOR SELECT USING (true);
