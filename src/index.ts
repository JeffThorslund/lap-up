import { CSVInput, FinalRacesMap } from './types'
import { parseEnds, parseStarts } from './parseResults'
import { abc } from './abc'

export const index = (starts: CSVInput, ends: CSVInput): FinalRacesMap => {
  const parsedStarts = parseStarts(starts)
  const parsedEnds = parseEnds(ends)
  return abc(parsedStarts, parsedEnds)
}
