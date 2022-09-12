import { EventInput } from '@fullcalendar/react'
import {useEffect, useState} from "react";
import {sp} from "@pnp/sp";

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [

{
        id: createEventId(),
        title: 'Cabana do Tênis',
        start: todayStr,
        color: 'red',
        display:'important'
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
        color: 'green',
        display:'important'
    }
]

export function createEventId() {
    return String(eventGuid++)
}