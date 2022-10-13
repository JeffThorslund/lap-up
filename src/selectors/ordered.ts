import { FinalRaceEntry, Id, NamesMap, OrderedSelectorResults, PenaltyConfig, Result, ResultsMap } from '../types'

export const ordered = (data: ResultsMap, names: NamesMap): OrderedSelectorResults[] => {
  return Object.entries(data)
    .map<OrderedSelectorResults>(appendNameAndParseResults(names))
    .sort((a, b) => sortByBestResultIfExists(a.results[0], b.results[0]))
}

const appendNameAndParseResults = (names: NamesMap) => {
  return ([id, results]: [id: Id, results: FinalRaceEntry[]]): OrderedSelectorResults => {
    return {
      id,
      name: names[id],
      results: results
        .map<Result>(getFullResults)
        .sort((a, b) => sortNonIncreasing(a.adjustedTime, b.adjustedTime))
    }
  }
}

export const sortByBestResultIfExists = (a: Result | undefined, b: Result | undefined): number => {
  if (a === undefined) return 1
  if (b === undefined) return -1

  return sortNonIncreasing(a.adjustedTime, b.adjustedTime)
}

export const sortNonIncreasing = (a: number | null, b: number | null): number => {
  if (a === null) return 1
  if (b === null) return -1

  return a - b
}

const getFullResults = (result: FinalRaceEntry): Result => {
  const time = getTime(result.start, result.end)

  return ({
    ...result,
    time,
    adjustedTime: getAdjustedTime(time, {
      number: result.touchedGates,
      penalty: 2 // s
    }, {
      number: result.missedGates,
      penalty: 5 // s
    })
  })
}

export const getTime = (start: number | null, end: number | null): number | null => {
  if (start === null || end === null) {
    return null
  }

  return end - start
}

export const getAdjustedTime = (time: number | null, touchedConfig: PenaltyConfig, missedConfig: PenaltyConfig): number | null => {
  if (time === null) return null

  let adjustedTime = time

  if (touchedConfig.number !== null) {
    adjustedTime -= getTotalPenaltyTime(touchedConfig.number, touchedConfig.penalty)
  }

  if (missedConfig.number !== null) {
    adjustedTime -= getTotalPenaltyTime(missedConfig.number, missedConfig.penalty)
  }

  return adjustedTime
}

export const getTotalPenaltyTime = (num: number, pen: number): number => {
  return num * pen
}
