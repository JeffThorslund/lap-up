import { DataStructure, FinalRaceEntry, FinalRacesMap, Id, TypedCSVData } from './types'

export const abc = (starts: TypedCSVData[], ends: TypedCSVData[]): FinalRacesMap => {
  const uniqueIds = createUniqueIds(starts, ends)

  const allRacerData = separateData(uniqueIds, starts, ends)

  const finalRacesMap: FinalRacesMap = {}

  for (const id in allRacerData) {
    const racerData = allRacerData[id]

    const starts = racerData.starts.map(s => ({
      start: s.time,
      end: undefined
    }))

    const finals: FinalRaceEntry[] = []

    let pointer = 0

    for (const end of racerData.ends) {
      // this covers ends that occur before any starts
      if (starts[pointer] === undefined || end.time < starts[pointer].start) {
        finals.push(buildEntry.startless(end.time))
      } else if (end.time >= starts[pointer].start) {
        while (starts[pointer + 1] !== undefined && end.time > starts[pointer + 1].start) {
          finals.push(buildEntry.startless(starts[pointer].start))
        }
        finals.push(buildEntry.base(starts[pointer].start, end.time))
        pointer++
      } else {
        // pointer++
      }
    }

    // append rest of starts
    const startsAfterCurrentIndex = starts.slice(pointer)
    finals.push(...startsAfterCurrentIndex.map(e => buildEntry.endless(e.start)))

    finalRacesMap[id] = finals
  }

  return finalRacesMap
}

export const createUniqueIds = (starts: TypedCSVData[], ends: TypedCSVData[]): string[] => [...new Set([...starts, ...ends].map(e => e.id))]

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
    data[start.id].starts.push(start)
  }

  for (const end of ends) {
    data[end.id].ends.push(end)
  }

  return data
}
