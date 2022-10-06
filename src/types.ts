export type Id = string

export type CSVInput = string

export interface CSVData {
  id: Id
  time: string
}

export enum ResultType {
  START = 'start', END = 'end'
}

export interface TypedCSVData {
  id: CSVData['id']
  time: number
  type: ResultType
}

export type Header = string

export interface RacesMap {
  [key: string]: RaceEntry[]
}

export interface RaceEntry {
  start: RaceEntryField
  end: RaceEntryField
}

export type RaceEntryField = number | null | undefined
