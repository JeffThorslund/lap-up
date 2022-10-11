import { abc, buildEntry, createUniqueIds, iterateOverObj } from './abc'

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
      time: 1
    },
    {
      id: '2',
      time: 1
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
      time: 3
    },
    {
      id: '2',
      time: 4
    }])).toEqual(['1', '2'])
  })
})

describe('build entry', () => {
  test('startless', () => {
    expect(buildEntry.startless(9)).toEqual({
      start: null,
      end: 9
    })
  })

  test('endless', () => {
    expect(buildEntry.endless(9)).toEqual({
      start: 9,
      end: null
    })
  })

  test('base', () => {
    expect(buildEntry.base(9, 10)).toEqual({
      start: 9,
      end: 10
    })
  })
})

describe('interate over obj', () => {
  test('empty lists', () => {
    expect(iterateOverObj([], [])).toEqual({})
  })

  test('single id, single end, no starts', () => {
    expect(iterateOverObj([], [{
      id: '1',
      time: 1
    }])).toEqual({
      1: [{
        start: null,
        end: 1
      }]
    })
  })

  test('single id, several ends, no starts', () => {
    expect(iterateOverObj([], [{
      id: '1',
      time: 1
    }, {
      id: '1',
      time: 10
    }])).toEqual({
      1: [{
        start: null,
        end: 1
      }, {
        start: null,
        end: 10
      }]
    })
  })

  test('single id, several start', () => {
    expect(iterateOverObj([{
      id: '1',
      time: 1
    }, {
      id: '1',
      time: 2
    }], [])).toEqual({
      1: [{
        start: 1,
        end: null
      }, {
        start: 2,
        end: null
      }]
    })
  })

  test('regular case', () => {
    expect(iterateOverObj([{
      id: '1',
      time: 100
    }], [{
      id: '1',
      time: 200
    }])).toEqual({
      1: [{
        start: 100,
        end: 200
      }]
    })
  })

  test('traverse several starts', () => {
    expect(iterateOverObj([{
      id: '1',
      time: 10
    }, {
      id: '1',
      time: 20
    }], [{
      id: '1',
      time: 25
    }])).toEqual({
      1: [{
        start: 10,
        end: null
      }, {
        start: 20,
        end: 25
      }]
    })
  })
})

describe('', () => {
  test('regular case', () => {
    expect(abc([10, 20, 30], [15, 25, 35])).toEqual([{
      start: 10,
      end: 15
    }, {
      start: 20,
      end: 25
    }, {
      start: 30,
      end: 35
    }])
  })

  test('all starts', () => {
    expect(abc([10, 20, 30], [])).toEqual([{
      start: 10,
      end: null
    }, {
      start: 20,
      end: null
    }, {
      start: 30,
      end: null
    }])
  })

  test('all ends', () => {
    expect(abc([], [15, 25, 35])).toEqual([{
      start: null,
      end: 15
    }, {
      start: null,
      end: 25
    }, {
      start: null,
      end: 35
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
      createArray(100, 1000),
      createArray(100, 1000)
    )).not.toThrow()
  })
})
