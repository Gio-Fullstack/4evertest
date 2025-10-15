// Configuration Example for Supabase
// Copy this file to config.js and fill in your actual values

export const config = {
  // Supabase Configuration
  // Get these values from your Supabase project dashboard
  supabase: {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-anon-key-here',
    serviceRoleKey: 'your-service-role-key-here'
  },

  // Database Connection (for direct PostgreSQL access)
  database: {
    connectionString: 'postgresql://postgres.your-project-id:your-password@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
  },

  // Environment
  environment: 'development'
}

// Instructions:
// 1. Go to your Supabase project dashboard
// 2. Navigate to Settings > API
// 3. Copy the Project URL and anon/public key
// 4. Replace the values above with your actual credentials
// 5. Rename this file to config.js
