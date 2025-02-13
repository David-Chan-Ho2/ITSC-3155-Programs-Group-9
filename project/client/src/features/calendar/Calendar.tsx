import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEvents } from '../../app/hooks'

const Calendar = () => {
    const { data, isLoading, error } = useEvents()

    const handleDateSelect = (selectInfo: any) => {
        let title = prompt('Enter event title:')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            // setEvents([
            //     ...events,
            //     {
            //         title,
            //         start: selectInfo.startStr,
            //         end: selectInfo.endStr
            //     }
            // ])
        }
    }

    const handleEventClick = (clickInfo: any) => {
        let newTitle = prompt('Edit event title:', clickInfo.event.title)

        if (newTitle) {
            clickInfo.event.setProp('title', newTitle)
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error has occurred</p>
    }

    return (
        <>
            {data && <FullCalendar
                plugins={[multiMonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={data}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
            />}
        </>
    )
}

export default Calendar