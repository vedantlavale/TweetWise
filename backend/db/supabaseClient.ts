import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
// To use: import supabase from './db/supabaseClient';
// Ensure you have SUPABASE_URL and SUPABASE_KEY in your .env file
// Example .env:
// SUPABASE_URL=https://your-project.supabase.co
// SUPABASE_KEY=your-service-role-key

// Example usage of Supabase client in backend
// Fetch all rows from a table named 'profiles'
export async function getAllProfiles() {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return data;
}
