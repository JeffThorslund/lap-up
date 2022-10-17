import {
  AnonymousEndTimingEvent,
  AnonymousStartTimingEvent,
  ComputedRaceInstance,
  EndTimingEvent,
  InitialPassRaceEntry,
  NameRecord,
  ResultRecords,
  StartTimingEvent,
  TimingEventRecords
} from '../types'

export const buildResults = (names: NameRecord[], starts: StartTimingEvent[], ends: EndTimingEvent[]): ResultRecords => {
  const allRacerData = separateData(names, starts, ends)
  const finalRacesMap: ResultRecords = {}
  for (const id in allRacerData) {
    const racerData = allRacerData[id]
    finalRacesMap[id] = {
      name: racerData.name,
      races: computeRaceInstances(racerData.timingEvents)
    }
  }

  return finalRacesMap
}

export const computeRaceInstances = (
  timingEvents: { starts: AnonymousStartTimingEvent[], ends: AnonymousEndTimingEvent[] }
): ComputedRaceInstance[] => {
  const initialPassRaceEntries: InitialPassRaceEntry[] = timingEvents.starts.map(start => ({
    start: start.time,
    end: undefined
  }))

  const finals: ComputedRaceInstance[] = []

  let pointer = 0

  for (const end of timingEvents.ends) {
    if (initialPassRaceEntries[pointer] === undefined || end.time < initialPassRaceEntries[pointer].start) {
      finals.push(buildEntry.startless(end))
    } else if (end.time >= initialPassRaceEntries[pointer].start) {
      while (initialPassRaceEntries[pointer + 1] !== undefined && end.time > initialPassRaceEntries[pointer + 1].start) {
        finals.push(buildEntry.endless(initialPassRaceEntries[pointer].start))
        pointer++
      }
      finals.push(buildEntry.base(initialPassRaceEntries[pointer].start, end))
      pointer++
    } else {
      throw new Error('An unexpected error occurred.')
    }
  }

  const startsAfterCurrentIndex = initialPassRaceEntries.slice(pointer)
  finals.push(...startsAfterCurrentIndex.map(e => buildEntry.endless(e.start)))

  return finals
}

export const buildEntry = {
  startless (end: AnonymousEndTimingEvent): ComputedRaceInstance {
    return {
      start: null,
      end: end.time,
      touchedGates: end.touchedGates,
      missedGates: end.missedGates
    }
  },
  endless (startTime: number): ComputedRaceInstance {
    return {
      start: startTime,
      end: null,
      touchedGates: null,
      missedGates: null
    }
  },
  base (startTime: number, end: AnonymousEndTimingEvent): ComputedRaceInstance {
    return {
      start: startTime,
      end: end.time,
      touchedGates: end.touchedGates,
      missedGates: end.missedGates
    }
  }
}

export const separateData = (names: NameRecord[], starts: StartTimingEvent[], ends: EndTimingEvent[]): TimingEventRecords => {
  const data: TimingEventRecords = {}

  for (const {
    id,
    name
  } of names) {
    data[id] = {
      name,
      timingEvents: {
        starts: [],
        ends: []
      }
    }
  }

  for (const start of starts) {
    data[start.id].timingEvents.starts.push({ time: start.time })
  }

  for (const end of ends) {
    data[end.id].timingEvents.ends.push({
      time: end.time,
      missedGates: end.missedGates,
      touchedGates: end.touchedGates
    })
  }

  return data
}
