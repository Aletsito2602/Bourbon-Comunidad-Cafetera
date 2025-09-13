-- Fix storage permissions for bucket creation
-- Run this as a superuser or database owner

-- Create the storage bucket manually
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'settings-assets',
  'settings-assets',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the bucket
CREATE POLICY IF NOT EXISTS "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'settings-assets');

CREATE POLICY IF NOT EXISTS "Authenticated users can upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Users can update own files" ON storage.objects 
FOR UPDATE USING (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Users can delete own files" ON storage.objects 
FOR DELETE USING (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
