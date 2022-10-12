import { parseNames } from './index'

describe('name parsing', () => {
  test('empty string', () => {
    expect(parseNames('')).toEqual({})
  })

  test('single name', () => {
    expect(parseNames('1\tjeff')).toEqual({ 1: 'jeff' })
  })

  test('several name', () => {
    expect(parseNames('1\tjeff\n2\trob')).toEqual({
      1: 'jeff',
      2: 'rob'
    })
  })
})
