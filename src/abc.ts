import { FinalRacesMap, Id, IndexTrackingMap, StartsRacesMap, TypedCSVData } from './types'

export const abc = (starts: TypedCSVData[], ends: TypedCSVData[]): FinalRacesMap => {
  const uniqueIds = createUniqueIds(starts, ends)
  const startsRacesMap = createStartsRacesMap(uniqueIds, starts)
  const finalRacesMap = createFinalRacesMap(uniqueIds)
  const pointerMap = createPointerMap(uniqueIds)

  // handle ends
  for (let i = 0; i < ends.length; i++) {
    const currentId = ends[i].id
    const someStarts = startsRacesMap[currentId]
    const someFinals = finalRacesMap[currentId]

    // if end is before currently indexed start
    if (ends[i].time < someStarts[pointerMap[currentId]].start) {
      someFinals.push({
        start: null,
        end: ends[i].time
      })
    } else if (ends[i].time > someStarts[pointerMap[currentId]].start) {
      while (ends[i].time > someStarts[pointerMap[currentId] + 1].start) {
        someFinals.push({
          start: someStarts[pointerMap[currentId]].start,
          end: null
        })

        pointerMap[currentId]++
      }

      someFinals.push({
        start: someStarts[pointerMap[currentId]].start,
        end: ends[i].time
      })

      pointerMap[currentId]++
    }
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
