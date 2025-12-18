-- Initial Schema Migration for CRM Lite – Agencias de Viajes

-- 1. Profiles (Extensions from Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'superadmin' CHECK (role IN ('superadmin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Agencies
CREATE TABLE IF NOT EXISTS public.agencies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Branches
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE NOT NULL,
    branch_name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    country TEXT,
    state TEXT,
    city TEXT,
    instagram_url TEXT,
    tiktok_url TEXT,
    website_url TEXT,
    contact_status TEXT DEFAULT 'not_contacted' CHECK (contact_status IN ('not_contacted', 'contacted', 'waiting_response', 'rejected', 'interested')),
    lead_temperature TEXT DEFAULT 'cold' CHECK (lead_temperature IN ('cold', 'warm', 'hot')),
    relationship_type TEXT DEFAULT 'lead' CHECK (relationship_type IN ('lead', 'client')),
    notes TEXT, -- Summary/General notes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Agency Notes (Detailed logs)
CREATE TABLE IF NOT EXISTS public.agency_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Activity Log (Audit)
CREATE TABLE IF NOT EXISTS public.agency_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE, -- Made NULLABLE for system events
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    action_type TEXT NOT NULL, -- 'create', 'update', 'status_change', etc.
    field_name TEXT,
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Import Logs
CREATE TABLE IF NOT EXISTS public.import_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) NOT NULL,
    total_rows INTEGER DEFAULT 0,
    valid_rows INTEGER DEFAULT 0,
    duplicate_rows INTEGER DEFAULT 0,
    invalid_rows INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_logs ENABLE ROW LEVEL SECURITY;

-- Policies (Restricting all access to authenticated users only)
CREATE POLICY "Allow all actions for authenticated users" ON public.profiles
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all actions for authenticated users" ON public.agencies
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all actions for authenticated users" ON public.branches
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all actions for authenticated users" ON public.agency_notes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read-only for activity log for authenticated users" ON public.agency_activity_log
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow insert for activity log for authenticated users" ON public.agency_activity_log
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow all actions for authenticated users" ON public.import_logs
    FOR ALL USING (auth.role() = 'authenticated');

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON public.branches
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
