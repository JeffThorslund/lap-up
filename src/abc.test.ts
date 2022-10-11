import { abc, buildEntry, createFinalRacesMap, createPointerMap, createStartsRacesMap, createUniqueIds } from './abc'

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

describe('create starts races map', () => {
  test('empty list', () => {
    expect(createStartsRacesMap(['1', '2'], [])).toEqual({
      1: [],
      2: []
    })
  })

  test('single start', () => {
    expect(createStartsRacesMap(['1', '2'], [{
      id: '1',
      time: 123
    }])).toEqual({
      1: [{
        start: 123,
        end: undefined
      }],
      2: []
    })
  })

  test('several start', () => {
    expect(createStartsRacesMap(['1', '2'], [{
      id: '1',
      time: 123
    }, {
      id: '1',
      time: 343
    }, {
      id: '2',
      time: 443
    }])).toEqual({
      1: [{
        start: 123,
        end: undefined
      }, {
        start: 343,
        end: undefined
      }],
      2: [{
        start: 443,
        end: undefined
      }]
    })
  })
})

describe('create final races map', () => {
  test('empty list', () => {
    expect(createFinalRacesMap([])).toEqual({})
  })

  test('single id', () => {
    expect(createFinalRacesMap(['1'])).toEqual({ 1: [] })
  })

  test('several ids', () => {
    expect(createFinalRacesMap(['1', '2'])).toEqual({
      1: [],
      2: []
    })
  })
})

describe('create pointer map', () => {
  test('empty list', () => {
    expect(createPointerMap([])).toEqual({})
  })

  test('single id', () => {
    expect(createPointerMap(['1'])).toEqual({ 1: 0 })
  })

  test('several ids', () => {
    expect(createPointerMap(['1', '2'])).toEqual({
      1: 0,
      2: 0
    })
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

// end to end

describe('abc', () => {
  test('empty lists', () => {
    expect(abc([], [])).toEqual({})
  })

  test('single id, single end, no starts', () => {
    expect(abc([], [{
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
    expect(abc([], [{
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
    expect(abc([{
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
})
