import * as types from './types'
import { EndTimingEvent, NameRecord, Selectors, StartTimingEvent } from './types'
import { selectors } from './selectors'
import { buildResults } from './results/buildResults'

export const index = (names: NameRecord[], starts: StartTimingEvent[], ends: EndTimingEvent[]): Selectors => {
  const resultsMap = buildResults(names, starts, ends)
  return selectors(resultsMap)
}

export { types }
