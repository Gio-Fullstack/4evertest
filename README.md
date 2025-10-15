# 4Ever - Story Preservation Platform

A platform that transforms spoken stories into beautifully crafted keepsake books, helping families preserve their precious memories forever.

## 🎯 Overview

4Ever is similar to Remento.co, helping families preserve their precious memories by:
- Recording spoken stories with guided prompts
- Using AI to transform voice recordings into polished narratives
- Creating premium hardcover keepsake books with QR codes linking to original recordings
- Enabling collaborative storytelling with family and friends

## 🚀 Current Status

This repository contains the backend infrastructure and database setup for the 4Ever platform. The landing page has been removed as part of cleanup.

## 📁 Project Structure

```
4Ever--main/
├── supabase/                    # Supabase integration files
│   ├── database-schema.sql     # Complete database schema
│   ├── query-supabase.js       # CLI tool for database queries
│   ├── test-supabase-connection.js # Connection testing
│   ├── SUPABASE_SETUP.md       # Setup guide
│   └── README.md               # Supabase documentation
├── config.example.js           # Configuration template
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## 🛠️ Technical Stack

- **Node.js**: Backend runtime
- **PostgreSQL**: Database (via Supabase)
- **Supabase**: Backend-as-a-Service
- **MCP**: Model Context Protocol for AI integration

## 🔌 Supabase Integration

The project is fully configured with Supabase MCP (Model Context Protocol) for seamless AI integration with Cursor.

### Database Schema
- **waitlist**: User signups and early access
- **users**: User accounts and profiles
- **stories**: Story content and metadata
- **timeline_events**: Chronological story events
- **family_relationships**: Family tree connections

### Available Tools
- CLI database query tool
- Connection testing utilities
- MCP integration for AI assistance

## 🚦 Getting Started

1. **Set up Supabase**:
   ```bash
   cd supabase
   # Follow instructions in SUPABASE_SETUP.md
   ```

2. **Test connection**:
   ```bash
   node supabase/test-supabase-connection.js
   ```

3. **Query database**:
   ```bash
   node supabase/query-supabase.js "tables"
   ```

## 🔧 Development

### Dependencies
- `pg`: PostgreSQL client for Node.js

### Available Scripts
- Database queries via CLI
- Connection testing
- Schema management

## 📚 Documentation

- **Supabase Setup**: See `supabase/SUPABASE_SETUP.md`
- **Database Schema**: See `supabase/database-schema.sql`
- **API Reference**: Supabase documentation

## 🎯 Next Steps

- [ ] Implement user authentication
- [ ] Build story recording interface
- [ ] Create AI story processing pipeline
- [ ] Develop book generation system
- [ ] Add payment processing
- [ ] Implement real-time collaboration

## 📄 License

All rights reserved © 2025 4Ever

## 📞 Contact

For questions or support, reach out to:
- Email: hello@4ever.com
- Website: Coming Soon

---

Built with ❤️ for preserving family memories