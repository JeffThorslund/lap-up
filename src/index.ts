import { parse } from 'papaparse'

export const appendHeadersToData = (headers: string[], rawData: string): string => {
  return headers.join('\t') + '\n' + rawData
}

export interface CSVData {
  id: string
  time: string
}

export const parseRawData = (rawData: string): CSVData[] => {
  const { data } = parse<CSVData>(rawData, { header: true })

  return data
}

export const sortByTime = (data: CSVData[]): CSVData[] => {
  return data.sort((a, b) => Number(a.time) - Number(b.time))
}

export const index = (rawData: string): void => {
  const dataWithHeaders = appendHeadersToData(['id', 'time'], rawData)
  const parsedData = parseRawData(dataWithHeaders)
  sortByTime(parsedData)
}
