#!/usr/bin/env node
// Simple CLI tool to query your Supabase database
const { Pool } = require('pg');

const connectionString = 'postgresql://postgres.indbrdwzwvkimgxzyoko:wusgog-jarci3-jifCeg@aws-1-us-east-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function query(sql) {
  try {
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Get command from arguments
const command = process.argv[2];

async function main() {
  if (!command) {
    console.log('🗄️  Supabase Database Query Tool\n');
    console.log('Usage: node query-supabase.js "<SQL_QUERY>"\n');
    console.log('Quick Commands:');
    console.log('  node query-supabase.js "tables"     - List all tables');
    console.log('  node query-supabase.js "users"      - Show auth.users');
    console.log('\nSQL Examples:');
    console.log('  node query-supabase.js "SELECT * FROM auth.users LIMIT 5"');
    console.log('  node query-supabase.js "CREATE TABLE todos (id serial PRIMARY KEY, task text, done boolean)"');
    console.log('  node query-supabase.js "INSERT INTO todos (task, done) VALUES (\'My task\', false)"');
    process.exit(0);
  }

  // Shortcuts for common queries
  let sql = command;
  if (command === 'tables') {
    sql = "SELECT table_schema, table_name, table_type FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') ORDER BY table_schema, table_name";
  } else if (command === 'users') {
    sql = "SELECT id, email, created_at, last_sign_in_at FROM auth.users ORDER BY created_at DESC LIMIT 10";
  }

  console.log(`🔍 Executing: ${sql}\n`);
  const results = await query(sql);
  
  if (results.length === 0) {
    console.log('📭 No results returned');
  } else {
    console.log(JSON.stringify(results, null, 2));
    console.log(`\n✅ Returned ${results.length} row${results.length === 1 ? '' : 's'}`);
  }
}

main();


