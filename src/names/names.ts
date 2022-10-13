import { CSV, NameRecord, NamesMap } from '../types'
import { appendHeadersToCSV, parseRawData } from '../_utils/parse'

export const parseNames = (names: CSV): NamesMap => {
  const namesWithHeaders = appendHeadersToCSV(['id', 'name'], names)
  const parsedNames = parseRawData<NameRecord>(namesWithHeaders)
  return createNamesMap(parsedNames)
}

const createNamesMap = (names: NameRecord[]): NamesMap =>
  names.reduce<NamesMap>((acc, cur) => ({
    ...acc,
    [cur.id]: cur.name
  }), {})
