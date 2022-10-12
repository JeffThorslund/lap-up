import { CSV, Header } from '../types'
import { parse } from 'papaparse'

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
