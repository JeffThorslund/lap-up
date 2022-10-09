import { ResultType } from './types'
import { mergeResults } from './mergeResults'

describe('merge', () => {
  const raceEntry1 = {
    id: '1',
    time: 123,
    type: ResultType.START
  }

  const raceEntry2 = {
    id: '2',
    time: 456,
    type: ResultType.END
  }

  test('merge lists', () => {
    expect(mergeResults([raceEntry2], [raceEntry1])).toEqual([raceEntry1, raceEntry2])
  })
})
