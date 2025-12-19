-- Migration: Add facebook_url to branches table
ALTER TABLE public.branches ADD COLUMN IF NOT EXISTS facebook_url TEXT;
