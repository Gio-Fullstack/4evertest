// Supabase client configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';

// Supabase configuration
const supabaseUrl = 'https://indbrdwzwvkimgxzyoko.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZGJyZHd6d3ZraW1neHp5b2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMDMwMDMsImV4cCI6MjA3NTc3OTAwM30.EOGgSzNhWZH6QQtih9iz_xeFOgfew4sy3OxDLiin3vs';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions
export async function signInWithEmail(email) {
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: window.location.origin + '/profile.html'
            }
        });

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error sending magic link:', error);
        return { success: false, error: error.message };
    }
}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error: error.message };
    }
}

export async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        return { success: true, user };
    } catch (error) {
        console.error('Error getting current user:', error);
        return { success: false, error: error.message };
    }
}

// Question submission function
export async function submitQuestion(questionData) {
    try {
        const { data, error } = await supabase
            .from('questions')
            .insert([questionData])
            .select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error submitting question:', error);
        return { success: false, error: error.message };
    }
}

// Get questions for a profile (for profile owners)
export async function getQuestionsForProfile(profileId) {
    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('profile_id', profileId)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return { success: false, error: error.message };
    }
}

// Update question status (for profile owners)
export async function updateQuestionStatus(questionId, status) {
    try {
        const { data, error } = await supabase
            .from('questions')
            .update({ status })
            .eq('id', questionId)
            .select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error updating question status:', error);
        return { success: false, error: error.message };
    }
}
