import { CSVInput, RacesMap } from './types'
import { parseEnds, parseStarts } from './parseResults'
import { buildRacesMap } from './buildRacesMap'
import { mergeResults } from './mergeResults'

export const index = (starts: CSVInput, ends: CSVInput): RacesMap => {
  const parsedStarts = parseStarts(starts)
  const parsedEnds = parseEnds(ends)
  const mergedResults = mergeResults(parsedStarts, parsedEnds)
  return buildRacesMap(mergedResults)
}
