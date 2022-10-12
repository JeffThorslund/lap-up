import { FinalRaceEntry, Id, NamesMap, ResultsMap } from '../types'

interface Final {
  id: Id
  name: string
  results: Result[]
}

interface Result extends FinalRaceEntry {
  time: number | null
  adjustedTime: number | null
}

export const ordered = (data: ResultsMap, names: NamesMap): Final[] => {
  return []
}
