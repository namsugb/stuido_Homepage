import { createClient } from "@supabase/supabase-js"

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되어야 합니다.")
}

// TypeScript가 환경 변수가 정의되었음을 알 수 있도록 타입 단언
const supabaseUrlDefined = supabaseUrl as string
const supabaseAnonKeyDefined = supabaseAnonKey as string

// 클라이언트 측 Supabase 클라이언트 (싱글톤)
let clientSupabase: ReturnType<typeof createClient> | null = null

export function createClientSupabaseClient() {
  if (clientSupabase) return clientSupabase
  clientSupabase = createClient(supabaseUrlDefined, supabaseAnonKeyDefined)
  return clientSupabase
}

// 서버 측 Supabase 클라이언트
export function createServerSupabaseClient() {
  return createClient(supabaseUrlDefined, supabaseAnonKeyDefined, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// 기본 클라이언트 (기존 코드와의 호환성을 위해)
export const supabase = createClient(supabaseUrlDefined, supabaseAnonKeyDefined)
