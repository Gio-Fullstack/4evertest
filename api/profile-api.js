// 4Ever Profile API
// Node.js API endpoints for profile data

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres.indbrdwzwvkimgxzyoko:wusgog-jarci3-jifCeg@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Utility function to handle database errors
const handleDbError = (res, error, message = 'Database error') => {
    console.error(message, error);
    res.status(500).json({ 
        error: message, 
        details: error.message 
    });
};

// Get profile by username or ID
app.get('/api/profile/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
        
        let query, params;
        if (isUuid) {
            query = 'SELECT * FROM profiles WHERE id = $1 AND is_public = true';
            params = [identifier];
        } else {
            query = 'SELECT * FROM profiles WHERE username = $1 AND is_public = true';
            params = [identifier];
        }
        
        const result = await pool.query(query, params);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        const profile = result.rows[0];
        
        // Get profile stats
        const statsQuery = `
            SELECT 
                (SELECT COUNT(*) FROM timeline_events WHERE profile_id = $1 AND is_public = true) as timeline_events_count,
                (SELECT COUNT(*) FROM stories WHERE profile_id = $1 AND is_public = true) as stories_count,
                (SELECT COUNT(*) FROM family_members WHERE profile_id = $1) as family_members_count
        `;
        
        const statsResult = await pool.query(statsQuery, [profile.id]);
        const stats = statsResult.rows[0];
        
        res.json({
            profile: {
                ...profile,
                stats
            }
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching profile');
    }
});

// Get timeline events for a profile
app.get('/api/profile/:profileId/timeline', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { category, limit = 50, offset = 0 } = req.query;
        
        let query = `
            SELECT * FROM timeline_events 
            WHERE profile_id = $1 AND is_public = true
        `;
        const params = [profileId];
        
        if (category && category !== 'all') {
            query += ' AND category = $2';
            params.push(category);
        }
        
        query += ' ORDER BY event_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(parseInt(limit), parseInt(offset));
        
        const result = await pool.query(query, params);
        
        res.json({
            events: result.rows,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: result.rows.length === parseInt(limit)
            }
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching timeline events');
    }
});

// Get stories for a profile
app.get('/api/profile/:profileId/stories', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { category, limit = 20, offset = 0 } = req.query;
        
        let query = `
            SELECT * FROM stories 
            WHERE profile_id = $1 AND is_public = true
        `;
        const params = [profileId];
        
        if (category && category !== 'all') {
            query += ' AND category = $2';
            params.push(category);
        }
        
        query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(parseInt(limit), parseInt(offset));
        
        const result = await pool.query(query, params);
        
        res.json({
            stories: result.rows,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: result.rows.length === parseInt(limit)
            }
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching stories');
    }
});

// Get family members for a profile
app.get('/api/profile/:profileId/family', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { generation } = req.query;
        
        let query = `
            SELECT * FROM family_members 
            WHERE profile_id = $1
        `;
        const params = [profileId];
        
        if (generation) {
            query += ' AND generation = $2';
            params.push(parseInt(generation));
        }
        
        query += ' ORDER BY generation DESC, name ASC';
        
        const result = await pool.query(query, params);
        
        // Group by generation
        const familyByGeneration = result.rows.reduce((acc, member) => {
            const gen = member.generation;
            if (!acc[gen]) {
                acc[gen] = [];
            }
            acc[gen].push(member);
            return acc;
        }, {});
        
        res.json({
            family: familyByGeneration,
            total: result.rows.length
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching family members');
    }
});

// Get family relationships for a profile
app.get('/api/profile/:profileId/relationships', async (req, res) => {
    try {
        const { profileId } = req.params;
        
        const query = `
            SELECT 
                fr.*,
                fm1.name as person1_name,
                fm2.name as person2_name
            FROM family_relationships fr
            JOIN family_members fm1 ON fr.person1_id = fm1.id
            JOIN family_members fm2 ON fr.person2_id = fm2.id
            WHERE fr.profile_id = $1
            ORDER BY fr.created_at ASC
        `;
        
        const result = await pool.query(query, [profileId]);
        
        res.json({
            relationships: result.rows
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching family relationships');
    }
});

// Like a timeline event or story
app.post('/api/like', async (req, res) => {
    try {
        const { profileId, eventId, storyId, likerName, likerIp } = req.body;
        
        if (!profileId || (!eventId && !storyId)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Check if already liked
        const checkQuery = `
            SELECT id FROM likes 
            WHERE profile_id = $1 AND liker_ip = $2 
            AND (event_id = $3 OR story_id = $4)
        `;
        
        const checkResult = await pool.query(checkQuery, [profileId, likerIp, eventId, storyId]);
        
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Already liked' });
        }
        
        // Insert like
        const insertQuery = `
            INSERT INTO likes (profile_id, event_id, story_id, liker_name, liker_ip)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        const result = await pool.query(insertQuery, [profileId, eventId, storyId, likerName, likerIp]);
        
        res.json({
            success: true,
            likeId: result.rows[0].id
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error adding like');
    }
});

// Add a comment
app.post('/api/comment', async (req, res) => {
    try {
        const { profileId, eventId, storyId, commenterName, commenterEmail, content } = req.body;
        
        if (!profileId || !content || (!eventId && !storyId)) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const query = `
            INSERT INTO comments (profile_id, event_id, story_id, commenter_name, commenter_email, content)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;
        
        const result = await pool.query(query, [profileId, eventId, storyId, commenterName, commenterEmail, content]);
        
        res.json({
            success: true,
            commentId: result.rows[0].id
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error adding comment');
    }
});

// Get comments for an event or story
app.get('/api/comments/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
        const { limit = 20, offset = 0 } = req.query;
        
        if (!['event', 'story'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type' });
        }
        
        const fieldName = type === 'event' ? 'event_id' : 'story_id';
        const query = `
            SELECT * FROM comments 
            WHERE ${fieldName} = $1 AND is_approved = true
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
        `;
        
        const result = await pool.query(query, [id, parseInt(limit), parseInt(offset)]);
        
        res.json({
            comments: result.rows,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: result.rows.length === parseInt(limit)
            }
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching comments');
    }
});

// Track profile view
app.post('/api/profile/:profileId/view', async (req, res) => {
    try {
        const { profileId } = req.params;
        const { viewerIp, userAgent, referrer } = req.body;
        
        const query = `
            INSERT INTO profile_views (profile_id, viewer_ip, viewer_user_agent, referrer)
            VALUES ($1, $2, $3, $4)
        `;
        
        await pool.query(query, [profileId, viewerIp, userAgent, referrer]);
        
        res.json({ success: true });
        
    } catch (error) {
        handleDbError(res, error, 'Error tracking view');
    }
});

// Search profiles
app.get('/api/search/profiles', async (req, res) => {
    try {
        const { q, limit = 20, offset = 0 } = req.query;
        
        if (!q || q.length < 2) {
            return res.status(400).json({ error: 'Search query must be at least 2 characters' });
        }
        
        const query = `
            SELECT id, username, display_name, bio, avatar_url, created_at
            FROM profiles 
            WHERE is_public = true 
            AND (display_name ILIKE $1 OR username ILIKE $1 OR bio ILIKE $1)
            ORDER BY 
                CASE 
                    WHEN display_name ILIKE $2 THEN 1
                    WHEN username ILIKE $2 THEN 2
                    ELSE 3
                END,
                created_at DESC
            LIMIT $3 OFFSET $4
        `;
        
        const searchTerm = `%${q}%`;
        const exactTerm = `${q}%`;
        
        const result = await pool.query(query, [searchTerm, exactTerm, parseInt(limit), parseInt(offset)]);
        
        res.json({
            profiles: result.rows,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: result.rows.length === parseInt(limit)
            }
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error searching profiles');
    }
});

// Get featured profiles
app.get('/api/profiles/featured', async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const query = `
            SELECT p.*, 
                   COUNT(te.id) as timeline_events_count,
                   COUNT(s.id) as stories_count
            FROM profiles p
            LEFT JOIN timeline_events te ON p.id = te.profile_id AND te.is_public = true
            LEFT JOIN stories s ON p.id = s.profile_id AND s.is_public = true
            WHERE p.is_public = true
            GROUP BY p.id
            HAVING COUNT(te.id) > 0 OR COUNT(s.id) > 0
            ORDER BY (COUNT(te.id) + COUNT(s.id)) DESC, p.created_at DESC
            LIMIT $1
        `;
        
        const result = await pool.query(query, [parseInt(limit)]);
        
        res.json({
            profiles: result.rows
        });
        
    } catch (error) {
        handleDbError(res, error, 'Error fetching featured profiles');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(port, () => {
    console.log(`4Ever Profile API running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
});

module.exports = app;
