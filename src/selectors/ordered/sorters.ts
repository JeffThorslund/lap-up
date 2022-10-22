import { CompleteComputedRaceInstance } from "../../types";

export const sortRacesByNonIncreasing = (
  a: number | null,
  b: number | null
): number => {
  // sort races with an invalid result last
  if (a === null) return 1;
  if (b === null) return -1;

  // sort rest of races by fastest time
  return a - b;
};

export const sortCompetitorsByBestResult = (
  a: CompleteComputedRaceInstance | undefined,
  b: CompleteComputedRaceInstance | undefined
): number => {
  // sort racers with no races last
  if (a === undefined) return 1;
  if (b === undefined) return -1;

  // sort racers with an invalid result as their best result, last
  if (a.adjustedTime === null) return 1;
  if (b.adjustedTime === null) return -1;

  // sort rest of racers by their best result
  return a.adjustedTime - b.adjustedTime;
};
