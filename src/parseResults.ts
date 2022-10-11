import { parse } from 'papaparse'
import {
  CSV,
  EndTimingEvent,
  EndTypedTimingEvent,
  Header,
  StartTimingEvent,
  StartTypedTimingEvent,
  TypedTimingEvent
} from './types'

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

export const appendHeadersToData = (headers: Header[], rawData: CSV): string => {
  if (headers.length === 0) {
    throw new Error('You must attach headers')
  }

  const joinedHeader = headers.join('\t')

  if (rawData.length === 0) {
    return joinedHeader
  }

  return joinedHeader + '\n' + rawData
}

export const parseRawData = <T> (rawData: CSV): T[] => {
  const result = parse<T>(rawData, {
    header: true,
    delimiter: '\t'
  })

  if (result.errors.length > 0) {
    throw new Error(result.errors.map(e => e.message).join('; '))
  }

  return result.data
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
