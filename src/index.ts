import { CSV, FinalRacesMap } from './types'
import { buildResults } from './buildResults'
import { parseEndResults, parseStartResults } from './parseResults'

export const index = (starts: CSV, ends: CSV): FinalRacesMap => {
  return createDataStructure(starts, ends)
}

export const createDataStructure = (starts: CSV, ends: CSV): FinalRacesMap => {
  const parsedStarts = parseStartResults(starts, ['time', 'id'])
  const parsedEnds = parseEndResults(ends, ['time', 'id', 'touchesGates', 'missedGates'])
  return buildResults(parsedStarts, parsedEnds)
}
