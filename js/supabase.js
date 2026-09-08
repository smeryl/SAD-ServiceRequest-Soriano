// js/supabase.js

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-public-key';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
