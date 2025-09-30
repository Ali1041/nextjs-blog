import { createClient } from '@supabase/supabase-js'

const supabaseUrl = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`
const supabaseKey = process.env.ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
