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
  type?: ResultType
}

export type Header = string

export interface BaseRacesMap<T> {
  [key: string]: T[]
}

export interface StartsRacesMap extends BaseRacesMap<StartsRaceEntry> {
}

export interface FinalRacesMap extends BaseRacesMap<FinalRaceEntry> {
}

export interface IndexTrackingMap {
  [key: string]: number
}

export interface StartsRaceEntry {
  start: number
  end: undefined
}

export interface FinalRaceEntry {
  start: number | null
  end: number | null
}

export interface DataStructure {
  [key: string]: { starts: TypedCSVData[], ends: TypedCSVData[] }
}
