-- WEALTHYFIED WATCH - COMPLETE SUPABASE SCHEMA
-- Copy and paste this directly into your Supabase SQL Editor

-- ==========================================================
-- 1. EXTENDED USER PROFILES (Connects to Auth system)
-- ==========================================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT CHECK (role IN ('user', 'admin', 'compliance')) DEFAULT 'user',
    full_name TEXT,
    avatar_url TEXT,
    phone_number TEXT,
    vip_tier TEXT DEFAULT 'Standard',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================================
-- 2. PRODUCTS / INVENTORY
-- ==========================================================
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('watch', 'jewelry', 'accessory')),
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0 NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- Store specs, dimensions, materials
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Product Policies
CREATE POLICY "Products are viewable by everyone." 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Only admins can modify products" 
ON public.products FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'compliance')));


-- ==========================================================
-- 3. ORDERS & TRANSACTIONS (Opay / Delivery tracked)
-- ==========================================================
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT CHECK (status IN ('pending_payment', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending_payment',
    payment_method TEXT CHECK (payment_method IN ('opay', 'paystack', 'credit_card', 'bank_transfer')),
    total_amount NUMERIC(10,2) NOT NULL,
    shipping_address JSONB NOT NULL,
    tracking_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Order Policies
CREATE POLICY "Users view own orders." 
ON public.orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create own orders." 
ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin view all orders." 
ON public.orders FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'compliance')));

CREATE POLICY "Users view own order items." 
ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()));


-- ==========================================================
-- 4. INTERFACE COMPLIANCE CHAT ROOM (AML / Support)
-- ==========================================================
CREATE TABLE public.compliance_chat_rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('active', 'resolved', 'archived')) DEFAULT 'active',
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    related_order_id UUID REFERENCES public.orders(id) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.compliance_chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) NULL, -- Null implies System Message
    message TEXT NOT NULL,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.compliance_chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat Policies
CREATE POLICY "Admins control chat rooms." 
ON public.compliance_chat_rooms FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'compliance')));

CREATE POLICY "Admins can view/send messages." 
ON public.chat_messages FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'compliance')));

-- ==========================================================
-- END OF SCHEMA
-- ==========================================================
