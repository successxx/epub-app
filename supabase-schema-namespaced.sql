-- ePub.AI Database Schema with namespace to avoid conflicts
-- This uses a separate schema 'epub_ai' to not interfere with other applications

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS epub_ai;

-- Set search path for this session
SET search_path TO epub_ai;

-- Enable UUID extension in the schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA epub_ai;

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS epub_ai.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS epub_ai.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES epub_ai.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INT NOT NULL,
  tier TEXT CHECK (tier IN ('starter', 'professional')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'failed')),
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Generated eBooks table
CREATE TABLE IF NOT EXISTS epub_ai.ebooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES epub_ai.orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES epub_ai.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  company_data JSONB,
  generation_data JSONB,
  cover_url TEXT,
  pdf_url TEXT,
  epub_url TEXT,
  page_count INT,
  status TEXT DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  sent_via_email BOOLEAN DEFAULT false
);

-- Company Analysis Cache
CREATE TABLE IF NOT EXISTS epub_ai.company_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_url TEXT UNIQUE NOT NULL,
  scraped_data JSONB,
  analysis JSONB,
  variables JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generation Progress tracking
CREATE TABLE IF NOT EXISTS epub_ai.generation_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ebook_id UUID REFERENCES epub_ai.ebooks(id) ON DELETE CASCADE,
  step TEXT,
  message TEXT,
  percentage INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys for integrations
CREATE TABLE IF NOT EXISTS epub_ai.api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES epub_ai.users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_epub_orders_user ON epub_ai.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_epub_orders_stripe ON epub_ai.orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_epub_ebooks_order ON epub_ai.ebooks(order_id);
CREATE INDEX IF NOT EXISTS idx_epub_ebooks_user ON epub_ai.ebooks(user_id);
CREATE INDEX IF NOT EXISTS idx_epub_company_analysis_url ON epub_ai.company_analysis(website_url);
CREATE INDEX IF NOT EXISTS idx_epub_generation_progress_ebook ON epub_ai.generation_progress(ebook_id);

-- Enable RLS
ALTER TABLE epub_ai.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_ai.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_ai.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_ai.generation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_ai.api_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (with IF EXISTS for safety)
DROP POLICY IF EXISTS "Users can view own profile" ON epub_ai.users;
DROP POLICY IF EXISTS "Users can update own profile" ON epub_ai.users;
DROP POLICY IF EXISTS "Users can view own orders" ON epub_ai.orders;
DROP POLICY IF EXISTS "Users can view own ebooks" ON epub_ai.ebooks;
DROP POLICY IF EXISTS "Users can view own progress" ON epub_ai.generation_progress;
DROP POLICY IF EXISTS "Users can manage own api keys" ON epub_ai.api_keys;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON epub_ai.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON epub_ai.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON epub_ai.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own ebooks" ON epub_ai.ebooks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON epub_ai.generation_progress
  FOR SELECT USING (
    ebook_id IN (SELECT id FROM epub_ai.ebooks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage own api keys" ON epub_ai.api_keys
  FOR ALL USING (auth.uid() = user_id);

-- Storage bucket for ePub.AI (separate from other projects)
INSERT INTO storage.buckets (id, name, public)
VALUES ('epub-ai', 'epub-ai', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for ePub.AI bucket
DROP POLICY IF EXISTS "epub_users_upload" ON storage.objects;
DROP POLICY IF EXISTS "epub_users_view" ON storage.objects;
DROP POLICY IF EXISTS "epub_users_update" ON storage.objects;
DROP POLICY IF EXISTS "epub_users_delete" ON storage.objects;

CREATE POLICY "epub_users_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'epub-ai' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "epub_users_view" ON storage.objects
  FOR SELECT USING (bucket_id = 'epub-ai');

CREATE POLICY "epub_users_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'epub-ai' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "epub_users_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'epub-ai' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Grant usage on schema to authenticated users and service role
GRANT USAGE ON SCHEMA epub_ai TO authenticated;
GRANT USAGE ON SCHEMA epub_ai TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA epub_ai TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA epub_ai TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA epub_ai TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA epub_ai TO service_role;

-- Reset search path
RESET search_path;