export type Reservation = {
  id: number
  name: string
  phone: string
  email: string | null
  date: string // ISO 형식의 날짜 문자열
  time: string
  shooting_type: string
  people: number
  message: string | null
  created_at: string // ISO 형식의 날짜 문자열
  status: "pending" | "confirmed" | "cancelled" | "completed"
}

// 더미 데이터 생성
export const dummyReservations: Reservation[] = [
  {
    id: 1,
    name: "김철수",
    phone: "010-1234-5678",
    email: "kim@example.com",
    date: "2024-05-15",
    time: "14:00",
    shooting_type: "가족사진",
    people: 4,
    message: "가족사진 촬영 예약입니다.",
    created_at: "2024-05-01T09:00:00Z",
    status: "confirmed",
  },
  {
    id: 2,
    name: "이영희",
    phone: "010-9876-5432",
    email: "lee@example.com",
    date: "2024-05-20",
    time: "16:00",
    shooting_type: "웨딩사진",
    people: 2,
    message: "웨딩사진 촬영 예약입니다.",
    created_at: "2024-05-02T10:30:00Z",
    status: "pending",
  },
  {
    id: 3,
    name: "박민수",
    phone: "010-5555-1234",
    email: "park@example.com",
    date: "2024-05-25",
    time: "10:00",
    shooting_type: "개인사진",
    people: 1,
    message: "개인 프로필 사진 촬영입니다.",
    created_at: "2024-05-03T14:15:00Z",
    status: "confirmed",
  },
  {
    id: 4,
    name: "최지은",
    phone: "010-2222-3333",
    email: "choi@example.com",
    date: "2024-05-18",
    time: "13:00",
    shooting_type: "가족사진",
    people: 5,
    message: "아이 돌잔치 사진 촬영입니다.",
    created_at: "2024-05-04T11:20:00Z",
    status: "cancelled",
  },
  {
    id: 5,
    name: "정현우",
    phone: "010-7777-8888",
    email: "jung@example.com",
    date: "2024-05-30",
    time: "15:30",
    shooting_type: "커플사진",
    people: 2,
    message: "커플 사진 촬영 예약입니다.",
    created_at: "2024-05-05T16:45:00Z",
    status: "pending",
  },
  {
    id: 6,
    name: "강지민",
    phone: "010-4444-9999",
    email: null,
    date: "2024-06-05",
    time: "11:00",
    shooting_type: "증명사진",
    people: 1,
    message: null,
    created_at: "2024-05-06T09:10:00Z",
    status: "confirmed",
  },
  {
    id: 7,
    name: "윤서연",
    phone: "010-3333-1111",
    email: "yoon@example.com",
    date: "2024-06-10",
    time: "14:30",
    shooting_type: "가족사진",
    people: 3,
    message: "가족 기념 사진입니다.",
    created_at: "2024-05-07T13:25:00Z",
    status: "completed",
  },
  {
    id: 8,
    name: "임재현",
    phone: "010-8888-2222",
    email: "lim@example.com",
    date: "2024-06-15",
    time: "16:30",
    shooting_type: "웨딩사진",
    people: 2,
    message: "웨딩 촬영 예약입니다.",
    created_at: "2024-05-08T10:05:00Z",
    status: "pending",
  },
]
