import { index } from './index'

test('empty csv strings', () => {
  expect(index('', '')).toEqual({})
})
