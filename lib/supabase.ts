import { createClient } from "@supabase/supabase-js"

// 환경변수 확인 함수
function checkEnvironmentVariables() {
  const vars = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  console.log("=== 환경변수 확인 ===")
  Object.entries(vars).forEach(([key, value]) => {
    console.log(`${key}: ${value ? "✓ 설정됨" : "✗ 없음"}`)
  })

  return vars
}

// 서버 측 Supabase 클라이언트
export const createServerSupabaseClient = () => {
  const vars = checkEnvironmentVariables()

  // 우선순위: SUPABASE_URL > NEXT_PUBLIC_SUPABASE_URL
  const supabaseUrl = vars.SUPABASE_URL || vars.NEXT_PUBLIC_SUPABASE_URL

  // 우선순위: SUPABASE_SERVICE_ROLE_KEY > SUPABASE_ANON_KEY > NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseKey = vars.SUPABASE_SERVICE_ROLE_KEY || vars.SUPABASE_ANON_KEY || vars.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("=== 선택된 환경변수 ===")
  console.log(`URL: ${supabaseUrl ? "✓" : "✗"}`)
  console.log(`Key: ${supabaseKey ? "✓" : "✗"}`)

  if (!supabaseUrl || !supabaseKey) {
    const missing = []
    if (!supabaseUrl) missing.push("SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_URL")
    if (!supabaseKey) missing.push("SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY")

    throw new Error(`다음 환경변수가 설정되지 않았습니다: ${missing.join(", ")}`)
  }

  return createClient(supabaseUrl, supabaseKey)
}

// 클라이언트 측 Supabase 클라이언트 (싱글톤 패턴)
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되어야 합니다.")
  }

  clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return clientSupabaseClient
}
