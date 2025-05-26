import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge' // Edge function 사용


export const config = {
  schedule: '0 20 * * *' // UTC 기준 → 한국 오전 5시
}

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

    const supabase2 = createClient(
    process.env.SUPABASE_URL_2!,
    process.env.SUPABASE_KEY_2!
  )

  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .limit(1)

  if (error) {
    console.error('❌ Supabase ping error:', error.message)
    return NextResponse.json({ success: false, error: error.message })
  }

     const { data: data2, error: error2 } = await supabase2
      .from('users')
      .select('id')
      .limit(1)

    if (error2) throw new Error(`두 번째 프로젝트 오류: ${error2.message}`)

    console.log('✅ 두 프로젝트 모두 ping 성공')

  return NextResponse.json({ success: true })
}
