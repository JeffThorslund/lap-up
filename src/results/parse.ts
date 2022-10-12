import { CSV, EndTimingEvent, EndTypedTimingEvent, Header, StartTimingEvent, StartTypedTimingEvent } from '../types'
import { appendHeadersToData, parseRawData } from '../_utils/parse'

export const parse = {
  start (rawData: CSV, headers: Header[]): StartTypedTimingEvent[] {
    const dataWithHeaders = appendHeadersToData(headers, rawData)
    const parsedData = parseRawData<StartTimingEvent>(dataWithHeaders)
    return enumerateResults.start(parsedData)
  },
  end (rawData: CSV, headers: Header[]): EndTypedTimingEvent[] {
    const dataWithHeaders = appendHeadersToData(headers, rawData)
    const parsedData = parseRawData<EndTimingEvent>(dataWithHeaders)
    return enumerateResults.end(parsedData)
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
