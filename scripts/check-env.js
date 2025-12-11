#!/usr/bin/env node

/**
 * Environment Configuration Validator
 * 
 * Checks if all required environment variables are set
 * Run with: node scripts/check-env.js
 */

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const requiredEnvVars = [
  'DATABASE_URL',
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL'
];

const optionalEnvVars = [
  'DIRECT_DATABASE_URL',
  'NODE_ENV'
];

console.log('🔍 Checking environment configuration...\n');

let allPresent = true;

// Check required variables
console.log('Required Environment Variables:');
requiredEnvVars.forEach(varName => {
  const isSet = !!process.env[varName];
  const status = isSet ? '✅' : '❌';
  console.log(`  ${status} ${varName}: ${isSet ? 'Set' : 'MISSING'}`);
  if (!isSet) allPresent = false;
});

console.log('\nOptional Environment Variables:');
optionalEnvVars.forEach(varName => {
  const isSet = !!process.env[varName];
  const status = isSet ? '✅' : '⚠️';
  console.log(`  ${status} ${varName}: ${isSet ? 'Set' : 'Not set'}`);
});

// Check NODE_ENV
console.log(`\n📍 Current Environment: ${process.env.NODE_ENV || 'development'}`);

// Validate DATABASE_URL format
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl.startsWith('postgresql://')) {
    console.log('✅ DATABASE_URL format looks correct');
  } else {
    console.log('⚠️  DATABASE_URL may have incorrect format');
  }
}

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('✅ All required environment variables are set!');
  console.log('   You can run: npm run dev');
  process.exit(0);
} else {
  console.log('❌ Some required environment variables are missing.');
  console.log('   Please check your .env.local file.');
  console.log('   See SETUP.md for instructions.');
  process.exit(1);
}
