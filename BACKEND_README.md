# 4Ever Backend System Documentation

## Overview

This is a comprehensive backend system for the 4Ever platform, built with **Supabase** (PostgreSQL database with real-time capabilities).

## Features Implemented

### 1. **Database Schema** (`supabase/complete-schema.sql`)
Complete PostgreSQL schema with:
- User authentication
- Profiles & family relationships
- Stories with media, tags, and co-authors
- Connection requests & connections
- Questions & answers
- Notifications system
- Subscription management
- Activity logging

### 2. **API Service Layer** (`js/backend-api.js`)
JavaScript API for all backend operations:
- Authentication (sign up, sign in, sign out)
- Profile management (CRUD operations)
- Story submission & approval workflow
- Connection requests
- Questions & answers
- Notifications
- Subscriptions
- Activity logging

### 3. **Notification Center** (`notification-center.html`)
Full-featured notification center with:
- **Story Requests** - Approve/reject stories about you
- **Connection Requests** - Accept/decline connections
- **Questions** - Answer questions from others
- **Tags & Mentions** - See where you're mentioned
- Real-time badge counts
- Filter by type and read status

### 4. **Admin Dashboard** (`admin-dashboard.html`)
Profile & account management:
- View all your profiles
- Create profiles for family members (living or deceased)
- Manage subscription (upgrade/downgrade)
- Storage & usage stats
- Quick actions (upload media, invite family, export data)

## Setup Instructions

### Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new organization and project

2. **Run the Database Schema**
   - Go to your Supabase project dashboard
   - Click on "SQL Editor" in the left sidebar
   - Copy the contents of `supabase/complete-schema.sql`
   - Paste into the SQL editor and click "Run"
   - This will create all tables, indexes, and security policies

3. **Get Your API Credentials**
   - Go to Project Settings > API
   - Copy your:
     - `Project URL` (SUPABASE_URL)
     - `anon/public key` (SUPABASE_ANON_KEY)

### Step 2: Configure the Frontend

1. **Update Supabase Client** (`js/supabase-client.js`)
   ```javascript
   const SUPABASE_URL = 'your-project-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

2. **Test the Connection**
   - Open browser developer tools
   - Navigate to any page
   - Check console for connection status

### Step 3: Enable Authentication

Supabase supports multiple auth methods:

**Email & Password (Default)**
- Already configured in `js/backend-api.js`
- Sign up creates user + profile

**Social Login** (Optional)
- Google, Facebook, GitHub, etc.
- Configure in Supabase Dashboard > Authentication > Providers

### Step 4: Set Up Storage (for media uploads)

1. **Create Storage Bucket**
   - Go to Storage in Supabase dashboard
   - Create bucket: `4ever-media`
   - Set policies for authenticated uploads

2. **Configure Upload**
   ```javascript
   const { data, error } = await supabase.storage
     .from('4ever-media')
     .upload(`stories/${filename}`, file);
   ```

## Usage Guide

### For Users

#### Notification Center
```
URL: notification-center.html
```
- View all pending approvals
- Approve/reject stories about you
- Accept/decline connection requests
- Answer questions
- See who tagged you

#### Admin Dashboard
```
URL: admin-dashboard.html
```
- Manage all your profiles
- Create profiles for family members
- Monitor storage usage
- Manage subscription

### For Developers

#### Authentication
```javascript
import api from './js/backend-api.js';

// Sign up
const result = await api.auth.signUp(email, password, fullName);

// Sign in
const result = await api.auth.signIn(email, password);

// Get current user
const user = await api.auth.getCurrentUser();
```

#### Submit a Story
```javascript
const storyData = {
  profile_id: 'profile-uuid',
  author_user_id: 'author-uuid',
  title: 'My Vacation Story',
  description: 'We had an amazing time...',
  category: 'travel',
  year: 2023,
  status: 'pending' // Requires approval
};

const result = await api.stories.submit(storyData);
```

#### Approve/Reject Story
```javascript
// Approve
await api.stories.approve(storyId, approverUserId);

// Reject
await api.stories.reject(storyId);
```

#### Connection Requests
```javascript
// Send request
await api.connections.sendRequest(fromUserId, toUserId, 'Hi! Let me connect');

// Get pending requests
const requests = await api.connections.getPendingRequests(userId);

// Accept request
await api.connections.acceptRequest(requestId, userId, connectedUserId);

// Reject request
await api.connections.rejectRequest(requestId);
```

#### Notifications
```javascript
// Get all unread
const notifications = await api.notifications.getAll(userId, false);

// Mark as read
await api.notifications.markAsRead(notificationId);

// Get unread count
const { count } = await api.notifications.getUnreadCount(userId);
```

## Database Tables

### Core Tables

1. **users** - Authentication & user accounts
2. **profiles** - Profile information (name, bio, dates, etc.)
3. **profile_relationships** - Family tree connections
4. **stories** - User-submitted stories
5. **story_media** - Photos/videos attached to stories
6. **story_tags** - People tagged in stories
7. **connections** - Accepted connections between users
8. **connection_requests** - Pending connection requests
9. **questions** - Questions asked to profiles
10. **answers** - Answers to questions
11. **notifications** - All notification types
12. **subscription_plans** - Available plans
13. **user_subscriptions** - Active subscriptions
14. **activity_log** - User activity tracking

### Notification Types

- `connection_request` - Someone wants to connect
- `story_request` - Story needs approval
- `tag` - Tagged in a story
- `question` - New question asked
- `comment` - Comment on your story
- `reaction` - Reaction to your story

## Security Features

### Row Level Security (RLS)
All tables have RLS policies:
- Users can only see their own data
- Public profiles are visible to all
- Stories require approval before being published
- Only profile owners can approve stories about them

### Authentication
- Passwords are hashed using bcrypt
- JWT tokens for session management
- Email verification (optional)
- Password reset flow

## Subscription Plans

### Free Plan
- 3 profiles
- 1GB storage
- Basic features

### Family Plan ($9.99/month)
- 10 profiles
- 10GB storage
- Advanced features
- Priority support

### Legacy Plan ($19.99/month)
- 50 profiles
- 50GB storage
- All features
- Premium support

### Lifetime ($299 one-time)
- Unlimited profiles
- 100GB storage
- Everything included
- VIP support

## Real-Time Features

Supabase supports real-time subscriptions:

```javascript
// Listen for new notifications
const subscription = supabase
  .from('notifications')
  .on('INSERT', (payload) => {
    console.log('New notification:', payload.new);
    updateNotificationUI(payload.new);
  })
  .subscribe();
```

## Testing

### Demo Data
The schema includes seed data for subscription plans.

### Test Accounts
Create test accounts in Supabase dashboard or via API:
```javascript
await api.auth.signUp('test@example.com', 'password123', 'Test User');
```

## API Endpoints Summary

### Auth
- `auth.signUp()` - Create new user
- `auth.signIn()` - Login
- `auth.signOut()` - Logout
- `auth.getCurrentUser()` - Get session

### Profiles
- `profiles.getBySlug()` - Get profile by URL slug
- `profiles.getUserProfiles()` - Get all user's profiles
- `profiles.create()` - Create new profile
- `profiles.update()` - Update profile
- `profiles.getFamilyTree()` - Get family relationships

### Stories
- `stories.submit()` - Submit new story
- `stories.getPendingForProfile()` - Get pending stories
- `stories.getForProfile()` - Get published stories
- `stories.approve()` - Approve story
- `stories.reject()` - Reject story
- `stories.addTags()` - Tag people

### Connections
- `connections.sendRequest()` - Send connection request
- `connections.getPendingRequests()` - Get pending requests
- `connections.acceptRequest()` - Accept request
- `connections.rejectRequest()` - Reject request
- `connections.getConnections()` - Get all connections

### Questions
- `questions.submit()` - Ask question
- `questions.getPendingForProfile()` - Get pending questions
- `questions.answer()` - Answer question

### Notifications
- `notifications.getAll()` - Get all notifications
- `notifications.markAsRead()` - Mark as read
- `notifications.markAllAsRead()` - Mark all as read
- `notifications.archive()` - Archive notification
- `notifications.getUnreadCount()` - Get unread count

### Subscriptions
- `subscriptions.getPlans()` - Get all plans
- `subscriptions.getUserSubscription()` - Get user's plan

### Activity
- `activity.log()` - Log user activity

## Workflow Examples

### Story Approval Workflow

1. User submits story about someone
   ```javascript
   await api.stories.submit({
     profile_id: profileId,
     author_user_id: authorId,
     title: 'Story Title',
     status: 'pending'
   });
   ```

2. Notification auto-created (via database trigger)
   - Profile owner sees notification
   - Badge count updates

3. Profile owner approves/rejects
   ```javascript
   await api.stories.approve(storyId, ownerId);
   // OR
   await api.stories.reject(storyId);
   ```

4. Story appears on timeline (if approved)

### Connection Request Workflow

1. User A sends request to User B
   ```javascript
   await api.connections.sendRequest(userA, userB, 'Message');
   ```

2. User B sees in notifications

3. User B accepts
   ```javascript
   await api.connections.acceptRequest(requestId, userB, userA);
   ```

4. Bidirectional connection created
   - Both can see each other's content
   - Both appear in connections list

## Troubleshooting

### Connection Issues
- Check SUPABASE_URL and SUPABASE_ANON_KEY
- Ensure Supabase project is active
- Check browser console for errors

### RLS Policy Errors
- Ensure user is authenticated
- Check policies in Supabase dashboard
- Verify user owns the data

### Upload Failures
- Check storage bucket exists
- Verify file size limits
- Check storage policies

## Next Steps

### Immediate
1. Connect real authentication
2. Test story approval flow
3. Enable real-time notifications

### Future Enhancements
- Email notifications
- Push notifications
- Advanced search
- Export to PDF
- Family tree visualization
- AI-generated story summaries

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review API code in `js/backend-api.js`
3. Check browser console for errors
4. Review SQL schema for table structure

## License

Proprietary - 4Ever Platform

