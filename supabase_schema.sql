-- Supabase Database & Storage Setup Script for EcoPortfolio
-- Student: Atharva Chavan (Roll No: 24101C0006)
-- Course: E-WASTE & ENVIRONMENTAL MANAGEMENT

-- 1. Create Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_number INT NOT NULL,
    title TEXT NOT NULL,
    objective TEXT NOT NULL,
    evidence JSONB DEFAULT '[]'::jsonb,
    learned TEXT,
    sustainability_connection TEXT,
    surprised TEXT,
    challenge TEXT,
    improvement TEXT,
    references JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Student Profile Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT DEFAULT 'Atharva Chavan',
    roll_number TEXT DEFAULT '24101C0006',
    course TEXT DEFAULT 'E-WASTE & ENVIRONMENTAL MANAGEMENT',
    branch TEXT DEFAULT 'Information Technology Engineering',
    college TEXT,
    academic_year TEXT DEFAULT '2025-2026',
    division TEXT,
    mentor TEXT DEFAULT 'Prof. Nilima Main',
    email TEXT,
    location TEXT,
    linkedin TEXT,
    github TEXT,
    resume_url TEXT,
    photo_url TEXT,
    career_goal TEXT,
    academic_interests JSONB DEFAULT '[]'::jsonb,
    hobbies JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    projects JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS) - Public Read, Owner Admin Write Only
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Read Policy: Public visitors can view all assignments and profiles
CREATE POLICY "Public Read Access Assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Public Read Access Profiles" ON public.profiles FOR SELECT USING (true);

-- Write Policies: Restricted to authenticated owner admin
CREATE POLICY "Admin Insert Assignments" ON public.assignments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin Update Assignments" ON public.assignments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Assignments" ON public.assignments FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Insert/Update Profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- 4. Storage Buckets Setup
-- In Supabase Dashboard -> Storage -> Create two buckets:
-- Bucket 1: "evidence" (Public Read, Authenticated Write)
-- Bucket 2: "avatars" (Public Read, Authenticated Write)
