import { abc, buildEntry, createUniqueIds } from './abc'

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

  test('regular case', () => {
    expect(abc([{
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
})
