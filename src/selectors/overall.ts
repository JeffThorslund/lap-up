import { ResultRecords } from '../types'

export interface OverallRaceResult {
  numberOfCompetitors: number
  numberOfRaces: number
}

export const overall = (data: ResultRecords): OverallRaceResult => {
  return {
    numberOfCompetitors: Object.keys(data).length,
    numberOfRaces: Object.values(data).reduce<number>((acc, cur) => acc + cur.races.length, 0)
  }
}
