import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mjezlwrogrltdhtqjbyw.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZXpsd3JvZ3JsdGRodHFqYnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MzgzNzUsImV4cCI6MjAzMzIxNDM3NX0.2yLKwsl5w9r-VCcw_uOaPqHDAzaYZ9pLZLxZGxFRm4M"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})