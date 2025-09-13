import { Metadata } from 'next'
import { eventsMetadata } from '@/app/metadata'
import EventsClient from '@/components/features/Events/EventsClient'

export const metadata: Metadata = eventsMetadata

export default function EventsPage() {
    return <EventsClient />
}