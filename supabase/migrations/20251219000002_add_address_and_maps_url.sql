-- Migration: Add address and google_maps_url to branches table
ALTER TABLE public.branches ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.branches ADD COLUMN IF NOT EXISTS google_maps_url TEXT;
