import { parse } from 'papaparse'
import { CSVData, CSVInput, Header, ResultType, TypedCSVData } from './types'

export const prepStartResults = (rawStarts: CSVInput): TypedCSVData[] => prepResults(rawStarts, ['id', 'time'], ResultType.START)

export const prepEndResults = (rawEnds: CSVInput): TypedCSVData[] => prepResults(rawEnds, ['id', 'time'], ResultType.END)

export const prepResults = (rawData: CSVInput, headers: Header[], type: ResultType): TypedCSVData[] => {
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
  const parseResult = parse<CSVData>(rawData, { header: true })

  if (parseResult.errors.length > 0) {
    throw new Error(parseResult.errors.map(e => e.message).join('; '))
  }

  return parseResult.data
}

export const enumerateResults = (entries: CSVData[], type: ResultType): TypedCSVData[] => {
  return entries.map(e => ({
    id: e.id,
    time: Number(e.time),
    type
  }))
}
