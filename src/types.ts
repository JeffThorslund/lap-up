export type Id = string

export type CSV = string

// Timing Event

export interface TimingEvent {
  id: Id
  time: string
}

export interface StartTimingEvent extends TimingEvent {
}

export interface EndTimingEvent extends TimingEvent {
  touchedGates: string
  missedGates: string
}

// Typed Timing Event

export interface TypedTimingEvent {
  id: Id
  time: number
}

export interface StartTypedTimingEvent extends TypedTimingEvent {
}

export interface EndTypedTimingEvent extends TypedTimingEvent {
  touchedGates: number
  missedGates: number
}

// Other

export type Header = string

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
