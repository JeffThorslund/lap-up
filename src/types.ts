import { PersonalResult } from './selectors/personal'
import { OverallRaceResult } from './selectors/overall'

export type Id = string

/** Timing Events **/

export interface TimingEvent {
  id: Id
  time: number
}

export type StartTimingEvent = TimingEvent

export interface EndTimingEvent extends TimingEvent {
  touchedGates: number
  missedGates: number
}

// Other

export interface ResultsMap {
  [key: string]: FinalRaceEntry[]
}

export interface InitialPassRaceEntry {
  start: number
  end: undefined
}

export interface FinalRaceEntry {
  start: number | null
  end: number | null
  touchedGates: number | null
  missedGates: number | null
}

export interface DataStructure {
  [key: string]: { starts: StartRecord[], ends: EndRecord[] }
}

export interface StartRecord extends Omit<StartTimingEvent, 'id'> {
}

export interface EndRecord extends Omit<EndTimingEvent, 'id'> {
}

export interface NamesMap {
  [key: Id]: string
}

export interface NameRecord {
  id: Id
  name: string
}

export interface Selectors {
  ordered: OrderedSelectorResults[]
  personal: PersonalResult[]
  overall: OverallRaceResult
}

export interface OrderedSelectorResults {
  id: Id
  name: string
  results: Result[]
}

export interface Result extends FinalRaceEntry {
  time: number | null
  adjustedTime: number | null
}

export interface PenaltyConfig {
  number: number | null
  penalty: number
}
