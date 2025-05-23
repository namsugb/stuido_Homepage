"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SimpleManagePage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.from("reservations").select("*")

        if (error) {
          console.error("Supabase 오류:", error)
          setError(error.message)
        } else {
          console.log("데이터 가져오기 성공:", data?.length, "개의 예약")
          setReservations(data || [])
        }
      } catch (err) {
        console.error("예외 발생:", err)
        setError("데이터를 불러오는 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  if (loading) return <div className="p-8">로딩 중...</div>
  if (error) return <div className="p-8 text-red-500">오류: {error}</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">간단한 예약 목록</h1>
      <p className="mb-4">총 {reservations.length}개의 예약이 있습니다.</p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation: any) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">디버그 정보</h2>
        <pre className="text-xs overflow-auto max-h-40 bg-white p-2 rounded">
          {JSON.stringify(reservations, null, 2)}
        </pre>
      </div>
    </div>
  )
}
