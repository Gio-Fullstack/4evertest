-- 4Ever Profile Page Database Schema
-- This schema supports the profile page with timeline and family tree features

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    birth_date DATE,
    birth_place VARCHAR(255),
    death_date DATE,
    death_place VARCHAR(255),
    is_public BOOLEAN DEFAULT true,
    allow_comments BOOLEAN DEFAULT true,
    theme_preference VARCHAR(20) DEFAULT 'default',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create timeline_events table
CREATE TABLE IF NOT EXISTS timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- birth, marriage, career, travel, family, milestone, etc.
    category VARCHAR(50) DEFAULT 'general', -- milestones, family, career, travel, etc.
    location VARCHAR(255),
    media_urls TEXT[], -- Array of image/video URLs
    audio_url TEXT, -- Audio story URL
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stories table (longer form content)
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    audio_url TEXT,
    audio_duration INTEGER, -- Duration in seconds
    cover_image_url TEXT,
    category VARCHAR(50) DEFAULT 'general',
    tags TEXT[], -- Array of tags
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create family_members table
CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(50) NOT NULL, -- father, mother, son, daughter, brother, sister, etc.
    birth_date DATE,
    death_date DATE,
    avatar_url TEXT,
    bio TEXT,
    generation INTEGER, -- 1 = children, 2 = parents, 3 = grandparents, etc.
    is_primary BOOLEAN DEFAULT false, -- Is this the main profile owner
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create family_relationships table (for complex family trees)
CREATE TABLE IF NOT EXISTS family_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    person1_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
    person2_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL, -- parent, child, sibling, spouse, etc.
    relationship_direction VARCHAR(20) NOT NULL, -- from_person1_to_person2, bidirectional
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES timeline_events(id) ON DELETE CASCADE,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    commenter_name VARCHAR(255) NOT NULL,
    commenter_email VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES timeline_events(id) ON DELETE CASCADE,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    liker_ip INET,
    liker_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, event_id, liker_ip),
    UNIQUE(profile_id, story_id, liker_ip)
);

-- Create profile_views table (for analytics)
CREATE TABLE IF NOT EXISTS profile_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    viewer_ip INET,
    viewer_user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(is_public);
CREATE INDEX IF NOT EXISTS idx_timeline_events_profile_id ON timeline_events(profile_id);
CREATE INDEX IF NOT EXISTS idx_timeline_events_date ON timeline_events(event_date);
CREATE INDEX IF NOT EXISTS idx_timeline_events_type ON timeline_events(event_type);
CREATE INDEX IF NOT EXISTS idx_timeline_events_category ON timeline_events(category);
CREATE INDEX IF NOT EXISTS idx_timeline_events_public ON timeline_events(is_public);
CREATE INDEX IF NOT EXISTS idx_stories_profile_id ON stories(profile_id);
CREATE INDEX IF NOT EXISTS idx_stories_category ON stories(category);
CREATE INDEX IF NOT EXISTS idx_stories_public ON stories(is_public);
CREATE INDEX IF NOT EXISTS idx_family_members_profile_id ON family_members(profile_id);
CREATE INDEX IF NOT EXISTS idx_family_members_relationship ON family_members(relationship);
CREATE INDEX IF NOT EXISTS idx_family_members_generation ON family_members(generation);
CREATE INDEX IF NOT EXISTS idx_family_relationships_profile_id ON family_relationships(profile_id);
CREATE INDEX IF NOT EXISTS idx_comments_profile_id ON comments(profile_id);
CREATE INDEX IF NOT EXISTS idx_comments_event_id ON comments(event_id);
CREATE INDEX IF NOT EXISTS idx_comments_story_id ON comments(story_id);
CREATE INDEX IF NOT EXISTS idx_likes_profile_id ON likes(profile_id);
CREATE INDEX IF NOT EXISTS idx_likes_event_id ON likes(event_id);
CREATE INDEX IF NOT EXISTS idx_likes_story_id ON likes(story_id);
CREATE INDEX IF NOT EXISTS idx_profile_views_profile_id ON profile_views(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_views_date ON profile_views(viewed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for timeline_events
CREATE POLICY "Public timeline events are viewable by everyone" ON timeline_events
    FOR SELECT USING (
        is_public = true AND 
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = timeline_events.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own timeline events" ON timeline_events
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own timeline events" ON timeline_events
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own timeline events" ON timeline_events
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own timeline events" ON timeline_events
    FOR DELETE USING (auth.uid() = profile_id);

-- Create RLS policies for stories
CREATE POLICY "Public stories are viewable by everyone" ON stories
    FOR SELECT USING (
        is_public = true AND 
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = stories.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own stories" ON stories
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own stories" ON stories
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own stories" ON stories
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own stories" ON stories
    FOR DELETE USING (auth.uid() = profile_id);

-- Create RLS policies for family_members
CREATE POLICY "Public family members are viewable by everyone" ON family_members
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = family_members.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own family members" ON family_members
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own family members" ON family_members
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own family members" ON family_members
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own family members" ON family_members
    FOR DELETE USING (auth.uid() = profile_id);

-- Create RLS policies for family_relationships
CREATE POLICY "Public family relationships are viewable by everyone" ON family_relationships
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = family_relationships.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own family relationships" ON family_relationships
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own family relationships" ON family_relationships
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own family relationships" ON family_relationships
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own family relationships" ON family_relationships
    FOR DELETE USING (auth.uid() = profile_id);

-- Create RLS policies for comments
CREATE POLICY "Approved comments are viewable by everyone" ON comments
    FOR SELECT USING (
        is_approved = true AND
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = comments.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own profile comments" ON comments
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert comments on public profiles" ON comments
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = comments.profile_id AND profiles.is_public = true AND profiles.allow_comments = true)
    );

CREATE POLICY "Users can update own profile comments" ON comments
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own profile comments" ON comments
    FOR DELETE USING (auth.uid() = profile_id);

-- Create RLS policies for likes
CREATE POLICY "Public likes are viewable by everyone" ON likes
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = likes.profile_id AND profiles.is_public = true)
    );

CREATE POLICY "Users can view own profile likes" ON likes
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert likes on public profiles" ON likes
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.id = likes.profile_id AND profiles.is_public = true)
    );

-- Create RLS policies for profile_views
CREATE POLICY "Users can view own profile analytics" ON profile_views
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert profile views" ON profile_views
    FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at BEFORE UPDATE ON timeline_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update likes count
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.event_id IS NOT NULL THEN
            UPDATE timeline_events SET likes_count = likes_count + 1 WHERE id = NEW.event_id;
        END IF;
        IF NEW.story_id IS NOT NULL THEN
            UPDATE stories SET likes_count = likes_count + 1 WHERE id = NEW.story_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.event_id IS NOT NULL THEN
            UPDATE timeline_events SET likes_count = likes_count - 1 WHERE id = OLD.event_id;
        END IF;
        IF OLD.story_id IS NOT NULL THEN
            UPDATE stories SET likes_count = likes_count - 1 WHERE id = OLD.story_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for likes count
CREATE TRIGGER update_likes_count_trigger
    AFTER INSERT OR DELETE ON likes
    FOR EACH ROW EXECUTE FUNCTION update_likes_count();

-- Create function to update comments count
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.event_id IS NOT NULL THEN
            UPDATE timeline_events SET comments_count = comments_count + 1 WHERE id = NEW.event_id;
        END IF;
        IF NEW.story_id IS NOT NULL THEN
            UPDATE stories SET comments_count = comments_count + 1 WHERE id = NEW.story_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.event_id IS NOT NULL THEN
            UPDATE timeline_events SET comments_count = comments_count - 1 WHERE id = OLD.event_id;
        END IF;
        IF OLD.story_id IS NOT NULL THEN
            UPDATE stories SET comments_count = comments_count - 1 WHERE id = OLD.story_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for comments count
CREATE TRIGGER update_comments_count_trigger
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_comments_count();

-- Create function to update views count
CREATE OR REPLACE FUNCTION update_views_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE stories SET views_count = views_count + 1 WHERE id = NEW.story_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Insert sample data for testing
INSERT INTO profiles (id, username, display_name, bio, birth_date, birth_place, is_public) VALUES
    ('00000000-0000-0000-0000-000000000001', 'johnsmith', 'John Smith', 'Born in 1950, father of three, grandfather of seven. Lived a life full of adventure, love, and countless stories worth preserving.', '1950-03-15', 'Chicago, IL', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO family_members (profile_id, name, relationship, birth_date, death_date, generation, is_primary) VALUES
    ('00000000-0000-0000-0000-000000000001', 'John Smith', 'self', '1950-03-15', NULL, 2, true),
    ('00000000-0000-0000-0000-000000000001', 'Mary Smith', 'spouse', '1952-07-22', NULL, 2, false),
    ('00000000-0000-0000-0000-000000000001', 'Robert Smith', 'father', '1920-01-10', '1995-12-03', 3, false),
    ('00000000-0000-0000-0000-000000000001', 'Helen Smith', 'mother', '1925-05-18', '2000-08-14', 3, false),
    ('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 'daughter', '1982-04-12', NULL, 1, false),
    ('00000000-0000-0000-0000-000000000001', 'Michael Smith', 'son', '1985-09-08', NULL, 1, false),
    ('00000000-0000-0000-0000-000000000001', 'Emily Smith', 'daughter', '1988-11-25', NULL, 1, false)
ON CONFLICT DO NOTHING;

INSERT INTO timeline_events (profile_id, title, description, event_date, event_type, category, location, is_public, is_featured) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Born in Chicago', 'Born to loving parents in the heart of Chicago. The beginning of an incredible journey.', '1950-03-15', 'birth', 'milestones', 'Chicago, IL', true, true),
    ('00000000-0000-0000-0000-000000000001', 'Married Mary Johnson', 'The love of my life. We met at a coffee shop and knew instantly we were meant to be together.', '1975-06-14', 'marriage', 'family', 'Chicago, IL', true, true),
    ('00000000-0000-0000-0000-000000000001', 'Started Teaching Career', 'Began teaching high school mathematics. Touched the lives of thousands of students over 35 years.', '1980-09-01', 'career_start', 'career', 'Chicago, IL', true, false),
    ('00000000-0000-0000-0000-000000000001', 'First Child Born', 'Sarah was born on a beautiful spring morning. The joy of becoming a father is indescribable.', '1982-04-12', 'child_birth', 'family', 'Chicago, IL', true, true)
ON CONFLICT DO NOTHING;

INSERT INTO stories (profile_id, title, content, excerpt, category, is_public, is_featured) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Growing Up in Chicago', 'Full story content about childhood in Chicago...', 'Memories of my childhood neighborhood, the friends I made, and the adventures we had...', 'childhood', true, true),
    ('00000000-0000-0000-0000-000000000001', 'The Day I Met Mary', 'Full story content about meeting Mary...', 'It was a rainy Tuesday in March when I walked into that little coffee shop...', 'family', true, true),
    ('00000000-0000-0000-0000-000000000001', 'My Teaching Journey', 'Full story content about teaching career...', '35 years of teaching mathematics, the students who changed my life, and the lessons I learned...', 'career', true, false)
ON CONFLICT DO NOTHING;
