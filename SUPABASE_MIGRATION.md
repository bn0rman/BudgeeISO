# Migrating from Kinde to Supabase Authentication

This document outlines the steps taken to migrate Budgee ISO from Kinde Authentication to Supabase Authentication.

## Prerequisites

You will need to create a Supabase project and set up authentication:

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Once your project is created, navigate to Authentication → Settings → URL Configuration
3. Add your site URL and redirect URLs:
   - Site URL: `http://localhost:3000` (for local development)
   - Redirect URLs: 
     - `http://localhost:3000/auth/callback`
     - Add your production URLs when deploying

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project dashboard under Project Settings → API.

## Setting Up OAuth Providers

If you want to use social logins, you need to configure the OAuth providers in Supabase:

1. Go to Authentication → Providers
2. Enable and configure the providers you want to use (e.g., Google, GitHub)
3. Follow the specific instructions for each provider to set up the OAuth application

## Testing the Authentication

To test the authentication flow:

1. Run the application with `npm run dev`
2. Navigate to `/auth/signin` to test the sign-in process
3. Navigate to `/auth/signup` to test the sign-up process
4. Navigate to `/auth/signout` to test the sign-out process

## Changes Made

The migration involved the following changes:

1. Adding Supabase client libraries
2. Creating authentication helpers
3. Setting up middleware for route protection
4. Creating authentication UI components
5. Updating user profile references
6. Setting up authentication callback routes
7. Removing Kinde dependencies

## Troubleshooting

### Cookie Issues

If you encounter issues with cookies not being set correctly, ensure:

1. Your `createServerSupabaseClient` function correctly handles cookies
2. Your middleware is properly configured to handle auth routes
3. The redirect URLs are correctly set in your Supabase project

### Profile Data

Supabase stores user profile data differently from Kinde:

- Kinde: `user.given_name`, `user.family_name`, etc.
- Supabase: `user.user_metadata.name`, `user.user_metadata.avatar_url`, etc.

Make sure all your components are updated to use the Supabase user data structure. 