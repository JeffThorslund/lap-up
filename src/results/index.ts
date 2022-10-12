import { CSV, ResultsMap } from '../types'
import { buildResults } from './buildResults'
import { parse } from './parse'

export const parseResults = (starts: CSV, ends: CSV): ResultsMap => {
  const parsedStarts = parse.start(starts, ['time', 'id'])
  const parsedEnds = parse.end(ends, ['time', 'id', 'touchesGates', 'missedGates'])
  return buildResults(parsedStarts, parsedEnds)
}
