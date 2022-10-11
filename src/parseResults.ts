import { parse } from 'papaparse'
import { CSVData, CSVInput, Header, TypedCSVData } from './types'

export const parseResults = (rawData: CSVInput, headers: Header[]): TypedCSVData[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData(dataWithHeaders)
  return enumerateResults(parsedData)
}

export const appendHeadersToData = (headers: Header[], rawData: CSVInput): string => {
  if (headers.length === 0) {
    throw new Error('You must attach headers')
  }

  return headers.join('\t') + '\n' + rawData
}

export const parseRawData = (rawData: CSVInput): CSVData[] => {
  const result = parse<CSVData>(rawData, { header: true })

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
