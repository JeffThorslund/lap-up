import {
  appendHeadersToData,
  enumerateResults,
  parseRawData,
  prepEndResults,
  prepResults,
  prepStartResults
} from './prepResults'
import { ResultType } from './types'

describe('header appending', () => {
  test('add headers to raw data', () => {
    expect(appendHeadersToData(['id', 'time'], '48\t1653746491')).toEqual('id\ttime\n48\t1653746491')
  })

  test('add wrong number of headers to raw data', () => {
    // this is allowed, and will be caught in parse
    expect(appendHeadersToData(['id'], '48\t1653746491')).toEqual('id\n48\t1653746491')
  })

  test('add empty headers', () => {
    expect(() => appendHeadersToData([], '48\t1653746491')).toThrow('You must attach headers')
  })
})

describe('parsing', () => {
  test('parse raw data into data structure', () => {
    expect(parseRawData('id\ttime\n48\t16')).toEqual([{
      id: '48',
      time: '16'
    }])
  })

  test('wrong number of headers', () => {
    expect(() => parseRawData('id\n48\t16')).toThrow()
  })
})

describe('enumerate data', () => {
  test('add START enum to data', () => {
    expect(enumerateResults([{
      time: '123',
      id: '1'
    }], ResultType.START)).toEqual([{
      id: '1',
      time: 123,
      type: ResultType.START
    }])
  })
})

describe('prepare data', () => {
  test('base', () => {
    expect(prepResults('1\t123', ['id', 'time'], ResultType.START)).toEqual([{
      id: '1',
      time: 123,
      type: ResultType.START
    }])
  })

  test('start', () => {
    expect(prepStartResults('1\t123')).toEqual([{
      id: '1',
      time: 123,
      type: ResultType.START
    }])
  })

  test('end', () => {
    expect(prepEndResults('1\t123')).toEqual([{
      id: '1',
      time: 123,
      type: ResultType.END
    }])
  })
})
