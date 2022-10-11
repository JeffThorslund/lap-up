import { CSV, FinalRacesMap } from './types'
import { buildResults } from './abc'
import { parseResults } from './parseResults'

export const index = (starts: CSV, ends: CSV): FinalRacesMap => {
  const parsedStarts = parseResults(starts, ['time', 'id'])
  const parsedEnds = parseResults(ends, ['time', 'id'])
  return buildResults(parsedStarts, parsedEnds)
}
