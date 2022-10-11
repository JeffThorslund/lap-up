import {
  DataStructure,
  FinalRaceEntry,
  FinalRacesMap,
  Id,
  IndexTrackingMap,
  StartsRacesMap,
  TypedCSVData
} from './types'

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

    const pointer = 0

    for (const end of racerData.ends) {
      if (starts[pointer] === undefined) {
        finals.push(buildEntry.startless(end.time))
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

export const createStartsRacesMap = (uniqueIds: Id[], starts: TypedCSVData[]): StartsRacesMap => {
  // add all racer ids
  const startsRacesMap = uniqueIds.reduce<StartsRacesMap>((acc, cur) => ({
    ...acc,
    [cur]: []
  }), {})

  // push all starts
  for (let i = 0; i < starts.length; i++) {
    const someRaces = startsRacesMap[starts[i].id]

    someRaces.push({
      start: starts[i].time,
      end: undefined
    })
  }

  return startsRacesMap
}

export const createFinalRacesMap = (uniqueIds: Id[]): FinalRacesMap => {
  return uniqueIds.reduce<FinalRacesMap>((acc, cur) => ({
    ...acc,
    [cur]: []
  }), {})
}

export const createPointerMap = (uniqueIds: Id[]): IndexTrackingMap => {
  // current index of what race entry we are looking at
  return uniqueIds.reduce<IndexTrackingMap>((acc, cur) => ({
    ...acc,
    [cur]: 0
  }), {})
}

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
