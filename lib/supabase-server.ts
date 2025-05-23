import { createClient } from "@supabase/supabase-js"

// 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
export function createServerSupabaseClient() {
  const supabaseUrl = "https://pwgvbduxfyjrxepvsmaq.supabase.co"
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3Z3ZiZHV4ZnlqcnhlcHZzbWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTEzMDksImV4cCI6MjA2MzM4NzMwOX0.zKhpnBPKelP5dssyO11LSFWhI3xjXMJIKLf63yBjHp8"

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL 또는 Key가 설정되지 않았습니다.")
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // 서버 컴포넌트에서는 세션을 유지하지 않음
    },
  })
}
