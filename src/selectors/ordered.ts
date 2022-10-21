import {
  CompleteComputedRaceInstance,
  ComputedRaceInstance,
  Id,
  OrderedSelectorResults,
  PenaltyConfig,
  ResultRecord,
  ResultRecords,
} from "../types";

export const ordered = (data: ResultRecords): OrderedSelectorResults[] => {
  return Object.entries(data)
    .map<OrderedSelectorResults>(appendNameAndParseResults)
    .sort((a, b) => sortByBestResultIfExists(a.results[0], b.results[0]));
};

const appendNameAndParseResults = ([id, record]: [
  id: Id,
  record: ResultRecord
]): OrderedSelectorResults => {
  return {
    id,
    name: record.name,
    results: record.races
      .map<CompleteComputedRaceInstance>(getFullResults)
      .sort((a, b) => sortNonIncreasing(a.adjustedTime, b.adjustedTime)),
  };
};

export const sortByBestResultIfExists = (
  a: CompleteComputedRaceInstance | undefined,
  b: CompleteComputedRaceInstance | undefined
): number => {
  if (a === undefined) return 1;
  if (b === undefined) return -1;

  return sortNonIncreasing(a.adjustedTime, b.adjustedTime);
};

export const sortNonIncreasing = (
  a: number | null,
  b: number | null
): number => {
  if (a === null) return 1;
  if (b === null) return -1;

  return a - b;
};

const getFullResults = (
  result: ComputedRaceInstance
): CompleteComputedRaceInstance => {
  const time = getTime(result.start, result.end);

  return {
    ...result,
    time,
    adjustedTime: getAdjustedTime(
      time,
      {
        number: result.touchedGates,
        penalty: 2, // s
      },
      {
        number: result.missedGates,
        penalty: 5, // s
      }
    ),
  };
};

export const getTime = (
  start: number | null,
  end: number | null
): number | null => {
  if (start === null || end === null) {
    return null;
  }

  return end - start;
};

export const getAdjustedTime = (
  time: number | null,
  touchedConfig: PenaltyConfig,
  missedConfig: PenaltyConfig
): number | null => {
  if (time === null) return null;

  let adjustedTime = time;

  if (touchedConfig.number !== null) {
    adjustedTime -= getTotalPenaltyTime(
      touchedConfig.number,
      touchedConfig.penalty
    );
  }

  if (missedConfig.number !== null) {
    adjustedTime -= getTotalPenaltyTime(
      missedConfig.number,
      missedConfig.penalty
    );
  }

  return adjustedTime;
};

export const getTotalPenaltyTime = (num: number, pen: number): number => {
  return num * pen;
};
