import { ResultRecords, Selectors } from "../types";
import { ordered } from "./ordered";
import { personal } from "./personal";
import { overall } from "./overall";

export const selectors = (data: ResultRecords): Selectors => {
  return {
    overall: overall(data),
    personal: personal(data),
    ordered: ordered(data),
  };
};
