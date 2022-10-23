import * as types from "./types";
import {
  EndTimingEvent,
  GlobalPenaltyConfig,
  NameRecord,
  Selectors,
  StartTimingEvent,
} from "./types";
import { selectors } from "./selectors";
import { createFinalResultsDic } from "./results/createFinalResultsDic";
import { createTimingEventDic } from "./results/createTimingEventDic";

export const slalomX = (
  names: NameRecord[],
  starts: StartTimingEvent[],
  ends: EndTimingEvent[],
  config: GlobalPenaltyConfig
): Selectors => {
  const timingEventDic = createTimingEventDic(names, starts, ends);
  const resultsMap = createFinalResultsDic(timingEventDic);
  return selectors(resultsMap, config);
};

export { types };
