import { FinalRaceEntry, Id, NamesMap, ResultsMap } from '../types'

// sorted alpha by name
export interface PersonalResult {
  id: Id
  name: string
  numberOfRaces: number
}

export const personal = (data: ResultsMap, names: NamesMap): PersonalResult[] => {
  const results: PersonalResult[] = []

  Object.entries(data)
    .map<PersonalResult>(addProperties(names))
    .sort((a, b) => b.name.localeCompare(a.name))

  return results
}

const addProperties = (names: NamesMap) => {
  return ([id, results]: [id: Id, results: FinalRaceEntry[]]): PersonalResult => {
    return ({
      id,
      name: names[id],
      numberOfRaces: results.length
    })
  }
}
