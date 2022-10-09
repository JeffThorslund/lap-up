import { parse } from 'papaparse'
import { CSVData, CSVInput, Header, ResultType, TypedCSVData } from './types'

export const parseStarts = (rawStarts: CSVInput): TypedCSVData[] => parseResults(rawStarts, ['id', 'time'], ResultType.START)

export const parseEnds = (rawEnds: CSVInput): TypedCSVData[] => parseResults(rawEnds, ['id', 'time'], ResultType.END)

export const parseResults = (rawData: CSVInput, headers: Header[], type: ResultType): TypedCSVData[] => {
  const dataWithHeaders = appendHeadersToData(headers, rawData)
  const parsedData = parseRawData(dataWithHeaders)
  return enumerateResults(parsedData, type)
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

export const enumerateResults = (entries: CSVData[], type: ResultType): TypedCSVData[] => {
  return entries.map(e => ({
    id: e.id,
    time: Number(e.time),
    type
  }))
}
