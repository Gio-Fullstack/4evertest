-- 4Ever Complete Database Schema
-- This schema includes all tables for notifications, stories, connections, profiles, and more

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS & PROFILES
-- =====================================================

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    phone_verification_code TEXT,
    phone_verification_expires TIMESTAMP WITH TIME ZONE
);

-- Profiles table (user profile information)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_slug TEXT UNIQUE NOT NULL, -- e.g., 'john-smith'
    full_name TEXT NOT NULL,
    birth_year INTEGER,
    birth_month INTEGER,
    birth_day INTEGER,
    death_year INTEGER,
    death_month INTEGER,
    death_day INTEGER,
    bio TEXT,
    avatar_url TEXT,
    location TEXT,
    occupation TEXT,
    is_deceased BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile relationships (family tree)
CREATE TABLE IF NOT EXISTS profile_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    related_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL, -- 'parent', 'child', 'spouse', 'sibling'
    relationship_label TEXT, -- 'Father', 'Mother', 'Son', 'Daughter', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, related_profile_id, relationship_type)
);

-- =====================================================
-- CONNECTIONS & FRIENDS
-- =====================================================

-- Connection requests
CREATE TABLE IF NOT EXISTS connection_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(from_user_id, to_user_id)
);

-- Connections (accepted connections)
CREATE TABLE IF NOT EXISTS connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    connected_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    connection_type TEXT DEFAULT 'connection', -- 'connection', 'close_friend', 'family'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, connected_user_id)
);

-- =====================================================
-- STORIES & TIMELINE
-- =====================================================

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    author_user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'family', 'career', 'travel', 'education', 'milestone', 'other'
    year INTEGER,
    month INTEGER,
    day INTEGER,
    privacy TEXT DEFAULT 'connections', -- 'private', 'family', 'connections', 'close_friends', 'public'
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'published'
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id)
);

-- Story media (photos/videos)
CREATE TABLE IF NOT EXISTS story_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL, -- 'image', 'video', 'audio'
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Story tags (people tagged in stories)
CREATE TABLE IF NOT EXISTS story_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(story_id, profile_id)
);

-- Story co-authors
CREATE TABLE IF NOT EXISTS story_coauthors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(story_id, user_id)
);

-- Story reactions
CREATE TABLE IF NOT EXISTS story_reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL, -- 'love', 'laugh', 'wow', 'sad'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(story_id, user_id)
);

-- =====================================================
-- QUESTIONS & ANSWERS
-- =====================================================

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    asker_user_id UUID REFERENCES users(id),
    question_text TEXT NOT NULL,
    category TEXT, -- 'childhood', 'career', 'family', 'general'
    is_anonymous BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending', -- 'pending', 'answered', 'declined'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    answered_at TIMESTAMP WITH TIME ZONE
);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    audio_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL, -- 'connection_request', 'story_request', 'tag', 'question', 'comment', 'reaction'
    title TEXT NOT NULL,
    message TEXT,
    link_url TEXT,
    related_id UUID, -- ID of related entity (story, question, etc.)
    from_user_id UUID REFERENCES users(id),
    is_read BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2),
    price_yearly DECIMAL(10, 2),
    max_profiles INTEGER,
    max_storage_gb INTEGER,
    features JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'past_due'
    billing_period TEXT, -- 'monthly', 'yearly'
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AI PHONE RECORDINGS
-- =====================================================

-- AI phone call sessions
CREATE TABLE IF NOT EXISTS ai_call_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    call_sid TEXT, -- Twilio call SID or similar
    call_duration INTEGER, -- Duration in seconds
    call_status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
    transcription_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- AI recorded stories (from phone calls)
CREATE TABLE IF NOT EXISTS ai_recorded_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_session_id UUID REFERENCES ai_call_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id),
    audio_url TEXT NOT NULL,
    transcription TEXT,
    ai_extracted_title TEXT,
    ai_extracted_year INTEGER,
    ai_extracted_category TEXT,
    ai_summary TEXT,
    ai_sentiment TEXT, -- 'positive', 'nostalgic', 'emotional', etc.
    processing_status TEXT DEFAULT 'pending', -- 'pending', 'processed', 'published'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- ACTIVITY LOG
-- =====================================================

-- Activity log (for tracking user actions)
CREATE TABLE IF NOT EXISTS activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action_type TEXT NOT NULL, -- 'login', 'story_created', 'profile_updated', 'ai_call', etc.
    entity_type TEXT, -- 'story', 'profile', 'connection', 'ai_call', etc.
    entity_id UUID,
    metadata JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone_number ON users(phone_number);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Profiles indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_slug ON profiles(profile_slug);
CREATE INDEX idx_profiles_created_by ON profiles(created_by);

-- Stories indexes
CREATE INDEX idx_stories_profile_id ON stories(profile_id);
CREATE INDEX idx_stories_author_user_id ON stories(author_user_id);
CREATE INDEX idx_stories_status ON stories(status);
CREATE INDEX idx_stories_created_at ON stories(created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Connections indexes
CREATE INDEX idx_connection_requests_to_user_id ON connection_requests(to_user_id);
CREATE INDEX idx_connection_requests_from_user_id ON connection_requests(from_user_id);
CREATE INDEX idx_connection_requests_status ON connection_requests(status);

-- AI call indexes
CREATE INDEX idx_ai_call_sessions_user_id ON ai_call_sessions(user_id);
CREATE INDEX idx_ai_call_sessions_phone_number ON ai_call_sessions(phone_number);
CREATE INDEX idx_ai_recorded_stories_user_id ON ai_recorded_stories(user_id);
CREATE INDEX idx_ai_recorded_stories_call_session_id ON ai_recorded_stories(call_session_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY users_select_own ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY users_update_own ON users FOR UPDATE USING (auth.uid() = id);

-- Profiles policies
CREATE POLICY profiles_select_all ON profiles FOR SELECT USING (is_public = true OR user_id = auth.uid());
CREATE POLICY profiles_insert_own ON profiles FOR INSERT WITH CHECK (user_id = auth.uid() OR created_by = auth.uid());
CREATE POLICY profiles_update_own ON profiles FOR UPDATE USING (user_id = auth.uid() OR created_by = auth.uid());

-- Stories policies
CREATE POLICY stories_select_approved ON stories FOR SELECT USING (
    status = 'published' OR author_user_id = auth.uid() OR 
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY stories_insert_own ON stories FOR INSERT WITH CHECK (author_user_id = auth.uid());
CREATE POLICY stories_update_own ON stories FOR UPDATE USING (
    author_user_id = auth.uid() OR 
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

-- Notifications policies
CREATE POLICY notifications_select_own ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY notifications_update_own ON notifications FOR UPDATE USING (user_id = auth.uid());

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification when story is submitted
CREATE OR REPLACE FUNCTION create_story_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'pending' AND TG_OP = 'INSERT' THEN
        INSERT INTO notifications (
            user_id,
            notification_type,
            title,
            message,
            related_id,
            from_user_id
        )
        SELECT
            p.user_id,
            'story_request',
            'New Story Pending Approval',
            'Someone added a story about ' || p.full_name,
            NEW.id,
            NEW.author_user_id
        FROM profiles p
        WHERE p.id = NEW.profile_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER story_notification_trigger
AFTER INSERT ON stories
FOR EACH ROW EXECUTE FUNCTION create_story_notification();

-- Function to create notification for connection request
CREATE OR REPLACE FUNCTION create_connection_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'pending' AND TG_OP = 'INSERT' THEN
        INSERT INTO notifications (
            user_id,
            notification_type,
            title,
            message,
            related_id,
            from_user_id
        )
        VALUES (
            NEW.to_user_id,
            'connection_request',
            'New Connection Request',
            'Someone wants to connect with you',
            NEW.id,
            NEW.from_user_id
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER connection_notification_trigger
AFTER INSERT ON connection_requests
FOR EACH ROW EXECUTE FUNCTION create_connection_notification();

-- =====================================================
-- SEED DATA (Optional)
-- =====================================================

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, max_profiles, max_storage_gb, features)
VALUES
    ('Free', 'Perfect for getting started', 0, 0, 3, 1, '{"features": ["3 profiles", "1GB storage", "Basic timeline", "Story submissions"]}'),
    ('Family', 'For small families', 9.99, 99, 10, 10, '{"features": ["10 profiles", "10GB storage", "Advanced timeline", "Priority support", "Custom themes"]}'),
    ('Legacy', 'For large families and genealogy', 19.99, 199, 50, 50, '{"features": ["50 profiles", "50GB storage", "Unlimited stories", "Advanced family tree", "Premium support", "Custom domain"]}'),
    ('Lifetime', 'One-time payment forever', 299, 299, 100, 100, '{"features": ["Unlimited profiles", "100GB storage", "Everything included", "Lifetime updates", "VIP support"]}')
ON CONFLICT DO NOTHING;

