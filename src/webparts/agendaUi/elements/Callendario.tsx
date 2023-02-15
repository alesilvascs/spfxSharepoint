import * as React from 'react';
import FullCalendar, {DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate} from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {IAgendaUiProps} from "../components/IAgendaUiProps";


interface DemoAppState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}

export default class Callendario extends  React.Component<{}, DemoAppState> {

    constructor(props:IAgendaUiProps ,ress:any) {
        super(props,ress);

    }


    state: DemoAppState = {
        weekendsVisible: true,
        currentEvents: []
    }

    render() {

        return (
            <div className='demo-app'>
                {/*{this.renderSidebar()}*/}

                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}

                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={ JSON.parse(this.eventos())} // INITIAL_EVENTS alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        locale={'pt-br'}
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>
            </div>
        )
    }
    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>
                        {this.state.currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }
    eventos = () => {

        const ev:any = [];

        [this.props.children].map((item: any ) => (
            item.res.map((itens:any ) => (
                ev.push(  {'title': itens.Cabana,'start': itens.DataInicial.substring(10,-10),'color':itens.color })
                )
            )
    ))
        return JSON.stringify(ev)
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }
    handleDateSelect = (selectInfo: DateSelectArg) => {

         let title =  prompt(selectInfo.startStr)
         let calendarApi = selectInfo.view.calendar
        // let [state,setstate] = useState();
         calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                // id: createEventId(),
                title,
               start: selectInfo.startStr,
               end: selectInfo.endStr,
               allDay: selectInfo.allDay
           })
         }
    }

    handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Você tem certeza de que quer apagar o evento '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events: EventApi[]) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event: EventApi) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
        </li>
    )
}




