# Manual Storage Bucket Setup

Since the automatic bucket creation failed due to RLS policies, you need to create the storage bucket manually in the Supabase dashboard.

## Steps to Create Storage Bucket

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project: `zsucsanecavdmpnpatct`

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click "Create bucket"

3. **Create the Bucket**
   - **Bucket name**: `settings-assets`
   - **Public bucket**: ✅ Enable (checked)
   - **File size limit**: `5242880` (5MB)
   - **Allowed MIME types**: 
     - `image/jpeg`
     - `image/png`
     - `image/svg+xml`
     - `image/gif`
     - `image/webp`

4. **Configure RLS Policies (Optional)**
   If you want more security, you can add these policies:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access" ON storage.objects 
   FOR SELECT USING (bucket_id = 'settings-assets');

   -- Allow authenticated uploads
   CREATE POLICY "Authenticated users can upload" ON storage.objects 
   FOR INSERT WITH CHECK (bucket_id = 'settings-assets');
   ```

## Verification

After creating the bucket, run the test again:
```bash
npm run test:settings
```

The storage bucket test should now pass.

## Fallback Solution

If you can't create the storage bucket, the settings page will still work with a fallback system that uses data URLs for image previews. This means:
- ✅ You can still upload and preview images
- ✅ All settings functionality works
- ⚠️ Images are stored as data URLs (not ideal for production)
- ⚠️ Images won't persist between sessions

The fallback is automatically activated when the storage bucket is not available.
