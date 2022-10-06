import { TypedCSVData } from './types'

export const mergeLists = (starts: TypedCSVData[], ends: TypedCSVData[]): TypedCSVData[] => {
  return [...starts, ...ends].sort((a, b) => a.time - b.time)
}
