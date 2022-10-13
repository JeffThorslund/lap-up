import { CSV, EndTimingEvent, EndTypedTimingEvent, Header, StartTimingEvent, StartTypedTimingEvent } from '../types'
import { appendHeadersToCSV, parseRawData } from '../_utils/parse'

export const parse = {
  start (timingEvents: CSV, headers: Header[]): StartTypedTimingEvent[] {
    const timingEventsWithHeaders = appendHeadersToCSV(headers, timingEvents)
    const parsedTimingEvents = parseRawData<StartTimingEvent>(timingEventsWithHeaders)
    return enumerateResults.start(parsedTimingEvents)
  },
  end (timingEvents: CSV, headers: Header[]): EndTypedTimingEvent[] {
    const timingEventsWithHeaders = appendHeadersToCSV(headers, timingEvents)
    const parsedTimingEvents = parseRawData<EndTimingEvent>(timingEventsWithHeaders)
    return enumerateResults.end(parsedTimingEvents)
  }
}

export const enumerateResults = {
  start (entries: StartTimingEvent[]): StartTypedTimingEvent[] {
    return entries.map(e => ({
      id: e.id,
      time: Number(e.time)
    }))
  },
  end (entries: EndTimingEvent[]): EndTypedTimingEvent[] {
    return entries.map(e => ({
      id: e.id,
      time: Number(e.time),
      touchedGates: Number(e.touchedGates),
      missedGates: Number(e.missedGates)
    }))
  }
}
