import { createBrowserClient } from '@supabase/ssr';

export function createClientSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getClientSession() {
  const supabase = createClientSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getClientUser() {
  const session = await getClientSession();
  if (!session) return null;
  
  return session.user;
}

export async function isClientAuthenticated() {
  const session = await getClientSession();
  return !!session;
}

export async function signOutClient() {
  try {
    const supabase = createClientSupabaseClient();
    
    // Call Supabase signOut
    await supabase.auth.signOut();
    
    // Manually clear Supabase auth cookies
    const cookiesToClear = [
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
    ];
    
    // Clear cookies with various domain/path combinations to ensure they're cleared
    cookiesToClear.forEach(cookieName => {
      document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
    });
    
    // Clear local storage
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.clear();
    
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
} 