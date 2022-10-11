import { parse } from 'papaparse'
import { CSV, CSVData, Header, TypedCSVData } from './types'

export const parseResults = (rawData: CSV, headers: Header[]): TypedCSVData[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData(dataWithHeaders)
  return enumerateResults(parsedData)
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

export const parseRawData = (rawData: CSV): CSVData[] => {
  const result = parse<CSVData>(rawData, {
    header: true,
    delimiter: '\t'
  })

  if (result.errors.length > 0) {
    throw new Error(result.errors.map(e => e.message).join('; '))
  }

  return result.data
}

export const enumerateResults = (entries: CSVData[]): TypedCSVData[] => {
  return entries.map(e => ({
    id: e.id,
    time: Number(e.time)
  }))
}
