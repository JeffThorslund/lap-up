import {
  CompleteComputedRaceInstance,
  ComputedRaceInstance,
  GlobalPenaltyConfig,
  Id,
  OrderedSelectorResults,
  ResultRecord,
  ResultRecords,
} from "../../types";
import {
  sortCompetitorsByBestResult,
  sortRacesByNonIncreasing,
} from "./sorters";
import { getTimings } from "./timings";

export const ordered = (
  resultRecords: ResultRecords,
  config: GlobalPenaltyConfig
): OrderedSelectorResults[] => {
  return Object.entries(resultRecords)
    .map<OrderedSelectorResults>((val) =>
      appendNameAndParseResults(val, config)
    )
    .sort((a, b) => sortCompetitorsByBestResult(a.results[0], b.results[0]));
};

const appendNameAndParseResults = (
  [id, record]: [id: Id, record: ResultRecord],
  config: GlobalPenaltyConfig
): OrderedSelectorResults => {
  return {
    id,
    name: record.name,
    results: record.races
      .map<CompleteComputedRaceInstance>((val) => getFullResults(val, config))
      .sort((a, b) => sortRacesByNonIncreasing(a.adjustedTime, b.adjustedTime)),
  };
};

const getFullResults = (
  result: ComputedRaceInstance,
  config: GlobalPenaltyConfig
): CompleteComputedRaceInstance => {
  const { time, adjustedTime } = getTimings(result, config);

  return {
    ...result,
    time,
    adjustedTime,
  };
};
