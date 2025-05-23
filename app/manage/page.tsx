import { createServerSupabaseClient } from "@/lib/supabase-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function ManagePage() {
  let reservations = []
  let error = null

  try {
    const supabase = createServerSupabaseClient()
    console.log("Supabase 클라이언트 생성됨")

    const { data, error: supabaseError } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })

    if (supabaseError) {
      console.error("Supabase 오류:", supabaseError)
      error = supabaseError.message
    } else {
      console.log("데이터 가져오기 성공:", data?.length, "개의 예약")
      reservations = data || []
    }
  } catch (err) {
    console.error("예외 발생:", err)
    error = "서버 오류가 발생했습니다."
  }

  // 상태에 따른 배지 색상
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 상태 텍스트 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "대기중"
      case "confirmed":
        return "확정"
      case "cancelled":
        return "취소"
      case "completed":
        return "완료"
      default:
        return status || "대기중"
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <p>이 페이지가 보이면 기본 렌더링은 정상입니다.</p>

      {/* 디버그 정보 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>디버그 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <p>예약 수: {reservations.length}</p>
          {error && <p className="text-red-500">오류: {error}</p>}
          <p>환경 변수 확인:</p>
          <ul className="list-disc ml-4">
            <li>SUPABASE_URL: {process.env.SUPABASE_URL ? "설정됨" : "없음"}</li>
            <li>SUPABASE_ANON_KEY: {process.env.SUPABASE_ANON_KEY ? "설정됨" : "없음"}</li>
          </ul>
        </CardContent>
      </Card>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 예약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대기중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reservations.filter((r: any) => (r.status || "pending") === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">확정</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservations.filter((r: any) => r.status === "confirmed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">취소</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservations.filter((r: any) => r.status === "cancelled").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* 예약 테이블 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>날짜</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>촬영 유형</TableHead>
                  <TableHead>인원</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>메시지</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length > 0 ? (
                  reservations.map((reservation: any) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.name}</TableCell>
                      <TableCell>{reservation.phone}</TableCell>
                      <TableCell>{reservation.email || "-"}</TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.shooting_type}</TableCell>
                      <TableCell>{reservation.people}명</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(reservation.status || "pending")}>
                          {getStatusText(reservation.status || "pending")}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{reservation.message || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      {error ? "데이터를 불러올 수 없습니다." : "예약이 없습니다."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 원시 데이터 표시 (디버그용) */}
      {reservations.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>원시 데이터 (디버그용)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto max-h-40 bg-gray-100 p-2 rounded">
              {JSON.stringify(reservations, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
