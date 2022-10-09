import { Id, RaceEntry, RacesMap, ResultType, TypedCSVData } from './types'

export const buildRacesMap = (list: TypedCSVData[]): RacesMap => {
  let allRaces: RacesMap = {}

  for (const entry of list) {
    if (allRaces[entry.id] === undefined) {
      allRaces = addNewRacer(allRaces, entry.id)
    }

    const someRaces = allRaces[entry.id]

    const entryHandlers = createEntryHandlers(someRaces, entry.time)

    switch (entry.type) {
      case ResultType.START:
        entryHandlers.start()
        break

      case ResultType.END:
        entryHandlers.end()
        break
    }
  }

  return allRaces
}

export const addNewRacer = (races: RacesMap, newRacerId: Id): RacesMap => {
  return {
    ...races,
    [newRacerId]: []
  }
}

export const createEntryHandlers = (races: RaceEntry[], time: number): { start: () => void, end: () => void } => {
  const lastElement = getLastElement(races)
  const isCurrentlyRacing = getIsCurrentlyRacing(lastElement)

  return {
    start () {
      if (isCurrentlyRacing) {
        endCurrentRace(lastElement)
      }

      races.push({
        start: time,
        end: undefined
      })
    },
    end () {
      if (!isCurrentlyRacing) {
        races.push({
          start: null,
          end: undefined
        })
      }

      lastElement.end = time
    }
  }
}

// todo account for undefined
export const getLastElement = (arr: RaceEntry[]): RaceEntry => {
  return arr[arr.length - 1]
}

export const getIsCurrentlyRacing = (lastElement: RaceEntry): boolean => {
  // racer has not started their first race
  if (lastElement === undefined) {
    return false
  }

  // racer has not finished their current race
  return lastElement.end === undefined
}

export const endCurrentRace = (lastElement: RaceEntry): void => {
  lastElement.end = null
}
