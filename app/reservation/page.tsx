import { Metadata } from 'next'
import { reservationMetadata } from '@/app/metadata'
import ReservationClient from "@/components/features/Reservation/ReservationClient"

export const metadata: Metadata = reservationMetadata

export default function ReservationPage() {
  return <ReservationClient />
}
