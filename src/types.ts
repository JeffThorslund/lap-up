export type Id = string

export type CSV = string

export interface CSVData {
  id: Id
  time: string
}

export interface TypedCSVData {
  id: Id
  time: number
}

export type Header = string

export interface FinalRacesMap {
  [key: string]: FinalRaceEntry[]
}

export interface FinalRaceEntry {
  start: number | null
  end: number | null
}

export interface DataStructure {
  [key: string]: { starts: number[], ends: number[] }
}
