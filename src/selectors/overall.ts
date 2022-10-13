import { NamesMap, ResultsMap } from '../types'

export interface OverallRaceResult {
  numberOfCompetitors: number
  numberOfRaces: number
}

export const overall = (data: ResultsMap, names: NamesMap): OverallRaceResult => {
  return {
    numberOfCompetitors: Object.keys(names).length,
    numberOfRaces: Object.values(data).reduce<number>((acc, cur) => acc + cur.length, 0)
  }
}
