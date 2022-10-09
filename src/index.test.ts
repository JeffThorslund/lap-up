import { buildRacesMap, getLastElement } from './buildRacesMap'
import { ResultType } from './types'
import { index } from './index'

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

describe('end to end tests', () => {
  test('normal', () => {
    const csv = {
      starts: `1\t1
2\t2
3\t3`,
      ends: `1\t4
2\t5
3\t6`
    }

    const expected = {
      1: [
        {
          end: 4,
          start: 1
        }
      ],
      2: [
        {
          end: 5,
          start: 2
        }
      ],
      3: [
        {
          end: 6,
          start: 3
        }
      ]
    }

    expect(index(csv.starts, csv.ends)).toEqual(expected)
  })
  test('first race has no end', () => {
    const csv = {
      starts: `1\t1
2\t2
3\t3
1\t5`,
      ends: `1\t6
2\t5
3\t6`
    }

    const expected = {
      1: [
        {
          end: null,
          start: 1
        },
        {
          end: 6,
          start: 5
        }
      ],
      2: [
        {
          end: 5,
          start: 2
        }
      ],
      3: [
        {
          end: 6,
          start: 3
        }
      ]
    }

    expect(index(csv.starts, csv.ends)).toEqual(expected)
  })
  test('last race has no end', () => {
    const csv = {
      starts: `1\t1
2\t2
3\t3
1\t5`,
      ends: `1\t4
2\t5
3\t6`
    }

    const expected = {
      1: [
        {
          end: 4,
          start: 1
        },
        {
          end: null,
          start: 5
        }
      ],
      2: [
        {
          end: 5,
          start: 2
        }
      ],
      3: [
        {
          end: 6,
          start: 3
        }
      ]
    }

    expect(index(csv.starts, csv.ends)).toEqual(expected)
  })
})
