-- Create storage bucket for settings assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('settings-assets', 'settings-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to settings-assets bucket
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'settings-assets');

-- Allow authenticated users to upload
CREATE POLICY "Allow uploads for authenticated users" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'settings-assets');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow updates for authenticated users" ON storage.objects
FOR UPDATE USING (bucket_id = 'settings-assets');

-- Allow authenticated users to delete their own files  
CREATE POLICY "Allow deletes for authenticated users" ON storage.objects
FOR DELETE USING (bucket_id = 'settings-assets');