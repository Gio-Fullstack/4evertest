# Supabase MCP Setup Guide for 4Ever

This guide will help you connect Supabase MCP (Model Context Protocol) to your 4Ever project.

## 🚀 Quick Start

### 1. MCP Configuration (Already Done ✅)
The MCP configuration file has been created at `.cursor/mcp.json`. This allows Cursor to communicate with Supabase through the Model Context Protocol.

### 2. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Update Configuration Files

#### Option A: Update the HTML file directly
Edit `index.html` and replace the placeholder values:
```javascript
const supabaseUrl = 'YOUR_PROJECT_URL_HERE';
const supabaseKey = 'YOUR_ANON_KEY_HERE';
```

#### Option B: Use the configuration file
1. Copy `config.example.js` to `config.js`
2. Fill in your actual Supabase credentials
3. Update the HTML to use the config file

### 4. Set Up Database Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database-schema.sql`
4. Click **Run** to create all necessary tables and policies

### 5. Test the Connection

#### Test MCP Connection in Cursor:
1. Restart Cursor to load the MCP configuration
2. Try asking Cursor to help with Supabase-related tasks
3. Example: "Show me the tables in my Supabase database"

#### Test Frontend Connection:
1. Open your website in a browser
2. Open Developer Tools (F12)
3. Try submitting the waitlist form
4. Check the console for any errors

## 🔧 Available Tools

### MCP Tools (Available in Cursor)
- **Database queries**: Ask Cursor to query your database
- **Schema management**: Get help with database schema changes
- **Data analysis**: Analyze your data through natural language
- **Code generation**: Generate Supabase-related code

### Frontend Integration
- **Waitlist signups**: Automatically stored in Supabase
- **User authentication**: Ready for future implementation
- **Real-time updates**: Can be enabled for live data

## 📁 File Structure

```
4Ever--main/
├── .cursor/
│   └── mcp.json                 # MCP configuration
├── supabase-config.js           # Supabase client configuration
├── config.example.js            # Configuration template
├── database-schema.sql          # Database schema
├── query-supabase.js           # CLI tool for database queries
└── SUPABASE_SETUP.md           # This guide
```

## 🛠️ Development Commands

### Query Database via CLI
```bash
# List all tables
node query-supabase.js "tables"

# Show users
node query-supabase.js "users"

# Custom SQL query
node query-supabase.js "SELECT * FROM waitlist LIMIT 5"
```

### Test Frontend Integration
1. Start a local server: `python -m http.server 8000`
2. Open `http://localhost:8000`
3. Submit the waitlist form
4. Check Supabase dashboard for new entries

## 🔒 Security Notes

- The `anon` key is safe to use in frontend code
- Row Level Security (RLS) is enabled on all tables
- Waitlist table allows public inserts for signups
- User data is protected by authentication policies

## 🚨 Troubleshooting

### MCP Not Working
1. Restart Cursor completely
2. Check `.cursor/mcp.json` exists and is valid JSON
3. Verify internet connection

### Frontend Connection Issues
1. Check browser console for errors
2. Verify Supabase URL and key are correct
3. Ensure database schema is created
4. Check Supabase project is active

### Database Permission Errors
1. Verify RLS policies are created
2. Check if you're using the correct API key
3. Ensure tables exist in your database

## 📚 Next Steps

1. **Authentication**: Implement user signup/login
2. **Real-time**: Enable real-time subscriptions
3. **Storage**: Set up file storage for media
4. **Edge Functions**: Create serverless functions
5. **Analytics**: Add usage tracking

## 🆘 Support

- [Supabase Documentation](https://supabase.com/docs)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Cursor Documentation](https://cursor.sh/docs)

---

**Note**: Replace all placeholder values with your actual Supabase credentials before using in production.
