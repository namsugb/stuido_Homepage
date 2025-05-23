import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function TestConnectionPage() {
  const connectionStatus = {
    envVars: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    connection: null as any,
    tables: null as any,
    reservations: null as any,
    error: null as string | null,
  }

  try {
    // Supabase 클라이언트 생성 테스트
    const supabase = createServerSupabaseClient()
    connectionStatus.connection = "✅ Supabase 클라이언트 생성 성공"

    // 테이블 목록 조회 테스트
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      connectionStatus.tables = `❌ 테이블 조회 실패: ${tablesError.message}`
    } else {
      connectionStatus.tables = `✅ 테이블 조회 성공 (${tables?.length || 0}개 테이블)`
    }

    // reservations 테이블 데이터 조회 테스트
    const { data: reservations, error: reservationsError } = await supabase.from("reservations").select("*").limit(1)

    if (reservationsError) {
      connectionStatus.reservations = `❌ reservations 테이블 조회 실패: ${reservationsError.message}`
    } else {
      connectionStatus.reservations = `✅ reservations 테이블 조회 성공 (${reservations?.length || 0}개 레코드 확인)`
    }
  } catch (error: any) {
    connectionStatus.error = error.message
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Supabase 연결 테스트</h1>

      <div className="space-y-6">
        {/* 환경 변수 확인 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">환경 변수 확인</h2>
          <div className="space-y-2">
            {Object.entries(connectionStatus.envVars).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <span className={value ? "text-green-600" : "text-red-600"}>{value ? "✅" : "❌"}</span>
                <span className="font-mono text-sm">{key}</span>
                <span className="text-gray-600">{value ? "설정됨" : "설정되지 않음"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 연결 상태 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">연결 상태</h2>
          <div className="space-y-2">
            <div>{connectionStatus.connection}</div>
            <div>{connectionStatus.tables}</div>
            <div>{connectionStatus.reservations}</div>
            {connectionStatus.error && (
              <div className="text-red-600 bg-red-50 p-3 rounded">❌ 오류: {connectionStatus.error}</div>
            )}
          </div>
        </div>

        {/* 환경 변수 값 표시 (보안상 일부만) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">환경 변수 값 (일부)</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="font-semibold">NEXT_PUBLIC_SUPABASE_URL:</span>{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_URL
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...`
                : "설정되지 않음"}
            </div>
            <div>
              <span className="font-semibold">SUPABASE_SERVICE_ROLE_KEY:</span>{" "}
              {process.env.SUPABASE_SERVICE_ROLE_KEY
                ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20)}...`
                : "설정되지 않음"}
            </div>
            <div>
              <span className="font-semibold">SUPABASE_ANON_KEY:</span>{" "}
              {process.env.SUPABASE_ANON_KEY ? `${process.env.SUPABASE_ANON_KEY.substring(0, 20)}...` : "설정되지 않음"}
            </div>
          </div>
        </div>

        {/* 권장 사항 */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">권장 사항</h2>
          <ul className="space-y-2 text-blue-700">
            <li>• NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY는 필수입니다.</li>
            <li>• 서버 컴포넌트에서는 SUPABASE_SERVICE_ROLE_KEY 사용을 권장합니다.</li>
            <li>• 모든 환경 변수가 올바르게 설정되었는지 확인하세요.</li>
            <li>• Supabase 프로젝트의 API 설정에서 URL과 키를 다시 확인하세요.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
