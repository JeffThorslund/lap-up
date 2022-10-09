import { buildRacesMap, getLastElement } from './buildRacesMap'
import { ResultType } from './types'

describe('structure creation', function () {
  test('add new racer', () => {
    expect(buildRacesMap([
      {
        id: '1',
        type: ResultType.START,
        time: 123
      },
      {
        id: '1',
        type: ResultType.END,
        time: 130
      }
    ])).toEqual({
      1: [{
        start: 123,
        end: 130
      }]
    })
  })
})

describe('last element getter', function () {
  test('empty array', () => {
    expect(getLastElement([])).toEqual(undefined)
  })

  test('single element', () => {
    const entry = {
      start: 123,
      end: 321
    }
    expect(getLastElement([{
      start: 123,
      end: 321
    }])).toEqual(entry)
  })
})
