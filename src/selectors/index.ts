import { NamesMap, ResultsMap, Selectors } from '../types'
import { ordered } from './ordered'

export const selectors = (data: ResultsMap, names: NamesMap): Selectors => {
  return {
    // profile: null, // personal stats per person. how many races, improvement, etc
    // overall: null, // how many total races happened, most improved, etc
    ordered: ordered(data, names) // ordered list of all racers
  }
}
