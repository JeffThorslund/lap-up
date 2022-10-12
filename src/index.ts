import { CSV, Selectors } from './types'
import { parseNames } from './names/names'
import { parseResults } from './results'
import { selectors } from './selectors'

export const index = (starts: CSV, ends: CSV, names: CSV): Selectors => {
  const parsedNames = parseNames(names)
  const parsedResults = parseResults(starts, ends)
  return selectors(parsedResults, parsedNames)
}
