import { ordered } from './ordered'
import { NamesMap, ResultsMap } from '../types'

const names: NamesMap = {
  1: 'jeff'
}

const results: ResultsMap = {
  1: [{
    start: 1,
    end: 15,
    touchedGates: 0,
    missedGates: 0
  }]
}

test('', () => {
  expect(ordered(results, names)).toEqual([])
})
