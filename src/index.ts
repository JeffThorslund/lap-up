import * as types from "./types";
import {
  EndTimingEvent,
  GlobalPenaltyConfig,
  NameRecord,
  Selectors,
  StartTimingEvent,
} from "./types";
import { selectors } from "./selectors";
import { buildResults } from "./results/buildResults";
import { index } from "./validation";

export const slalomX = (
  names: NameRecord[],
  starts: StartTimingEvent[],
  ends: EndTimingEvent[],
  config: GlobalPenaltyConfig
): Selectors => {
  index(ends, config);
  const resultsMap = buildResults(names, starts, ends);
  return selectors(resultsMap);
};

export { types };
