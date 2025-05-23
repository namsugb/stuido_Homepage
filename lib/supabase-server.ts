import { createClient } from "@supabase/supabase-js"

// 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL 또는 Key가 설정되지 않았습니다.")
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // 서버 컴포넌트에서는 세션을 유지하지 않음
    },
  })
}
