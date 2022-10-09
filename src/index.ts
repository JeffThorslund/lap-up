import { CSVInput, RacesMap } from './types'
import { prepEndResults, prepStartResults } from './prepResults'
import { createStructure, mergeLists } from './createStructure'

export const index = (starts: CSVInput, ends: CSVInput): RacesMap => {
  const preppedStarts = prepStartResults(starts)
  const preppedEnds = prepEndResults(ends)
  const mergedResults = mergeLists(preppedStarts, preppedEnds)
  return createStructure(mergedResults)
}
