import { NamesMap, ResultsMap, Selectors } from '../types'
import { ordered } from './ordered'
import { personal } from './personal'
import { overall } from './overall'

export const selectors = (data: ResultsMap, names: NamesMap): Selectors => {
  return {
    overall: overall(data, names),
    personal: personal(data, names),
    ordered: ordered(data, names)
  }
}
