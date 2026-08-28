// Konfigurasi Supabase

const SUPABASE_URL = "https://atgctwjbdjmdebqrxjev.supabase.co";

const SUPABASE_KEY = "sb_publishable_OFi3MbjMqm443mepsFQGDQ_ViHnI0xM";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
