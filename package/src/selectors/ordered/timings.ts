import {
  ComputedRaceInstance,
  GlobalPenaltyConfig,
  PenaltyRecord,
} from "../../types";

export const getTimings = (
  { start, end, penalties }: ComputedRaceInstance,
  penaltyConfig: GlobalPenaltyConfig
): { time: number | null; adjustedTime: number | null } => {
  // if entry is invalid, return nulls
  if (start === null || end === null || penalties === null) {
    return {
      time: null,
      adjustedTime: null,
    };
  }

  const time = calculateTime(start, end);

  const adjustedTime =
    time - calculateTotalTimeOfAllPenalties(penalties, penaltyConfig);

  return {
    time,
    adjustedTime,
  };
};

export const calculateTotalTimeOfSinglePenaltyType = (
  numberOfPenalties: number,
  penaltyValue: number
): number => {
  return numberOfPenalties * penaltyValue;
};

export const calculateTotalTimeOfAllPenalties = (
  penalties: PenaltyRecord,
  penaltyConfig: GlobalPenaltyConfig
): number => {
  let totalPenaltyTime = 0;

  for (const penaltyType in penaltyConfig) {
    totalPenaltyTime += calculateTotalTimeOfSinglePenaltyType(
      penalties[penaltyType],
      penaltyConfig[penaltyType]
    );
  }

  return totalPenaltyTime;
};

export const calculateTime = (start: number, end: number): number => {
  return end - start;
};
