# 4Ever Profile Page Setup Guide

This guide will help you set up and run the 4Ever profile page with timeline and family tree functionality.

## 🎯 Overview

The profile page is the main interface where friends and family can view someone's life story through:
- **Timeline**: Chronological events with photos, audio stories, and interactions
- **Family Tree**: Interactive family relationships and connections
- **Stories**: Featured longer-form content with audio playback
- **Social Features**: Likes, comments, and sharing

## 📁 Project Structure

```
4Ever--main/
├── profile.html              # Main profile page
├── test-profile.html         # Test page for API functionality
├── styles/
│   └── profile.css          # Profile page styles
├── js/
│   ├── profile.js           # Profile page functionality
│   └── api-service.js       # API client service
├── api/
│   └── profile-api.js       # Node.js API server
└── supabase/
    └── profile-schema.sql   # Database schema
```

## 🚀 Quick Start

### 1. Set Up Database

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/profile-schema.sql`
4. Click **Run** to create all tables, policies, and sample data

### 2. Install Dependencies

```bash
# Install Node.js dependencies for the API server
npm install express cors pg

# Or if you want to install all at once
npm install express cors pg
```

### 3. Start the API Server

```bash
# Start the profile API server
node api/profile-api.js
```

The API will be available at `http://localhost:3000`

### 4. Test the Setup

1. Open `test-profile.html` in your browser
2. Click "Test API Health" to verify the connection
3. Test other API endpoints to ensure everything works

### 5. View the Profile Page

1. Open `profile.html` in your browser
2. The page will load with sample data from the database
3. Explore the timeline, family tree, and stories sections

## 🛠️ Features

### Timeline Section
- **Event Categories**: Filter by milestones, family, career, travel
- **Interactive Events**: Click to play audio stories
- **Media Support**: Images and videos for each event
- **Social Features**: Like and comment on events
- **Responsive Design**: Works on all devices

### Family Tree Section
- **Interactive Tree**: Zoom, pan, and center the family tree
- **Generation View**: Organized by family generations
- **Person Details**: Click on family members for more info
- **Visual Connections**: Lines showing relationships

### Stories Section
- **Audio Playback**: Listen to longer-form stories
- **Category Filtering**: Filter by story type
- **Featured Content**: Highlight important stories
- **Social Engagement**: Like and share stories

### Social Features
- **Likes**: Like timeline events and stories
- **Comments**: Leave comments (with moderation)
- **Sharing**: Share profiles via social media
- **Analytics**: Track profile views and engagement

## 🔧 Configuration

### API Configuration

The API server can be configured with environment variables:

```bash
# Database connection
DATABASE_URL=postgresql://user:password@host:port/database

# Server port
PORT=3000

# CORS settings
CORS_ORIGIN=http://localhost:8000
```

### Client Configuration

Update the API base URL in `js/api-service.js` if needed:

```javascript
// Change this if your API is on a different port or domain
const apiService = new ApiService('/api'); // Default: /api
```

## 📊 Database Schema

### Core Tables

- **profiles**: User profile information
- **timeline_events**: Chronological life events
- **stories**: Longer-form story content
- **family_members**: Family member information
- **family_relationships**: Family connections
- **comments**: User comments on events/stories
- **likes**: User likes and engagement
- **profile_views**: Analytics and tracking

### Sample Data

The schema includes sample data for testing:
- Profile: John Smith (1950-present)
- Timeline events: Birth, marriage, career, children
- Family members: Parents, spouse, children
- Stories: Childhood, meeting spouse, teaching career

## 🎨 Customization

### Styling

The profile page uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Content

To add your own content:

1. **Update Profile Info**: Modify the profile data in the database
2. **Add Timeline Events**: Insert new events with photos and audio
3. **Create Stories**: Add longer-form content with audio
4. **Build Family Tree**: Add family members and relationships

## 🔒 Security

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Public profiles are viewable by everyone
- Users can only edit their own content
- Comments require approval before display
- IP-based like tracking prevents spam

### API Security

- Input validation on all endpoints
- SQL injection prevention with parameterized queries
- CORS configuration for cross-origin requests
- Rate limiting considerations (can be added)

## 🚀 Deployment

### Production Setup

1. **Database**: Use Supabase production instance
2. **API Server**: Deploy to Vercel, Heroku, or similar
3. **Static Files**: Serve HTML/CSS/JS from CDN
4. **Environment**: Set production environment variables

### Environment Variables

```bash
# Production database
DATABASE_URL=postgresql://...

# Production port
PORT=3000

# CORS origins
CORS_ORIGIN=https://yourdomain.com
```

## 🧪 Testing

### Manual Testing

1. Use `test-profile.html` to test API endpoints
2. Verify all CRUD operations work
3. Test responsive design on different devices
4. Check audio playback functionality

### API Testing

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test profile endpoint
curl http://localhost:3000/api/profile/00000000-0000-0000-0000-000000000001

# Test timeline events
curl http://localhost:3000/api/profile/00000000-0000-0000-0000-000000000001/timeline
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if the API server is running
   - Verify the port (default: 3000)
   - Check CORS settings

2. **Database Connection Failed**
   - Verify DATABASE_URL is correct
   - Check Supabase project is active
   - Ensure tables exist (run schema.sql)

3. **Audio Not Playing**
   - Check audio file URLs are accessible
   - Verify browser audio permissions
   - Test with different audio formats

4. **Images Not Loading**
   - Check image URLs are valid
   - Verify CORS settings for image domains
   - Test with different image formats

### Debug Mode

Enable debug logging in the API:

```javascript
// In api/profile-api.js
const DEBUG = process.env.DEBUG === 'true';
if (DEBUG) {
    console.log('Debug mode enabled');
}
```

## 📚 API Reference

### Endpoints

- `GET /api/health` - Health check
- `GET /api/profile/:id` - Get profile data
- `GET /api/profile/:id/timeline` - Get timeline events
- `GET /api/profile/:id/stories` - Get stories
- `GET /api/profile/:id/family` - Get family members
- `POST /api/like` - Like an event or story
- `POST /api/comment` - Add a comment
- `GET /api/search/profiles` - Search profiles

### Response Format

All API responses follow this format:

```json
{
    "data": { ... },
    "pagination": {
        "limit": 20,
        "offset": 0,
        "hasMore": true
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

All rights reserved © 2025 4Ever

---

**Need Help?** Check the troubleshooting section or create an issue in the repository.
