import { CSV, NameRecord, NamesMap } from '../types'
import { appendHeadersToData, parseRawData } from '../_utils/parse'

export const parseNames = (nameData: CSV): NamesMap => {
  const nameDataWithHeaders = appendHeadersToData(['id', 'name'], nameData)
  const parsedData = parseRawData<NameRecord>(nameDataWithHeaders)
  return createNamesMap(parsedData)
}

const createNamesMap = (names: NameRecord[]): NamesMap =>
  names.reduce<NamesMap>((acc, cur) => ({
    ...acc,
    [cur.id]: cur.name
  }), {})
