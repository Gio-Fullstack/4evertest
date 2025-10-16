# AI Phone Call Integration Guide

## Overview

4Ever allows users to call a phone number and tell their stories to an AI assistant. The AI transcribes, processes, and automatically adds the stories to their timeline.

## How It Works

### User Flow

1. **Sign Up** - User provides phone number during registration
2. **Call In** - User calls the 4Ever AI hotline (e.g., 1-800-4EVER-AI)
3. **Authenticate** - System identifies user by caller ID (phone number)
4. **Tell Story** - AI guides user through telling their story
5. **AI Processing** - AI transcribes and extracts:
   - Story title
   - Year/date
   - Category (family, career, travel, etc.)
   - Summary
   - Sentiment/tone
6. **Review** - Story appears in user's notification center for approval
7. **Publish** - User approves and story goes live on timeline

### System Flow

```
Phone Call → Twilio/Vonage → AI Processing → Database → User Approval → Timeline
```

## Database Schema

### Users Table (Updated)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,  -- ← NEW: Required for AI calls
    phone_verified BOOLEAN DEFAULT FALSE,
    phone_verification_code TEXT,
    phone_verification_expires TIMESTAMP,
    ...
);
```

### AI Call Sessions Table

Tracks each phone call:

```sql
CREATE TABLE ai_call_sessions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    phone_number TEXT NOT NULL,
    call_sid TEXT,              -- Twilio call identifier
    call_duration INTEGER,      -- Duration in seconds
    call_status TEXT,           -- 'in_progress', 'completed', 'failed'
    transcription_status TEXT,  -- 'pending', 'processing', 'completed'
    created_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

### AI Recorded Stories Table

Stores stories from phone calls before publishing:

```sql
CREATE TABLE ai_recorded_stories (
    id UUID PRIMARY KEY,
    call_session_id UUID REFERENCES ai_call_sessions(id),
    user_id UUID REFERENCES users(id),
    profile_id UUID REFERENCES profiles(id),
    audio_url TEXT NOT NULL,           -- Link to audio recording
    transcription TEXT,                -- AI transcription
    ai_extracted_title TEXT,           -- AI-generated title
    ai_extracted_year INTEGER,         -- AI-detected year
    ai_extracted_category TEXT,        -- AI-detected category
    ai_summary TEXT,                   -- AI-generated summary
    ai_sentiment TEXT,                 -- 'positive', 'nostalgic', etc.
    processing_status TEXT,            -- 'pending', 'processed', 'published'
    created_at TIMESTAMP
);
```

## API Usage

### Sign Up with Phone Number

```javascript
import api from './js/backend-api.js';

const result = await api.auth.signUp(
    'user@example.com',
    'password123',
    'John Smith',
    '+15551234567'  // Phone number
);
```

### Incoming Call Flow (Backend)

When a user calls the AI hotline:

```javascript
// 1. Identify user by caller ID
const { data: user } = await api.aiCalls.getUserByPhone(callerPhoneNumber);

// 2. Create call session
const { data: session } = await api.aiCalls.createSession(
    user.id,
    callerPhoneNumber,
    twilioCallSid
);

// 3. After call ends and AI processes audio
const aiData = {
    title: "Family Vacation to Yellowstone",
    year: 2019,
    category: "family",
    summary: "An amazing trip with the family to see Old Faithful...",
    sentiment: "joyful"
};

await api.aiCalls.saveRecording(
    session.id,
    user.id,
    audioUrl,
    transcription,
    aiData
);

// 4. Create notification for user to review
// (Automatically handled by database trigger)
```

### User Reviews Recording

In the notification center, user sees:

```
📞 New Story from AI Call
   "Family Vacation to Yellowstone"
   [Play Audio] [View Transcript] [Approve] [Edit] [Decline]
```

### Publish to Timeline

```javascript
// User approves the AI recording
await api.aiCalls.publishRecording(recordingId, profileId);

// Story automatically appears on timeline with:
// - Original audio
// - AI transcription
// - Extracted metadata
```

## AI Phone System Setup

### Recommended Stack

**Phone System:**
- **Twilio** - Phone number, call handling, recording
- **Vonage/Bandwidth** - Alternative options

**AI Processing:**
- **OpenAI Whisper** - Speech-to-text transcription
- **GPT-4** - Extract title, date, category, summary
- **Claude** - Alternative for processing

**Storage:**
- **Supabase Storage** - Store audio files
- **S3** - Alternative for large scale

### Twilio Setup

1. **Get Twilio Account**
   - Sign up at twilio.com
   - Get phone number (e.g., +1-800-4EVER-AI)
   - Get API credentials

2. **Configure Webhook**
   ```javascript
   // When call comes in, Twilio hits your webhook:
   POST /api/incoming-call
   {
     "CallSid": "CA123...",
     "From": "+15551234567",
     "To": "+18004383724"
   }
   ```

3. **Handle Call**
   ```javascript
   // Identify user
   const user = await api.aiCalls.getUserByPhone(phoneNumber);
   
   // Create session
   const session = await api.aiCalls.createSession(user.id, phoneNumber, callSid);
   
   // Play AI greeting
   // "Hi John! Thanks for calling 4Ever. Tell me a story from your life..."
   
   // Record story
   // AI asks follow-up questions
   // AI confirms details
   ```

4. **Process Recording**
   ```javascript
   // After call ends
   const transcription = await whisperAPI.transcribe(audioUrl);
   
   const aiAnalysis = await gpt4.analyze(transcription);
   // Returns: { title, year, category, summary, sentiment }
   
   await api.aiCalls.saveRecording(
     session.id,
     user.id,
     audioUrl,
     transcription,
     aiAnalysis
   );
   ```

### Sample AI Conversation Flow

```
AI: "Hi! Thanks for calling 4Ever. Who am I speaking with?"
User: "This is John Smith"

AI: "Great to hear from you, John! What story would you like to share today?"
User: "I want to tell you about our family vacation to Yellowstone in 2019..."

AI: "That sounds wonderful! Please go ahead and tell me all about it."
User: [Tells 2-minute story]

AI: "Thank you for sharing that beautiful memory! Let me confirm the details:
     - Title: Family Vacation to Yellowstone
     - Year: 2019
     - Category: Family & Travel
     Is that correct?"

User: "Yes, that's right"

AI: "Perfect! Your story has been saved and will appear in your notification center 
     for review. You can approve it and it will be added to your timeline. 
     Is there anything else you'd like to share today?"
```

## Phone Number Verification (Optional)

For security, you may want to verify phone numbers:

```javascript
// Send verification code
async function sendVerificationCode(phoneNumber) {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    
    await twilioClient.messages.create({
        body: `Your 4Ever verification code is: ${code}`,
        from: '+18004383724',
        to: phoneNumber
    });
    
    // Save code in database
    await supabase
        .from('users')
        .update({
            phone_verification_code: code,
            phone_verification_expires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        })
        .eq('phone_number', phoneNumber);
}

// Verify code
async function verifyPhoneNumber(phoneNumber, code) {
    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .eq('phone_verification_code', code)
        .gte('phone_verification_expires', new Date())
        .single();
    
    if (user) {
        await supabase
            .from('users')
            .update({ phone_verified: true })
            .eq('id', user.id);
        return true;
    }
    return false;
}
```

## AI Processing Logic

### Example GPT-4 Prompt

```javascript
const prompt = `
Analyze this story transcription and extract the following information:

Transcription: "${transcription}"

Extract:
1. Title (concise, descriptive)
2. Year (when the event happened)
3. Category (family, career, travel, education, milestone, childhood, other)
4. Summary (2-3 sentences)
5. Sentiment (joyful, nostalgic, bittersweet, proud, etc.)

Return as JSON.
`;

const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
});

const aiData = JSON.parse(response.choices[0].message.content);
// { title: "...", year: 2019, category: "family", summary: "...", sentiment: "joyful" }
```

## Notification Center Integration

AI recordings appear in a new notification type:

```javascript
// In notification center, add new tab:
<button class="tab" data-tab="ai-recordings">
    AI Recordings
    <span class="badge" id="aiRecordingsCount">2</span>
</button>

// Show AI recordings with:
// - Play audio button
// - Read transcript
// - See AI-extracted details
// - Edit before publishing
// - Approve → goes to timeline
// - Decline → archives recording
```

## Security & Privacy

### Phone Number Protection

- Phone numbers are hashed for caller ID lookup
- Only last 4 digits shown in UI
- Never shared with other users
- Used only for authentication

### Call Recording Consent

- First call: "This call will be recorded for quality and to create your story"
- User must say "I agree" to continue
- Opt-out available anytime

### Data Retention

- Call recordings: 90 days
- Transcriptions: Permanent (if published)
- Failed calls: 30 days

## Cost Estimates

### Twilio Pricing (approximate)

- Phone number: $1/month
- Incoming calls: $0.0085/minute
- Recording storage: $0.0025/minute
- SMS (verification): $0.0075/message

**Example:**
- 100 users calling 5 minutes/month each
- Total: 500 minutes
- Cost: ~$4.25/month + $1 phone number = $5.25/month

### AI Processing (OpenAI)

- Whisper (transcription): $0.006/minute
- GPT-4 (analysis): ~$0.02/story

**Example:**
- 100 stories/month @ 3 minutes each
- Whisper: $1.80
- GPT-4: $2.00
- Total: ~$3.80/month

**Total System Cost:** ~$10/month for 100 active users

## Implementation Checklist

### Phase 1: Basic Setup
- [x] Add phone number to signup
- [x] Update database schema
- [x] Add phone number to user profile
- [ ] Set up Twilio account
- [ ] Configure Twilio webhook
- [ ] Deploy webhook endpoint

### Phase 2: AI Integration
- [ ] Integrate Whisper API for transcription
- [ ] Set up GPT-4 for story analysis
- [ ] Build AI conversation flow
- [ ] Test end-to-end workflow

### Phase 3: User Experience
- [ ] Add AI recordings tab to notification center
- [ ] Build audio player for recordings
- [ ] Add edit functionality before publishing
- [ ] Create phone settings page

### Phase 4: Advanced Features
- [ ] Multi-language support
- [ ] Voice recognition for multiple family members
- [ ] Automatic photo matching from Google Photos
- [ ] AI-suggested tags and connections

## Testing

### Local Testing

1. Use Twilio test credentials
2. Simulate incoming call with test phone number
3. Use pre-recorded audio for transcription
4. Test AI extraction logic

### Sample Test Data

```javascript
const testRecording = {
    phoneNumber: '+15551234567',
    audioUrl: 'https://storage/test-recording.mp3',
    transcription: 'In 2019, my family and I took an amazing trip to Yellowstone...',
    aiExtracted: {
        title: 'Family Trip to Yellowstone',
        year: 2019,
        category: 'travel',
        summary: 'Family vacation to Yellowstone National Park...',
        sentiment: 'joyful'
    }
};
```

## Troubleshooting

### Common Issues

**Phone number not recognized:**
- Ensure phone number is verified
- Check format (+1 vs 1 vs no country code)
- Verify user exists in database

**Transcription errors:**
- Check audio quality
- Verify Whisper API credentials
- Ensure audio format is supported (MP3, WAV, M4A)

**AI extraction failed:**
- Check GPT-4 API key
- Verify prompt format
- Review transcription quality

## Future Enhancements

### Voice Biometrics
- Recognize different family members by voice
- Automatically attribute stories to correct person
- Security: Prevent unauthorized access

### Smart Questions
- AI asks contextual follow-up questions
- "Who was with you on this trip?"
- "What year did this happen?"
- "How did this make you feel?"

### Emotion Detection
- Detect emotions in voice (joy, sadness, nostalgia)
- Tag stories with emotional context
- Create emotional journey through timeline

### Multi-Person Calls
- Conference calls for family story sessions
- Multiple perspectives on same event
- Collaborative storytelling

## Support

For technical support with AI integration:
- Twilio docs: https://www.twilio.com/docs
- OpenAI Whisper: https://platform.openai.com/docs/guides/speech-to-text
- GPT-4 API: https://platform.openai.com/docs/guides/gpt

## Next Steps

1. **Test the signup flow** with phone number
2. **Set up Twilio account** and get a phone number
3. **Configure AI processing** with OpenAI
4. **Build webhook endpoint** to handle incoming calls
5. **Deploy and test** end-to-end

---

**Phone Number Format Support:**
- US: +1 (555) 123-4567
- International: +44 20 1234 5678
- Stored normalized: +15551234567

