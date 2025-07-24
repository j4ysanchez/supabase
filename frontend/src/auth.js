import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  return { user, error };
}

export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user, error };
}

export function getUser() {
  return supabase.auth.getUser();
}

export async function signOut() {
  await supabase.auth.signOut();
}