import * as React from 'react';
import FullCalendar, {DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate} from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {createEventId, INITIAL_EVENTS} from "../components/event-utils";
import {SPHttpClient, SPHttpClientResponse} from "@microsoft/sp-http";
import {useEffect, useState} from "react";
import FormAgenda from "./FormAgenda";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {sp} from "@pnp/sp";

interface DemoAppState {
    weekendsVisible: boolean
    currentEvents: EventApi[]
}
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         container: {
//             display: 'flex',
//             flexWrap: 'wrap',
//             width: 500,
//         },
//         textField: {
//             marginLeft: theme.spacing(1),
//             marginRight: theme.spacing(1),
//             width: 200,
//         },
//         formControl: {
//             margin: theme.spacing(1),
//             minWidth: 500,
//         },
//         selectEmpty: {
//             marginTop: theme.spacing(2),
//         },
//
//     }),
//
// );


export default class Callendario extends  React.Component<{}, DemoAppState> {
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
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
                id: createEventId(),
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




