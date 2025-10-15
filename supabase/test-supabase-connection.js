#!/usr/bin/env node
// Test script to verify Supabase MCP connection

const { Pool } = require('pg');

const connectionString = 'postgresql://postgres.indbrdwzwvkimgxzyoko:wusgog-jarci3-jifCeg@aws-1-us-east-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  console.log('🧪 Testing Supabase MCP Connection...\n');
  
  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing basic connection...');
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Connection successful!');
    console.log(`   Current time: ${result.rows[0].current_time}\n`);
    
    // Test 2: Check if waitlist table exists
    console.log('2️⃣ Checking for waitlist table...');
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'waitlist'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Waitlist table exists!');
      
      // Test 3: Check waitlist table structure
      console.log('\n3️⃣ Checking waitlist table structure...');
      const structure = await pool.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'waitlist' 
        ORDER BY ordinal_position;
      `);
      
      console.log('   Table structure:');
      structure.rows.forEach(row => {
        console.log(`   - ${row.column_name}: ${row.data_type} (${row.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
      });
      
      // Test 4: Check for existing waitlist entries
      console.log('\n4️⃣ Checking for existing waitlist entries...');
      const entries = await pool.query('SELECT COUNT(*) as count FROM waitlist');
      console.log(`   Found ${entries.rows[0].count} waitlist entries`);
      
    } else {
      console.log('⚠️  Waitlist table does not exist yet.');
      console.log('   Run the database-schema.sql file in your Supabase SQL editor to create it.');
    }
    
    // Test 5: Check MCP configuration
    console.log('\n5️⃣ Checking MCP configuration...');
    const fs = require('fs');
    const path = require('path');
    
    const mcpConfigPath = path.join(__dirname, '.cursor', 'mcp.json');
    if (fs.existsSync(mcpConfigPath)) {
      const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
      console.log('✅ MCP configuration file found!');
      console.log(`   Supabase MCP URL: ${mcpConfig.mcpServers.supabase.url}`);
    } else {
      console.log('❌ MCP configuration file not found!');
    }
    
    console.log('\n🎉 Supabase MCP setup test completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. If waitlist table doesn\'t exist, run database-schema.sql in Supabase');
    console.log('   2. Update your Supabase credentials in index.html');
    console.log('   3. Restart Cursor to load MCP configuration');
    console.log('   4. Test the waitlist form on your website');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your Supabase project is active');
    console.log('   2. Verify connection string is correct');
    console.log('   3. Ensure your IP is not blocked');
  } finally {
    await pool.end();
  }
}

testConnection();
