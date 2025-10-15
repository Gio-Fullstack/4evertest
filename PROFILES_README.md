# Family Profiles System

## Overview
Created complete profile pages for all family members with their own stories, timelines, and family connections.

## Profiles Created

### 1. **John Smith** (Main Profile)
- **File**: `profile.html`
- **URL**: http://localhost:8000/profile.html
- **Bio**: Born 1950, father of three, husband to Mary
- **Stats**: 3 stories, 31 timeline events, 7 family members
- **Mode**: Owner mode (editable)

### 2. **Sarah Johnson** (Daughter)
- **URL**: http://localhost:8000/profile-view.html?id=sarah-johnson
- **Bio**: Born 1982, eldest daughter, teacher
- **Stats**: 5 stories, 18 timeline events, 6 family members
- **Stories**: Wedding, First Teaching Job, Graduation, Becoming a Mother, Childhood

### 3. **Mary Smith** (Wife)
- **URL**: http://localhost:8000/profile-view.html?id=mary-smith
- **Bio**: Born 1952, wife to John, retired nurse
- **Stats**: 4 stories, 22 timeline events, 7 family members
- **Stories**: Wedding, Nursing Career, Trip to Japan, Grandchildren

### 4. **Michael Smith** (Son)
- **URL**: http://localhost:8000/profile-view.html?id=michael-smith
- **Bio**: Born 1985, chef and restaurant owner in Austin
- **Stats**: 3 stories, 15 timeline events, 5 family members
- **Stories**: Restaurant Opening, Culinary School, First Restaurant Job

### 5. **Emily Smith** (Daughter)
- **URL**: http://localhost:8000/profile-view.html?id=emily-smith
- **Bio**: Born 1988, artist based in NYC
- **Stats**: 4 stories, 14 timeline events, 5 family members
- **Stories**: Art Exhibition, Art School, First Painting Sold, Paris Study

### 6. **Robert Smith** (Father)
- **URL**: http://localhost:8000/profile-view.html?id=robert-smith
- **Bio**: Born 1920, died 1995, WWII veteran
- **Stats**: 2 stories, 12 timeline events, 4 family members
- **Stories**: WWII Service, Raising John

### 7. **Helen Smith** (Mother)
- **URL**: http://localhost:8000/profile-view.html?id=helen-smith
- **Bio**: Born 1925, died 2000, devoted homemaker
- **Stats**: 2 stories, 11 timeline events, 4 family members
- **Stories**: Creating a Home, Being a Grandmother

## Files Created

### 1. `js/profile-data.js`
Complete data structure for all family members including:
- Basic info (name, avatar, bio, birth/death years)
- Statistics
- Stories with titles, dates, categories, descriptions, images
- Timeline events with years, titles, icons, categories
- Family tree connections

### 2. `profile-view.html`
Dynamic profile page that:
- Loads profile data based on URL parameter (`?id=profile-name`)
- Displays in visitor mode (read-only)
- Shows stories, timeline, and family tree
- Makes family members clickable to view their profiles

### 3. `feed.html` (Updated)
- Made names and avatars clickable
- Links to respective profile pages
- Hover effect with pointer cursor

## Navigation Between Profiles

### From Feed
Click any name or photo in the feed:
- **Sarah Johnson** → Sarah's profile
- **Mary Smith** → Mary's profile
- **Michael Smith** → Michael's profile

### From Family Tree
Click any family member in the family tree:
- Automatically navigates to their profile
- Shows their own family connections

### URL Structure
```
profile-view.html?id=sarah-johnson
profile-view.html?id=mary-smith
profile-view.html?id=michael-smith
profile-view.html?id=emily-smith
profile-view.html?id=robert-smith
profile-view.html?id=helen-smith
```

## Features Per Profile

### All Profiles Include:
1. **Header**
   - Profile photo
   - Name and bio
   - Stats (stories, timeline events, family members)
   - "Ask [Name] a Question" button

2. **Stories Section**
   - Multiple life stories
   - Categories (Family, Career, Travel, etc.)
   - Images where applicable
   - "Listen to Story" and "View Media" buttons

3. **Timeline Section**
   - Chronological life events
   - Birth, milestones, career, family events
   - Icons for different event types

4. **Family Tree Section**
   - Connected family members
   - Clickable to view their profiles
   - Shows relationships

### Visitor Mode (Default)
- All profiles show in visitor mode by default
- Read-only access
- "Ask a Question" button visible
- No edit controls

## Testing

### Test Individual Profiles:
1. **Sarah's Profile**:
   ```
   http://localhost:8000/profile-view.html?id=sarah-johnson
   ```
   - Should show 5 stories about teaching, wedding, graduation
   - Timeline from 1982 to present
   - Family connections

2. **Mary's Profile**:
   ```
   http://localhost:8000/profile-view.html?id=mary-smith
   ```
   - Should show 4 stories about nursing and family
   - Timeline from 1952 to present

3. **Michael's Profile**:
   ```
   http://localhost:8000/profile-view.html?id=michael-smith
   ```
   - Should show 3 stories about culinary career
   - Timeline focused on career journey

### Test Navigation:
1. Go to feed: http://localhost:8000/feed.html
2. Click "Sarah Johnson" name or photo
3. Should navigate to Sarah's profile
4. Click a family member in her family tree
5. Should navigate to that person's profile

## Story Categories

Each profile uses these categories:
- **Family** - Family events, relationships
- **Career** - Work, achievements, career milestones
- **Education** - School, graduation, learning
- **Travel** - Trips, adventures, experiences
- **Childhood** - Early life memories
- **Milestones** - Life-changing events
- **Military** - Service, war experiences (Robert)

## Data Structure Example

```javascript
'sarah-johnson': {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    avatar: 'URL',
    bio: 'Description',
    birthYear: 1982,
    stats: { stories: 5, timelineEvents: 18, familyMembers: 6 },
    stories: [...],
    timeline: [...],
    familyTree: ['john-smith', 'mary-smith', ...]
}
```

## Future Enhancements

1. **Dynamic Story Loading**
   - Load stories from Supabase database
   - Real-time updates

2. **Real Photos**
   - Upload actual family photos
   - Replace placeholder images

3. **Audio Integration**
   - Connect "Listen to Story" buttons to actual audio files
   - Record and upload voice stories

4. **Family Tree Visualization**
   - Interactive tree diagram
   - Show relationships visually
   - Generational layout

5. **Shared Stories**
   - Stories that involve multiple family members
   - Tagged relationships
   - Cross-references

## Notes

- All profiles currently use placeholder images from Unsplash
- Stories are sample content - replace with real family stories
- Timeline events should be customized for each person
- Family tree connections are bidirectional
- Robert and Helen include death years (1995, 2000)

