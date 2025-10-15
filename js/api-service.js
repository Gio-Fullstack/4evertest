// 4Ever API Service
// Client-side service for interacting with the profile API

class ApiService {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }

    // Cache management
    getCacheKey(endpoint, params = {}) {
        const paramString = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');
        return `${endpoint}${paramString ? `?${paramString}` : ''}`;
    }

    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    // Profile methods
    async getProfile(identifier, useCache = true) {
        const cacheKey = this.getCacheKey(`/profile/${identifier}`);
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const data = await this.request(`/profile/${identifier}`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    async getTimelineEvents(profileId, options = {}) {
        const { category = 'all', limit = 50, offset = 0, useCache = true } = options;
        const cacheKey = this.getCacheKey(`/profile/${profileId}/timeline`, { category, limit, offset });
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const params = new URLSearchParams({ category, limit, offset });
        const data = await this.request(`/profile/${profileId}/timeline?${params}`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    async getStories(profileId, options = {}) {
        const { category = 'all', limit = 20, offset = 0, useCache = true } = options;
        const cacheKey = this.getCacheKey(`/profile/${profileId}/stories`, { category, limit, offset });
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const params = new URLSearchParams({ category, limit, offset });
        const data = await this.request(`/profile/${profileId}/stories?${params}`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    async getFamilyMembers(profileId, options = {}) {
        const { generation, useCache = true } = options;
        const cacheKey = this.getCacheKey(`/profile/${profileId}/family`, { generation });
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const params = new URLSearchParams();
        if (generation) params.append('generation', generation);
        
        const endpoint = `/profile/${profileId}/family${params.toString() ? `?${params}` : ''}`;
        const data = await this.request(endpoint);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    async getFamilyRelationships(profileId, useCache = true) {
        const cacheKey = this.getCacheKey(`/profile/${profileId}/relationships`);
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const data = await this.request(`/profile/${profileId}/relationships`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }


    async trackProfileView(profileId) {
        const viewerIp = await this.getClientIP();
        const userAgent = navigator.userAgent;
        const referrer = document.referrer || null;

        try {
            await this.request(`/profile/${profileId}/view`, {
                method: 'POST',
                body: JSON.stringify({
                    viewerIp,
                    userAgent,
                    referrer
                })
            });
        } catch (error) {
            // Don't throw error for tracking failures
            console.warn('Failed to track profile view:', error);
        }
    }

    // Search methods
    async searchProfiles(query, options = {}) {
        const { limit = 20, offset = 0, useCache = true } = options;
        const cacheKey = this.getCacheKey('/search/profiles', { q: query, limit, offset });
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const params = new URLSearchParams({ q: query, limit, offset });
        const data = await this.request(`/search/profiles?${params}`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    async getFeaturedProfiles(options = {}) {
        const { limit = 10, useCache = true } = options;
        const cacheKey = this.getCacheKey('/profiles/featured', { limit });
        
        if (useCache) {
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;
        }

        const params = new URLSearchParams({ limit });
        const data = await this.request(`/profiles/featured?${params}`);
        
        if (useCache) {
            this.setCache(cacheKey, data);
        }
        
        return data;
    }

    // Utility methods
    async getClientIP() {
        try {
            // Try to get IP from a public service
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            // Fallback to a random identifier
            return `anonymous_${Math.random().toString(36).substr(2, 9)}`;
        }
    }

    invalidateProfileCache(profileId) {
        // Remove all cache entries related to this profile
        for (const [key, value] of this.cache.entries()) {
            if (key.includes(`/profile/${profileId}`)) {
                this.cache.delete(key);
            }
        }
    }

    clearCache() {
        this.cache.clear();
    }

    // Health check
    async healthCheck() {
        try {
            const data = await this.request('/health');
            return data;
        } catch (error) {
            throw new Error('API health check failed');
        }
    }
}

// Create global instance
window.apiService = new ApiService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiService;
}
