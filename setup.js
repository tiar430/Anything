#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { randomBytes } from 'crypto';

console.log('🚀 Setting up Anything - Mobile App Builder');
console.log('===========================================\n');

// Check if bun is installed
try {
  const bunVersion = execSync('bun --version', { encoding: 'utf-8' }).trim();
  console.log(`✅ Bun detected: ${bunVersion}\n`);
} catch (error) {
  console.error('❌ Bun is not installed. Please install Bun first:');
  console.error('   curl -fsSL https://bun.sh/install | bash');
  process.exit(1);
}

// Create .env file if it doesn't exist
if (!existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  
  let envContent = readFileSync('.env.example', 'utf-8');
  
  // Generate AUTH_SECRET
  console.log('🔑 Generating AUTH_SECRET...');
  const authSecret = randomBytes(32).toString('base64');
  
  // Update .env content
  envContent = envContent.replace(
    'AUTH_SECRET=your-secret-key-here',
    `AUTH_SECRET=${authSecret}`
  );
  
  writeFileSync('.env', envContent);
  
  console.log('✅ .env file created with generated AUTH_SECRET\n');
  console.log('⚠️  IMPORTANT: Please update DATABASE_URL in .env with your PostgreSQL connection string\n');
} else {
  console.log('ℹ️  .env file already exists, skipping...\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('cd Web && bun install', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

console.log('\n✅ Setup complete!\n');
console.log('Next steps:');
console.log('1. Update DATABASE_URL in .env file');
console.log('2. Create database tables by running the SQL schema (see replit.md)');
console.log('3. Run \'cd Web && bun run dev\' to start development server');
console.log('4. Access the app at http://localhost:5000\n');
