import listPlugin from '@fullcalendar/list'
import FullCalendar from "@fullcalendar/react"
import { useEvents } from '../../app/hooks'

function CalendarList() {
    const { data, isLoading, error } = useEvents()

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error.message}</p>
    }

    return (
        <FullCalendar
            plugins={[listPlugin]}
            initialView="listWeek"
            events={data}
        />
    )
}

export default CalendarList