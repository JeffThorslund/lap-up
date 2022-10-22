import { GlobalPenaltyConfig, ResultRecords, Selectors } from "../types";
import { ordered } from "./ordered/ordered";
import { personal } from "./personal";
import { overall } from "./overall";

export const selectors = (
  resultRecords: ResultRecords,
  config: GlobalPenaltyConfig
): Selectors => ({
  overall: overall(resultRecords),
  personal: personal(resultRecords),
  ordered: ordered(resultRecords, config),
});
