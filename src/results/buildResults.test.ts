import { abc, buildEntry, buildResults, createUniqueIds } from './buildResults'
import { EndRecord, StartRecord } from '../types'

describe('create unique ids', () => {
  test('empty lists', () => {
    expect(createUniqueIds([], [])).toEqual([])
  })

  test('only starts', () => {
    expect(createUniqueIds([{
      id: '1',
      time: 1
    },
    {
      id: '2',
      time: 1
    }], [])).toEqual(['1', '2'])
  })

  test('only ends', () => {
    expect(createUniqueIds([], [{
      id: '1',
      time: 1,
      missedGates: 0,
      touchedGates: 0
    },
    {
      id: '2',
      time: 1,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual(['1', '2'])
  })

  test('starts and ends', () => {
    expect(createUniqueIds([{
      id: '1',
      time: 1
    },
    {
      id: '2',
      time: 1
    }], [{
      id: '1',
      time: 3,
      missedGates: 0,
      touchedGates: 0
    },
    {
      id: '2',
      time: 4,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual(['1', '2'])
  })
})

describe('build entry', () => {
  test('startless', () => {
    expect(buildEntry.startless({
      time: 9,
      missedGates: 0,
      touchedGates: 0
    })).toEqual({
      start: null,
      end: 9,
      missedGates: 0,
      touchedGates: 0
    })
  })

  test('endless', () => {
    expect(buildEntry.endless(9)).toEqual({
      start: 9,
      end: null,
      missedGates: null,
      touchedGates: null
    })
  })

  test('base', () => {
    expect(buildEntry.base(9, {
      time: 10,
      missedGates: 0,
      touchedGates: 0
    })).toEqual({
      start: 9,
      end: 10,
      missedGates: 0,
      touchedGates: 0
    })
  })
})

describe('interate over obj', () => {
  test('empty lists', () => {
    expect(buildResults([], [])).toEqual({})
  })

  test('single id, single end, no starts', () => {
    expect(buildResults([], [{
      id: '1',
      time: 1,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual({
      1: [{
        start: null,
        end: 1,
        missedGates: 0,
        touchedGates: 0
      }]
    })
  })

  test('single id, several ends, no starts', () => {
    expect(buildResults([], [{
      id: '1',
      time: 1,
      missedGates: 0,
      touchedGates: 0
    }, {
      id: '1',
      time: 10,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual({
      1: [{
        start: null,
        end: 1,
        missedGates: 0,
        touchedGates: 0
      }, {
        start: null,
        end: 10,
        missedGates: 0,
        touchedGates: 0
      }]
    })
  })

  test('single id, several start', () => {
    expect(buildResults([{
      id: '1',
      time: 1
    }, {
      id: '1',
      time: 2
    }], [])).toEqual({
      1: [{
        start: 1,
        end: null,
        missedGates: null,
        touchedGates: null
      }, {
        start: 2,
        end: null,
        missedGates: null,
        touchedGates: null
      }]
    })
  })

  test('regular case', () => {
    expect(buildResults([{
      id: '1',
      time: 100
    }], [{
      id: '1',
      time: 200,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual({
      1: [{
        start: 100,
        end: 200,
        missedGates: 0,
        touchedGates: 0
      }]
    })
  })

  test('traverse several starts', () => {
    expect(buildResults([{
      id: '1',
      time: 10
    }, {
      id: '1',
      time: 20
    }], [{
      id: '1',
      time: 25,
      missedGates: 0,
      touchedGates: 0
    }])).toEqual({
      1: [{
        start: 10,
        end: null,
        missedGates: null,
        touchedGates: null
      }, {
        start: 20,
        end: 25,
        missedGates: 0,
        touchedGates: 0
      }]
    })
  })
})

describe('single person iterator', () => {
  const s = (num: number): StartRecord => ({
    time: num
  })

  const e = (num: number): EndRecord => ({
    time: num,
    missedGates: 0,
    touchedGates: 0
  })

  test('regular case', () => {
    expect(abc([10, 20, 30].map(s), [15, 25, 35].map(e))).toEqual([{
      start: 10,
      end: 15,
      missedGates: 0,
      touchedGates: 0
    }, {
      start: 20,
      end: 25,
      missedGates: 0,
      touchedGates: 0
    }, {
      start: 30,
      end: 35,
      missedGates: 0,
      touchedGates: 0
    }])
  })

  test('all starts', () => {
    expect(abc([10, 20, 30].map(s), [])).toEqual([{
      start: 10,
      end: null,
      missedGates: null,
      touchedGates: null
    }, {
      start: 20,
      end: null,
      missedGates: null,
      touchedGates: null
    }, {
      start: 30,
      end: null,
      missedGates: null,
      touchedGates: null
    }])
  })

  test('all ends', () => {
    expect(abc([], [15, 25, 35].map(e))).toEqual([{
      start: null,
      end: 15,
      missedGates: 0,
      touchedGates: 0
    }, {
      start: null,
      end: 25,
      missedGates: 0,
      touchedGates: 0
    }, {
      start: null,
      end: 35,
      missedGates: 0,
      touchedGates: 0
    }])
  })

  test('random case', () => {
    const createArray = (maxLength: number, maxValue: number): number[] => {
      const rand = (val: number): number => Math.floor(Math.random() * val)

      return Array.from({
        length: rand(maxLength)
      }, () => rand(maxValue))
    }

    expect(() => abc(
      createArray(100, 1000).map(s),
      createArray(100, 1000).map(e)
    )).not.toThrow()
  })
})
