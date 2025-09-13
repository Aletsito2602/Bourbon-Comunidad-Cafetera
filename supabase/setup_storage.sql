-- Setup storage bucket for settings assets
-- This script creates the necessary storage bucket for file uploads

-- Create the settings-assets bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'settings-assets',
  'settings-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'settings-assets');

CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own files" ON storage.objects FOR UPDATE 
USING (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own files" ON storage.objects FOR DELETE 
USING (bucket_id = 'settings-assets' AND auth.role() = 'authenticated');

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
