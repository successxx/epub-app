-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    stripe_customer_id TEXT UNIQUE,
    subscription_status TEXT CHECK (subscription_status IN ('active', 'inactive', 'pending')),
    subscription_tier TEXT CHECK (subscription_tier IN ('basic', 'premium'))
);

-- Create company_profiles table
CREATE TABLE IF NOT EXISTS public.company_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    website_url TEXT NOT NULL,
    sender_name TEXT,
    company_name TEXT,
    industry TEXT,
    business_description TEXT,
    company_goal TEXT,
    target_audience TEXT,
    audience_pain_points TEXT,
    company_testimonials JSONB,
    offer_name TEXT,
    offer_price TEXT,
    offer_description TEXT,
    offer_benefits TEXT,
    offer_result TEXT,
    checkout_link TEXT,
    offer_testimonials JSONB,
    all_bonuses TEXT,
    guarantee TEXT,
    scraped_data JSONB,
    UNIQUE(user_id)
);

-- Create books table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    company_profile_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
    introduction TEXT,
    conclusion TEXT,
    summary TEXT,
    cover_image_url TEXT,
    epub_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
    book_type TEXT NOT NULL CHECK (book_type IN ('basic', 'premium')),
    total_chapters INTEGER NOT NULL DEFAULT 15,
    generation_metadata JSONB
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    stripe_payment_intent_id TEXT UNIQUE NOT NULL,
    stripe_session_id TEXT UNIQUE,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'usd' NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed')),
    product_type TEXT NOT NULL CHECK (product_type IN ('basic', 'premium')),
    metadata JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_company_profiles_user_id ON public.company_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_books_user_id ON public.books(user_id);
CREATE INDEX IF NOT EXISTS idx_books_company_profile_id ON public.books(company_profile_id);
CREATE INDEX IF NOT EXISTS idx_books_status ON public.books(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_session_id ON public.payments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for company_profiles updated_at
CREATE TRIGGER set_company_profiles_updated_at
    BEFORE UPDATE ON public.company_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Company profiles policies
CREATE POLICY "Users can view own company profile" ON public.company_profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own company profile" ON public.company_profiles
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own company profile" ON public.company_profiles
    FOR UPDATE USING (user_id = auth.uid());

-- Books policies
CREATE POLICY "Users can view own books" ON public.books
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own books" ON public.books
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own books" ON public.books
    FOR UPDATE USING (user_id = auth.uid());

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payments" ON public.payments
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;