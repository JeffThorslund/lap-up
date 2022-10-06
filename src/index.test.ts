import { mergeLists } from './index'
import { ResultType } from './types'

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
