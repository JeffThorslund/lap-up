import { getAdjustedTime, getTime, getTotalPenaltyTime, ordered, sortNonIncreasing } from './ordered'
import { PenaltyConfig, ResultRecords } from '../types'

const results: ResultRecords = {
  1: {
    name: 'jeff',
    races: [{
      start: 1,
      end: 15,
      touchedGates: 2,
      missedGates: 0
    }]
  }
}

describe('end to end', () => {
  test('empty dataset', () => {
    expect(ordered({})).toEqual([])
  })

  test('single user', () => {
    expect(ordered(results)).toEqual([{
      id: '1',
      name: 'jeff',
      results: [{
        adjustedTime: 10,
        end: 15,
        missedGates: 0,
        start: 1,
        time: 14,
        touchedGates: 2
      }]
    }])
  })

  test('example race', () => {
    const results: ResultRecords = {
      1: {
        name: 'jeff',
        races: [{
          start: 1,
          end: 1000,
          touchedGates: 2,
          missedGates: 0
        }, {
          start: 2000,
          end: 2100,
          touchedGates: 0,
          missedGates: 0
        }]
      },
      2: {
        name: 'joey',
        races: [{
          start: 3000,
          end: 3200,
          touchedGates: null,
          missedGates: null
        }]
      },
      3: {
        name: 'jim',
        races: []
      },
      4: {
        name: 'archie',
        races: [
          {
            start: null,
            end: 4000,
            touchedGates: 2,
            missedGates: 0
          }, {
            start: 1500,
            end: 6000,
            touchedGates: 2,
            missedGates: 0
          }
        ]
      }
    }

    expect(ordered(results)).toEqual([
      {
        id: '1',
        name: 'jeff',
        results: [
          {
            adjustedTime: 100,
            end: 2100,
            missedGates: 0,
            start: 2000,
            time: 100,
            touchedGates: 0
          },
          {
            adjustedTime: 995,
            end: 1000,
            missedGates: 0,
            start: 1,
            time: 999,
            touchedGates: 2
          }
        ]
      },
      {
        id: '2',
        name: 'joey',
        results: [
          {
            adjustedTime: 200,
            end: 3200,
            missedGates: null,
            start: 3000,
            time: 200,
            touchedGates: null
          }
        ]
      },
      {
        id: '4',
        name: 'archie',
        results: [
          {
            adjustedTime: 4496,
            end: 6000,
            missedGates: 0,
            start: 1500,
            time: 4500,
            touchedGates: 2
          },
          {
            adjustedTime: null,
            end: 4000,
            missedGates: 0,
            start: null,
            time: null,
            touchedGates: 2
          }
        ]
      },
      {
        id: '3',
        name: 'jim',
        results: []
      }
    ])
  })
})

describe('time finder', () => {
  test('valid', () => {
    expect(getTime(1, 40)).toBe(39)
  })

  test('invalid start', () => {
    expect(getTime(null, 40)).toBe(null)
  })

  test('invalid end', () => {
    expect(getTime(40, null)).toBe(null)
  })
})

describe('time adjustor', () => {
  const nullPenaltyConfig = {
    number: null,
    penalty: 0
  }

  test('invalid time', () => {
    expect(getAdjustedTime(
      null,
      nullPenaltyConfig,
      nullPenaltyConfig
    )).toBe(null)
  })

  test('valid no penalty config', () => {
    expect(getAdjustedTime(
      6,
      nullPenaltyConfig,
      nullPenaltyConfig
    )).toBe(6)
  })

  const touchedPenaltyConfig: PenaltyConfig = {
    number: 4,
    penalty: 2
  }

  const missedPenaltyConfig: PenaltyConfig = {
    number: 1,
    penalty: 50
  }

  test('valid with missed and touched config', () => {
    expect(getAdjustedTime(
      1000,
      touchedPenaltyConfig,
      missedPenaltyConfig
    )).toBe(942)
  })
})

describe('penalty calculator', function () {
  test('zeros', () => {
    expect(getTotalPenaltyTime(0, 0)).toBe(0)
  })

  test('real numbers', () => {
    expect(getTotalPenaltyTime(11, 15)).toBe(165)
  })
})

describe('sort by smallest time, with nulls last', () => {
  test('null a', () => {
    expect(sortNonIncreasing(null, 1)).toBe(1)
  })

  test('null b', () => {
    expect(sortNonIncreasing(1, null)).toBe(-1)
  })

  test('both null', () => {
    expect(sortNonIncreasing(null, null)).toBe(1)
  })

  test('a > b', () => {
    expect(sortNonIncreasing(10, 1)).toBe(9)
  })

  test('a < b', () => {
    expect(sortNonIncreasing(1, 19)).toBe(-18)
  })

  // implement func with sort
  test('full  with empty arr', () => {
    expect([].sort(sortNonIncreasing)).toEqual([])
  })

  test('full function', () => {
    expect([1, 4, null, 1, 7, 8, null, 3, 122, null, 6, 34]
      .sort(sortNonIncreasing))
      .toEqual([1, 1, 3, 4, 6, 7, 8, 34, 122, null, null, null])
  })
})
