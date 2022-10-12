import { enumerateResults } from './parse'

describe('enumerate data', () => {
  test('add START enum to data', () => {
    expect(enumerateResults.start([{
      time: '123',
      id: '1'
    }])).toEqual([{
      id: '1',
      time: 123
    }])
  })
})
