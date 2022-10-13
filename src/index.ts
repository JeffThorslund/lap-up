import { EndTimingEvent, NameRecord, Selectors, StartTimingEvent } from './types'
import { selectors } from './selectors'
import { createNamesMap } from './names/names'
import { buildResults } from './results/buildResults'

export const index = (starts: StartTimingEvent[], ends: EndTimingEvent[], names: NameRecord[]): Selectors => {
  const namesMap = createNamesMap(names)
  const resultsMap = buildResults(starts, ends)
  return selectors(resultsMap, namesMap)
}
