import { NamesMap, ResultsMap, Selectors } from '../types'

export const selectors = (data: ResultsMap, names: NamesMap): Selectors => {
  return {
    // profile: null, // personal stats per person. how many races, improvement, etc
    // overall: null, // how many total races happened, most improved, etc
    ordered: null // ordered list of all racers
  }
}
