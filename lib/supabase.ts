import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bsjgybnzmmcpyqjhnklp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzamd5Ym56bW1jcHlxamhua2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjY3OTYsImV4cCI6MjA3OTMwMjc5Nn0.9R8x6e6XhiVht-QOEMnCkp9tRPYXN_Fd07WJfIkI5rI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contact_info: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    instagram?: string;
    website?: string;
    openrice?: string;
    booking?: string;
  };
  tags: string[];
  image_url?: string;
  is_active: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_zh: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SearchHistory {
  id: string;
  user_id?: string;
  query: string;
  results_count: number;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
