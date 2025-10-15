-- 4Ever Database Schema
-- Run these commands in your Supabase SQL editor

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    referral VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (for future user accounts)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    story_type VARCHAR(50) DEFAULT 'personal', -- personal, family, celebrity, etc.
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    metadata JSONB, -- Store additional story metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create timeline_events table
CREATE TABLE IF NOT EXISTS timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    event_type VARCHAR(50), -- birth, marriage, achievement, etc.
    media_urls TEXT[], -- Array of media URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create family_relationships table
CREATE TABLE IF NOT EXISTS family_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    person1_id UUID, -- Could reference a separate people table
    person2_id UUID,
    relationship_type VARCHAR(50), -- parent, child, sibling, spouse, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_story_id ON timeline_events(story_id);
CREATE INDEX IF NOT EXISTS idx_family_relationships_user_id ON family_relationships(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_relationships ENABLE ROW LEVEL SECURITY;

-- Create policies for waitlist (public read/write for signups)
CREATE POLICY "Allow public waitlist signups" ON waitlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public waitlist reads" ON waitlist
    FOR SELECT USING (true);

-- Create policies for users (authenticated users only)
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Create policies for stories (users can only access their own stories)
CREATE POLICY "Users can view own stories" ON stories
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stories" ON stories
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stories" ON stories
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stories" ON stories
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for timeline events
CREATE POLICY "Users can view own timeline events" ON timeline_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = timeline_events.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own timeline events" ON timeline_events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = timeline_events.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own timeline events" ON timeline_events
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = timeline_events.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own timeline events" ON timeline_events
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = timeline_events.story_id 
            AND stories.user_id = auth.uid()
        )
    );

-- Create policies for family relationships
CREATE POLICY "Users can view own family relationships" ON family_relationships
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own family relationships" ON family_relationships
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own family relationships" ON family_relationships
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own family relationships" ON family_relationships
    FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
