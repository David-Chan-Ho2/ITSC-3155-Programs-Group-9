import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import multiMonthPlugin from '@fullcalendar/multimonth'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Button, Input } from '@headlessui/react'
import { useEvents, useForm } from '../../app/hooks'
import Form from '../../components/forms/Form'

const Calendar = () => {
    const { data, isLoading, error } = useEvents()
    const { form, handleChange, handleSubmit } = useForm({
        title: "",
        userId: 1,
        start: "",
        end: "",
        description: "",
        allDay: false,
        color: "#ff9f89",
        backgroundColor: "#e3b6f1"
    })

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
            <Form>
                <Input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />

                <Button type="submit">Submit</Button>
            </Form>

            {data &&
                <FullCalendar
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
                />
            }
        </>
    )
}

export default Calendar