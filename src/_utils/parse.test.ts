import { appendHeadersToCSV, parseRawData } from './parse'

describe('header appending', () => {
  test('add headers to raw data', () => {
    expect(appendHeadersToCSV(['id', 'time'], '48\t1653746491')).toEqual('id\ttime\n48\t1653746491')
  })

  test('add wrong number of headers to raw data', () => {
    // this is allowed, and will be caught in parse
    expect(appendHeadersToCSV(['id'], '48\t1653746491')).toEqual('id\n48\t1653746491')
  })

  test('add empty headers', () => {
    expect(() => appendHeadersToCSV([], '48\t1653746491')).toThrow('You must attach headers')
  })
})

describe('parse raw data', () => {
  test('parse raw data into data structure', () => {
    expect(parseRawData('id\ttime\n48\t16')).toEqual([{
      id: '48',
      time: '16'
    }])
  })

  test('parse raw data into data structure', () => {
    expect(parseRawData('id\ttime')).toEqual([])
  })

  test('wrong number of headers', () => {
    expect(() => parseRawData('id\n48\t16')).toThrow()
  })
})
