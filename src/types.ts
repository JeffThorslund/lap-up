export type Id = string
export type CSV = string
export type Header = string

/** Untyped Timing Events **/

export interface TimingEvent<T> {
  id: Id
  time: T
}

export type StartTimingEvent = TimingEvent<string>

export interface EndTimingEvent extends TimingEvent<string> {
  touchedGates: string
  missedGates: string
}

/** Typed Timing Events **/

export type StartTypedTimingEvent = TimingEvent<number>

export interface EndTypedTimingEvent extends TimingEvent<number> {
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

export interface StartRecord extends Omit<StartTypedTimingEvent, 'id'> {
}

export interface EndRecord extends Omit<EndTypedTimingEvent, 'id'> {
}

export interface NamesMap {
  [key: Id]: string
}

export interface NameRecord {
  id: Id
  name: string
}

export interface Selectors {
  ordered: any
}

export interface Final {
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
