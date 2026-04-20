import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Menggunakan fallback (cadangan) langsung ke URL & Key Supabase milikmu
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://npetttkklcwcpojnyppk.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_7TFYm4CbNm2TuD5QFB8Y8Q_VGgzKLBX';

  return createBrowserClient(url, anonKey);
}