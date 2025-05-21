import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge' // Edge function 사용

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .limit(1)

  if (error) {
    console.error('❌ Supabase ping error:', error.message)
    return NextResponse.json({ success: false, error: error.message })
  }

  console.log(`✅ Supabase ping success`)
  return NextResponse.json({ success: true })
}
