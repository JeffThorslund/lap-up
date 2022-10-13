import { CSV, EndTypedTimingEvent, ResultsMap, StartTypedTimingEvent } from '../types'
import { buildResults } from './buildResults'
import { parse } from './parse'

export const parseResults = (starts: CSV, ends: CSV): ResultsMap => {
  const parsedStarts: StartTypedTimingEvent[] = parse.start(starts, ['time', 'id'])
  const parsedEnds: EndTypedTimingEvent[] = parse.end(ends, ['time', 'id', 'touchesGates', 'missedGates'])
  return buildResults(parsedStarts, parsedEnds)
}
