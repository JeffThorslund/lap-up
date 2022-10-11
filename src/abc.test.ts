import { createFinalRacesMap, createPointerMap, createStartsRacesMap, createUniqueIds } from './abc'

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
