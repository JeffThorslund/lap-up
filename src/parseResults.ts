import {
  CSV,
  EndTimingEvent,
  EndTypedTimingEvent,
  Header,
  StartTimingEvent,
  StartTypedTimingEvent,
  TypedTimingEvent
} from './types'
import { appendHeadersToData, parseRawData } from './_utils/parse'

export const parseStartResults = (rawData: CSV, headers: Header[]): StartTypedTimingEvent[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData<StartTimingEvent>(dataWithHeaders)
  return enumerateStartResults(parsedData)
}

export const parseEndResults = (rawData: CSV, headers: Header[]): EndTypedTimingEvent[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData<EndTimingEvent>(dataWithHeaders)
  return enumerateEndResults(parsedData)
}

export const parseResults = (rawData: CSV, headers: Header[]): TypedTimingEvent[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData<StartTimingEvent>(dataWithHeaders)
  return enumerateStartResults(parsedData)
}

export const enumerateStartResults = (entries: StartTimingEvent[]): StartTypedTimingEvent[] => {
  return entries.map(e => ({
    id: e.id,
    time: Number(e.time)
  }))
}

export const enumerateEndResults = (entries: EndTimingEvent[]): EndTypedTimingEvent[] => {
  return entries.map(e => ({
    id: e.id,
    time: Number(e.time),
    touchedGates: Number(e.touchedGates),
    missedGates: Number(e.missedGates)
  }))
}
