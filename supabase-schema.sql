-- ePub.AI Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount INT NOT NULL, -- in cents (49900 or 99900)
  tier TEXT CHECK (tier IN ('starter', 'professional')), -- 100 or 250 pages
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'failed')),
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Generated eBooks table
CREATE TABLE IF NOT EXISTS ebooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  company_data JSONB, -- Scraped company information
  generation_data JSONB, -- Prompts used, variables, etc.
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
CREATE TABLE IF NOT EXISTS company_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_url TEXT UNIQUE NOT NULL,
  scraped_data JSONB,
  analysis JSONB,
  variables JSONB, -- Extracted dynamic variables
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generation Progress tracking
CREATE TABLE IF NOT EXISTS generation_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ebook_id UUID REFERENCES ebooks(id) ON DELETE CASCADE,
  step TEXT,
  message TEXT,
  percentage INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys for integrations
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT UNIQUE NOT NULL,
  name TEXT,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_ebooks_order ON ebooks(order_id);
CREATE INDEX IF NOT EXISTS idx_ebooks_user ON ebooks(user_id);
CREATE INDEX IF NOT EXISTS idx_company_analysis_url ON company_analysis(website_url);
CREATE INDEX IF NOT EXISTS idx_generation_progress_ebook ON generation_progress(ebook_id);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Users can view own ebooks" ON ebooks;
DROP POLICY IF EXISTS "Users can view own progress" ON generation_progress;
DROP POLICY IF EXISTS "Users can manage own api keys" ON api_keys;

-- Users can see and update their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own ebooks" ON ebooks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON generation_progress
  FOR SELECT USING (
    ebook_id IN (SELECT id FROM ebooks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage own api keys" ON api_keys
  FOR ALL USING (auth.uid() = user_id);

-- Storage bucket setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('epub-ai', 'epub-ai', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'epub-ai' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own files" ON storage.objects
  FOR SELECT USING (bucket_id = 'epub-ai');

CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'epub-ai' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'epub-ai' AND auth.uid()::text = (storage.foldername(name))[1]);