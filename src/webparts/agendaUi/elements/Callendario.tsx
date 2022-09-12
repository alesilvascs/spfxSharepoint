import * as React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"



export default function Callendario(){

        return (
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={true}
                editable={true}

                events={[

                    {
                        title: 'Cabana do Tenis 08:00 - 12:00',
                        start: '2022-09-07',
                        end: '2022-09-07',
                        color: 'green'
                    },
                    {
                        groupId: '999',
                        title: 'Choupana',
                        start: '2022-09-09T16:15:00',
                        color: 'green'
                    },

                    {
                        title: 'Cabana Rústica 08:00 - 12:00',
                        start: '2022-09-11',
                        end: '2022-09-11',
                        color: 'purple'
                    },
                    {
                        title: 'Cabana Rústica 13:00 - 22:00',
                        start: '2022-09-11',
                        end: '2022-09-11',
                        color: 'purple' // override!
                    },
                    {
                        title: 'Choupana',
                        start: '2022-09-12T10:30:00',
                        end: '2022-08-12T12:30:00',
                        color: 'red'
                    },

                ]}
                dateClick={(e)=>{
                    alert("dateclick "+ e)
                }}
                height={"100%"}
                locale={'pt-br'}

            />
        )

}