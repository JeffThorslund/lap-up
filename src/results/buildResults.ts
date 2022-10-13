import {
  DataStructure,
  EndRecord,
  EndTypedTimingEvent,
  FinalRaceEntry,
  Id,
  InitialPassRaceEntry,
  ResultsMap,
  StartRecord,
  StartTypedTimingEvent
} from '../types'

export const buildResults = (starts: StartTypedTimingEvent[], ends: EndTypedTimingEvent[]): ResultsMap => {
  const uniqueIds: Id[] = createUniqueIds(starts, ends)
  const allRacerData: DataStructure = separateData(uniqueIds, starts, ends)
  const finalRacesMap: ResultsMap = {}
  for (const id in allRacerData) {
    const racerData = allRacerData[id]
    finalRacesMap[id] = abc(racerData.starts, racerData.ends)
  }

  return finalRacesMap
}

export const abc = (starts: StartRecord[], ends: EndRecord[]): FinalRaceEntry[] => {
  const initalPass: InitialPassRaceEntry[] = starts.map(start => ({
    start: start.time,
    end: undefined
  }))

  const finals: FinalRaceEntry[] = []

  let pointer = 0

  for (const end of ends) {
    if (initalPass[pointer] === undefined || end.time < initalPass[pointer].start) {
      finals.push(buildEntry.startless(end))
    } else if (end.time >= initalPass[pointer].start) {
      while (initalPass[pointer + 1] !== undefined && end.time > initalPass[pointer + 1].start) {
        finals.push(buildEntry.endless(initalPass[pointer].start))
        pointer++
      }
      finals.push(buildEntry.base(initalPass[pointer].start, end))
      pointer++
    } else {
      throw new Error('An unexpected error occurred.')
    }
  }

  const startsAfterCurrentIndex = initalPass.slice(pointer)
  finals.push(...startsAfterCurrentIndex.map(e => buildEntry.endless(e.start)))

  return finals
}

export const createUniqueIds = (starts: StartTypedTimingEvent[], ends: EndTypedTimingEvent[]): Id[] => {
  return [...new Set([...starts, ...ends].map(e => e.id))]
}

export const buildEntry = {
  startless (end: EndRecord): FinalRaceEntry {
    return {
      start: null,
      end: end.time,
      touchedGates: end.touchedGates,
      missedGates: end.missedGates
    }
  },
  endless (startTime: number): FinalRaceEntry {
    return {
      start: startTime,
      end: null,
      touchedGates: null,
      missedGates: null
    }
  },
  base (startTime: number, end: EndRecord): FinalRaceEntry {
    return {
      start: startTime,
      end: end.time,
      touchedGates: end.touchedGates,
      missedGates: end.missedGates
    }
  }
}

export const separateData = (uniqueIds: Id[], starts: StartTypedTimingEvent[], ends: EndTypedTimingEvent[]): DataStructure => {
  const data: DataStructure = {}

  for (const id of uniqueIds) {
    data[id] = {
      starts: [],
      ends: []
    }
  }

  for (const start of starts) {
    data[start.id].starts.push({ time: start.time })
  }

  for (const end of ends) {
    data[end.id].ends.push({
      time: end.time,
      missedGates: end.missedGates,
      touchedGates: end.touchedGates
    })
  }

  return data
}
