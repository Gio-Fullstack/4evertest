# Profile Mode System

## Overview
The profile page now has two distinct modes: **Owner Mode** and **Visitor Mode**.

## Modes

### 🔑 Owner Mode (Your Profile)
When viewing your own profile, you see:

**Actions:**
- ✅ **Add New Story** button - Create and upload new stories
- ✅ **Edit Profile** button - Update profile information
- ❌ **No "Ask a Question"** button (you can't ask yourself questions)

**Edit Capabilities:**
- Hover over profile name or bio to see edit icon
- Click profile picture to change avatar
- All content is editable

**Visual Indicators:**
- Edit icons (✏️) appear on hover for editable fields
- Owner-only buttons are visible

### 👥 Visitor Mode (Viewing Someone Else)
When viewing another person's profile, you see:

**Actions:**
- ✅ **Ask [Name] a Question** button - Submit questions
- ❌ **No Add Story** button
- ❌ **No Edit Profile** button

**Read-Only:**
- No edit icons
- Cannot modify any content
- Can only view and interact through questions

## Implementation Details

### HTML Data Attribute
```html
<body data-profile-mode="owner">
<!-- or -->
<body data-profile-mode="visitor">
```

### CSS Classes
```css
/* Only show in visitor mode */
.visitor-only { }

/* Only show in owner mode */
.owner-only { }
```

### How Mode is Determined
Currently set via `localStorage`:
- Default: `owner` (for testing)
- In production: Determined by comparing logged-in user ID with profile owner ID

### Toggle Mode (Development Only)
Press **Ctrl + M** to toggle between owner and visitor mode for testing.

## Files Modified

1. **`profile.html`**
   - Added `data-profile-mode` attribute to body
   - Added owner-only buttons (Add Story, Edit Profile)
   - Added visitor-only button (Ask Question)
   - Added mode toggle keyboard shortcut

2. **`styles/profile.css`**
   - Added `.owner-only` and `.visitor-only` visibility rules
   - Styled new buttons (`.btn-add-story`, `.btn-edit-profile`)
   - Added `.editable-field` hover effect with edit icons

## Future Enhancements

### Add Story Modal
Will include:
- Audio recording upload
- Title and description fields
- Category selection
- Photos/videos upload
- Timeline date picker
- "Add to favorites" checkbox

### Edit Profile Modal
Will include:
- Profile picture upload
- Bio text editor
- Personal information fields
- Privacy settings

### Real Authentication
Replace localStorage mode with:
```javascript
const currentUserId = getCurrentUser().id;
const profileOwnerId = getProfileOwner().id;
const mode = currentUserId === profileOwnerId ? 'owner' : 'visitor';
```

## Testing

1. **Test Owner Mode:**
   - Refresh http://localhost:8000/profile.html
   - Should see "Add New Story" and "Edit Profile" buttons
   - Should NOT see "Ask a Question" button
   - Hover over name/bio to see edit icons

2. **Test Visitor Mode:**
   - Press **Ctrl + M** on profile page
   - Should see "Ask John a Question" button
   - Should NOT see "Add New Story" or "Edit Profile"
   - No edit icons on hover

3. **Toggle Between Modes:**
   - Press **Ctrl + M** to switch back and forth
   - Check browser console for confirmation message

