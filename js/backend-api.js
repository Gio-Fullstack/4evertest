// 4Ever Backend API Service
// Handles all backend operations with Supabase

import { supabase } from './supabase-client.js';

// =====================================================
// AUTHENTICATION
// =====================================================

export const auth = {
    // Sign up new user
    async signUp(email, password, fullName, phoneNumber) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        phone_number: phoneNumber
                    }
                }
            });
            if (error) throw error;
            
            // Store phone number in users table
            if (data.user) {
                await supabase
                    .from('users')
                    .update({ phone_number: phoneNumber })
                    .eq('id', data.user.id);
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }
};

// =====================================================
// PROFILES
// =====================================================

export const profiles = {
    // Get profile by slug
    async getBySlug(slug) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('profile_slug', slug)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get profile error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get all profiles for a user
    async getUserProfiles(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .or(`user_id.eq.${userId},created_by.eq.${userId}`)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get user profiles error:', error);
            return { success: false, error: error.message };
        }
    },

    // Create new profile
    async create(profileData) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .insert([profileData])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Create profile error:', error);
            return { success: false, error: error.message };
        }
    },

    // Update profile
    async update(profileId, updates) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', profileId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get family tree
    async getFamilyTree(profileId) {
        try {
            const { data, error } = await supabase
                .from('profile_relationships')
                .select(`
                    *,
                    related_profile:profiles!related_profile_id(*)
                `)
                .eq('profile_id', profileId);
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get family tree error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// STORIES
// =====================================================

export const stories = {
    // Submit new story
    async submit(storyData) {
        try {
            const { data, error } = await supabase
                .from('stories')
                .insert([storyData])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Submit story error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get pending stories for a profile owner
    async getPendingForProfile(profileId) {
        try {
            const { data, error} = await supabase
                .from('stories')
                .select(`
                    *,
                    author:users!author_user_id(email),
                    profile:profiles!profile_id(full_name, profile_slug),
                    tags:story_tags(
                        profile:profiles(full_name, profile_slug)
                    )
                `)
                .eq('profile_id', profileId)
                .eq('status', 'pending')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get pending stories error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get all stories for a profile (approved only)
    async getForProfile(profileId) {
        try {
            const { data, error } = await supabase
                .from('stories')
                .select(`
                    *,
                    author:users!author_user_id(email),
                    media:story_media(*),
                    tags:story_tags(
                        profile:profiles(full_name, profile_slug, avatar_url)
                    )
                `)
                .eq('profile_id', profileId)
                .eq('status', 'published')
                .order('year', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get stories error:', error);
            return { success: false, error: error.message };
        }
    },

    // Approve story
    async approve(storyId, approverUserId) {
        try {
            const { data, error } = await supabase
                .from('stories')
                .update({
                    status: 'published',
                    approved_at: new Date().toISOString(),
                    approved_by: approverUserId
                })
                .eq('id', storyId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Approve story error:', error);
            return { success: false, error: error.message };
        }
    },

    // Reject story
    async reject(storyId) {
        try {
            const { data, error } = await supabase
                .from('stories')
                .update({ status: 'rejected' })
                .eq('id', storyId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Reject story error:', error);
            return { success: false, error: error.message };
        }
    },

    // Add story tags
    async addTags(storyId, profileIds) {
        try {
            const tags = profileIds.map(profileId => ({
                story_id: storyId,
                profile_id: profileId
            }));

            const { data, error } = await supabase
                .from('story_tags')
                .insert(tags)
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Add story tags error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// CONNECTIONS
// =====================================================

export const connections = {
    // Send connection request
    async sendRequest(fromUserId, toUserId, message = '') {
        try {
            const { data, error } = await supabase
                .from('connection_requests')
                .insert([{
                    from_user_id: fromUserId,
                    to_user_id: toUserId,
                    message: message
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Send connection request error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get pending connection requests
    async getPendingRequests(userId) {
        try {
            const { data, error } = await supabase
                .from('connection_requests')
                .select(`
                    *,
                    from_user:users!from_user_id(email),
                    from_profile:profiles!from_user_id(full_name, avatar_url, profile_slug)
                `)
                .eq('to_user_id', userId)
                .eq('status', 'pending')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get pending requests error:', error);
            return { success: false, error: error.message };
        }
    },

    // Accept connection request
    async acceptRequest(requestId, userId, connectedUserId) {
        try {
            // Update request status
            const { error: updateError } = await supabase
                .from('connection_requests')
                .update({ 
                    status: 'accepted',
                    responded_at: new Date().toISOString()
                })
                .eq('id', requestId);
            
            if (updateError) throw updateError;

            // Create bidirectional connection
            const { data, error } = await supabase
                .from('connections')
                .insert([
                    { user_id: userId, connected_user_id: connectedUserId },
                    { user_id: connectedUserId, connected_user_id: userId }
                ])
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Accept connection error:', error);
            return { success: false, error: error.message };
        }
    },

    // Reject connection request
    async rejectRequest(requestId) {
        try {
            const { data, error } = await supabase
                .from('connection_requests')
                .update({ 
                    status: 'rejected',
                    responded_at: new Date().toISOString()
                })
                .eq('id', requestId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Reject connection error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user's connections
    async getConnections(userId) {
        try {
            const { data, error } = await supabase
                .from('connections')
                .select(`
                    *,
                    connected_profile:profiles!connected_user_id(*)
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get connections error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// QUESTIONS
// =====================================================

export const questions = {
    // Submit question
    async submit(questionData) {
        try {
            const { data, error } = await supabase
                .from('questions')
                .insert([questionData])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Submit question error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get pending questions for a profile
    async getPendingForProfile(profileId) {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select(`
                    *,
                    asker:users!asker_user_id(email),
                    profile:profiles!profile_id(full_name, profile_slug)
                `)
                .eq('profile_id', profileId)
                .eq('status', 'pending')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get pending questions error:', error);
            return { success: false, error: error.message };
        }
    },

    // Answer question
    async answer(questionId, answerText) {
        try {
            // Update question status
            await supabase
                .from('questions')
                .update({ 
                    status: 'answered',
                    answered_at: new Date().toISOString()
                })
                .eq('id', questionId);

            // Insert answer
            const { data, error } = await supabase
                .from('answers')
                .insert([{
                    question_id: questionId,
                    answer_text: answerText
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Answer question error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// NOTIFICATIONS
// =====================================================

export const notifications = {
    // Get all notifications for user
    async getAll(userId, includeRead = false) {
        try {
            let query = supabase
                .from('notifications')
                .select(`
                    *,
                    from_user:users!from_user_id(email),
                    from_profile:profiles!from_user_id(full_name, avatar_url)
                `)
                .eq('user_id', userId)
                .eq('is_archived', false)
                .order('created_at', { ascending: false });
            
            if (!includeRead) {
                query = query.eq('is_read', false);
            }

            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get notifications error:', error);
            return { success: false, error: error.message };
        }
    },

    // Mark notification as read
    async markAsRead(notificationId) {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ 
                    is_read: true,
                    read_at: new Date().toISOString()
                })
                .eq('id', notificationId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Mark notification as read error:', error);
            return { success: false, error: error.message };
        }
    },

    // Mark all as read
    async markAllAsRead(userId) {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ 
                    is_read: true,
                    read_at: new Date().toISOString()
                })
                .eq('user_id', userId)
                .eq('is_read', false)
                .select();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Mark all as read error:', error);
            return { success: false, error: error.message };
        }
    },

    // Archive notification
    async archive(notificationId) {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ is_archived: true })
                .eq('id', notificationId)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Archive notification error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get unread count
    async getUnreadCount(userId) {
        try {
            const { count, error } = await supabase
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('is_read', false)
                .eq('is_archived', false);
            
            if (error) throw error;
            return { success: true, count };
        } catch (error) {
            console.error('Get unread count error:', error);
            return { success: false, error: error.message, count: 0 };
        }
    }
};

// =====================================================
// SUBSCRIPTIONS
// =====================================================

export const subscriptions = {
    // Get all plans
    async getPlans() {
        try {
            const { data, error } = await supabase
                .from('subscription_plans')
                .select('*')
                .eq('is_active', true)
                .order('price_monthly', { ascending: true });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get plans error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user subscription
    async getUserSubscription(userId) {
        try {
            const { data, error } = await supabase
                .from('user_subscriptions')
                .select(`
                    *,
                    plan:subscription_plans(*)
                `)
                .eq('user_id', userId)
                .eq('status', 'active')
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get user subscription error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// ACTIVITY LOGGING
// =====================================================

export const activity = {
    // Log activity
    async log(userId, actionType, entityType = null, entityId = null, metadata = {}) {
        try {
            const { data, error } = await supabase
                .from('activity_log')
                .insert([{
                    user_id: userId,
                    action_type: actionType,
                    entity_type: entityType,
                    entity_id: entityId,
                    metadata: metadata
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Log activity error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// AI PHONE CALLS
// =====================================================

export const aiCalls = {
    // Create new call session
    async createSession(userId, phoneNumber, callSid) {
        try {
            const { data, error } = await supabase
                .from('ai_call_sessions')
                .insert([{
                    user_id: userId,
                    phone_number: phoneNumber,
                    call_sid: callSid
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Create call session error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user by phone number (for incoming calls)
    async getUserByPhone(phoneNumber) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('phone_number', phoneNumber)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get user by phone error:', error);
            return { success: false, error: error.message };
        }
    },

    // Save recorded story from AI call
    async saveRecording(callSessionId, userId, audioUrl, transcription, aiData) {
        try {
            const { data, error } = await supabase
                .from('ai_recorded_stories')
                .insert([{
                    call_session_id: callSessionId,
                    user_id: userId,
                    audio_url: audioUrl,
                    transcription: transcription,
                    ai_extracted_title: aiData.title,
                    ai_extracted_year: aiData.year,
                    ai_extracted_category: aiData.category,
                    ai_summary: aiData.summary,
                    ai_sentiment: aiData.sentiment
                }])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Save recording error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get pending AI recordings for user
    async getPendingRecordings(userId) {
        try {
            const { data, error } = await supabase
                .from('ai_recorded_stories')
                .select('*')
                .eq('user_id', userId)
                .eq('processing_status', 'pending')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get pending recordings error:', error);
            return { success: false, error: error.message };
        }
    },

    // Publish AI recording as story
    async publishRecording(recordingId, profileId) {
        try {
            // Get the recording
            const { data: recording, error: fetchError } = await supabase
                .from('ai_recorded_stories')
                .select('*')
                .eq('id', recordingId)
                .single();
            
            if (fetchError) throw fetchError;

            // Create story from recording
            const { data: story, error: storyError } = await supabase
                .from('stories')
                .insert([{
                    profile_id: profileId,
                    author_user_id: recording.user_id,
                    title: recording.ai_extracted_title,
                    description: recording.ai_summary,
                    category: recording.ai_extracted_category,
                    year: recording.ai_extracted_year,
                    status: 'published'
                }])
                .select()
                .single();
            
            if (storyError) throw storyError;

            // Update recording status
            await supabase
                .from('ai_recorded_stories')
                .update({ processing_status: 'published' })
                .eq('id', recordingId);
            
            return { success: true, data: story };
        } catch (error) {
            console.error('Publish recording error:', error);
            return { success: false, error: error.message };
        }
    }
};

// Export all as default
export default {
    auth,
    profiles,
    stories,
    connections,
    questions,
    notifications,
    subscriptions,
    activity,
    aiCalls
};

