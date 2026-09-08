// js/supabase.js

const SUPABASE_URL = 'https://ntnfwpvdiimzehirdous.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bmZ3cHZkaWltemVoaXJkb3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MDQyMjAsImV4cCI6MjEwNDM4MDIyMH0.St8y6K8jG7zatecnXxza5S6bhTN_1RTDXnNXeHUHtO4';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
