# Supabase Integration

This directory contains all Supabase-related files for the 4Ever project.

## Files

- `database-schema.sql` - Complete database schema with tables, policies, and triggers
- `query-supabase.js` - CLI tool for querying the Supabase database
- `test-supabase-connection.js` - Connection testing script
- `SUPABASE_SETUP.md` - Comprehensive setup guide

## Quick Start

1. **Set up database schema**:
   ```bash
   # Copy the contents of database-schema.sql to your Supabase SQL editor
   ```

2. **Test connection**:
   ```bash
   node test-supabase-connection.js
   ```

3. **Query database**:
   ```bash
   node query-supabase.js "tables"
   node query-supabase.js "SELECT * FROM waitlist LIMIT 5"
   ```

## MCP Integration

The project is configured to work with Supabase MCP (Model Context Protocol) for Cursor integration. See `SUPABASE_SETUP.md` for detailed instructions.
