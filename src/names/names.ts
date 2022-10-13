import { NameRecord, NamesMap } from '../types'

export const createNamesMap = (names: NameRecord[]): NamesMap =>
  names.reduce<NamesMap>((acc, cur) => ({
    ...acc,
    [cur.id]: cur.name
  }), {})
