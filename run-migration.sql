-- This script should be run in the Supabase SQL editor
-- URL: https://autmdlacdenfbggqsgmz.supabase.co/project/autmdlacdenfbggqsgmz/sql

-- First, check if any epub_ai schema or tables exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'epub_ai') THEN
    RAISE NOTICE 'Schema epub_ai already exists. Please review before continuing.';
  ELSE
    RAISE NOTICE 'Schema epub_ai does not exist. Safe to proceed.';
  END IF;
END $$;