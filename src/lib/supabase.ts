import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hyeyvcqebzfkkcccypac.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZXl2Y3FlYnpma2tjY2N5cGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzI5ODgsImV4cCI6MjA4MTY0ODk4OH0.0xyMd6zTfn76Gc6NIVMFj51aofh5MaRLOJQVt356-Bk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
