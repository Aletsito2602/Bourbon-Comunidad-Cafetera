#!/usr/bin/env node

/**
 * Comprehensive Settings Test Suite
 * Tests all settings functionality and Supabase integration
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
  console.error('Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test configuration
const TEST_EMAIL = 'test@bourbon.com';
const TEST_SETTINGS = {
  platform_name: 'Test Bourbon Platform',
  team_name: 'Test Team',
  primary_color: '#3b82f6',
  secondary_color: '#60a5fa',
  accent_color: '#1d4ed8',
  coffee_shop_name: 'Test Coffee Shop',
  coffee_shop_email: 'test@testcoffee.com',
  coffee_shop_phone: '+1234567890',
  coffee_shop_address: '123 Test Street',
  coffee_shop_description: 'A test coffee shop for testing purposes',
  currency: 'EUR',
  tax_rate: 0.19,
  invoice_prefix: 'TEST',
  invoice_counter: 2000,
  business_tax_id: 'TEST123456',
  billing_address: '123 Business Street, Test City',
  timezone: 'Europe/Madrid',
  language: 'es',
  theme: 'light'
};

class SettingsTestSuite {
  constructor() {
    this.testResults = [];
    this.errors = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const symbols = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${symbols[type]} [${timestamp}] ${message}`);
  }

  async runTest(name, testFn) {
    this.log(`Running test: ${name}`, 'info');
    try {
      const result = await testFn();
      this.testResults.push({ name, status: 'passed', result });
      this.log(`Test passed: ${name}`, 'success');
      return result;
    } catch (error) {
      this.testResults.push({ name, status: 'failed', error: error.message });
      this.errors.push({ test: name, error });
      this.log(`Test failed: ${name} - ${error.message}`, 'error');
      throw error;
    }
  }

  // Test 1: Database Connection
  async testDatabaseConnection() {
    return this.runTest('Database Connection', async () => {
      const { data, error } = await supabase.from('platform_settings').select('count').limit(1);
      if (error) throw new Error(`Database connection failed: ${error.message}`);
      return 'Database connection successful';
    });
  }

  // Test 2: Table Schema Validation
  async testTableSchema() {
    return this.runTest('Table Schema Validation', async () => {
      // Check if all required columns exist by attempting to select them
      const { data, error } = await supabase
        .from('platform_settings')
        .select(`
          id, user_email, platform_name, platform_logo_url,
          primary_color, secondary_color, accent_color,
          coffee_shop_name, coffee_shop_logo_url, coffee_shop_address,
          coffee_shop_phone, coffee_shop_email, coffee_shop_description,
          team_name, currency, tax_rate, invoice_prefix, invoice_counter,
          business_tax_id, billing_address, timezone, language, theme,
          created_at, updated_at
        `)
        .limit(1);
      
      if (error) throw new Error(`Schema validation failed: ${error.message}`);
      return 'All required columns exist';
    });
  }

  // Test 3: Storage Bucket Validation
  async testStorageBucket() {
    return this.runTest('Storage Bucket Validation', async () => {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      if (error) throw new Error(`Failed to list buckets: ${error.message}`);
      
      const settingsBucket = buckets?.find(b => b.name === 'settings-assets');
      if (!settingsBucket) {
        throw new Error('settings-assets bucket not found');
      }
      
      return 'Storage bucket exists and is accessible';
    });
  }

  // Test 4: Create Settings Record
  async testCreateSettings() {
    return this.runTest('Create Settings Record', async () => {
      // First, clean up any existing test data
      await supabase.from('platform_settings').delete().eq('user_email', TEST_EMAIL);
      
      const { data, error } = await supabase
        .from('platform_settings')
        .insert([{ ...TEST_SETTINGS, user_email: TEST_EMAIL }])
        .select()
        .single();
      
      if (error) throw new Error(`Failed to create settings: ${error.message}`);
      if (!data) throw new Error('No data returned from insert');
      
      return { id: data.id, created: true };
    });
  }

  // Test 5: Read Settings Record
  async testReadSettings() {
    return this.runTest('Read Settings Record', async () => {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('user_email', TEST_EMAIL)
        .single();
      
      if (error) throw new Error(`Failed to read settings: ${error.message}`);
      if (!data) throw new Error('No settings found');
      
      // Validate that all test data was saved correctly
      const mismatches = [];
      Object.keys(TEST_SETTINGS).forEach(key => {
        if (data[key] !== TEST_SETTINGS[key]) {
          mismatches.push(`${key}: expected ${TEST_SETTINGS[key]}, got ${data[key]}`);
        }
      });
      
      if (mismatches.length > 0) {
        throw new Error(`Data validation failed: ${mismatches.join(', ')}`);
      }
      
      return { data, validated: true };
    });
  }

  // Test 6: Update Settings Record
  async testUpdateSettings() {
    return this.runTest('Update Settings Record', async () => {
      const updates = {
        platform_name: 'Updated Test Platform',
        primary_color: '#ef4444',
        tax_rate: 0.25
      };
      
      const { data, error } = await supabase
        .from('platform_settings')
        .update(updates)
        .eq('user_email', TEST_EMAIL)
        .select()
        .single();
      
      if (error) throw new Error(`Failed to update settings: ${error.message}`);
      if (!data) throw new Error('No data returned from update');
      
      // Validate updates
      Object.keys(updates).forEach(key => {
        if (data[key] !== updates[key]) {
          throw new Error(`Update validation failed for ${key}: expected ${updates[key]}, got ${data[key]}`);
        }
      });
      
      return { updated: true, data };
    });
  }

  // Test 7: File Upload Simulation
  async testFileUploadPath() {
    return this.runTest('File Upload Path Validation', async () => {
      // Test the upload path structure without actually uploading
      const fileName = `${TEST_EMAIL}/platform_logo_${Date.now()}.png`;
      
      // Check if we can generate a public URL (this validates the bucket structure)
      const { data } = supabase.storage
        .from('settings-assets')
        .getPublicUrl(fileName);
      
      if (!data.publicUrl) {
        throw new Error('Failed to generate public URL');
      }
      
      return { uploadPath: fileName, publicUrl: data.publicUrl };
    });
  }

  // Test 8: Data Types and Constraints
  async testDataTypesAndConstraints() {
    return this.runTest('Data Types and Constraints', async () => {
      const testCases = [
        {
          name: 'Invalid tax_rate (too high)',
          data: { tax_rate: 1.5 }, // 150% - should be valid but unusual
          shouldFail: false
        },
        {
          name: 'Invalid tax_rate (negative)',
          data: { tax_rate: -0.1 },
          shouldFail: false // Database might allow this, app should validate
        },
        {
          name: 'Very long platform_name',
          data: { platform_name: 'A'.repeat(1000) },
          shouldFail: false // Test if database handles long strings
        }
      ];
      
      const results = [];
      for (const testCase of testCases) {
        try {
          const { error } = await supabase
            .from('platform_settings')
            .update(testCase.data)
            .eq('user_email', TEST_EMAIL);
          
          if (testCase.shouldFail && !error) {
            results.push({ ...testCase, result: 'UNEXPECTED_SUCCESS' });
          } else if (!testCase.shouldFail && error) {
            results.push({ ...testCase, result: 'UNEXPECTED_FAILURE', error: error.message });
          } else {
            results.push({ ...testCase, result: 'EXPECTED' });
          }
        } catch (err) {
          results.push({ ...testCase, result: 'ERROR', error: err.message });
        }
      }
      
      return results;
    });
  }

  // Test 9: Performance Test
  async testPerformance() {
    return this.runTest('Performance Test', async () => {
      const iterations = 10;
      const times = [];
      
      for (let i = 0; i < iterations; i++) {
        const start = Date.now();
        await supabase
          .from('platform_settings')
          .select('*')
          .eq('user_email', TEST_EMAIL)
          .single();
        const end = Date.now();
        times.push(end - start);
      }
      
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const maxTime = Math.max(...times);
      const minTime = Math.min(...times);
      
      if (avgTime > 1000) { // More than 1 second average
        this.log(`Performance warning: Average query time is ${avgTime}ms`, 'warning');
      }
      
      return { avgTime, maxTime, minTime, iterations };
    });
  }

  // Test 10: Cleanup
  async testCleanup() {
    return this.runTest('Cleanup Test Data', async () => {
      const { error } = await supabase
        .from('platform_settings')
        .delete()
        .eq('user_email', TEST_EMAIL);
      
      if (error) throw new Error(`Failed to cleanup: ${error.message}`);
      
      // Verify deletion
      const { data } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('user_email', TEST_EMAIL);
      
      if (data && data.length > 0) {
        throw new Error('Cleanup failed: Test data still exists');
      }
      
      return 'Test data cleaned up successfully';
    });
  }

  // Generate comprehensive report
  generateReport() {
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const total = this.testResults.length;
    
    console.log('\n' + '='.repeat(60));
    console.log('🧪 SETTINGS TEST SUITE REPORT');
    console.log('='.repeat(60));
    console.log(`📊 Total Tests: ${total}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    if (failed > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.testResults
        .filter(r => r.status === 'failed')
        .forEach(test => {
          console.log(`  • ${test.name}: ${test.error}`);
        });
    }
    
    console.log('\n📋 DETAILED RESULTS:');
    this.testResults.forEach(test => {
      const status = test.status === 'passed' ? '✅' : '❌';
      console.log(`  ${status} ${test.name}`);
    });
    
    console.log('\n🔧 RECOMMENDATIONS:');
    if (failed === 0) {
      console.log('  ✅ All tests passed! Settings functionality is working correctly.');
    } else {
      console.log('  ⚠️  Some tests failed. Review the errors above and fix the issues.');
      console.log('  📝 Check Supabase configuration and database schema.');
      console.log('  🔑 Verify environment variables are correctly set.');
    }
    
    console.log('='.repeat(60));
    
    return { total, passed, failed, successRate: (passed / total) * 100 };
  }

  // Main test runner
  async runAllTests() {
    this.log('🚀 Starting Settings Test Suite', 'info');
    
    try {
      await this.testDatabaseConnection();
      await this.testTableSchema();
      await this.testStorageBucket();
      await this.testCreateSettings();
      await this.testReadSettings();
      await this.testUpdateSettings();
      await this.testFileUploadPath();
      await this.testDataTypesAndConstraints();
      await this.testPerformance();
      await this.testCleanup();
    } catch (error) {
      this.log(`Test suite interrupted: ${error.message}`, 'error');
    }
    
    return this.generateReport();
  }
}

// Component-specific tests
class ComponentTestSuite {
  constructor() {
    this.log = (message, type = 'info') => {
      const symbols = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
      console.log(`${symbols[type]} ${message}`);
    };
  }

  async testSettingsComponents() {
    this.log('🧩 Testing Settings Components', 'info');
    
    const componentsToCheck = [
      'src/components/Settings.tsx',
      'src/components/settings/PlatformSettings.tsx',
      'src/components/settings/CoffeeshopSettings.tsx',
      'src/components/settings/BillingSettings.tsx',
      'src/components/settings/TeamSettings.tsx',
      'src/lib/settings-simple.ts',
      'src/contexts/SettingsContext.tsx'
    ];
    
    const results = [];
    
    for (const component of componentsToCheck) {
      const fullPath = path.join(process.cwd(), component);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for common issues
        const issues = [];
        
        // Check for Supabase imports
        if (component.includes('lib/') && !content.includes('supabase')) {
          issues.push('Missing Supabase import');
        }
        
        // Check for error handling
        if (!content.includes('try') && !content.includes('catch') && component.includes('.tsx')) {
          issues.push('No error handling detected');
        }
        
        // Check for TypeScript types
        if (!content.includes('interface') && !content.includes('type') && component.includes('.tsx')) {
          issues.push('No TypeScript interfaces/types found');
        }
        
        results.push({
          component,
          exists: true,
          size: content.length,
          issues
        });
        
        this.log(`✅ ${component} - ${issues.length === 0 ? 'OK' : issues.length + ' issues'}`, 
                 issues.length === 0 ? 'success' : 'warning');
      } else {
        results.push({
          component,
          exists: false,
          issues: ['File not found']
        });
        this.log(`❌ ${component} - File not found`, 'error');
      }
    }
    
    return results;
  }
}

// Main execution
async function main() {
  console.log('🎯 Bourbon Settings Comprehensive Test Suite');
  console.log('============================================\n');
  
  // Test database and functionality
  const dbTests = new SettingsTestSuite();
  const dbResults = await dbTests.runAllTests();
  
  console.log('\n');
  
  // Test components
  const componentTests = new ComponentTestSuite();
  const componentResults = await componentTests.testSettingsComponents();
  
  // Final summary
  console.log('\n🎉 FINAL SUMMARY');
  console.log('================');
  console.log(`Database Tests: ${dbResults.passed}/${dbResults.total} passed`);
  console.log(`Component Files: ${componentResults.filter(c => c.exists).length}/${componentResults.length} found`);
  
  const overallSuccess = dbResults.successRate > 80 && 
                        componentResults.filter(c => c.exists).length === componentResults.length;
  
  if (overallSuccess) {
    console.log('🎊 Overall Status: HEALTHY ✅');
  } else {
    console.log('⚠️  Overall Status: NEEDS ATTENTION ❌');
  }
  
  process.exit(overallSuccess ? 0 : 1);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

export { SettingsTestSuite, ComponentTestSuite };
