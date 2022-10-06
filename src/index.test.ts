import { blah, mergeLists, sortByTime } from './index'
import { CSVData, ResultType } from './types'

describe('merge', () => {
  test('merge lists', () => {
    expect(mergeLists([{
      id: '2',
      time: 456,
      type: ResultType.START
    }], [{ id: '1', time: 123, type: ResultType.START }])).toEqual([{ id: '1', time: 123, type: ResultType.START }, {
      id: '2',
      time: 456,
      type: ResultType.START
    }])
  })
})

test.skip('sort entries by time', () => {
  const unsortedEntries: CSVData[] = [
    { id: '1', time: '5' },
    { id: '2', time: '2' }
  ]

  expect(sortByTime(unsortedEntries)).toEqual([
    { id: '2', time: 2 },
    { id: '1', time: 5 }
  ])
})

test.skip('make dictionary', () => {
  expect(blah([{ id: '1', time: 3 }], [{ id: '1', time: 4 }])).toEqual([])
})

test.skip('make dictionary', () => {
  expect(blah([{ id: '1', time: 3 }], [{ id: '1', time: 4 }])).toEqual({ 1: [{ start: '3', end: '4' }] })
})
