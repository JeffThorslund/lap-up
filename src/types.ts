import { PersonalResult } from './selectors/personal'
import { OverallRaceResult } from './selectors/overall'

export type Id = string
export type Name = string
export type Time = number

/** Timing Events represent the data recorded on paper by the persons timing the event **/

interface TimingEvent {
  id: Id
  time: Time
}

export type StartTimingEvent = TimingEvent

export interface EndTimingEvent extends TimingEvent {
  touchedGates: number
  missedGates: number
}

export interface NameRecord {
  id: Id
  name: Name
}

/** UnComputed Data Structure **/

export type TimingEventRecords = Record<Id, TimingEventRecord>

interface TimingEventRecord {
  name: Name
  timingEvents: AnonymousTimingEvents
}

interface AnonymousTimingEvents {
  starts: AnonymousStartTimingEvent[]
  ends: AnonymousEndTimingEvent[]
}

export interface AnonymousStartTimingEvent extends Omit<StartTimingEvent, 'id'> {
}

export interface AnonymousEndTimingEvent extends Omit<EndTimingEvent, 'id'> {
}

/** Results are the final parsed data structure **/

export type ResultRecords = Record<Id, ResultRecord>

export interface ResultRecord {
  name: Name
  races: ComputedRaceInstance[]
}

export interface ComputedRaceInstance {
  start: Time | null
  end: Time | null
  touchedGates: number | null
  missedGates: number | null
}

/** Intermediate **/

export interface InitialPassRaceEntry {
  start: Time
  end: undefined
}

export interface Selectors {
  ordered: OrderedSelectorResults[]
  personal: PersonalResult[]
  overall: OverallRaceResult
}

export interface OrderedSelectorResults {
  id: Id
  name: Name
  results: CompleteComputedRaceInstance[]
}

export interface CompleteComputedRaceInstance extends ComputedRaceInstance {
  time: Time | null
  adjustedTime: number | null
}

export interface PenaltyConfig {
  number: number | null
  penalty: number
}
