import { DataStructure, FinalRaceEntry, FinalRacesMap, Id, TypedCSVData } from './types'

export const iterateOverObj = (starts: TypedCSVData[], ends: TypedCSVData[]): FinalRacesMap => {
  const uniqueIds: Id[] = createUniqueIds(starts, ends)
  const allRacerData: DataStructure = separateData(uniqueIds, starts, ends)
  const finalRacesMap: FinalRacesMap = {}
  for (const id in allRacerData) {
    const racerData = allRacerData[id]
    finalRacesMap[id] = abc(racerData.starts, racerData.ends)
  }

  return finalRacesMap
}

export const abc = (starts: number[], ends: number[]): FinalRaceEntry[] => {
  const firstPass = starts.map(start => ({
    start,
    end: undefined
  }))

  const finals: FinalRaceEntry[] = []

  let pointer = 0

  for (const end of ends) {
    // this covers ends that occur before any starts
    if (firstPass[pointer] === undefined || end < firstPass[pointer].start) {
      finals.push(buildEntry.startless(end))
    } else if (end >= firstPass[pointer].start) {
      while (firstPass[pointer + 1] !== undefined && end > firstPass[pointer + 1].start) {
        finals.push(buildEntry.endless(firstPass[pointer].start))
        pointer++
      }
      finals.push(buildEntry.base(firstPass[pointer].start, end))
      pointer++
    } else {
      throw new Error('Unexpected error encountered')
    }
  }

  // append rest of starts
  const startsAfterCurrentIndex = firstPass.slice(pointer)
  finals.push(...startsAfterCurrentIndex.map(e => buildEntry.endless(e.start)))

  return finals
}

export const createUniqueIds = (starts: TypedCSVData[], ends: TypedCSVData[]): Id[] => [...new Set([...starts, ...ends].map(e => e.id))]

export const buildEntry = {
  startless (endTime: number): FinalRaceEntry {
    return {
      start: null,
      end: endTime
    }
  },
  endless (startTime: number): FinalRaceEntry {
    return {
      start: startTime,
      end: null
    }
  },
  base (startTime: number, endTime: number): FinalRaceEntry {
    return {
      start: startTime,
      end: endTime
    }
  }
}

export const separateData = (uniqueIds: Id[], starts: TypedCSVData[], ends: TypedCSVData[]): DataStructure => {
  const data: DataStructure = {}

  for (const id of uniqueIds) {
    data[id] = {
      starts: [],
      ends: []
    }
  }

  for (const start of starts) {
    data[start.id].starts.push(start.time)
  }

  for (const end of ends) {
    data[end.id].ends.push(end.time)
  }

  return data
}
