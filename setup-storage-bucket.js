#!/usr/bin/env node

/**
 * Script to create the missing storage bucket for settings assets
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').filter(line => line.includes('='));
  envVars.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createStorageBucket() {
  console.log('🪣 Setting up storage bucket for settings assets...');
  
  try {
    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Failed to list buckets:', listError.message);
      return false;
    }
    
    const existingBucket = buckets?.find(b => b.name === 'settings-assets');
    
    if (existingBucket) {
      console.log('✅ Storage bucket "settings-assets" already exists');
      return true;
    }
    
    // Create the bucket
    const { data, error } = await supabase.storage.createBucket('settings-assets', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
    });
    
    if (error) {
      console.error('❌ Failed to create storage bucket:', error.message);
      console.log('💡 You may need to create this bucket manually in the Supabase dashboard');
      console.log('   Go to Storage > Create bucket > Name: "settings-assets" > Public: true');
      return false;
    }
    
    console.log('✅ Storage bucket "settings-assets" created successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error setting up storage bucket:', error.message);
    return false;
  }
}

async function testBucketAccess() {
  console.log('🔍 Testing bucket access...');
  
  try {
    // Try to list files in the bucket
    const { data, error } = await supabase.storage.from('settings-assets').list();
    
    if (error) {
      console.error('❌ Cannot access bucket:', error.message);
      return false;
    }
    
    console.log('✅ Bucket access test successful');
    return true;
    
  } catch (error) {
    console.error('❌ Bucket access test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Bourbon Storage Setup');
  console.log('========================\n');
  
  const bucketCreated = await createStorageBucket();
  
  if (bucketCreated) {
    const accessTest = await testBucketAccess();
    
    if (accessTest) {
      console.log('\n🎉 Storage setup completed successfully!');
      console.log('✅ You can now upload logos and images in the settings page.');
    } else {
      console.log('\n⚠️  Storage bucket created but access test failed.');
      console.log('💡 Check your Supabase RLS policies for the storage bucket.');
    }
  } else {
    console.log('\n❌ Storage setup failed.');
    console.log('📝 Manual steps required:');
    console.log('   1. Go to your Supabase dashboard');
    console.log('   2. Navigate to Storage');
    console.log('   3. Create a new bucket named "settings-assets"');
    console.log('   4. Set it as public');
    console.log('   5. Set file size limit to 5MB');
    console.log('   6. Allow image mime types');
  }
}

main().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
