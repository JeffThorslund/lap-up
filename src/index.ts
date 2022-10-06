import { appendHeadersToData, parseRawData } from './prepResults'
import { CSVData, TypedCSVData } from './types'

export const mergeLists = (starts: TypedCSVData[], ends: TypedCSVData[]): TypedCSVData[] => {
  return [...starts, ...ends].sort((a, b) => a.time - b.time)
}

//

export interface CSVSortedData {
  id: string
  time: number
}

export const sortByTime = (data: CSVData[]): CSVSortedData[] => {
  return data.sort((a, b) => Number(a.time) - Number(b.time)).map((entry) => {
    return {
      id: entry.id,
      time: Number(entry.time)
    }
  })
}

interface RacesMap {
  [key: string]: RaceEntry[]
}

interface RaceEntry {
  start: RaceEntryField
  end: RaceEntryField
}

type RaceEntryField = number | null | undefined

const isRaceEntryComplete = (raceEntry: RaceEntry): boolean => {
  return raceEntry.start !== undefined && raceEntry.end !== undefined
}

export const blah = (starts: CSVSortedData[], ends: CSVSortedData[]): RacesMap => {
  let startPointer = 0
  let endPointer = 0

  const racesDictionary: RacesMap = {
    1: []
  }

  while (startPointer < starts.length || endPointer < ends.length) {
    console.log(startPointer, endPointer)

    if (starts[startPointer].time < ends[endPointer].time) {
      const { id, time } = starts[startPointer]
      const races = racesDictionary[id]
      const numberOfRaces = races.length
      const lastRace = races[numberOfRaces - 1]

      // we are looking at a start
      // we examine
      if (numberOfRaces === 0 || isRaceEntryComplete(lastRace)) {
        races.push({ start: time, end: undefined })
      }

      // nothing is started

      startPointer++
    } else {
      const { id, time } = ends[startPointer]
      const races = racesDictionary[id]
      const numberOfRaces = races.length
      const lastRace = races[numberOfRaces - 1]

      if (lastRace.end === undefined) {
        lastRace.end = time
      }

      endPointer++
    }
  }

  return racesDictionary
}

export const index = (rawData: string): void => {
  const dataWithHeaders = appendHeadersToData(['id', 'time'], rawData)
  const parsedData = parseRawData(dataWithHeaders)
  sortByTime(parsedData)
}
