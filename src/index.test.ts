import { appendHeadersToData, CSVData, parseRawData, sortByTime } from './index'

test('add headers to raw data', () => {
  expect(appendHeadersToData(['id', 'time'], '48\t1653746491')).toEqual('id\ttime\n48\t1653746491')
})

test('parse raw data into data structure', () => {
  expect(parseRawData('id\ttime\n48\t16')).toEqual([{ id: '48', time: '16' }])
})

test('sort entries by time', () => {
  const unsortedEntries: CSVData[] = [
    { id: '1', time: '5' },
    { id: '2', time: '2' }
  ]

  expect(sortByTime(unsortedEntries)).toEqual([
    { id: '2', time: '2' },
    { id: '1', time: '5' }
  ])
})
